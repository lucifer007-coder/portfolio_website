/* ═══════════════════════════════════════════════════════════
   INTERACTIVE EFFECTS — Cursor · Tilt · Spotlight · Magnetic
   ═══════════════════════════════════════════════════════════ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollProgress();
  initScrollSpy();
  initCardTilt();
  initCardSpotlight();
  initMagneticButtons();
  initCounterAnimation();
  initParticleClick();
  initStarCanvas();
  initNavbar();
  initHamburger();
  initHeroRoles();
  initScrollReveal();
  initFooterYear();
});

/* ─────────────────────────────────────────
   1. CUSTOM CURSOR
   ───────────────────────────────────────── */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -200, mouseY = -200;
  let ringX = -200, ringY = -200;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Ring lags behind with lerp
  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state for interactive elements
  const hoverSels = 'a, button, .project-card, .research-card, .writing-card, .thought-card, .contact-card, .chip, .nav-link, .btn';
  document.querySelectorAll(hoverSels).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/* ─────────────────────────────────────────
   2. SCROLL PROGRESS BAR
   ───────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────
   3. SCROLL SPY (active nav link)
   ───────────────────────────────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
}

/* ─────────────────────────────────────────
   4. 3D CARD TILT
   ───────────────────────────────────────── */
function initCardTilt() {
  if (window.innerWidth < 768) return; // Disable on mobile
  const cards = document.querySelectorAll('.project-card, .research-card, .writing-card');
  const INTENSITY = 7; // degrees max tilt

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -INTENSITY;
      const rotY = ((x - cx) / cx) * INTENSITY;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      card.style.transition = 'transform 0.05s linear';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });
}

/* ─────────────────────────────────────────
   5. MOUSE SPOTLIGHT ON CARDS
   ───────────────────────────────────────── */
