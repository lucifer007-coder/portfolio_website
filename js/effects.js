/* ─── DESIGN TOKENS ─── */
:root {
  --bg:       #030712;
  --bg-2:     #060d1a;
  --bg-3:     #0a1628;
  --bg-card:  rgba(10, 18, 40, 0.7);

  --surface:       rgba(255,255,255,0.04);
  --surface-2:     rgba(255,255,255,0.07);
  --surface-hover: rgba(255,255,255,0.09);
  --border:        rgba(99,102,241,0.15);
  --border-hover:  rgba(99,102,241,0.4);
  --border-subtle: rgba(255,255,255,0.06);

  --primary:       #6366f1;
  --primary-light: #818cf8;
  --primary-glow:  rgba(99,102,241,0.45);
  --primary-dim:   rgba(99,102,241,0.15);
  --secondary:     #a78bfa;
  --accent:        #22d3ee;
  --accent-2:      #67e8f9;
  --accent-glow:   rgba(34,211,238,0.35);
  --pink:          #f472b6;
  --amber:         #fbbf24;
  --emerald:       #10b981;
  --rose:          #f43f5e;

  --text:   #f8fafc;
  --text-2: #94a3b8;
  --text-3: #475569;

  --font-sans: 'Outfit', 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius:    16px;
  --radius-sm: 10px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  --shadow:       0 4px 24px rgba(0,0,0,0.5);
  --shadow-lg:    0 12px 60px rgba(0,0,0,0.7);
  --shadow-glow:  0 0 60px var(--primary-glow);
  --shadow-card:  0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px var(--border);

  --transition:      0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  --spring:          0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ─── RESET ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  cursor: none;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; }
button { cursor: none; font-family: inherit; }
ul { list-style: none; }

/* ─── SCROLLBAR ─── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb {
  background: linear-gradient(var(--primary), var(--accent));
  border-radius: 2px;
}

/* ─── SELECTION ─── */
::selection { background: rgba(99,102,241,0.6); color: #fff; }

/* ─── SCROLL PROGRESS ─── */
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  width: 0%;
  background: linear-gradient(90deg, var(--primary), var(--accent), var(--pink));
  z-index: 9999;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px var(--primary-glow);
}

/* ─── CUSTOM CURSOR ─── */
.cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
  box-shadow: 0 0 12px var(--accent-glow);
}

.cursor-ring {
  position: fixed;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(99,102,241,0.6);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99997;
  transform: translate(-50%, -50%);
  transition: transform 0.12s ease, width 0.3s, height 0.3s, border-color 0.3s, background 0.3s;
}

body.cursor-hover .cursor-dot {
  width: 12px; height: 12px;
  background: var(--primary-light);
}
body.cursor-hover .cursor-ring {
  width: 56px; height: 56px;
  border-color: var(--primary);
  background: rgba(99,102,241,0.06);
}

/* ─── LAYOUT ─── */
.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 28px;
}

.section { padding: 110px 0; position: relative; }

/* ─── NAV ─── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 40px;
  transition: all var(--transition);
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: rgba(3,7,18,0.85);
  backdrop-filter: blur(24px) saturate(180%);
  border-color: var(--border-subtle);
  box-shadow: 0 1px 0 var(--border-subtle), 0 4px 32px rgba(0,0,0,0.4);
}

.nav-inner {
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 70px;
  gap: 40px;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary-light), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  flex-shrink: 0;
  position: relative;
}

.nav-logo::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform var(--transition);
}

.nav-logo:hover::after { transform: scaleX(1); }

.nav-links {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.nav-link {
  color: var(--text-2);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 7px 16px;
  border-radius: var(--radius-full);
  transition: all var(--transition);
  position: relative;
  letter-spacing: 0.2px;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-full);
  background: var(--primary-dim);
  opacity: 0;
  transition: opacity var(--transition);
}

.nav-link:hover { color: var(--text); }
.nav-link:hover::before { opacity: 1; }
.nav-link.active { color: var(--primary-light); }
.nav-link.active::before { opacity: 1; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
  margin-left: auto;
  cursor: pointer;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-2);
  border-radius: 2px;
  transition: var(--transition);
}

/* ─── HERO ─── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 100px 28px 80px;
}

/* Layered background */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 10% 20%, rgba(99,102,241,0.22) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 90% 80%, rgba(34,211,238,0.14) 0%, transparent 50%),
    radial-gradient(ellipse 70% 60% at 50% 100%, rgba(167,139,250,0.12) 0%, transparent 50%);
  pointer-events: none;
}

