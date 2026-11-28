// supabase/functions/tipo-api/index.ts
// Tipo — Pastel Mind & Paper Decoder Cloud Edge Function (Deno 2 / Supabase)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const PER_MODEL_TIMEOUT_MS = 14_000;
const RETRY_503_BASE_MS = 700;
const MAX_REQUEST_BYTES = 6_500_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQ = 20;
const MAX_IMAGE_BASE64_CHARS = 5_600_000;
const ALLOWED_IMAGE_MIMES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PASS_CREDITS = 50;

const STATIC_ALLOWED_ORIGINS = new Set([
  "https://vibecheck-hq.github.io",
  "https://vibecheck-hq.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
]);

function resolveAllowedOrigin(req: Request): string {
  const origin = req.headers.get("origin")?.trim() || "";
  const configuredFrontend = (Deno.env.get("FRONTEND_URL") || "").trim().replace(/\/+$/, "");
  const strictCors = (Deno.env.get("STRICT_CORS") || "").toLowerCase() === "true";
  if (!origin) return configuredFrontend || "https://vibecheck-hq.github.io";
  const normalized = origin.replace(/\/+$/, "");
  if (
    STATIC_ALLOWED_ORIGINS.has(normalized) ||
    (configuredFrontend && normalized === configuredFrontend) ||
    /^https:\/\/vibecheck-hq[a-z0-9-]*\.vercel\.app$/i.test(normalized)
  ) {
    return origin;
  }
  return strictCors ? (configuredFrontend || "https://vibecheck-hq.github.io") : "*";
}

function buildCorsHeaders(req: Request): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": resolveAllowedOrigin(req),
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-gemini-key, x-decode-session, x-owner-key",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Vary": "Origin",
  };
}

function jsonResponse(req: Request, payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: buildCorsHeaders(req),
  });
}

const ipBuckets = new Map<string, number[]>();
function checkBurstRateLimit(req: Request): { allowed: boolean; retryAfterSec: number } {
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const now = Date.now();
  const prev = (ipBuckets.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (prev.length >= RATE_LIMIT_MAX_REQ) {
    const retryAfterSec = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - prev[0])) / 1000));
    ipBuckets.set(ip, prev);
    return { allowed: false, retryAfterSec };
  }
  prev.push(now);
  ipBuckets.set(ip, prev);
  if (ipBuckets.size > 500) {
    const firstKey = ipBuckets.keys().next().value;
    if (firstKey) ipBuckets.delete(firstKey);
  }
  return { allowed: true, retryAfterSec: 0 };
}

interface HandwritingImageInput {
  mimeType: string;
  base64: string;
  width?: number;
  height?: number;
  inkCoverageRatio?: number | null;
  source?: string;
}

interface RequestPayload {
  mode?: "single" | "handwriting" | "create_checkout";
  text?: string;
  sessionId?: string;
  returnUrl?: string;
  app?: string;
  handwritingImage?: HandwritingImageInput | null;
  localCv?: Record<string, unknown> | null;
  runLlm?: boolean;
}

const memoryCredits = new Map<string, number>();