function initCardSpotlight() {
  if (window.innerWidth < 768) return; // Disable on mobile/touch
  const cards = document.querySelectorAll('.project-card, .research-card, .contact-card');

  cards.forEach(card => {
    // Inject spotlight div if not present
    if (!card.querySelector('.spotlight')) {
      const spot = document.createElement('div');
      spot.className = 'spotlight';
      card.appendChild(spot);
    }

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--spot-x', x + 'px');
      card.style.setProperty('--spot-y', y + 'px');

      // Update background spotlight
      const spot = card.querySelector('.spotlight');
      if (spot) {
        spot.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(99,102,241,0.1), transparent 70%)`;
        spot.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      const spot = card.querySelector('.spotlight');
      if (spot) spot.style.opacity = '0';
    });
  });
}

/* ─────────────────────────────────────────
   6. MAGNETIC BUTTONS
   ───────────────────────────────────────── */
function initMagneticButtons() {
  if (window.innerWidth < 768) return; // Disable on mobile
  const btns = document.querySelectorAll('.btn');
  const STRENGTH = 0.35;

  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
      btn.style.transition = 'transform 0.1s linear';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s, background 0.25s';
    });
  });
}

/* ─────────────────────────────────────────
   7. COUNTER ANIMATION (hero stats)
   ───────────────────────────────────────── */
function initCounterAnimation() {
  const stats = [
    { el: document.querySelector('.stat:nth-child(1) .stat-num'), target: 2, suffix: '+', duration: 1200 },
    { el: document.querySelector('.stat:nth-child(3) .stat-num'), target: 2, suffix: '', duration: 1000 },
    { el: document.querySelector('.stat:nth-child(5) .stat-num'), target: 4, suffix: '+', duration: 1100 },
  ];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(({ el, target, suffix, duration }) => {
          if (!el) return;
          animateCount(el, 0, target, suffix, duration);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

function animateCount(el, start, end, suffix, duration) {
  const startTime = performance.now();
  const range = end - start;

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = Math.round(start + range * ease);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ─────────────────────────────────────────
   8. PARTICLE BURST ON CLICK
   ───────────────────────────────────────── */
function initParticleClick() {
  const colors = ['#6366f1', '#22d3ee', '#a78bfa', '#f472b6', '#67e8f9'];

  document.addEventListener('click', e => {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = (i / 8) * Math.PI * 2;
      const dist = 40 + Math.random() * 40;
      const tx2 = Math.cos(angle) * dist;
      const ty2 = Math.sin(angle) * dist;

      p.className = 'cursor-particle';
      p.style.cssText = `
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        background: ${color};
        box-shadow: 0 0 6px ${color};
        --tx: 0px; --ty: 0px;
        --tx2: ${tx2}px; --ty2: ${ty2}px;
        width: ${3 + Math.random() * 5}px;
        height: ${3 + Math.random() * 5}px;
        animation-duration: ${0.4 + Math.random() * 0.4}s;
        animation-delay: ${Math.random() * 0.05}s;
      `;
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  });
}

/* ─────────────────────────────────────────
   9. STAR CANVAS (enhanced)
   ───────────────────────────────────────── */
function initStarCanvas() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], shootingStars = [];

  function resize() {
    const isMobile = window.innerWidth < 768;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Fewer stars on mobile for better performance
    const starCount = isMobile ? 80 : 150;
    
    stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      opacity: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function spawnShooting() {
    const isMobile = window.innerWidth < 768;
    shootingStars.push({
      x: Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
      y: Math.random() * canvas.height * 0.3,
      len: Math.random() * (isMobile ? 60 : 100) + 60,
      speed: Math.random() * 6 + 4,
      opacity: 0.9,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
    });
    
    // Less frequent shooting stars on mobile
    const delay = isMobile ? (8000 + Math.random() * 10000) : (4000 + Math.random() * 5000);
    setTimeout(spawnShooting, delay);
  }

  let lastFrameTime = 0;
  function draw(now) {
    const isMobile = window.innerWidth < 768;
    
    // Throttle to ~30FPS on mobile
    if (isMobile && now - lastFrameTime < 33) {
      requestAnimationFrame(draw);
      return;
    }
    lastFrameTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = now * 0.001;

    // Stars
    stars.forEach(s => {
      const opacity = s.opacity + Math.sin(t * s.speed + s.phase) * 0.15;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, Math.min(0.8, opacity))})`;
      ctx.fill();
    });

    // Shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      const gradient = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
      gradient.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.opacity -= 0.012;

      if (s.opacity <= 0) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(draw);
  }

  resize();
  requestAnimationFrame(draw);
  setTimeout(spawnShooting, 2000);

  // Debounced resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 200);
  }, { passive: true });
}

/* ─────────────────────────────────────────
   10. NAVBAR SCROLL
   ───────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ─────────────────────────────────────────
   11. HAMBURGER
   ───────────────────────────────────────── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    links.classList.toggle('open');
    btn.classList.toggle('active');
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('active');
    });
  });
}

/* ─────────────────────────────────────────
   12. HERO ROLE TYPEWRITER
   ───────────────────────────────────────── */
function initHeroRoles() {
  const roles = [
    'Artificial Intelligence',
    'Machine Learning',
    'Open Source',
    'Mechanistic Interpretability',
    'Python',
    'Data Science',
  ];
  const el = document.getElementById('role-text');
  if (!el) return;

  // On very small screens, reduce speed slightly to ensure readability
  const isSmall = window.innerWidth < 480;

  let rIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = roles[rIdx];
    if (deleting) {
      el.textContent = current.slice(0, cIdx--);
      if (cIdx < 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
        setTimeout(type, 450);
        return;
      }
      setTimeout(type, 45);
    } else {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 2400);
        return;
      }
      setTimeout(type, 75);
    }
  }

  setTimeout(type, 1400);
}

/* ─────────────────────────────────────────
   13. SCROLL REVEAL
   ───────────────────────────────────────── */
function initScrollReveal() {
  const sels = [
    '.section-header',
    '.project-card',
    '.research-card',
    '.writing-card',
    '.about-grid',
    '.contact-card',
    '.experience-card',
    '.thought-card',
  ];

  const els = document.querySelectorAll(sels.join(','));
  els.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 40);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────
   14. FOOTER YEAR
   ───────────────────────────────────────── */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}