/* Grid overlay */
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
  pointer-events: none;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

#star-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
}

.orb-1 {
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(99,102,241,0.8), transparent 65%);
  top: -250px; right: -200px;
  animation: orb-float 9s ease-in-out infinite;
}

.orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(34,211,238,0.7), transparent 65%);
  bottom: -150px; left: -150px;
  animation: orb-float 11s ease-in-out infinite reverse;
}

.orb-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(167,139,250,0.7), transparent 65%);
  top: 35%; left: 30%;
  animation: orb-float 13s ease-in-out infinite 3s;
}

/* Floating geometric shapes */
.hero-geo {
  position: absolute;
  pointer-events: none;
  z-index: 0;
}
.hero-ring-1 {
  width: 420px; height: 420px;
  border: 1px solid rgba(99,102,241,0.12);
  border-radius: 50%;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: spin-slow 40s linear infinite;
}
.hero-ring-2 {
  width: 280px; height: 280px;
  border: 1px solid rgba(34,211,238,0.1);
  border-radius: 50%;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: spin-slow 25s linear infinite reverse;
}
.hero-dot-grid {
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  grid-template-columns: repeat(5, 18px);
  gap: 14px;
}
.hero-dot-grid span {
  width: 3px; height: 3px;
  background: rgba(99,102,241,0.3);
  border-radius: 50%;
  display: block;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 860px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: var(--radius-full);
  padding: 7px 18px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--primary-light);
  margin-bottom: 32px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}

.badge-dot {
  width: 7px; height: 7px;
  background: var(--emerald);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--emerald);
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero-name {
  font-size: clamp(4.5rem, 11vw, 9rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -4px;
  margin-bottom: 20px;
  display: block;
}

.hero-first {
  display: block;
  color: var(--text);
  text-shadow: 0 0 80px rgba(255,255,255,0.1);
}

.hero-last {
  display: block;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--accent) 45%, var(--secondary) 80%, var(--primary-light) 100%);
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-pan 5s linear infinite;
}

.hero-roles {
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  color: var(--text-2);
  font-weight: 400;
  height: 40px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.role-text {
  border-right: 2px solid var(--primary);
  padding-right: 4px;
  animation: blink-caret 1s step-end infinite;
}

.hero-tagline {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  color: var(--text-2);
  max-width: 520px;
  margin: 0 auto 40px;
  line-height: 1.8;
}

.hero-cta {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 70px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 20px 0;
  backdrop-filter: blur(12px);
  max-width: 540px;
  margin: 0 auto;
}

.stat {
  padding: 0 40px;
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 2.4rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary-light), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 4px;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-3);
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.stat-divider {
  width: 1px;
  height: 44px;
  background: var(--border-subtle);
}

.hero-scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-3);
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  animation: bounce-down 2.5s ease-in-out infinite;
}

.scroll-line {
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, transparent, var(--primary));
  border-radius: 1px;
}

/* ─── BUTTONS ─── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 30px;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 700;
  border: none;
  transition: all var(--transition);
  white-space: nowrap;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
  box-shadow: 0 4px 24px var(--primary-glow), 0 0 0 1px rgba(99,102,241,0.3);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
  transition: left 0.6s ease;
}

.btn-primary:hover::before { left: 100%; }

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 40px var(--primary-glow), 0 0 0 1px rgba(99,102,241,0.5);
}

.btn-ghost {
  background: var(--surface);
  color: var(--text-2);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
}

.btn-ghost:hover {
  background: var(--surface-2);
  color: var(--text);
  border-color: var(--border);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

/* ─── SECTION HEADERS ─── */
.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  gap: 20px;
  flex-wrap: wrap;
}

.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--primary-light);
  margin-bottom: 14px;
}

.section-tag::before {
  content: '';
  display: block;
  width: 20px; height: 1.5px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 1px;
}

.section-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.05;
  color: var(--text);
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--text-2);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ─── GLASS CARD MIXIN ─── */
.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  position: relative;
}

/* Gradient border via pseudo-element */
.glass-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: calc(var(--radius) + 1px);
  background: linear-gradient(135deg, rgba(99,102,241,0.0), rgba(99,102,241,0.0));
  z-index: -1;
  transition: background var(--transition-slow);
}

.glass-card:hover::before {
  background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(34,211,238,0.15), rgba(167,139,250,0.2));
}

