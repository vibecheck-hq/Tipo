<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#fdf6fb" />
  <title>Tipo — Pastel Mind & Paper Decoder</title>
  <style>
    :root {
      --bg-1: #fdf5fb;
      --bg-2: #f3efff;
      --bg-3: #ecfbf5;
      --card: rgba(255, 255, 255, 0.90);
      --card-solid: #ffffff;
      --border: #ede3f7;
      --text: #1f1b2e;
      --muted: #6b6480;
      --violet: #8b5cf6;
      --violet-soft: #f3ecff;
      --rose: #ec4899;
      --rose-soft: #fce7f3;
      --mint: #10b981;
      --mint-soft: #d1fae5;
      --sky: #3b82f6;
      --sky-soft: #e0f2fe;
      --gold: #f59e0b;
      --gold-soft: #fef3c7;
      --coral: #fb7185;
      --shadow: 0 12px 32px rgba(139, 92, 246, 0.08), 0 2px 8px rgba(31, 27, 46, 0.04);
      --radius: 22px;
      --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

    body {
      margin: 0;
      font-family: var(--font);
      color: var(--text);
      min-height: 100vh;
      background:
        radial-gradient(circle at 12% 8%, rgba(244, 114, 182, 0.16), transparent 40%),
        radial-gradient(circle at 88% 12%, rgba(167, 139, 250, 0.18), transparent 42%),
        radial-gradient(circle at 78% 85%, rgba(52, 211, 153, 0.15), transparent 45%),
        linear-gradient(155deg, var(--bg-1) 0%, var(--bg-2) 52%, var(--bg-3) 100%);
      background-attachment: fixed;
      line-height: 1.5;
    }

    /* Sticky Glass Header */
    .topbar {
      position: sticky;
      top: 0;
      z-index: 40;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(255, 255, 255, 0.80);
      border-bottom: 1px solid var(--border);
      padding: 10px 14px 12px;
    }

    .topbar-inner {
      max-width: 960px;
      margin: 0 auto;
    }

    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-icon {
      width: 38px;
      height: 38px;
      border-radius: 13px;
      background: linear-gradient(135deg, #f472b6 0%, #a78bfa 55%, #34d399 100%);
      display: grid;
      place-items: center;
      color: #fff;
      font-size: 19px;
      box-shadow: 0 6px 16px rgba(167, 139, 250, 0.30);
      flex-shrink: 0;
    }

    .brand-title {
      font-weight: 800;
      font-size: 15px;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }

    .brand-sub {
      font-size: 11px;
      color: var(--muted);
      font-weight: 600;
    }

    .status-banner {
      font-size: 12px;
      font-weight: 700;
      color: #6d28d9;
      background: linear-gradient(90deg, #f5f0ff, #fdf2f8, #ecfdf5);
      border: 1px solid #e9d5ff;
      padding: 6px 13px;
      border-radius: 999px;
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .live-chips {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--mono);
      font-size: 11px;
      font-weight: 700;
    }

    .chip {
      padding: 4px 9px;
      border-radius: 999px;
      background: #f8f5ff;
      border: 1px solid #e9ddff;
      color: #5b21b6;
    }

    .chip.mint { background: #ecfdf5; border-color: #a7f3d0; color: #047857; }
    .chip.sky { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
    .chip.rose { background: #fdf2f8; border-color: #fbcfe8; color: #be185d; }
    .chip.gold { background: #fffbeb; border-color: #fde68a; color: #b45309; }

    /* 4-Tab Bar */
    .tab-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      background: rgba(244, 239, 255, 0.75);
      padding: 5px;
      border-radius: 16px;
      border: 1px solid var(--border);
    }

    .tab-btn {
      border: none;
      background: transparent;
      color: var(--muted);
      font-family: var(--font);
      font-weight: 700;
      font-size: 13px;
      padding: 9px 6px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tab-btn.active {
      background: linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%);
      color: #4c1d95;
      box-shadow: 0 3px 10px rgba(139, 92, 246, 0.14);
    }

    /* Main Container */
    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 18px 14px 72px;
    }

    .tab-panel { display: none; animation: fadeIn 0.22s ease; }
    .tab-panel.active { display: block; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card {
      background: var(--card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 22px;
      box-shadow: var(--shadow);
      margin-bottom: 18px;
    }

    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
      font-weight: 700;
      color: #047857;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 5px 12px;
      border-radius: 999px;
      margin-bottom: 12px;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55); }
      70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    h1 {
      font-size: clamp(22px, 4vw, 31px);
      line-height: 1.18;
      letter-spacing: -0.03em;
      margin: 0 0 10px;
      font-weight: 850;
    }

    h2 {
      font-size: 20px;
      letter-spacing: -0.02em;
      margin: 0 0 6px;
      font-weight: 800;
    }

    h3 {
      font-size: 16px;
      margin: 0 0 8px;
      font-weight: 800;
    }

    .subcopy {
      color: var(--muted);
      font-size: 14px;
      margin: 0 0 18px;
    }

    /* Waveform Card */
    .wave-box {
      background: linear-gradient(135deg, #faf5ff 0%, #fdf2f8 50%, #f0fdf4 100%);
      border: 1px solid #eadcf8;
      border-radius: 18px;
      padding: 14px 16px;
      margin-bottom: 16px;
    }

    .wave-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 700;
      color: #5b21b6;
    }

    .wave-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 4px;
      height: 44px;
      padding: 4px 2px;
    }

    .wave-bar {
      flex: 1;
      min-height: 6px;
      height: 10px;
      border-radius: 999px;
      transition: height 0.14s ease;
    }

    /* Inputs & Dropdowns */
    label.field-label {
      display: block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #6d28d9;
      margin-bottom: 6px;
    }

    textarea, select, input[type="text"] {
      width: 100%;
      font-family: var(--font);
      font-size: 15px;
      color: var(--text);
      background: #ffffff;
      border: 1.5px solid #e4d8f5;
      border-radius: 14px;
      padding: 12px 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    textarea:focus, select:focus, input[type="text"]:focus {
      border-color: #a78bfa;
      box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.16);
    }

    .metric-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }

    .profile-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 16px;
    }

    .dob-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr 1fr;
      gap: 10px;
      margin-bottom: 14px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }

    @media (max-width: 600px) {
      .form-grid { grid-template-columns: 1fr; }
      .tab-btn { font-size: 12px; padding: 8px 4px; }
    }

    /* Buttons */
    .btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 20px;
    }

    .btn {
      border: none;
      border-radius: 15px;
      padding: 13px 20px;
      font-family: var(--font);
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: transform 0.12s ease, box-shadow 0.18s ease, opacity 0.18s;
      user-select: none;
    }

    .btn:active { transform: scale(0.98); }

    .btn-primary {
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
      color: #fff;
      box-shadow: 0 8px 20px rgba(139, 92, 246, 0.28);
      flex: 1;
      min-width: 210px;
    }

    .btn-mint {
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      color: #fff;
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.25);
    }

    .btn-soft {
      background: #f5f0ff;
      color: #5b21b6;
      border: 1px solid #e4d8f5;
      padding: 9px 14px;
      font-size: 13px;
    }

    .btn-gold {
      background: linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%);
      color: #fff;
      box-shadow: 0 8px 20px rgba(245, 158, 11, 0.25);
    }

    /* Micro-Game Stage */
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 14px;
    }

    .game-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      color: #be185d;
      background: #fce7f3;
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 6px;
    }

    .timer-ring-wrap {
      position: relative;
      width: 58px;
      height: 58px;
      flex-shrink: 0;
    }

    .timer-ring-wrap svg { transform: rotate(-90deg); width: 58px; height: 58px; }
    .timer-ring-text {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-family: var(--mono);
      font-size: 12px;
      font-weight: 800;
      color: #5b21b6;
    }

    .game-stage {
      min-height: 200px;
      background: linear-gradient(180deg, #fcfaff 0%, #f8f5ff 100%);
      border: 1.5px dashed #dfd1f7;
      border-radius: 18px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 14px;
      position: relative;
      user-select: none;
    }

    .game-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14px;
      font-size: 12px;
      font-weight: 700;
      color: var(--muted);
    }

    /* Specific Game Widgets */
    .hold-cloud {
      min-width: 240px;
      padding: 24px 32px;
      border-radius: 999px;
      border: none;
      font-size: 16px;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
      box-shadow: 0 12px 26px rgba(96, 165, 250, 0.35);
      cursor: pointer;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      transition: transform 0.14s ease, box-shadow 0.14s ease;
    }

    .hold-cloud.holding {
      transform: scale(1.04);
      background: linear-gradient(135deg, #38bdf8 0%, #c084fc 100%);
      box-shadow: 0 0 0 10px rgba(167, 139, 250, 0.22);
    }

    .orb-btn {
      width: 158px;
      height: 158px;
      border-radius: 50%;
      border: none;
      color: #fff;
      font-family: var(--font);
      font-size: 17px;
      font-weight: 900;
      cursor: pointer;
      touch-action: manipulation;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      box-shadow: 0 14px 30px rgba(139, 92, 246, 0.24);
      transition: transform 0.08s ease, background 0.15s ease;
    }

    .orb-btn:active { transform: scale(0.95); }
    .orb-hold { background: linear-gradient(135deg, #c4b5fd, #a78bfa); }
    .orb-go { background: linear-gradient(135deg, #34d399, #10b981); box-shadow: 0 0 0 12px rgba(16, 185, 129, 0.22); }
    .orb-nogo { background: linear-gradient(135deg, #fb7185, #f43f5e); box-shadow: 0 0 0 12px rgba(244, 63, 94, 0.22); }
    .orb-metro { background: linear-gradient(135deg, #f472b6, #a78bfa); }

    .ribbon-track {
      width: 100%;
      height: 62px;
      display: flex;
      align-items: center;
      position: relative;
    }

    .ribbon-bar {
      height: 30px;
      border-radius: 999px;
      background: linear-gradient(90deg, #fbcfe8 0%, #ddd6fe 50%, #a7f3d0 100%);
      border: 2px solid #fff;
      box-shadow: 0 6px 18px rgba(139, 92, 246, 0.18);
      cursor: crosshair;
      position: relative;
      touch-action: manipulation;
    }

    .ribbon-mark {
      position: absolute;
      top: -5px;
      width: 6px;
      height: 36px;
      border-radius: 4px;
      background: #7c3aed;
      transform: translateX(-50%);
      pointer-events: none;
    }

    .stroop-word {
      font-size: 46px;
      font-weight: 900;
      letter-spacing: 0.04em;
      margin: 4px 0 8px;
    }

    .stroop-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(120px, 180px));
      gap: 10px;
    }

    .stroop-btn {
      padding: 13px 16px;
      border-radius: 14px;
      border: 1.5px solid transparent;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
    }

    .stroop-rose { background: #fce7f3; color: #be185d; border-color: #fbcfe8; }
    .stroop-mint { background: #d1fae5; color: #047857; border-color: #a7f3d0; }
    .stroop-sky { background: #e0f2fe; color: #0369a1; border-color: #bae6fd; }
    .stroop-gold { background: #fef3c7; color: #b45309; border-color: #fde68a; }

    /* Reveal Card */
    .reveal-card {
      background: linear-gradient(135deg, rgba(236, 253, 245, 0.94), rgba(245, 243, 255, 0.94));
      border: 1.5px solid #a7f3d0;
      border-radius: var(--radius);
      padding: 20px;
      margin-bottom: 18px;
      box-shadow: var(--shadow);
      animation: fadeIn 0.28s ease;
    }

    .reveal-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #047857;
      background: #d1fae5;
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 8px;
    }

    .science-note {
      margin-top: 12px;
      padding: 10px 13px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid #e9ddff;
      font-size: 12px;
      color: var(--muted);
    }

    .unlocked-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    @media (max-width: 640px) {
      .unlocked-grid { grid-template-columns: 1fr; }
    }

    .mini-reveal {
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px;
      font-size: 13px;
    }

    .mini-reveal h4 {
      margin: 0 0 6px;
      font-size: 14px;
      font-weight: 800;
      color: #3b0764;
    }

    /* Paper Trick Canvas */
    .paper-preview-wrap {
      width: 100%;
      background: #faf7ff;
      border: 1.5px dashed #d8c7f5;
      border-radius: 18px;
      padding: 12px;
      text-align: center;
      margin: 14px 0;
    }

    #paperCanvas {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(31, 27, 46, 0.08);
      display: none;
    }

    /* Radar & Readout */
    .readout-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 720px) {
      .readout-grid { grid-template-columns: 1fr; }
    }

    .radar-wrap {
      display: grid;
      place-items: center;
      padding: 8px 0;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f1eafc;
      font-size: 13px;
    }

    .stat-row:last-child { border-bottom: none; }
    .stat-val { font-family: var(--mono); font-weight: 800; color: #5b21b6; }

    .hash-box {
      font-family: var(--mono);
      font-size: 11px;
      word-break: break-all;
      background: #faf5ff;
      border: 1px solid #e9d5ff;
      padding: 10px 12px;
      border-radius: 12px;
      color: #6d28d9;
      margin-top: 8px;
    }

    .hidden { display: none !important; }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="header-row">
        <div class="brand">
          <div class="brand-icon">✨</div>
          <div>
            <div class="brand-title">Tipo · Pastel Mind &amp; Paper Decoder</div>
            <div class="brand-sub">CMTE + Stylometry + Motor Kinematics</div>
          </div>
        </div>
        <div id="topStatusBanner" class="status-banner">Live passive capture active · Pick baseline or play!</div>
        <div class="live-chips">
          <span class="chip">Keys: <span id="hdrKeys">0</span></span>
          <span class="chip mint">IKI: <span id="hdrIki">--</span> ms</span>
        </div>
      </div>

      <nav class="tab-bar" role="tablist">
        <button class="tab-btn active" data-tab="profile">1. Profile</button>
        <button class="tab-btn" data-tab="games">2. 10s Games</button>
        <button class="tab-btn" data-tab="paper">3. Paper Trick</button>
        <button class="tab-btn" data-tab="readout">4. Full Readout</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <!-- TAB 1: PROFILE -->
    <section id="tab-profile" class="tab-panel active">
      <div class="card">
        <div class="live-pill"><span class="pulse-dot"></span> Live Assessment Active · Tracking Keystrokes &amp; Micro-Timing</div>
        <h1>Let's read the hidden patterns in how you move, type &amp; write.</h1>
        <p class="subcopy">
          This page is already quietly measuring your typing cadence, key-hold dwell time, pause burstiness, and selection speed.
          Pick your quick details from the easy drop-downs below, then play ultra-fast <strong>10-second games</strong> — or jump straight to the <strong>Paper Writing Trick</strong>!
        </p>

        <div class="wave-box">
          <div class="wave-head">
            <span>Live Typing &amp; Rhythm Waveform</span>
            <span id="cadenceBadge" class="chip">Listening...</span>
          </div>
          <div id="waveBars" class="wave-bars"></div>
        </div>

        <label class="field-label" for="warmupInput">Quick Warm-Up (type any sentence — gives us an instant keystroke + syntax signature!):</label>
        <textarea id="warmupInput" rows="2" placeholder="E.g. I wonder what this page can actually figure out about me..."></textarea>

        <div class="metric-strip">
          <span class="chip">Dwell: <span id="mDwell">--</span> ms</span>
          <span class="chip sky">Burstiness Bₙ: <span id="mBurst">--</span></span>
          <span class="chip rose">Self-Edit Rate: <span id="mEdit">0.0%</span></span>
          <span class="chip mint">Word Len: <span id="mWordLen">--</span></span>
        </div>
      </div>

      <div class="card">
        <div class="profile-head">
          <div>
            <h2>Quick Baseline Profile</h2>
            <p class="subcopy" style="margin:0;">Every question is a simple drop-down — takes 15 seconds.</p>
          </div>
          <span id="profileCountPill" class="chip gold">0 / 7 Selected</span>
        </div>

        <label class="field-label">1. Date of Birth</label>
        <div class="dob-grid">
          <select id="dobDay" class="profile-select"><option value="">Day</option></select>
          <select id="dobMonth" class="profile-select"><option value="">Month</option></select>
          <select id="dobYear" class="profile-select"><option value="">Year</option></select>
        </div>

        <div class="form-grid">
          <div>
            <label class="field-label" for="pGender">2. Gender</label>
            <select id="pGender" class="profile-select">
              <option value="">Select gender...</option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="pBirthplace">3. Where Were You Born?</label>
            <select id="pBirthplace" class="profile-select">
              <option value="">Select region / country...</option>
              <option>United Kingdom — England</option>
              <option>United Kingdom — Scotland</option>
              <option>United Kingdom — Wales</option>
              <option>United Kingdom — Northern Ireland</option>
              <option>Ireland</option>
              <option>United States</option>
              <option>Canada</option>
              <option>Australia / New Zealand</option>
              <option>Mainland Europe</option>
              <option>Asia</option>
              <option>Africa</option>
              <option>South America</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="pHair">4. Hair Color</label>
            <select id="pHair" class="profile-select">
              <option value="">Select hair color...</option>
              <option>Black</option>
              <option>Dark Brown</option>
              <option>Light Brown</option>
              <option>Blonde</option>
              <option>Red / Auburn</option>
              <option>Grey / White</option>
              <option>Dyed / Creative</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="pEyes">5. Eye Color</label>
            <select id="pEyes" class="profile-select">
              <option value="">Select eye color...</option>
              <option>Brown</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Hazel</option>
              <option>Grey</option>
              <option>Amber / Other</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="pHeight">6. Height</label>
            <select id="pHeight" class="profile-select">
              <option value="">Select height...</option>
              <option value="152">Under 155 cm (5'1")</option>
              <option value="159">155–162 cm (5'1"–5'4")</option>
              <option value="167">163–170 cm (5'4"–5'7")</option>
              <option value="175">171–178 cm (5'7"–5'10")</option>
              <option value="182">179–185 cm (5'10"–6'1")</option>
              <option value="190">186–193 cm (6'1"–6'4")</option>
              <option value="196">Over 193 cm (6'4"+)</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="pSiblings">7. Siblings &amp; Birth Order</label>
            <select id="pSiblings" class="profile-select">
              <option value="">Select sibling setup...</option>
              <option>Only child</option>
              <option>Oldest child</option>
              <option>Middle child</option>
              <option>Youngest child</option>
              <option>Twin / Multiple</option>
            </select>
          </div>
        </div>

        <div class="btn-row">
          <button class="btn btn-primary" onclick="switchTab('games')">Start 10-Second Micro-Games 🚀</button>
          <button class="btn btn-mint" onclick="switchTab('paper')">Jump to Paper Trick ✍️</button>
        </div>
      </div>
    </section>

    <!-- TAB 2: 10s MICRO-GAMES -->
    <section id="tab-games" class="tab-panel">
      <div class="card">
        <div class="game-header">
          <div>
            <span id="gameBadge" class="game-badge">Micro-Game #1 of 6 · ≤10s</span>
            <h2 id="gameTitle">Loading...</h2>
            <p id="gameDesc" class="subcopy" style="margin:0;"></p>
          </div>
          <div class="timer-ring-wrap">
            <svg viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="#ede9fe" stroke-width="5" />
              <circle id="timerCircle" cx="30" cy="30" r="25" fill="none" stroke="#8b5cf6" stroke-width="5"
                stroke-linecap="round" stroke-dasharray="157.08" stroke-dashoffset="0" />
            </svg>
            <div id="timerText" class="timer-ring-text">Ready</div>
          </div>
        </div>

        <div id="gameStage" class="game-stage"></div>

        <div class="game-footer">
          <button class="btn btn-soft" onclick="shuffleGame()">🔀 Shuffle Different Game</button>
          <span id="completedCounter">Completed: 0 / 6</span>
        </div>
      </div>

      <div id="activeRevealBox" class="reveal-card hidden"></div>

      <div id="unlockedSection" class="hidden">
        <label class="field-label" style="margin-bottom:10px;">Your Unlocked Reveals So Far</label>
        <div id="unlockedGrid" class="unlocked-grid"></div>
      </div>
    </section>

    <!-- TAB 3: PAPER TRICK -->
    <section id="tab-paper" class="tab-panel">
      <div class="card">
        <div class="live-pill"><span class="pulse-dot"></span> Client-Side Computer Vision + CMTE 4-Core Syntax</div>
        <h2>The Paper-Writing Mind-Reading Trick</h2>
        <p class="subcopy">
          Have someone write 3–5 natural lines on plain paper and snap a photo — or tap <strong>Try Demo Paper</strong> to test immediately.
          Tipo runs real Otsu ink thresholding, Sobel stroke-slant tensors, baseline regression, left-margin drift, and per-line ink pressure variance to box the exact line where they concentrated hardest.
        </p>

        <div class="btn-row" style="margin-top:8px;">
          <label class="btn btn-primary" style="cursor:pointer;">
            📷 Snap / Upload Handwriting Photo
            <input id="paperUpload" type="file" accept="image/*" capture="environment" style="display:none;" />
          </label>
          <button class="btn btn-mint" onclick="runDemoPaper()">✨ Try Demo Paper</button>
        </div>

        <div class="paper-preview-wrap">
          <div id="paperPlaceholder" style="color:var(--muted); font-size:13px; padding:26px 10px;">
            No handwriting sheet loaded yet. Snap a photo or tap <strong>Try Demo Paper</strong>.
          </div>
          <canvas id="paperCanvas"></canvas>
        </div>

        <label class="field-label" for="paperText">Written Text (type, dictate, or let Cloud AI transcribe automatically):</label>
        <textarea id="paperText" rows="3" placeholder="Optional: type or dictate what they wrote to fuse ink geometry with Forensic Stylometry + CMTE 4-Core syntax..."></textarea>

        <div class="btn-row" style="margin-top:12px;">
          <button class="btn btn-soft" onclick="startVoiceDictation()">🎙️ Dictate Text (UK)</button>
          <button class="btn btn-soft" onclick="reanalyzePaperText()">🔄 Fuse Local CV + Syntax</button>
          <button id="cloudReadBtn" class="btn btn-gold" onclick="runCloudPaperRead()">🔮 Deep Cloud AI Read</button>
        </div>
        <div id="cloudStatus" style="font-size:12px; color:var(--muted); margin-top:8px;"></div>
      </div>

      <div id="paperRevealBox" class="reveal-card hidden"></div>
    </section>

    <!-- TAB 4: FULL READOUT -->
    <section id="tab-readout" class="tab-panel">
      <div class="card">
        <div class="profile-head">
          <div>
            <h2>Full Mind &amp; Motor Readout</h2>
            <p class="subcopy" style="margin:0;">Deterministic telemetry fused with audit-patched CFX-BRAC load &amp; 6-axis radar.</p>
          </div>
          <button class="btn btn-soft" onclick="copyFullReadout()">📋 Copy Readout</button>
        </div>

        <div class="readout-grid">
          <div class="radar-wrap">
            <svg id="radarSvg" viewBox="0 0 320 300" width="310" height="290" aria-label="6-Axis Pastel Radar"></svg>
          </div>

          <div>
            <h3>Audit-Patched CFX-BRAC &amp; Kinematics</h3>
            <div id="readoutStats"></div>

            <div class="science-note" style="margin-top:14px;">
              <strong>Observational SHA-256 DOB Overlay (Entertainment Only):</strong>
              <div id="dobHashBox" class="hash-box">Select your Date of Birth in Tab 1 to compute your deterministic SHA-256 palette fingerprint.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Unlocked Micro-Game &amp; Paper Reveals</h3>
        <div id="readoutReveals" class="unlocked-grid" style="margin-top:12px;">
          <div class="mini-reveal">Complete micro-games in Tab 2 or run the Paper Trick in Tab 3 to populate your full dossier.</div>
        </div>
      </div>

      <div id="commercialCard" class="card" style="background:linear-gradient(135deg,#fff7ed,#fdf2f8,#f5f3ff);">
        <h3>Tipo Pro Cloud Pass (99p)</h3>
        <p class="subcopy" style="margin-bottom:12px;">
          All 6 micro-games, passive keystroke telemetry, client-side Paper CV, and the 6-axis radar run locally forever.
          Unlock 50 Gemini Vision deep handwriting &amp; subtext reads via Stripe Checkout.
        </p>
        <div class="btn-row" style="margin-top:0;">
          <button class="btn btn-gold" onclick="startStripeCheckout()">⚡ Unlock 50 Cloud Reads — £0.99</button>
          <span id="passStatusChip" class="chip mint" style="align-self:center;">Mode: Local + R&amp;D Open</span>
        </div>
      </div>
    </section>
  </main>

  <script>
    // =========================================================================
    // CONFIG — Wired to Vibecheck Supabase Project (qnnnnvlissdqdwmkgrao)
    // =========================================================================
    const CONFIG = {
      SUPABASE_FUNCTIONS_BASE: "https://qnnnnvlissdqdwmkgrao.supabase.co/functions/v1",
      TIPO_API_ENDPOINT: "https://qnnnnvlissdqdwmkgrao.supabase.co/functions/v1/tipo-api",
      CHECKOUT_ENDPOINT: "https://qnnnnvlissdqdwmkgrao.supabase.co/functions/v1/create-checkout",
      ENABLE_PAID_GATE: false // Flip to true once REQUIRE_PAID_GATE=true is enabled in Supabase Secrets
    };

    // =========================================================================
    // GLOBAL PASSIVE TELEMETRY & APP STATE
    // =========================================================================
    const state = {
      keys: 0,
      backspaces: 0,
      lastKeyTime: null,
      ikiList: [],
      dwellList: [],
      keyDownMap: new Map(),
      dropdownTimes: [],
      lastDropdownTime: null,
      profile: {
        day: "", month: "", year: "", gender: "", birthplace: "", hair: "", eyes: "", heightCm: 170, siblings: ""
      },
      reveals: {}, // keyed by game id
      scores: {
        motor: 50,
        reflex: 50,
        time: 50,
        spatial: 50,
        stroop: 50,
        syntax: 50
      },
      paperCV: null,
      paperImageBase64: null,
      paperMime: "image/jpeg",
      paperCloud: null,
      decodeSessionId: new URLSearchParams(location.search).get("session_id") || localStorage.getItem("tipo_session_id") || ""
    };

    if (state.decodeSessionId) {
      localStorage.setItem("tipo_session_id", state.decodeSessionId);
      document.getElementById("passStatusChip").textContent = "Pass Active: " + state.decodeSessionId.slice(0, 10) + "…";
    }

    // =========================================================================
    // DETERMINISTIC MATH (KIM-JO BURSTINESS + POSITIVE BRAC + STYLOMETRY)
    // =========================================================================
    function round(n, d = 2) {
      const p = 10 ** d;
      return Math.round(n * p) / p;
    }

    function clamp(n, min, max) {
      return Math.max(min, Math.min(max, n));
    }

    function mean(arr) {
      return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    }

    function stdDev(arr) {
      if (arr.length < 2) return 0;
      const m = mean(arr);
      return Math.sqrt(arr.reduce((a, v) => a + (v - m) ** 2, 0) / (arr.length - 1));
    }

    // Audit-verified Kim-Jo finite-sample burstiness B_n
    function kimJoBurstiness(intervals) {
      const x = intervals.filter(v => Number.isFinite(v) && v > 0);
      const n = x.length;
      if (n < 2) return null;
      const mu = mean(x);
      const sd = stdDev(x);
      if (mu + sd === 0) return 0;
      const r = sd / mu;
      const num = Math.sqrt(n + 1) * r - Math.sqrt(n - 1);
      const den = (Math.sqrt(n + 1) - 2) * r + Math.sqrt(n - 1);
      if (Math.abs(den) < 1e-12) return 0;
      return clamp(num / den, -1, 1);
    }

    // Audit-patched positive BRAC ultradian scaling (strictly > 0)
    function computeCfxBrac() {
      const now = new Date();
      const mins = now.getHours() * 60 + now.getMinutes();
      const phase = (mins % 90) / 90;
      const bracScale = 1.0 + 0.12 * Math.sin(2 * Math.PI * phase); // [0.88, 1.12]
      const bn = kimJoBurstiness(state.ikiList);
      const editRate = state.keys > 0 ? state.backspaces / state.keys : 0;
      const avgIki = state.ikiList.length ? mean(state.ikiList) : 220;
      const rawLoad = 38 + clamp((avgIki - 140) / 8, -15, 28) + editRate * 85 + (bn !== null ? Math.max(0, bn) * 20 : 0);
      const score = Math.round(clamp(rawLoad * bracScale, 12, 98));
      return { score, bracScale: round(bracScale, 3), phasePct: Math.round(phase * 100), bn };
    }

    // Forensic Stylometry + CMTE 4-Core Engine
    function analyzeSyntaxCMTE(rawText) {
      const text = (rawText || "").trim();
      if (!text) {
        return { words: 0, meanWlen: 0, ttr: 0, wPerS: 0, hedges: 0, modals: 0, p1: 0, p2: 0, cmtePrecision: 0, cmteNesting: 0, cmteAffect: 0, cmteLoad: 0 };
      }
      const words = text.replace(/[\u2018\u2019]/g, "'").match(/[A-Za-z0-9'£$€]+/g) || [];
      const wCnt = words.length;
      const meanWlen = wCnt ? words.reduce((a, w) => a + w.length, 0) / wCnt : 0;
      const uniqueCnt = new Set(words.map(w => w.toLowerCase())).size;
      const ttr = wCnt ? uniqueCnt / wCnt : 0;
      const sents = text.split(/[.!?\n]+/).map(s => s.trim()).filter(Boolean);
      const wPerS = wCnt / Math.max(1, sents.length);
      const hedges = (text.match(/\b(maybe|perhaps|sort of|kind of|probably|might|i guess|i think|just|possibly|seem|seems)\b/gi) || []).length;
      const modals = (text.match(/\b(would|could|should|wondered|ideally|whenever|appreciate)\b/gi) || []).length;
      const p1 = (text.match(/\b(i|me|my|mine|myself|i'm|i've|i'd|i'll)\b/gi) || []).length;
      const p2 = (text.match(/\b(you|your|yours|yourself|you're|you've)\b/gi) || []).length;
      const commas = (text.match(/[,;:—–()]/g) || []).length;
      const excls = (text.match(/!/g) || []).length;

      const cmtePrecision = round(clamp((meanWlen / 6.2) * 0.55 + ttr * 0.45, 0, 1), 2);
      const cmteNesting = round(clamp((wPerS / 22) * 0.65 + (commas / Math.max(1, sents.length)) * 0.35, 0, 1), 2);
      const cmteAffect = round(clamp(1 - (excls * 0.12 + hedges * 0.08), 0.15, 1), 2);
      const cmteLoad = round(clamp(cmtePrecision * 0.4 + cmteNesting * 0.4 + (hedges / Math.max(1, wCnt)) * 2.5, 0, 1), 2);

      return { words: wCnt, meanWlen: round(meanWlen, 2), ttr: round(ttr, 2), wPerS: round(wPerS, 1), hedges, modals, p1, p2, cmtePrecision, cmteNesting, cmteAffect, cmteLoad };
    }

    // =========================================================================
    // WAVEFORM & PASSIVE KEYSTROKE TRACKING
    // =========================================================================
    const waveBarsEl = document.getElementById("waveBars");
    const WAVE_COUNT = 34;
    const waveColors = ["#f472b6", "#e879f9", "#c084fc", "#a78bfa", "#818cf8", "#60a5fa", "#38bdf8", "#2dd4bf", "#34d399"];
    const waveBars = [];
    for (let i = 0; i < WAVE_COUNT; i++) {
      const b = document.createElement("div");
      b.className = "wave-bar";
      b.style.background = waveColors[Math.floor((i / WAVE_COUNT) * waveColors.length)];
      b.style.height = (8 + Math.sin(i * 0.6) * 4) + "px";
      waveBarsEl.appendChild(b);
      waveBars.push(b);
    }

    function pulseWaveform(intensity = 1) {
      for (let i = 0; i < waveBars.length; i++) {
        const wave = Math.sin((Date.now() / 160) + i * 0.45) * 0.5 + 0.5;
        const h = clamp(8 + wave * 28 * intensity + Math.random() * 8 * intensity, 6, 42);
        waveBars[i].style.height = h.toFixed(0) + "px";
      }
    }

    setInterval(() => pulseWaveform(0.28), 320);

    function recordKeyEvent(isBackspace = false, code = "") {
      const now = performance.now();
      state.keys++;
      if (isBackspace) state.backspaces++;
      if (state.lastKeyTime !== null) {
        const iki = now - state.lastKeyTime;
        if (iki >= 20 && iki <= 4000) {
          state.ikiList.push(iki);
          if (state.ikiList.length > 200) state.ikiList.shift();
        }
      }
      state.lastKeyTime = now;
      if (code) state.keyDownMap.set(code, now);
      pulseWaveform(1.1);
      updateLiveMetricsUI();
    }

    window.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      // Ignore mobile IME 229 here (handled cleanly in beforeinput below)
      if (e.key === "Unidentified" || e.keyCode === 229) return;
      recordKeyEvent(e.key === "Backspace" || e.key === "Delete", e.code || e.key);
    });

    window.addEventListener("keyup", (e) => {
      const code = e.code || e.key;
      if (state.keyDownMap.has(code)) {
        const d = performance.now() - state.keyDownMap.get(code);
        state.keyDownMap.delete(code);
        if (d >= 8 && d <= 900) {
          state.dwellList.push(d);
          if (state.dwellList.length > 200) state.dwellList.shift();
          updateLiveMetricsUI();
        }
      }
    });

    // Android / Tablet Virtual Keyboard fallback
    document.addEventListener("beforeinput", (e) => {
      if (e.inputType && (e.inputType.startsWith("delete") || e.inputType === "insertText")) {
        const now = performance.now();
        if (state.lastKeyTime === null || (now - state.lastKeyTime) > 16) {
          recordKeyEvent(e.inputType.startsWith("delete"));
        }
      }
    });

    document.getElementById("warmupInput").addEventListener("input", () => updateLiveMetricsUI());

    function updateLiveMetricsUI() {
      document.getElementById("hdrKeys").textContent = state.keys;
      const avgIki = state.ikiList.length ? Math.round(mean(state.ikiList)) : null;
      document.getElementById("hdrIki").textContent = avgIki !== null ? avgIki : "--";

      const avgDwell = state.dwellList.length ? Math.round(mean(state.dwellList)) : null;
      document.getElementById("mDwell").textContent = avgDwell !== null ? avgDwell : "--";

      const bn = kimJoBurstiness(state.ikiList);
      document.getElementById("mBurst").textContent = bn !== null ? round(bn, 2).toFixed(2) : "--";

      const editPct = state.keys > 0 ? round((state.backspaces / state.keys) * 100, 1) : 0;
      document.getElementById("mEdit").textContent = editPct.toFixed(1) + "%";

      const warmupText = document.getElementById("warmupInput").value;
      const syn = analyzeSyntaxCMTE(warmupText);
      document.getElementById("mWordLen").textContent = syn.words > 0 ? syn.meanWlen.toFixed(2) : "--";
      if (syn.words >= 3) {
        state.scores.syntax = Math.round(clamp(syn.cmtePrecision * 100, 25, 98));
      }

      const badge = document.getElementById("cadenceBadge");
      if (state.ikiList.length < 3) {
        badge.textContent = "Listening...";
      } else if (bn !== null && bn > 0.25) {
        badge.textContent = "Bursty Sprint Cadence";
      } else if (avgIki < 175) {
        badge.textContent = "High-Velocity Flow";
      } else {
        badge.textContent = "Steady Rhythmic Cadence";
      }
    }

    // =========================================================================
    // PROFILE DROPDOWNS & TAB NAVIGATION
    // =========================================================================
    (function populateDOB() {
      const daySel = document.getElementById("dobDay");
      for (let d = 1; d <= 31; d++) daySel.add(new Option(d, d));
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const monSel = document.getElementById("dobMonth");
      months.forEach((m, idx) => monSel.add(new Option(m, idx + 1)));
      const yrSel = document.getElementById("dobYear");
      for (let y = 2014; y >= 1930; y--) yrSel.add(new Option(y, y));
    })();

    document.querySelectorAll(".profile-select").forEach(sel => {
      sel.addEventListener("change", () => {
        const now = performance.now();
        if (state.lastDropdownTime !== null) {
          const dt = now - state.lastDropdownTime;
          if (dt > 120 && dt < 20000) state.dropdownTimes.push(dt);
        }
        state.lastDropdownTime = now;
        pulseWaveform(0.9);
        syncProfile();
      });
    });

    function syncProfile() {
      const p = state.profile;
      p.day = document.getElementById("dobDay").value;
      p.month = document.getElementById("dobMonth").value;
      p.year = document.getElementById("dobYear").value;
      p.gender = document.getElementById("pGender").value;
      p.birthplace = document.getElementById("pBirthplace").value;
      p.hair = document.getElementById("pHair").value;
      p.eyes = document.getElementById("pEyes").value;
      const hVal = Number(document.getElementById("pHeight").value);
      p.heightCm = hVal || 170;
      p.siblings = document.getElementById("pSiblings").value;

      let count = 0;
      if (p.day && p.month && p.year) count++;
      if (p.gender) count++;
      if (p.birthplace) count++;
      if (p.hair) count++;
      if (p.eyes) count++;
      if (hVal) count++;
      if (p.siblings) count++;

      const pill = document.getElementById("profileCountPill");
      pill.textContent = `${count} / 7 Selected`;
      pill.className = count === 7 ? "chip mint" : "chip gold";

      if (count >= 3) {
        document.getElementById("topStatusBanner").textContent = "Baseline locked! Ready for your 10-second games ✨";
      }
      updateDobHash();
    }

    async function updateDobHash() {
      const p = state.profile;
      const box = document.getElementById("dobHashBox");
      if (!p.day || !p.month || !p.year) return;
      const seed = `${p.year}-${String(p.month).padStart(2,"0")}-${String(p.day).padStart(2,"0")}|${p.birthplace || "earth"}`;
      try {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(seed));
        const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
        const hue = parseInt(hex.slice(0, 4), 16) % 360;
        const archetypes = ["Quiet Architect", "Kinetic Catalyst", "Pattern Cartographer", "Signal Synthesizer", "Precision Weaver", "Calm Strategist"];
        const arch = archetypes[parseInt(hex.slice(4, 6), 16) % archetypes.length];
        box.innerHTML = `<div><strong>SHA-256 Seed:</strong> ${hex.slice(0, 32)}…</div>
          <div style="margin-top:4px;"><strong>Pastel Signature:</strong> <span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:hsl(${hue},75%,72%);vertical-align:middle;"></span> Hue ${hue}° · Archetype Tag: <strong>${arch}</strong> (non-empirical cryptographic hash)</div>`;
      } catch {
        box.textContent = "Seed locked: " + seed;
      }
    }

    function switchTab(name) {
      cleanupActiveGame();
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "tab-" + name));
      if (name === "games" && !currentGameId) {
        loadGame(GAME_ORDER[0]);
      }
      if (name === "readout") {
        renderReadout();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    // =========================================================================
    // TAB 2: SIX RANDOMIZED ≤10-SECOND MICRO-GAMES
    // =========================================================================
    const GAME_ORDER = ["mirage", "ribbon", "reflex", "metronome", "stroop", "scribe"];
    let currentGameId = null;
    let activeTimers = [];
    let activeCleanupFns = [];

    function cleanupActiveGame() {
      activeTimers.forEach(t => { clearInterval(t); clearTimeout(t); });
      activeTimers = [];
      activeCleanupFns.forEach(fn => { try { fn(); } catch {} });
      activeCleanupFns = [];
    }

    function setTimerRing(remainingSec, totalSec, labelOverride = null) {
      const circle = document.getElementById("timerCircle");
      const text = document.getElementById("timerText");
      const circ = 157.08;
      const ratio = totalSec > 0 ? clamp(remainingSec / totalSec, 0, 1) : 1;
      circle.style.strokeDashoffset = (circ * (1 - ratio)).toFixed(2);
      text.textContent = labelOverride !== null ? labelOverride : `${remainingSec.toFixed(1)}s`;
    }

    function startCountdown(totalSec, onFinish) {
      const start = performance.now();
      setTimerRing(totalSec, totalSec);
      const id = setInterval(() => {
        const elapsed = (performance.now() - start) / 1000;
        const rem = Math.max(0, totalSec - elapsed);
        setTimerRing(rem, totalSec);
        if (rem <= 0) {
          clearInterval(id);
          onFinish();
        }
      }, 60);
      activeTimers.push(id);
      return id;
    }

    function shuffleGame() {
      const unplayed = GAME_ORDER.filter(id => !state.reveals[id] && id !== currentGameId);
      const pool = unplayed.length ? unplayed : GAME_ORDER.filter(id => id !== currentGameId);
      const pick = pool[Math.floor(Math.random() * pool.length)];
      loadGame(pick);
    }

    function saveReveal(gameId, data) {
      state.reveals[gameId] = data;
      const done = Object.keys(state.reveals).length;
      document.getElementById("completedCounter").textContent = `Completed: ${done} / 6`;

      const box = document.getElementById("activeRevealBox");
      box.classList.remove("hidden");
      box.innerHTML = `
        <div class="reveal-tag">✨ Measured Reveal</div>
        <h2 style="margin-bottom:8px;">${data.headline}</h2>
        <p style="margin:0 0 12px; font-size:14px;">${data.body}</p>
        <div class="metric-strip" style="margin-top:0;">
          ${data.pills.map((p, i) => `<span class="chip ${["","mint","sky","rose"][i % 4]}">${p}</span>`).join("")}
        </div>
        <div class="science-note"><strong>Why this is actually determinable:</strong> ${data.science}</div>
        <div class="btn-row">
          <button class="btn btn-primary" onclick="shuffleGame()">Next Random 10s Game →</button>
          <button class="btn btn-mint" onclick="switchTab('paper')">Try Paper Writing Trick ✍️</button>
        </div>
      `;

      renderUnlockedGrid();
    }

    function renderUnlockedGrid() {
      const entries = Object.values(state.reveals);
      const sec = document.getElementById("unlockedSection");
      const grid = document.getElementById("unlockedGrid");
      if (!entries.length) { sec.classList.add("hidden"); return; }
      sec.classList.remove("hidden");
      grid.innerHTML = entries.map(r => `
        <div class="mini-reveal">
          <h4>${r.headline}</h4>
          <p style="margin:0; color:var(--muted);">${r.body}</p>
        </div>
      `).join("");
    }

    function loadGame(gameId) {
      cleanupActiveGame();
      currentGameId = gameId;
      document.getElementById("activeRevealBox").classList.add("hidden");
      const idx = GAME_ORDER.indexOf(gameId) + 1;
      document.getElementById("gameBadge").textContent = `Micro-Game #${idx} of 6 · ≤10s`;
      const stage = document.getElementById("gameStage");
      stage.innerHTML = "";
      setTimerRing(1, 1, "Ready");

      if (gameId === "mirage") initTimeMirage(stage);
      else if (gameId === "ribbon") initBiasRibbon(stage);
      else if (gameId === "reflex") initReflexGame(stage);
      else if (gameId === "metronome") initMetronome(stage);
      else if (gameId === "stroop") initStroop(stage);
      else if (gameId === "scribe") initMicroScribe(stage);
    }

    // --- GAME 1: THE 4-SECOND TIME MIRAGE (Fixed Pointer Capture) ---
    function initTimeMirage(stage) {
      document.getElementById("gameTitle").textContent = "The 4-Second Time Mirage";
      document.getElementById("gameDesc").textContent = "Press & HOLD the pastel cloud (or Spacebar), then release when you FEEL exactly 4.0 seconds have passed. Don't count numbers — feel it!";

      stage.innerHTML = `
        <button id="holdCloud" class="hold-cloud">HOLD FOR 4 SECONDS</button>
        <div id="mirageHint" style="font-size:12px; color:var(--muted);">Timer is hidden while you hold so we can measure your raw internal clock.</div>
      `;

      const btn = document.getElementById("holdCloud");
      const hint = document.getElementById("mirageHint");
      let holding = false;
      let finished = false;
      let startTs = 0;

      function beginHold(e) {
        if (finished || holding) return;
        if (e) e.preventDefault();
        holding = true;
        startTs = performance.now();
        btn.classList.add("holding");
        btn.textContent = "FEELING TIME... RELEASE AT 4s";
        setTimerRing(0.5, 1, "Hold");
        if (e && e.pointerId !== undefined && btn.setPointerCapture) {
          try { btn.setPointerCapture(e.pointerId); } catch {}
        }
      }

      function endHold(e) {
        if (!holding || finished) return;
        if (e) e.preventDefault();
        holding = false;
        finished = true;
        const heldSec = Math.max(0.25, (performance.now() - startTs) / 1000);
        btn.classList.remove("holding");
        btn.textContent = `Held for ${heldSec.toFixed(2)}s`;
        hint.textContent = `You held for ${heldSec.toFixed(2)} seconds!`;
        setTimerRing(0, 1, "Done");

        const clockRatio = 4.0 / heldSec;
        const queueFeel = clamp(10 * clockRatio, 1.5, 28);
        const err = Math.abs(heldSec - 4.0);
        state.scores.time = Math.round(clamp(100 - err * 24, 22, 99));

        let headline, body;
        if (heldSec > 4.4) {
          headline = `Time-Compressor Brain: A 10-Minute Wait Only Feels Like ${queueFeel.toFixed(1)} Minutes!`;
          body = `You released at ${heldSec.toFixed(2)} seconds (+${(heldSec - 4).toFixed(2)}s from 4.00s). Releasing late reveals time-compression — your internal clock ticks gently, which makes you naturally prone to losing track of time when absorbed in something interesting.`;
        } else if (heldSec < 3.6) {
          headline = `Time-Expander Brain: A 10-Minute Wait Feels Like ${queueFeel.toFixed(1)} Minutes!`;
          body = `You released at ${heldSec.toFixed(2)} seconds (${(heldSec - 4).toFixed(2)}s early). Early release indicates a faster internal pacemaker — you spot micro-delays quickly and feel impatient in slow queues.`;
        } else {
          headline = `Atomic-Clock Timekeeper (Only ${(err * 1000).toFixed(0)} ms Off!)`;
          body = `You released at ${heldSec.toFixed(2)} seconds — remarkably close to a true 4.00s span. Your internal pacemaker stays tightly synchronized with objective wall time.`;
        }

        saveReveal("mirage", {
          headline,
          body,
          pills: [`Hold: ${heldSec.toFixed(2)}s`, `Clock Ratio: ${clockRatio.toFixed(2)}x`, `10m Queue ≈ ${queueFeel.toFixed(1)}m`],
          science: "Interval psychophysics (Gibbon's Scalar Expectancy Theory): prospective time production tasks directly measure the speed of an individual's internal dopaminergic pacemaker."
        });
      }

      const onCtx = e => e.preventDefault();
      const onKeyDown = e => { if (e.code === "Space" && !e.repeat) beginHold(e); };
      const onKeyUp = e => { if (e.code === "Space") endHold(e); };

      btn.addEventListener("pointerdown", beginHold);
      btn.addEventListener("contextmenu", onCtx);
      window.addEventListener("pointerup", endHold);
      window.addEventListener("pointercancel", endHold);
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);

      activeCleanupFns.push(() => {
        window.removeEventListener("pointerup", endHold);
        window.removeEventListener("pointercancel", endHold);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      });
    }

    // --- GAME 2: THE HIDDEN BIAS RIBBON (Line Bisection Pseudoneglect) ---
    function initBiasRibbon(stage) {
      document.getElementById("gameTitle").textContent = "The Hidden Bias Ribbon";
      document.getElementById("gameDesc").textContent = "Tap the EXACT visual center of each pastel bar as quickly as you can! (4 quick rounds — 8s starts on first tap)";

      const widths = [88, 74, 92, 80];
      const offsets = [0, 12, -10, 6];
      let roundIdx = 0;
      let started = false;
      let finished = false;
      const skews = [];

      function renderBar() {
        const w = widths[roundIdx];
        const ml = offsets[roundIdx];
        stage.innerHTML = `
          <div style="font-size:13px; font-weight:700; color:#5b21b6;">Bar ${roundIdx + 1} of 4 — Tap the EXACT middle!</div>
          <div class="ribbon-track" style="justify-content:center;">
            <div id="ribbonBar" class="ribbon-bar" style="width:${w}%; transform:translateX(${ml}px);"></div>
          </div>
          <div style="font-size:12px; color:var(--muted);">Trust your first visual glance — don't measure with fingers!</div>
        `;
        const bar = document.getElementById("ribbonBar");
        bar.addEventListener("pointerdown", (e) => {
          if (finished) return;
          e.preventDefault();
          if (!started) {
            started = true;
            startCountdown(8.0, () => { if (!finished) finishRibbon(); });
          }
          const rect = bar.getBoundingClientRect();
          const relX = clamp((e.clientX - rect.left) / rect.width, 0, 1);
          const skewPct = (relX - 0.5) * 100;
          skews.push(skewPct);

          const mark = document.createElement("div");
          mark.className = "ribbon-mark";
          mark.style.left = (relX * 100) + "%";
          bar.appendChild(mark);

          roundIdx++;
          if (roundIdx >= 4) {
            setTimeout(finishRibbon, 180);
          } else {
            setTimeout(renderBar, 160);
          }
        });
      }

      function finishRibbon() {
        if (finished) return;
        finished = true;
        cleanupActiveGame();
        setTimerRing(0, 8, "Done");
        const avgSkew = skews.length ? mean(skews) : 0;
        const absSkew = Math.abs(avgSkew);
        stage.innerHTML = `<div style="font-weight:800; color:#5b21b6;">Measured spatial skew: ${avgSkew.toFixed(2)}%</div>`;
        state.scores.spatial = Math.round(clamp(100 - absSkew * 12, 30, 99));

        let headline, body, focusTag;
        if (absSkew <= 1.2) {
          headline = `Laser-Calibrated Spatial Symmetry (${absSkew.toFixed(1)}% Deviation!)`;
          body = `Across ${skews.length} midpoints, your average error from true geometric center was just ${absSkew.toFixed(2)}% — showing unusually balanced bilateral parietal attention. You likely spot crooked picture frames, furniture alignment, and cuts without a ruler far better than average.`;
          focusTag = "DEAD-CENTER";
        } else if (avgSkew < -1.2) {
          headline = `Classic Right-Parietal 'Pseudoneglect' (${absSkew.toFixed(1)}% Left Skew)`;
          body = `Even when aiming for dead center, your brain pulled ${absSkew.toFixed(1)}% to the LEFT. That's classic right-hemisphere spatial dominance: your eyes unconsciously overweight the left visual hemifield — meaning when you open a menu, website, or bookshelf, you systematically anchor on the upper-left zone first.`;
          focusTag = "LEFT-ANCHORED";
        } else {
          headline = `Rightward Spatial Anchor (${absSkew.toFixed(1)}% Right Skew)`;
          body = `Your midpoints pulled ${absSkew.toFixed(1)}% to the RIGHT of true geometric center. That rightward bias suggests stronger left-hemisphere analytical scanning and a habit of sweeping toward the action/right side of a layout.`;
          focusTag = "RIGHT-ANCHORED";
        }

        saveReveal("ribbon", {
          headline,
          body,
          pills: [`Mean Skew: ${avgSkew.toFixed(2)}%`, `Visual Focus: ${focusTag}`, `Rounds: ${skews.length}`],
          science: "The Landmark / Line Bisection task is a classic cognitive neuroscience probe for hemispheric spatial attention ('pseudoneglect'; Jewell & McCourt 2000), revealing subtle right- vs left-parietal balance."
        });
      }

      renderBar();
    }

    // --- GAME 3: BLINK-OF-AN-EYE REFLEX (Go / No-Go + 70mph + Height Axon Scaling) ---
    function initReflexGame(stage) {
      document.getElementById("gameTitle").textContent = "Blink-of-an-Eye Reflex";
      document.getElementById("gameDesc").textContent = "Tap ONLY when the orb flashes MINT GREEN ('GO!'). Freeze if it flashes CORAL ('WAIT!') — 9 seconds!";

      stage.innerHTML = `
        <button id="reflexOrb" class="orb-btn orb-hold"><span>TAP TO START</span><small style="font-weight:600;opacity:.9;">Watch closely</small></button>
      `;

      const orb = document.getElementById("reflexOrb");
      let phase = "idle"; // idle | wait | go | nogo | done
      let stimulusTs = 0;
      const rts = [];
      let falseStarts = 0;
      let noGoSaves = 0;
      let noGoFails = 0;
      let flashCount = 0;

      function scheduleNextFlash() {
        if (phase === "done") return;
        phase = "wait";
        orb.className = "orb-btn orb-hold";
        orb.innerHTML = `<span>HOLD...</span><small style="font-weight:600;opacity:.9;">Watch closely</small>`;
        const delay = 900 + Math.random() * 1400;
        const t = setTimeout(() => {
          if (phase === "done") return;
          flashCount++;
          const isNoGo = flashCount === 2 || (flashCount > 3 && Math.random() < 0.35);
          if (isNoGo) {
            phase = "nogo";
            orb.className = "orb-btn orb-nogo";
            orb.innerHTML = `<span>FREEZE!</span><small style="font-weight:600;">Don't tap!</small>`;
            const t2 = setTimeout(() => {
              if (phase === "nogo") {
                noGoSaves++;
                scheduleNextFlash();
              }
            }, 950);
            activeTimers.push(t2);
          } else {
            phase = "go";
            stimulusTs = performance.now();
            orb.className = "orb-btn orb-go";
            orb.innerHTML = `<span>TAP NOW!</span><small style="font-weight:700;">GO!</small>`;
          }
        }, delay);
        activeTimers.push(t);
      }

      function finishReflex() {
        if (phase === "done") return;
        phase = "done";
        cleanupActiveGame();
        setTimerRing(0, 9, "Done");
        const meanRt = rts.length ? Math.round(mean(rts)) : 420;
        stage.innerHTML = `<div style="font-weight:800; color:#5b21b6;">Reflex scan complete! Mean RT: ${meanRt} ms</div>`;

        const heightCm = state.profile.heightCm || 170;
        const axonDeltaMs = Math.round((heightCm - 170) * 0.13);
        const meters70 = (meanRt / 1000) * 31.2928;
        const feet70 = meters70 * 3.28084;
        state.scores.reflex = Math.round(clamp(115 - (meanRt - 180) * 0.16 - noGoFails * 8, 25, 99));

        const archetype = meanRt < 260 ? "Hair-Trigger Interceptor" : meanRt < 370 ? "Balanced Tactical Reflex" : "Precision Verifier";
        const axonNote = axonDeltaMs === 0
          ? `At ${heightCm} cm, your optic-to-spinal nerve path matches the 170 cm baseline.`
          : `Factoring in your selected height (${heightCm} cm), your physical optic-to-spinal nerve path ${axonDeltaMs > 0 ? "adds" : "subtracts"} roughly ${Math.abs(axonDeltaMs)} ms compared to a 170 cm baseline.`;

        saveReveal("reflex", {
          headline: `At 70 mph, You Travel ${meters70.toFixed(1)} m (${Math.round(feet70)} ft) Before Your Foot Moves`,
          body: `Your measured visual-motor reaction time is ${meanRt} ms, classifying you as a ${archetype}. ${axonNote}`,
          pills: [`Mean RT: ${meanRt} ms`, `70 mph Gap: ${meters70.toFixed(1)} m`, `False Starts: ${falseStarts}`, `No-Go Saves: ${noGoSaves}`],
          science: "Simple visual-motor reaction time (typically 220–360 ms) directly determines real-world reaction distance at highway velocity (31.3 m/s), while Go/No-Go trials measure prefrontal inhibitory gating."
        });
      }

      orb.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (phase === "idle") {
          startCountdown(9.0, finishReflex);
          scheduleNextFlash();
        } else if (phase === "go") {
          rts.push(performance.now() - stimulusTs);
          scheduleNextFlash();
        } else if (phase === "wait") {
          falseStarts++;
        } else if (phase === "nogo") {
          noGoFails++;
          scheduleNextFlash();
        }
      });
    }

    // --- GAME 4: THE INVISIBLE METRONOME (Spontaneous Motor Tempo) ---
    function initMetronome(stage) {
      document.getElementById("gameTitle").textContent = "The Invisible Metronome";
      document.getElementById("gameDesc").textContent = "Tap the pastel orb (or press Spacebar) at whatever steady rhythm feels most naturally effortless to you. Don't rush — 8s starts on your first tap!";

      stage.innerHTML = `
        <button id="metroOrb" class="orb-btn orb-metro"><span>TAP BEAT</span><small id="metroCnt" style="font-weight:600;">0 taps</small></button>
        <div style="font-size:12px; color:var(--muted);">Tap or press Space at your natural speed</div>
      `;

      const orb = document.getElementById("metroOrb");
      const cntEl = document.getElementById("metroCnt");
      const taps = [];
      let started = false;
      let finished = false;

      function registerTap(e) {
        if (finished) return;
        if (e) e.preventDefault();
        const now = performance.now();
        taps.push(now);
        cntEl.textContent = `${taps.length} tap${taps.length === 1 ? "" : "s"}`;
        pulseWaveform(1.2);
        if (!started) {
          started = true;
          startCountdown(8.0, finishMetronome);
        }
      }

      function finishMetronome() {
        if (finished) return;
        finished = true;
        cleanupActiveGame();
        setTimerRing(0, 8, "Done");

        const intervals = [];
        for (let i = 1; i < taps.length; i++) {
          const dt = taps[i] - taps[i - 1];
          if (dt >= 140 && dt <= 2400) intervals.push(dt);
        }
        const avgIti = intervals.length ? mean(intervals) : 540;
        const hz = 1000 / avgIti;
        const bpm = Math.round(60000 / avgIti);
        const cv = intervals.length >= 2 ? (stdDev(intervals) / avgIti) * 100 : 6.0;
        const strideKmh = clamp((bpm / 115) * 5.5, 3.3, 7.2);
        state.scores.motor = Math.round(clamp(96 - cv * 2.2, 35, 98));

        stage.innerHTML = `<div style="font-weight:800; color:#5b21b6;">Beat captured! (${taps.length} taps recorded)</div>`;

        saveReveal("metronome", {
          headline: `Your Hidden Internal Tempo is ${bpm} BPM (~${strideKmh.toFixed(1)} km/h Stride!)`,
          body: `Without any music playing, your nervous system settled on a spontaneous motor frequency of ${hz.toFixed(2)} Hz (${bpm} beats per minute). That locks directly to your natural unrushed walking cadence and predicts your brain clicks into effortless flow with ${Math.max(60, bpm - 10)}–${bpm + 10} BPM tracks — and your timing consistency jitter was just ${cv.toFixed(1)}%.`,
          pills: [`SMT: ${hz.toFixed(2)} Hz`, `Flow Zone: ${Math.max(60, bpm - 10)}–${bpm + 10} BPM`, `Jitter CV: ${cv.toFixed(1)}%`, `Taps: ${taps.length}`],
          science: "Sensorimotor synchronization research (McAuley et al. 2006) shows each person has a stable endogenous cerebellar/basal-ganglia oscillator ('Spontaneous Motor Tempo') that correlates strongly with natural walking frequency and preferred music tempo."
        });
      }

      const onKey = e => { if (e.code === "Space" && !e.repeat) registerTap(e); };
      orb.addEventListener("pointerdown", registerTap);
      window.addEventListener("keydown", onKey);
      activeCleanupFns.push(() => window.removeEventListener("keydown", onKey));
    }

    // --- GAME 5: SPLIT-SECOND WORD MAGNET (Stroop Interference) ---
    function initStroop(stage) {
      document.getElementById("gameTitle").textContent = "Split-Second Word Magnet";
      document.getElementById("gameDesc").textContent = "Tap the button matching the INK COLOR — ignore what the word spells! 9s starts on your first answer.";

      const palette = [
        { name: "ROSE", hex: "#e11d48", cls: "stroop-rose" },
        { name: "MINT", hex: "#059669", cls: "stroop-mint" },
        { name: "SKY",  hex: "#0284c7", cls: "stroop-sky" },
        { name: "GOLD", hex: "#d97706", cls: "stroop-gold" }
      ];

      let started = false;
      let finished = false;
      let curTrial = null;
      let trialTs = 0;
      const congRT = [];
      const incongRT = [];
      let correct = 0;
      let total = 0;

      function nextTrial() {
        const wordItem = palette[Math.floor(Math.random() * 4)];
        const isCongruent = total % 3 === 0;
        let inkItem = wordItem;
        if (!isCongruent) {
          const others = palette.filter(p => p.name !== wordItem.name);
          inkItem = others[Math.floor(Math.random() * others.length)];
        }
        curTrial = { word: wordItem.name, ink: inkItem.name, congruent: isCongruent };
        trialTs = performance.now();

        stage.innerHTML = `
          <div class="stroop-word" style="color:${inkItem.hex};">${wordItem.name}</div>
          <div class="stroop-grid">
            ${palette.map(p => `<button class="stroop-btn ${p.cls}" data-color="${p.name}">${p.name}</button>`).join("")}
          </div>
        `;
        stage.querySelectorAll(".stroop-btn").forEach(btn => {
          btn.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            if (finished) return;
            const rt = performance.now() - trialTs;
            if (!started) {
              started = true;
              startCountdown(9.0, finishStroop);
            }
            total++;
            if (btn.dataset.color === curTrial.ink) {
              correct++;
              if (curTrial.congruent) congRT.push(rt);
              else incongRT.push(rt);
            }
            nextTrial();
          });
        });
      }

      function finishStroop() {
        if (finished) return;
        finished = true;
        cleanupActiveGame();
        setTimerRing(0, 9, "Done");
        const acc = total ? Math.round((correct / total) * 100) : 100;
        const cMean = congRT.length ? mean(congRT) : 650;
        const iMean = incongRT.length ? mean(incongRT) : cMean + 90;
        const delta = Math.round(iMean - cMean);
        state.scores.stroop = Math.round(clamp(acc * 0.75 + clamp(25 - Math.max(0, delta) * 0.08, 0, 25), 25, 99));

        stage.innerHTML = `<div style="font-weight:800; color:#5b21b6;">Stroop complete! ${correct}/${total} correct (${acc}%)</div>`;

        const headline = delta <= 90
          ? `Balanced Dual-Channel Filter (${delta >= 0 ? "+" : ""}${delta} ms Stroop Cost)`
          : `Involuntary Hyper-Reader (+${delta} ms Word-Magnet Pull)`;
        const body = delta <= 90
          ? `You scored ${acc}% accuracy across ${total} trials with a compact ${delta} ms interference cost — showing a strong reading habit cleanly paired with agile executive conflict resolution.`
          : `Your reading circuit fires so automatically that mismatched words pulled your color response by +${delta} ms (${acc}% accuracy across ${total} trials) — classic hyper-automated lexical lock.`;

        saveReveal("stroop", {
          headline,
          body,
          pills: [`Accuracy: ${acc}%`, `Stroop Cost: ${delta} ms`, `Trials: ${total}`],
          science: "The Stroop Color-Word paradigm quantifies anterior cingulate conflict monitoring and automatic lexical dominance over perceptual color naming."
        });
      }

      nextTrial();
    }

    // --- GAME 6: THE 9-SECOND MICRO-SCRIBE (Fixed: Timer Starts on First Keystroke!) ---
    function initMicroScribe(stage) {
      document.getElementById("gameTitle").textContent = "The 9-Second Micro-Scribe";
      const prompts = [
        "A pigeon just stole your house keys — type your immediate reaction!",
        "You discover a secret door behind your fridge — what's inside?",
        "Your phone buzzes with a text from yourself 10 years in the future — what does it say?",
        "You can pause time for 10 seconds once a day — what's your first move?"
      ];
      const prompt = prompts[Math.floor(Math.random() * prompts.length)];
      document.getElementById("gameDesc").textContent = "Tap the box and type freely — your 9-second clock waits until your VERY FIRST keystroke!";

      stage.innerHTML = `
        <div style="font-size:14px; font-weight:700; color:#4c1d95;">${prompt}</div>
        <textarea id="scribeBox" rows="3" style="max-width:520px;" placeholder="Tap here & start typing — 9s starts on first key..."></textarea>
        <div id="scribeStatus" style="font-size:12px; color:var(--muted);">Waiting for first keystroke · Tracking flight, dwell, backspaces &amp; word register...</div>
      `;

      const box = document.getElementById("scribeBox");
      const status = document.getElementById("scribeStatus");
      let focusTs = null;
      let firstKeyTs = null;
      let started = false;
      let finished = false;
      let lastTs = null;
      const localIki = [];
      const localDwell = [];
      const localDown = new Map();
      let localKeys = 0;
      let localEdits = 0;

      box.addEventListener("focus", () => {
        if (!focusTs) focusTs = performance.now();
      });

      function onScribeInput(isDel = false) {
        if (finished) return;
        const now = performance.now();
        localKeys++;
        if (isDel) localEdits++;
        if (!started) {
          started = true;
          firstKeyTs = now;
          status.textContent = "Capturing live keystroke kinematics...";
          startCountdown(9.0, finishScribe);
        } else if (lastTs !== null) {
          const dt = now - lastTs;
          if (dt >= 20 && dt <= 3500) localIki.push(dt);
        }
        lastTs = now;
      }

      box.addEventListener("keydown", (e) => {
        if (e.repeat || e.key === "Unidentified" || e.keyCode === 229) return;
        localDown.set(e.code || e.key, performance.now());
        onScribeInput(e.key === "Backspace" || e.key === "Delete");
      });

      box.addEventListener("keyup", (e) => {
        const k = e.code || e.key;
        if (localDown.has(k)) {
          const d = performance.now() - localDown.get(k);
          localDown.delete(k);
          if (d >= 8 && d <= 900) localDwell.push(d);
        }
      });

      box.addEventListener("beforeinput", (e) => {
        if (e.inputType && (e.inputType.startsWith("delete") || e.inputType === "insertText")) {
          const now = performance.now();
          if (lastTs === null || (now - lastTs) > 16) {
            onScribeInput(e.inputType.startsWith("delete"));
          }
        }
      });

      function finishScribe() {
        if (finished) return;
        finished = true;
        cleanupActiveGame();
        box.disabled = true;
        setTimerRing(0, 9, "Done");

        const text = box.value.trim();
        const syn = analyzeSyntaxCMTE(text);
        const thinkSec = focusTs && firstKeyTs ? Math.max(0.15, (firstKeyTs - focusTs) / 1000) : 0.8;
        const avgIki = localIki.length ? Math.round(mean(localIki)) : 210;
        const avgDwell = localDwell.length ? Math.round(mean(localDwell)) : 95;
        const ftdRatio = round(avgIki / Math.max(40, avgDwell), 2);
        const editRate = localKeys ? round((localEdits / localKeys) * 100, 1) : 0;

        state.scores.syntax = Math.round(clamp(syn.cmtePrecision * 85 + (100 - editRate) * 0.15, 30, 99));
        status.textContent = `Captured ${syn.words} words · Think lag: ${Math.round(thinkSec * 1000)} ms`;

        const isPreEditor = editRate < 6.5 || thinkSec > 1.8;
        const headline = isPreEditor
          ? "Silent Pre-Editor (You Rehearse Full Phrases in Your Head Before Moving a Finger)"
          : "Kinetic Sculptor (You Think Directly Through Your Fingertips)";
        const body = `It took ${thinkSec.toFixed(2)}s after focusing to launch your first keystroke, then you typed at ${avgIki} ms between keys with ${avgDwell} ms key-press weight (flight-to-dwell ${ftdRatio}x) and a ${editRate}% mid-sentence self-edit rate. Under 9-second pressure, your average word length held at ${syn.meanWlen.toFixed(2)} letters (CMTE Precision ${syn.cmtePrecision.toFixed(2)}).`;

        saveReveal("scribe", {
          headline,
          body,
          pills: [`Think Lag: ${thinkSec.toFixed(2)}s`, `IKI: ${avgIki} ms`, `Edit Rate: ${editRate}%`, `CMTE Precision: ${syn.cmtePrecision.toFixed(2)}`],
          science: "Keystroke dynamics research (Dhakal et al. 2018 / ACM CHI) proves pre-typing pause latency, inter-key cadence, and backspace frequency reliably separate mental pre-planning from kinetic revision."
        });
      }
    }

    // =========================================================================
    // TAB 3: PAPER-WRITING MIND-READING TRICK (REAL CLIENT-SIDE CV + CLOUD AI)
    // =========================================================================
    document.getElementById("paperUpload").addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => processHandwritingImage(img, file.type || "image/jpeg");
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });

    function runDemoPaper() {
      const c = document.createElement("canvas");
      c.width = 760;
      c.height = 420;
      const ctx = c.getContext("2d");

      // Warm blank paper sheet
      ctx.fillStyle = "#faf8f3";
      ctx.fillRect(0, 0, c.width, c.height);

      // Subtle paper grain
      ctx.fillStyle = "rgba(180,170,150,0.08)";
      for (let i = 0; i < 400; i++) ctx.fillRect(Math.random() * 760, Math.random() * 420, 2, 2);

      const lines = [
        { text: "I think I left my keys near the back door", y: 88, x: 64, slope: -0.015, ink: "#2d3748", weight: "italic 27px Georgia, serif" },
        { text: "before heading out for a quick walk today.", y: 158, x: 74, slope: -0.012, ink: "#334155", weight: "italic 26px Georgia, serif" },
        { text: "Actually — wait, maybe I need to double check!", y: 234, x: 88, slope: 0.022, ink: "#0f172a", weight: "bold italic 29px Georgia, serif" },
        { text: "Either way, no rush at all, I'll sort it later.", y: 312, x: 96, slope: -0.008, ink: "#334155", weight: "italic 26px Georgia, serif" }
      ];

      lines.forEach(l => {
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.slope);
        ctx.font = l.weight;
        ctx.fillStyle = l.ink;
        ctx.fillText(l.text, 0, 0);
        ctx.restore();
      });

      document.getElementById("paperText").value = lines.map(l => l.text).join("\n");
      const img = new Image();
      img.onload = () => processHandwritingImage(img, "image/jpeg");
      img.src = c.toDataURL("image/jpeg", 0.9);
    }

    function processHandwritingImage(img, mime = "image/jpeg") {
      const canvas = document.getElementById("paperCanvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const maxW = 640;
      const scale = Math.min(1, maxW / img.width);
      const w = Math.max(120, Math.round(img.width * scale));
      const h = Math.max(120, Math.round(img.height * scale));
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      // Save compressed JPEG base64 for optional Supabase Gemini Vision cloud call
      state.paperMime = "image/jpeg";
      state.paperImageBase64 = canvas.toDataURL("image/jpeg", 0.82).replace(/^data:[^;]+;base64,/, "");

      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      const gray = new Uint8Array(w * h);
      const hist = new Int32Array(256);

      for (let i = 0, p = 0; i < d.length; i += 4, p++) {
        const g = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
        gray[p] = g;
        hist[g]++;
      }

      // 1. Otsu Automatic Thresholding
      const total = w * h;
      let sum = 0;
      for (let t = 0; t < 256; t++) sum += t * hist[t];
      let sumB = 0, wB = 0, maxVar = 0, thresh = 140;
      for (let t = 0; t < 256; t++) {
        wB += hist[t];
        if (!wB) continue;
        const wF = total - wB;
        if (!wF) break;
        sumB += t * hist[t];
        const mB = sumB / wB;
        const mF = (sum - sumB) / wF;
        const vBetween = wB * wF * (mB - mF) ** 2;
        if (vBetween > maxVar) { maxVar = vBetween; thresh = t; }
      }
      thresh = clamp(thresh, 60, 215);

      const inkMask = new Uint8Array(w * h);
      const rowCounts = new Int32Array(h);
      let inkPixels = 0;

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = y * w + x;
          if (gray[idx] < thresh) {
            inkMask[idx] = 1;
            rowCounts[y]++;
            inkPixels++;
          }
        }
      }

      // 2. Sobel 3x3 Stroke-Slant Structure Tensor
      let jxx = 0, jyy = 0, jxy = 0;
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = y * w + x;
          if (!inkMask[idx]) continue;
          const gx =
            -gray[(y - 1) * w + (x - 1)] + gray[(y - 1) * w + (x + 1)]
            - 2 * gray[y * w + (x - 1)] + 2 * gray[y * w + (x + 1)]
            - gray[(y + 1) * w + (x - 1)] + gray[(y + 1) * w + (x + 1)];
          const gy =
            -gray[(y - 1) * w + (x - 1)] - 2 * gray[(y - 1) * w + x] - gray[(y - 1) * w + (x + 1)]
            + gray[(y + 1) * w + (x - 1)] + 2 * gray[(y + 1) * w + x] + gray[(y + 1) * w + (x + 1)];
          jxx += gx * gx;
          jyy += gy * gy;
          jxy += gx * gy;
        }
      }
      const gradAngleRad = 0.5 * Math.atan2(2 * jxy, jxx - jyy);
      // Convert gradient orientation to stroke slant relative to vertical
      let slantDeg = (gradAngleRad * 180) / Math.PI;
      if (slantDeg > 45) slantDeg -= 90;
      if (slantDeg < -45) slantDeg += 90;

      // 3. Horizontal Projection Line Segmentation
      const minRowInk = Math.max(3, Math.floor(w * 0.008));
      const lines = [];
      let inLine = false, yStart = 0;
      for (let y = 2; y < h - 2; y++) {
        if (!inLine && rowCounts[y] >= minRowInk) {
          inLine = true;
          yStart = y;
        } else if (inLine && rowCounts[y] < minRowInk) {
          if (y - yStart >= 8) lines.push({ y0: yStart, y1: y });
          inLine = false;
        }
      }
      if (inLine && (h - 2 - yStart) >= 8) lines.push({ y0: yStart, y1: h - 2 });

      // 4. Per-Line Pressure/Darkness Variance, Baseline Regression & Left-Margin Drift
      let peakLineIdx = 0;
      let peakScore = -1;
      const lineStats = lines.map((ln, idx) => {
        let minX = w, maxX = 0, sumDark = 0, sumDarkSq = 0, cnt = 0;
        let sx = 0, sy = 0, sxx = 0, sxy = 0;
        for (let y = ln.y0; y <= ln.y1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const p = y * w + x;
            if (!inkMask[p]) continue;
            const dark = 255 - gray[p];
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            sumDark += dark;
            sumDarkSq += dark * dark;
            sx += x; sy += y; sxx += x * x; sxy += x * y;
            cnt++;
          }
        }
        const meanDark = cnt ? sumDark / cnt : 0;
        const darkVar = cnt ? Math.max(0, (sumDarkSq / cnt) - meanDark ** 2) : 0;
        const den = cnt * sxx - sx * sx;
        const slope = Math.abs(den) > 1e-6 ? (cnt * sxy - sx * sy) / den : 0; // + = descending, - = ascending
        const density = cnt / Math.max(1, (ln.y1 - ln.y0 + 1) * Math.max(1, maxX - minX + 1));
        const focusScore = meanDark * 0.55 + Math.sqrt(darkVar) * 0.9 + density * 90;
        if (focusScore > peakScore) { peakScore = focusScore; peakLineIdx = idx; }
        return { idx: idx + 1, ...ln, minX, maxX, meanDark: round(meanDark, 1), darkVar: round(darkVar, 1), slopeDeg: round(-Math.atan(slope) * 180 / Math.PI, 2), focusScore: round(focusScore, 1) };
      });

      let marginDriftPx = 0;
      if (lineStats.length >= 2) {
        marginDriftPx = lineStats[lineStats.length - 1].minX - lineStats[0].minX;
      }
      const meanSlopeDeg = lineStats.length ? round(mean(lineStats.map(l => l.slopeDeg)), 2) : 0;
      const inkCoverage = round(inkPixels / total, 4);

      // Draw Peak Concentration Bounding Box on Canvas
      const peak = lineStats[peakLineIdx];
      if (peak) {
        const padX = 10, padY = 6;
        const bx = Math.max(4, peak.minX - padX);
        const by = Math.max(4, peak.y0 - padY);
        const bw = Math.min(w - bx - 4, (peak.maxX - peak.minX) + padX * 2);
        const bh = Math.min(h - by - 4, (peak.y1 - peak.y0) + padY * 2);

        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 3;
        ctx.strokeRect(bx, by, bw, bh);
        ctx.fillStyle = "rgba(236, 72, 153, 0.12)";
        ctx.fillRect(bx, by, bw, bh);

        const tag = `PEAK FOCUS · LINE #${peak.idx}`;
        ctx.font = "bold 12px sans-serif";
        const tw = ctx.measureText(tag).width + 14;
        const ty = by > 24 ? by - 22 : by + bh + 4;
        ctx.fillStyle = "#ec4899";
        ctx.fillRect(bx, ty, tw, 20);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(tag, bx + 7, ty + 14);
      }

      document.getElementById("paperPlaceholder").style.display = "none";
      canvas.style.display = "inline-block";

      state.paperCV = {
        width: w,
        height: h,
        otsuThreshold: thresh,
        inkCoverageRatio: inkCoverage,
        slantDeg: round(slantDeg, 1),
        meanSlopeDeg,
        marginDriftPx,
        lineCount: lineStats.length,
        peakLine: peak || null
      };

      renderPaperReveal();
    }

    function reanalyzePaperText() {
      if (!state.paperCV) {
        alert("Snap a handwriting photo or tap 'Try Demo Paper' first!");
        return;
      }
      renderPaperReveal();
    }

    function renderPaperReveal() {
      const cv = state.paperCV;
      if (!cv) return;
      const text = document.getElementById("paperText").value.trim();
      const syn = analyzeSyntaxCMTE(text);
      if (syn.words >= 3) state.scores.syntax = Math.round(clamp(syn.cmtePrecision * 100, 30, 99));

      const slantDesc = cv.slantDeg > 6 ? "rightward expressive lean" : cv.slantDeg < -6 ? "leftward guarded slant" : "upright analytical stroke control";
      const marginDesc = cv.marginDriftPx > 10 ? "widening left margin (accelerating momentum)" : cv.marginDriftPx < -10 ? "tightening left margin (pulling back/cautious)" : "anchored vertical left margin";
      const slopeDesc = cv.meanSlopeDeg > 1.2 ? "ascending baseline (upward energy)" : cv.meanSlopeDeg < -1.2 ? "descending baseline (deliberate weight/fatigue)" : "level controlled baseline";

      const box = document.getElementById("paperRevealBox");
      box.classList.remove("hidden");

      const cloudBlock = state.paperCloud ? `
        <div class="science-note" style="background:#fff; border-color:#fbcfe8; margin-top:12px;">
          <strong>🔮 Cloud Gemini Vision Read (${state.paperCloud.meta?.llm_model || "live"}):</strong>
          <p style="margin:6px 0 4px; color:var(--text);">${state.paperCloud.executive_read || ""}</p>
          ${state.paperCloud.handwriting_transcription ? `<div style="font-size:12px; color:#5b21b6;"><strong>Transcribed:</strong> "${state.paperCloud.handwriting_transcription}"</div>` : ""}
        </div>
      ` : "";

      const peakTitle = cv.peakLine
        ? `Peak Cognitive Concentration Locked on Line #${cv.peakLine.idx} of ${cv.lineCount}!`
        : `Handwriting Ink Geometry Analyzed (${(cv.inkCoverageRatio * 100).toFixed(1)}% Coverage)`;

      const syntaxLine = syn.words > 0
        ? `Fused with ${syn.words} written words: CMTE Precision ${syn.cmtePrecision}, Nesting ${syn.cmteNesting}, Affective Stability ${syn.cmteAffect}, Hedges ${syn.hedges}, Self-Reference (1st-person) ${syn.p1}.`
        : `Add or dictate the handwritten text (or tap Deep Cloud AI Read) to fuse this ink geometry with CMTE 4-Core syntax.`;

      box.innerHTML = `
        <div class="reveal-tag">✍️ Paper Trick Reveal</div>
        <h2>${peakTitle}</h2>
        <p style="margin:0 0 10px; font-size:14px;">
          Otsu thresholding (T=${cv.otsuThreshold}) and Sobel stroke tensors detected a <strong>${slantDesc}</strong> (${cv.slantDeg}°),
          a <strong>${slopeDesc}</strong> (${cv.meanSlopeDeg}°), and a <strong>${marginDesc}</strong> (${cv.marginDriftPx > 0 ? "+" : ""}${cv.marginDriftPx}px).
          ${cv.peakLine ? `Line #${cv.peakLine.idx} showed the sharpest ink darkness &amp; pressure variance (score ${cv.peakLine.focusScore}), boxed in rose above.` : ""}
        </p>
        <p style="margin:0 0 12px; font-size:13px; color:#4c1d95;"><strong>Stylometry + CMTE Fusion:</strong> ${syntaxLine}</p>
        <div class="metric-strip" style="margin-top:0;">
          <span class="chip">Otsu T: ${cv.otsuThreshold}</span>
          <span class="chip rose">Slant: ${cv.slantDeg}°</span>
          <span class="chip sky">Baseline: ${cv.meanSlopeDeg}°</span>
          <span class="chip mint">Margin Drift: ${cv.marginDriftPx}px</span>
          <span class="chip gold">Ink: ${(cv.inkCoverageRatio * 100).toFixed(2)}%</span>
        </div>
        ${cloudBlock}
      `;
    }

    function startVoiceDictation() {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) {
        alert("Voice dictation isn't supported in this browser — type directly or use keyboard dictation.");
        return;
      }
      const rec = new SR();
      rec.lang = "en-GB";
      rec.interimResults = false;
      rec.onresult = (ev) => {
        const transcript = ev.results[0][0].transcript;
        const box = document.getElementById("paperText");
        box.value = (box.value ? box.value + "\n" : "") + transcript;
        if (state.paperCV) renderPaperReveal();
      };
      rec.start();
    }

    async function runCloudPaperRead() {
      const status = document.getElementById("cloudStatus");
      const text = document.getElementById("paperText").value.trim();
      if (!state.paperImageBase64 && !text) {
        status.textContent = "Load a handwriting photo (or Demo Paper) or enter text first.";
        return;
      }
      status.textContent = "Contacting Supabase Edge Function (tipo-api)...";
      try {
        const headers = { "Content-Type": "application/json" };
        if (state.decodeSessionId) headers["x-decode-session"] = state.decodeSessionId;
        const res = await fetch(CONFIG.TIPO_API_ENDPOINT, {
          method: "POST",
          headers,
          body: JSON.stringify({
            mode: state.paperImageBase64 ? "handwriting" : "single",
            text,
            sessionId: state.decodeSessionId || undefined,
            handwritingImage: state.paperImageBase64 ? {
              mimeType: state.paperMime,
              base64: state.paperImageBase64,
              width: state.paperCV?.width || 640,
              height: state.paperCV?.height || 400,
              inkCoverageRatio: state.paperCV?.inkCoverageRatio ?? null,
              source: "photo_upload"
            } : null,
            localCv: state.paperCV
          })
        });
        const data = await res.json();
        if (res.status === 402) {
          status.textContent = data.error || "Unlock the 99p Cloud Pass in Tab 4 to run live Gemini Vision reads.";
          return;
        }
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        state.paperCloud = data;
        if (data.handwriting_transcription && !text) {
          document.getElementById("paperText").value = data.handwriting_transcription;
        }
        status.textContent = `Cloud read complete (${data.meta?.llm_model || "ok"} · ${data.meta?.elapsed_ms || 0} ms).`;
        if (!state.paperCV) {
          state.paperCV = { width: 0, height: 0, otsuThreshold: 0, inkCoverageRatio: 0, slantDeg: 0, meanSlopeDeg: 0, marginDriftPx: 0, lineCount: 0, peakLine: null };
        }
        renderPaperReveal();
      } catch (err) {
        status.textContent = "Cloud endpoint unreachable right now (" + err.message + "). Local CV + CMTE results remain 100% live.";
      }
    }

    // =========================================================================
    // TAB 4: FULL READOUT & 6-AXIS PASTEL SVG RADAR
    // =========================================================================
    function renderRadar() {
      const svg = document.getElementById("radarSvg");
      const axes = [
        { label: "Motor Tempo", val: state.scores.motor },
        { label: "Reflex Speed", val: state.scores.reflex },
        { label: "Time Accuracy", val: state.scores.time },
        { label: "Spatial Balance", val: state.scores.spatial },
        { label: "Focus Filter", val: state.scores.stroop },
        { label: "Syntax Precision", val: state.scores.syntax }
      ];
      const cx = 160, cy = 148, maxR = 96;
      let html = `
        <defs>
          <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f472b6" stop-opacity="0.45"/>
            <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#34d399" stop-opacity="0.45"/>
          </linearGradient>
        </defs>
      `;

      // Concentric hexagon rings
      [0.25, 0.5, 0.75, 1].forEach(r => {
        const pts = axes.map((_, i) => {
          const ang = (Math.PI * 2 * i) / 6 - Math.PI / 2;
          return `${(cx + Math.cos(ang) * maxR * r).toFixed(1)},${(cy + Math.sin(ang) * maxR * r).toFixed(1)}`;
        }).join(" ");
        html += `<polygon points="${pts}" fill="none" stroke="#e9ddff" stroke-width="1.2" />`;
      });

      // Axis lines + labels
      axes.forEach((a, i) => {
        const ang = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const x2 = cx + Math.cos(ang) * maxR;
        const y2 = cy + Math.sin(ang) * maxR;
        const lx = cx + Math.cos(ang) * (maxR + 28);
        const ly = cy + Math.sin(ang) * (maxR + 20);
        html += `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#e4d8f5" stroke-width="1" />`;
        html += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="10.5" font-weight="700" fill="#4c1d95">${a.label}</text>`;
      });

      // Data polygon
      const dataPts = axes.map((a, i) => {
        const ang = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const r = (clamp(a.val, 10, 100) / 100) * maxR;
        return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
      });
      html += `<polygon points="${dataPts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="url(#radarGrad)" stroke="#8b5cf6" stroke-width="2.5" stroke-linejoin="round" />`;
      dataPts.forEach(p => {
        html += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.5" fill="#fff" stroke="#ec4899" stroke-width="2.5" />`;
      });

      svg.innerHTML = html;
    }

    function renderReadout() {
      renderRadar();
      const brac = computeCfxBrac();
      const avgIki = state.ikiList.length ? `${Math.round(mean(state.ikiList))} ms` : "--";
      const avgDwell = state.dwellList.length ? `${Math.round(mean(state.dwellList))} ms` : "--";
      const avgDrop = state.dropdownTimes.length ? `${(mean(state.dropdownTimes) / 1000).toFixed(2)} s` : "--";
      const editRate = state.keys ? `${round((state.backspaces / state.keys) * 100, 1)}%` : "0.0%";

      document.getElementById("readoutStats").innerHTML = `
        <div class="stat-row"><span>CFX-BRAC Cognitive Load</span><span class="stat-val">${brac.score} / 100</span></div>
        <div class="stat-row"><span>Positive BRAC Ultradian Scale</span><span class="stat-val">${brac.bracScale}x (${brac.phasePct}% cycle)</span></div>
        <div class="stat-row"><span>Kim-Jo Burstiness (Bₙ)</span><span class="stat-val">${brac.bn !== null ? round(brac.bn, 3) : "Need ≥2 IKI"}</span></div>
        <div class="stat-row"><span>Mean Inter-Key Interval</span><span class="stat-val">${avgIki}</span></div>
        <div class="stat-row"><span>Mean Key Dwell / Edit Rate</span><span class="stat-val">${avgDwell} · ${editRate}</span></div>
        <div class="stat-row"><span>Dropdown Decision Cadence</span><span class="stat-val">${avgDrop}</span></div>
      `;

      const revs = Object.values(state.reveals);
      const revBox = document.getElementById("readoutReveals");
      if (revs.length) {
        revBox.innerHTML = revs.map(r => `
          <div class="mini-reveal">
            <h4>${r.headline}</h4>
            <p style="margin:0; color:var(--muted);">${r.body}</p>
          </div>
        `).join("");
      }
      updateDobHash();
    }

    function copyFullReadout() {
      const brac = computeCfxBrac();
      const lines = [
        "Tipo — Pastel Mind & Paper Decoder Readout",
        `CFX-BRAC Load: ${brac.score}/100 (BRAC ${brac.bracScale}x) | Keys: ${state.keys} | B_n: ${brac.bn !== null ? round(brac.bn, 3) : "--"}`,
        `6-Axis Scores: Motor ${state.scores.motor}, Reflex ${state.scores.reflex}, Time ${state.scores.time}, Spatial ${state.scores.spatial}, Stroop ${state.scores.stroop}, Syntax ${state.scores.syntax}`,
        "",
        ...Object.values(state.reveals).map(r => `• ${r.headline}: ${r.body}`)
      ];
      navigator.clipboard?.writeText(lines.join("\n"));
      alert("Readout copied to clipboard!");
    }

    async function startStripeCheckout() {
      const chip = document.getElementById("passStatusChip");
      chip.textContent = "Creating 99p Stripe Checkout...";
      try {
        const res = await fetch(CONFIG.CHECKOUT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ returnUrl: window.location.href.split("?")[0], app: "tipo" })
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          chip.textContent = data.error || "Checkout endpoint needs live Stripe price verification.";
        }
      } catch (err) {
        chip.textContent = "Checkout error: " + err.message;
      }
    }
  </script>
</body>
</html>