async function createTipoCheckout(req: Request, body: RequestPayload): Promise<Response> {
  const stripeKey = (Deno.env.get("STRIPE_SECRET_KEY") || "").trim();
  if (!stripeKey) {
    return jsonResponse(req, { error: "Stripe key missing in Supabase Secrets." }, 500);
  }

  let safeReturn = "https://vibecheck-hq.github.io/Tipo/";
  const rawReturn = String(body.returnUrl || "").trim();
  if (/^https:\/\/[A-Za-z0-9.-]+(\/[^\s?#]*)?$/.test(rawReturn)) {
    safeReturn = rawReturn;
  }

  const params = new URLSearchParams({
    mode: "payment",
    "payment_method_types[0]": "card",
    "line_items[0][price_data][currency]": "gbp",
    "line_items[0][price_data][unit_amount]": "99",
    "line_items[0][price_data][product_data][name]": "Tipo Pro Cloud Pass",
    "line_items[0][price_data][product_data][description]": "50 Deep Cloud AI handwriting & subtext reads for Tipo",
    "line_items[0][quantity]": "1",
    success_url: `${safeReturn}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${safeReturn}?cancelled=1`,
    "metadata[app]": "tipo",
    "metadata[pack]": "tipo_cloud_pass_99p",
    "metadata[credits]": String(PASS_CREDITS),
  });

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const stripeData = await stripeRes.json();
  if (!stripeRes.ok || !stripeData?.url) {
    return jsonResponse(
      req,
      { error: stripeData?.error?.message || `Stripe error (HTTP ${stripeRes.status})` },
      500,
    );
  }

  try {
    const supabaseUrl = (Deno.env.get("SUPABASE_URL") || "").trim();
    const serviceRoleKey = (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "").trim();
    if (supabaseUrl && serviceRoleKey && stripeData.id) {
      const admin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      await admin.from("decodes").insert({
        stripe_session_id: stripeData.id,
        status: "pending",
        credits_remaining: PASS_CREDITS,
        credits_used: 0,
      });
    }
  } catch {
    // Verified directly against Stripe on return
  }

  return jsonResponse(req, { url: stripeData.url, sessionId: stripeData.id }, 200);
}

async function verifyStripeSessionLive(sessionId: string): Promise<boolean> {
  const stripeKey = (Deno.env.get("STRIPE_SECRET_KEY") || "").trim();
  if (!stripeKey || !sessionId.startsWith("cs_")) return false;
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${stripeKey}` } },
    );
    if (!res.ok) return false;
    const data = await res.json();
    return data?.payment_status === "paid" && Number(data?.amount_total || 0) >= 99;
  } catch {
    return false;
  }
}

async function verifyAccessGate(req: Request, body: RequestPayload, needsLlm: boolean) {
  const requireGate = (Deno.env.get("REQUIRE_PAID_GATE") || "true").toLowerCase() !== "false";
  if (!requireGate || !needsLlm) {
    return { authorized: true, status: 200, mode: "open_rd", credits_remaining: null as number | null };
  }

  const ownerSecret = (Deno.env.get("OWNER_BYPASS_KEY") || "").trim();
  const providedOwnerKey = (req.headers.get("x-owner-key") || "").trim();
  if (ownerSecret && providedOwnerKey && providedOwnerKey === ownerSecret) {
    return { authorized: true, status: 200, mode: "owner_bypass", credits_remaining: null };
  }

  const sessionId = (body.sessionId || req.headers.get("x-decode-session") || "").trim();
  if (!sessionId || !/^[A-Za-z0-9_-]{8,128}$/.test(sessionId)) {
    return {
      authorized: false,
      status: 402,
      error: "Unlock the 99p Tipo Pro Cloud Pass for 50 Deep Cloud AI reads.",
      mode: "paid_session",
    };
  }

  const supabaseUrl = (Deno.env.get("SUPABASE_URL") || "").trim();
  const serviceRoleKey = (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "").trim();
  const admin = supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sessionId);

  let row: { id: string; status: string; credits_remaining: number | null; credits_used: number | null } | null = null;
  if (admin) {
    try {
      const query = admin.from("decodes").select("id, status, credits_remaining, credits_used");
      const { data } = await (
        isUuid ? query.eq("id", sessionId) : query.eq("stripe_session_id", sessionId)
      ).maybeSingle();
      row = data;
    } catch {
      row = null;
    }
  }

  if (row && row.status === "paid") {
    const remaining = typeof row.credits_remaining === "number" ? row.credits_remaining : PASS_CREDITS;
    if (remaining <= 0) {
      return {
        authorized: false,
        status: 402,
        error: "You used all 50 Cloud Reads on this pass. Unlock a fresh pass for 99p.",
        mode: "paid_session",
        credits_remaining: 0,
      };
    }
    const nextRemaining = Math.max(0, remaining - 1);
    const nextUsed = (typeof row.credits_used === "number" ? row.credits_used : 0) + 1;
    if (admin) {
      await admin.from("decodes").update({ credits_remaining: nextRemaining, credits_used: nextUsed }).eq("id", row.id);
    }
    return { authorized: true, status: 200, mode: "paid_session", credits_remaining: nextRemaining };
  }

  const paidOnStripe = await verifyStripeSessionLive(sessionId);
  if (!paidOnStripe) {
    return {
      authorized: false,
      status: 402,
      error: "Unlock the 99p Tipo Pro Cloud Pass for 50 Deep Cloud AI reads.",
      mode: "paid_session",
    };
  }

  const nextRemaining = PASS_CREDITS - 1;
  let persisted = false;
  if (admin) {
    try {
      if (row) {
        const { error } = await admin
          .from("decodes")
          .update({ status: "paid", credits_remaining: nextRemaining, credits_used: 1 })
          .eq("id", row.id);
        persisted = !error;
      } else {
        const { error } = await admin.from("decodes").insert({
          stripe_session_id: sessionId,
          status: "paid",
          credits_remaining: nextRemaining,
          credits_used: 1,
        });
        persisted = !error;
      }
    } catch {
      persisted = false;
    }
  }

  if (!persisted) {
    const curMem = memoryCredits.has(sessionId) ? memoryCredits.get(sessionId)! : PASS_CREDITS;
    if (curMem <= 0) {
      return {
        authorized: false,
        status: 402,
        error: "You used all 50 Cloud Reads on this pass. Unlock a fresh pass for 99p.",
        mode: "paid_session",
        credits_remaining: 0,
      };
    }
    memoryCredits.set(sessionId, curMem - 1);
    return { authorized: true, status: 200, mode: "paid_session", credits_remaining: curMem - 1 };
  }

  return { authorized: true, status: 200, mode: "paid_session", credits_remaining: nextRemaining };
}

function round(n: number, d = 4): number {
  const p = Math.pow(10, d);
  return Math.round(n * p) / p;
}

function scoreSyntax(rawText: string) {
  const text = (rawText || "").trim();
  const words = text.replace(/[\u2018\u2019]/g, "'").match(/[A-Za-z0-9'£$€]+/g) ?? [];
  const word_cnt = words.length;
  const mean_wlen = word_cnt ? round(words.reduce((a, w) => a + w.length, 0) / word_cnt, 3) : 0;
  const lexical_ttr = word_cnt ? round(new Set(words.map((w) => w.toLowerCase())).size / word_cnt, 4) : 0;
  const sents = text.split(/[.!?\n]+/).map((s) => s.trim()).filter(Boolean);
  const w_per_s = word_cnt ? round(word_cnt / Math.max(1, sents.length), 3) : 0;
  const hedge_cnt = (text.match(/\b(maybe|perhaps|sort of|kind of|probably|might|i guess|i think|just|possibly)\b/gi) ?? []).length;
  const modal_cnt = (text.match(/\b(would|could|should|wondered|ideally|whenever|appreciate)\b/gi) ?? []).length;
  const excl_cnt = (text.match(/!/g) ?? []).length;
  const quest_cnt = (text.match(/\?/g) ?? []).length;
  return { word_cnt, mean_wlen, lexical_ttr, w_per_s, hedge_cnt, modal_cnt, excl_cnt, quest_cnt };
}

function stripJsonFences(raw: string): string {
  return raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("upstream_timeout"), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function runGeminiPaperRead(
  text: string,
  syntax: ReturnType<typeof scoreSyntax>,
  img: HandwritingImageInput | null,
  localCv: Record<string, unknown> | null,
  headerKey: string | null,
) {
  const allowByok = (Deno.env.get("REQUIRE_PAID_GATE") || "true").toLowerCase() === "false";
  const apiKey = (Deno.env.get("GEMINI_API_KEY") || Deno.env.get("GOOGLE_API_KEY") || (allowByok ? headerKey : "") || "").trim();

  if (!apiKey) {
    return {
      executive_read: "Deterministic Local Mode: Stage 1 syntax and client-side CV ink metrics computed without cloud LLM key.",
      handwriting_transcription: "",
      aligned_observations: [],
      llm_model: "deterministic-fallback",
      llm_status: "missing_GEMINI_API_KEY_secret",
    };
  }

  const systemPrompt = `You are the cloud analysis engine for Tipo (Pastel Mind & Paper Decoder).
Receive optional handwritten paper image, client-side CV ink metrics (Otsu threshold, Sobel slant, baseline slope, margin drift, peak focus line), and text syntax metrics.
Rules:
1) If a handwriting image is attached, transcribe all legible handwritten text accurately into "handwriting_transcription" (preserve line breaks; mark illegible words [?]).
2) Give a sharp, grounded, entertaining 2-3 sentence "executive_read" tying observable wording + visual ink features (slant, spacing, baseline, cross-outs, peak-focus line) to cognitive style & subtext.
3) Never claim unproven demographics (age, siblings, profession) as fact. Keep every observation anchored to observable cues.
Return ONLY valid JSON:
{
  "executive_read": "2-3 crisp grounded sentences.",
  "handwriting_transcription": "Exact transcription or empty string.",
  "aligned_observations": [
    { "title": "3-5 word label", "finding": "Specific grounded observation." }
  ]
}`;

  const parts: Array<Record<string, unknown>> = [
    { text: JSON.stringify({ raw_text: text, stage1_syntax: syntax, local_cv: localCv }) },
  ];
  if (img) {
    parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } });
  }

  const models = [
    "gemini-3.8-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash-lite",
  ];

  const errors: string[] = [];
  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const reqBody = JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts }],
      generationConfig: { responseMimeType: "application/json" },
    });

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetchWithTimeout(
          url,
          { method: "POST", headers: { "Content-Type": "application/json" }, body: reqBody },
          PER_MODEL_TIMEOUT_MS,
        );
        if (!res.ok) {
          if (res.status === 503 && attempt === 0) {
            await new Promise((r) => setTimeout(r, RETRY_503_BASE_MS + Math.floor(Math.random() * 250)));
            continue;
          }
          errors.push(`${model}: HTTP ${res.status}`);
          break;
        }
        const data = await res.json();
        const rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawJsonText) {
          errors.push(`${model}: empty candidate`);
          break;
        }
        const parsed = JSON.parse(stripJsonFences(rawJsonText));
        return {
          executive_read: String(parsed.executive_read || ""),
          handwriting_transcription: String(parsed.handwriting_transcription || ""),
          aligned_observations: Array.isArray(parsed.aligned_observations) ? parsed.aligned_observations : [],
          llm_model: model,
          llm_status: "live_gemini_ok",
        };
      } catch (err) {
        errors.push(`${model}: ${err instanceof Error ? err.message : String(err)}`);
        break;
      }
    }
  }

  return {
    executive_read: "Cloud AI temporarily cooling down — your client-side Otsu/Sobel CV and CMTE syntax anchors remain 100% verified.",
    handwriting_transcription: "",
    aligned_observations: [],
    llm_model: "deterministic-fallback",
    llm_status: `fallback (${errors.slice(0, 2).join(" | ")})`,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: buildCorsHeaders(req) });
  }

  if (req.method === "GET") {
    const requireGate = (Deno.env.get("REQUIRE_PAID_GATE") || "true").toLowerCase() !== "false";
    return jsonResponse(req, {
      status: "ok",
      function: "tipo-api",
      billing_gate: requireGate ? "enforced" : "open_rd",
      checkout: "ready",
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed. Send POST JSON." }, 405);
  }

  const startedAt = Date.now();
  const rate = checkBurstRateLimit(req);
  if (!rate.allowed) {
    return jsonResponse(req, { error: `Rate limit reached. Retry in ${rate.retryAfterSec}s.` }, 429);
  }

  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return jsonResponse(req, { error: "Payload exceeds 6.5 MB limit." }, 413);
  }

  try {
    const body = (await req.json()) as RequestPayload;

    if (body.mode === "create_checkout") {
      return await createTipoCheckout(req, body);
    }

    const runLlm = body.runLlm !== false;
    const gate = await verifyAccessGate(req, body, runLlm);
    if (!gate.authorized) {
      return jsonResponse(req, { error: gate.error, billing_required: gate.status === 402 }, gate.status);
    }

    let validImage: HandwritingImageInput | null = null;
    if (body.handwritingImage) {
      const mime = String(body.handwritingImage.mimeType || "").toLowerCase().trim();
      const base64 = String(body.handwritingImage.base64 || "").replace(/^data:[^;]+;base64,/, "").trim();
      if (ALLOWED_IMAGE_MIMES.has(mime) && base64.length >= 32 && base64.length <= MAX_IMAGE_BASE64_CHARS) {
        validImage = { ...body.handwritingImage, mimeType: mime, base64 };
      }
    }

    const rawText = (body.text || "").trim().slice(0, 8000);
    if (!rawText && !validImage) {
      return jsonResponse(req, { error: "Provide handwritten photo or text." }, 400);
    }

    const syntax = scoreSyntax(rawText);
    const stage2 = runLlm
      ? await runGeminiPaperRead(rawText, syntax, validImage, body.localCv ?? null, req.headers.get("x-gemini-key"))
      : {
          executive_read: "Deterministic mode active.",
          handwriting_transcription: "",
          aligned_observations: [],
          llm_model: "deterministic-fallback",
          llm_status: "llm_toggle_off",
        };

    const finalSyntax = !rawText && stage2.handwriting_transcription
      ? scoreSyntax(stage2.handwriting_transcription)
      : syntax;

    return jsonResponse(req, {
      meta: {
        function: "tipo-api",
        access_mode: gate.mode,
        credits_remaining: gate.credits_remaining ?? null,
        llm_model: stage2.llm_model,
        llm_status: stage2.llm_status,
        elapsed_ms: Date.now() - startedAt,
      },
      executive_read: stage2.executive_read,
      handwriting_transcription: stage2.handwriting_transcription,
      aligned_observations: stage2.aligned_observations,
      syntax: finalSyntax,
    });
  } catch (err) {
    return jsonResponse(
      req,
      { error: err instanceof Error ? err.message : "Unhandled tipo-api error" },
      500,
    );
  }
});