/* Spotlight effect (controlled by JS) */
.glass-card .spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(350px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(99,102,241,0.08), transparent 70%);
  opacity: 0;
  transition: opacity var(--transition);
  pointer-events: none;
  z-index: 0;
}

.glass-card:hover .spotlight { opacity: 1; }

/* ─── ABOUT SECTION ─── */
.about-section {
  background: var(--bg-2);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 64px;
  align-items: start;
  position: relative;
  z-index: 1;
}

.about-lead {
  font-size: 1.18rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.75;
  margin-bottom: 20px;
}

.about-lead strong { color: var(--primary-light); }

.about-text p {
  color: var(--text-2);
  margin-bottom: 16px;
  line-height: 1.85;
  font-size: 0.97rem;
}

.about-text p strong { color: var(--accent); }

.about-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
}

.chip {
  background: rgba(99,102,241,0.08);
  border: 1px solid rgba(99,102,241,0.18);
  color: var(--text-2);
  padding: 5px 14px;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 600;
  transition: all var(--transition);
  letter-spacing: 0.2px;
}

.chip:hover {
  border-color: var(--primary);
  color: var(--primary-light);
  background: rgba(99,102,241,0.14);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--primary-dim);
}

.experience-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 30px;
  margin-bottom: 20px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.experience-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent);
}

.exp-heading {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--primary-light);
  margin-bottom: 24px;
  opacity: 0.8;
}

.exp-list { display: flex; flex-direction: column; gap: 22px; }

.exp-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.exp-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
  position: relative;
}

.exp-dot--primary {
  background: var(--primary);
  box-shadow: 0 0 12px var(--primary-glow);
}

.exp-dot--primary::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid rgba(99,102,241,0.3);
  animation: pulse-ring 2.5s ease-in-out infinite;
}

.exp-dot--purple  { background: var(--secondary); }
.exp-dot--teal    { background: var(--accent); }
.exp-dot--amber   { background: var(--amber); }

.exp-title   { font-size: 0.93rem; font-weight: 700; color: var(--text); margin-bottom: 2px; }
.exp-company { font-size: 0.8rem; color: var(--text-2); margin-bottom: 3px; }
.exp-period  { font-size: 0.72rem; color: var(--text-3); font-family: var(--font-mono); }

/* ─── PROJECTS ─── */
.projects-section {
  background: var(--bg);
  position: relative;
}

.projects-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at var(--x, 50%) var(--y, 50%), rgba(99,102,241,0.3), transparent);
  background-size: 48px 48px;
  opacity: 0.4;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(24px);
  transition: box-shadow var(--transition), border-color var(--transition);
  display: block;
  text-decoration: none;
  color: inherit;
  transform-style: preserve-3d;
  will-change: transform;
}

.project-card .spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(300px circle at var(--spot-x, -100px) var(--spot-y, -100px),
    rgba(99,102,241,0.1), transparent 70%);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity var(--transition);
}

.project-card:hover .spotlight { opacity: 1; }

.project-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: calc(var(--radius-lg) + 1px);
  background: linear-gradient(135deg,
    rgba(99,102,241,0),
    rgba(34,211,238,0),
    rgba(167,139,250,0));
  z-index: -1;
  transition: background var(--transition-slow);
}

.project-card:hover {
  border-color: transparent;
  box-shadow: 0 20px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.2), 0 0 40px rgba(99,102,241,0.08);
}

.project-card:hover::before {
  background: linear-gradient(135deg,
    rgba(99,102,241,0.45),
    rgba(34,211,238,0.2),
    rgba(167,139,250,0.3));
}

.project-card-inner {
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.project-icon {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  position: relative;
}

.project-icon::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 15px;
  background: inherit;
  filter: blur(8px);
  opacity: 0.4;
  z-index: -1;
}

.project-badge {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  background: rgba(255,255,255,0.05);
  color: var(--text-3);
  border: 1px solid var(--border-subtle);
}

.project-badge.open-source {
  background: rgba(34,211,238,0.08);
  color: var(--accent);
  border-color: rgba(34,211,238,0.2);
}

.project-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 12px;
  letter-spacing: -0.4px;
}

.project-desc {
  font-size: 0.87rem;
  color: var(--text-2);
  line-height: 1.78;
  margin-bottom: 22px;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 22px;
}

.tech-tag {
  font-size: 0.7rem;
  font-weight: 700;
  font-family: var(--font-mono);
  padding: 3px 10px;
  background: rgba(99,102,241,0.08);
  color: var(--primary-light);
  border-radius: var(--radius-full);
  border: 1px solid rgba(99,102,241,0.18);
  letter-spacing: 0.2px;
}

.project-footer { margin-top: auto; }

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-2);
  transition: color var(--transition), gap var(--transition);
}

.project-card:hover .project-link { color: var(--primary-light); gap: 12px; }

/* ─── RESEARCH ─── */
.research-section {
  background: var(--bg-2);
  position: relative;
  overflow: hidden;
}

.research-section::before {
  content: '';
  position: absolute;
  top: -200px; right: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%);
  pointer-events: none;
}

.research-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.research-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 34px;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(24px);
}

.research-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-slow);
}

.research-card:hover {
  border-color: rgba(99,102,241,0.2);
  transform: translateY(-6px);
  box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15);
}

.research-card:hover::after { transform: scaleX(1); }

.research-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.research-journal {
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--primary-light);
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.2);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.research-date {
  font-size: 0.72rem;
  color: var(--text-3);
  font-family: var(--font-mono);
}

.research-title {
  font-size: 1.08rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.45;
  margin-bottom: 14px;
  letter-spacing: -0.3px;
}

.research-abstract {
  font-size: 0.85rem;
  color: var(--text-2);
  line-height: 1.78;
  margin-bottom: 22px;
}

.research-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 26px;
}

.r-tag {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 3px 10px;
  background: var(--surface);
  color: var(--text-3);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
}

.research-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 22px;
  border-top: 1px solid var(--border-subtle);
}

.research-venue {
  font-size: 0.72rem;
  color: var(--text-3);
  font-style: italic;
  max-width: 55%;
  line-height: 1.5;
}

.research-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--primary-light);
  transition: all var(--transition);
  border-bottom: 1px solid rgba(99,102,241,0.3);
  padding-bottom: 1px;
}

.research-link:hover {
  gap: 10px;
  color: var(--accent);
  border-color: var(--accent);
}

/* ─── WRITINGS ─── */
.writings-section { background: var(--bg); position: relative; }

.writings-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.writing-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 28px;
  transition: all var(--transition);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.writing-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: scaleX(0);
  transition: transform var(--transition-slow);
}

.writing-card:hover {
  border-color: rgba(99,102,241,0.2);
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

.writing-card:hover::after { transform: scaleX(1); }

.writing-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.writing-category {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  background: rgba(34,211,238,0.08);
  border: 1px solid rgba(34,211,238,0.18);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.writing-date {
  font-size: 0.7rem;
  color: var(--text-3);
  font-family: var(--font-mono);
}

.writing-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.writing-excerpt {
  font-size: 0.85rem;
  color: var(--text-2);
  line-height: 1.7;
  flex: 1;
}

.writing-read-more {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--primary-light);
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap var(--transition), color var(--transition);
}

.writing-read-more:hover { gap: 10px; color: var(--accent); }

.writing-delete-btn {
  position: absolute;
  top: 12px; right: 12px;
  background: rgba(244,63,94,0.12);
  border: 1px solid rgba(244,63,94,0.2);
  border-radius: 6px;
  color: var(--rose);
  padding: 4px 8px;
  font-size: 0.68rem;
  cursor: pointer;
  display: none;
  transition: all var(--transition);
  font-weight: 700;
}

.writing-delete-btn:hover { background: rgba(244,63,94,0.25); }
body.admin-mode .writing-delete-btn { display: block; }

/* Edit button — sits to the left of the delete button */
.writing-edit-btn {
  position: absolute;
  top: 12px; right: 90px;
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 6px;
  color: var(--primary-light);
  padding: 4px 10px;
  font-size: 0.68rem;
  cursor: pointer;
  display: none;
  transition: all var(--transition);
  font-weight: 700;
}

.writing-edit-btn:hover {
  background: rgba(99,102,241,0.22);
  border-color: rgba(99,102,241,0.4);
}
body.admin-mode .writing-edit-btn { display: block; }

/* When no delete button visible (default writings), shift edit to the right */
body.admin-mode .writing-card:not(:has(.writing-delete-btn)) .writing-edit-btn { right: 12px; }

/* ─── THOUGHTS ─── */
.thoughts-section {
  background: var(--bg-2);
  position: relative;
  overflow: hidden;
}

.thoughts-section::before {
  content: '';
  position: absolute;
  bottom: -200px; left: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%);
  pointer-events: none;
}

.thoughts-feed {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.thought-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.thought-card::before {
  content: '"';
  position: absolute;
  top: -10px; right: 16px;
  font-size: 5rem;
  font-weight: 900;
  color: rgba(99,102,241,0.08);
  line-height: 1;
  font-family: Georgia, serif;
  pointer-events: none;
}

.thought-card:hover {
  border-color: rgba(99,102,241,0.2);
  transform: translateY(-4px);
  box-shadow: 0 16px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1);
}

.thought-text {
  font-size: 0.93rem;
  color: var(--text);
  line-height: 1.75;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
}

.thought-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.thought-ts {
  font-size: 0.68rem;
  color: var(--text-3);
  font-family: var(--font-mono);
}

.thought-avatar {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--primary-light);
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.2);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.thought-delete-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: rgba(244,63,94,0.12);
  border: 1px solid rgba(244,63,94,0.2);
  border-radius: 6px;
  color: var(--rose);
  width: 26px; height: 26px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all var(--transition);
}

.thought-delete-btn:hover { background: rgba(244,63,94,0.25); }
body.admin-mode .thought-delete-btn { display: flex; }

/* Edit button for thoughts — sits to the left of delete */
.thought-edit-btn {
  position: absolute;
  top: 10px; right: 42px;
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 6px;
  color: var(--primary-light);
  width: 26px; height: 26px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all var(--transition);
}

.thought-edit-btn:hover {
  background: rgba(99,102,241,0.22);
  border-color: rgba(99,102,241,0.4);
}
body.admin-mode .thought-edit-btn { display: flex; }

.thoughts-empty {
  text-align: center;
  padding: 60px;
  color: var(--text-3);
  grid-column: 1/-1;
}

.thoughts-empty svg { margin-bottom: 16px; opacity: 0.2; }

/* ─── CONTACT ─── */
.contact-section {
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 400px;
  background: radial-gradient(ellipse, rgba(99,102,241,0.07), transparent 70%);
  pointer-events: none;
}

.contact-inner { text-align: center; }

.contact-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 44px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 22px 32px;
  transition: all var(--transition);
  min-width: 260px;
  text-align: left;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: calc(var(--radius-lg) + 1px);
  background: linear-gradient(135deg, rgba(99,102,241,0), rgba(34,211,238,0));
  z-index: -1;
  transition: background var(--transition-slow);
}

.contact-card:hover {
  border-color: transparent;
  transform: translateY(-4px);
  box-shadow: 0 16px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.1);
}

.contact-card:hover::before {
  background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(34,211,238,0.2));
}

.contact-icon {
  width: 48px; height: 48px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  box-shadow: 0 4px 16px var(--primary-glow);
}

.contact-label { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-3); margin-bottom: 4px; }
.contact-value { font-size: 0.92rem; font-weight: 700; color: var(--text); }

/* ─── FOOTER ─── */
.footer {
  background: var(--bg-2);
  border-top: 1px solid var(--border-subtle);
  padding: 40px 0;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-logo {
  font-size: 1.4rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary-light), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
}

.footer-text { font-size: 0.82rem; color: var(--text-3); }

.footer-links { display: flex; gap: 24px; }

.footer-links a {
  font-size: 0.82rem;
  color: var(--text-3);
  font-weight: 600;
  transition: color var(--transition);
}

.footer-links a:hover { color: var(--primary-light); }

/* ─── MODALS ─── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(16px) saturate(150%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition);
}

.modal-overlay.open { opacity: 1; pointer-events: all; }

.modal {
  background: var(--bg-3);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: var(--radius-xl);
  padding: 40px;
  width: 100%;
  max-width: 460px;
  position: relative;
  transform: scale(0.94) translateY(14px);
  transition: transform var(--spring);
  box-shadow: 0 32px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.1), 0 0 60px rgba(99,102,241,0.08);
  overflow: hidden;
}

.modal::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent);
}

.modal-overlay.open .modal { transform: scale(1) translateY(0); }

.modal--wide  { max-width: 600px; }
.modal--large { max-width: 760px; }

.modal-close {
  position: absolute;
  top: 18px; right: 18px;
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--text-2);
  width: 34px; height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: all var(--transition);
  cursor: pointer;
  font-weight: 700;
}

.modal-close:hover { background: var(--surface-2); color: var(--text); border-color: var(--border); }

.modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--text);
  letter-spacing: -0.4px;
}

.modal-subtitle { font-size: 0.85rem; color: var(--text-2); margin-bottom: 24px; }

.modal-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 13px 16px;
  color: var(--text);
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
  margin-top: 14px;
}

.modal-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}

.modal-textarea {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  color: var(--text);
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  min-height: 140px;
  resize: vertical;
  line-height: 1.7;
  transition: border-color var(--transition), box-shadow var(--transition);
  margin-top: 14px;
}

.modal-textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}

.modal-error {
  background: rgba(244,63,94,0.08);
  border: 1px solid rgba(244,63,94,0.25);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  font-size: 0.82rem;
  color: var(--rose);
  margin-top: 10px;
  font-weight: 600;
}

.thought-char-count {
  text-align: right;
  font-size: 0.7rem;
  color: var(--text-3);
  margin-top: 6px;
  font-family: var(--font-mono);
}

/* ─── READING CONTENT ─── */
.reading-content {
  max-height: 72vh;
  overflow-y: auto;
  padding-right: 6px;
}

.reading-content h1 { font-size: 1.9rem; font-weight: 900; margin-bottom: 12px; letter-spacing: -0.5px; }
.reading-content .rc-meta { display: flex; gap: 14px; margin-bottom: 30px; font-size: 0.78rem; color: var(--text-3); font-family: var(--font-mono); align-items: center; flex-wrap: wrap; }
.reading-content .rc-category { color: var(--accent); font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
.reading-content .rc-body { font-size: 0.95rem; color: var(--text-2); line-height: 1.9; white-space: pre-wrap; }

/* ─── EMPTY STATE ─── */
.empty-state { text-align: center; padding: 60px; color: var(--text-3); grid-column: 1/-1; }
.empty-state svg { margin-bottom: 16px; opacity: 0.2; }
.empty-state p { font-size: 0.9rem; }

/* ─── REVEAL ─── */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ─── RESPONSIVE ─── */
/* ─── RESPONSIVE ─── */
@media (max-width: 1200px) {
  .hero-dot-grid { right: 40px; }
}

@media (max-width: 1024px) {
  .hero-ring-1, .hero-ring-2, .hero-dot-grid { display: none; }
  .about-grid, .research-grid, .projects-grid { grid-template-columns: 1fr; gap: 40px; }
  .writings-grid, .thoughts-feed { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  :root { --radius-lg: 20px; --radius-xl: 24px; }
  .container { padding: 0 20px; }
  .section { padding: 80px 0; }
  
  .navbar { padding: 0 20px; }
  .nav-inner { height: 60px; }
  .nav-links {
    position: fixed;
    top: 0; right: -100%;
    width: 80%;
    height: 100vh;
    background: rgba(3, 7, 18, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;
    margin: 0;
    border-left: 1px solid var(--border-subtle);
  }
  
  .nav-links.open { right: 0; }
  .nav-link { font-size: 1.25rem; padding: 15px 40px; width: 100%; text-align: center; }
  
  .hamburger { 
    display: flex; 
    z-index: 101;
    position: relative;
  }
  .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .hero-name { font-size: clamp(3.2rem, 12vw, 5rem); letter-spacing: -2px; }
  .hero-roles { font-size: 1rem; }
  .hero-cta { flex-direction: column; width: 100%; max-width: 320px; margin-left: auto; margin-right: auto; }
  .btn { width: 100%; justify-content: center; }
  
  .writings-grid, .thoughts-feed { grid-template-columns: 1fr; }
  .section-header-row { flex-direction: column; align-items: flex-start; gap: 20px; }
  
  .stat { padding: 0 15px; }
  .stat-num { font-size: 1.8rem; }
  
  .modal { padding: 30px 20px; border-radius: var(--radius-lg); }
  .modal--wide, .modal--large { max-width: 100%; }
}

@media (max-width: 480px) {
  .hero-stats { flex-direction: column; padding: 30px 0; gap: 24px; }
  .stat-divider { width: 40px; height: 1px; }
  .contact-card { padding: 16px 20px; }
  .contact-icon { width: 40px; height: 40px; }
  .section-title { font-size: 2.2rem; }
  
  body { cursor: default !important; }
  .cursor-dot, .cursor-ring { display: none !important; }
}

/* Touch Device Adjustments */
@media (hover: none) {
  body { cursor: default !important; }
  .cursor-dot, .cursor-ring { display: none !important; }
  .glass-card:hover { transform: none !important; }
  .btn:hover { transform: none !important; }
  .writing-card:hover, .thought-card:hover, .contact-card:hover { transform: none !important; }
}
