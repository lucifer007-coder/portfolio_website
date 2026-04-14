/* ═══════════════════════════════════════════════════════════
   KETAN MAHANDULE PORTFOLIO — MAIN JS
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── CONFIG ─── */
// NOTE: This is the SHA-256 hash of the admin password.
// The plaintext password is NEVER stored here.
// To change your password, compute: sha256(newPassword) and update this hash.
const CONFIG = {
  ADMIN_PASSWORD_HASH: 'ac8b38703727296cde0bb8295a0cbe4495fa24fb2f47fafa2a250e57e120372e',
  STORAGE_KEYS: {
    THOUGHTS:      'km_thoughts',
    WRITINGS:      'km_writings',
    WRITING_EDITS: 'km_writing_edits',
    ADMIN_SESSION: 'km_admin_session'
  }
};

/* ─── CRYPTO UTILS ─── */
// Hashes a string with SHA-256 using the native Web Crypto API.
// Returns a lowercase hex string.
async function hashPassword(plain) {
  const encoder = new TextEncoder();
  const data    = encoder.encode(plain);
  const buffer  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/* ─── STATE ─── */
const State = {
  isAdmin:          false,
  pendingAction:    null,   // 'thoughts' | 'writings'
  editingThoughtId: null,   // id of thought being edited, null = new
  editingWritingId: null,   // id of writing being edited, null = new
  thoughts:         [],
  writings:         [],     // user-created writings
  writingEdits:     {},     // edits to default writings, keyed by id
  defaultWritings: [
    {
      id: 'w1',
      title: 'Why RAG is More Than Just "Adding Documents to LLMs"',
      category: 'Machine Learning',
      date: 'Apr 10, 2026',
      excerpt: 'Retrieval-Augmented Generation has become a buzzword, but most implementations miss the nuance. Let me break down what actually makes RAG work in production...',
      body: `Retrieval-Augmented Generation (RAG) has become the go-to solution for grounding LLMs with external knowledge. But building a RAG pipeline that actually works in production is far more nuanced than it appears.

The Basic Idea (And Why It's Not Enough)

The naive approach is simple: chunk your documents, embed them, store in a vector database, retrieve top-k similar chunks at query time, and pass them to the LLM. This works for demos. It fails at scale.

What Makes RAG Actually Hard

1. Chunking Strategy Matters Enormously
   How you split your documents dramatically affects retrieval quality. Fixed-size chunking loses semantic context. Sentence-based chunking is better but still misses cross-paragraph relationships.

2. Embedding Model Choice
   Not all embedding models are equal for your domain. A general-purpose model might perform poorly on highly technical or domain-specific content.

3. Retrieval Quality vs. Speed Trade-off
   Hybrid search (BM25 + dense retrieval) almost always outperforms pure vector search, but requires more infrastructure.

4. Context Window Management
   Stuffing all retrieved documents into the context is wasteful and noisy. Re-ranking and MMR (Maximal Marginal Relevance) help select the most relevant, diverse chunks.

5. Evaluation is Underrated
   Without proper RAG evaluation (faithfulness, relevancy, context precision), you're flying blind.

The Takeaway

RAG done right is a system design challenge as much as an ML challenge. The LLM is just the final step in a carefully orchestrated pipeline.`
    },
    {
      id: 'w2',
      title: 'From Research to Production: Lessons Learned',
      category: 'Career',
      date: 'Mar 20, 2026',
      excerpt: 'Publishing research papers is one thing. Making those models work reliably at scale is another. Here\'s what transitioning from academia to industry taught me...',
      body: `When I published my research on additive regression models for stock price forecasting, I thought the hard part was over. It wasn't.

The Gap Between Research and Production

Research optimizes for accuracy on a benchmark dataset. Production optimizes for reliability, maintainability, speed, and cost—simultaneously.

Key Lessons

1. Reproducibility is a Feature, Not a Luxury
   In research, you control the environment. In production, you don't. Deterministic pipelines, fixed random seeds, and versioned dependencies aren't optional—they're survival.

2. Your Model Will See Data It Has Never Seen
   Distribution shift is real. The market conditions during training are not the market conditions when the model deploys. Monitoring and retraining pipelines matter more than the initial model.

3. Explainability Sells
   Non-technical stakeholders don't care about your R² score. They care about why. Additive models like Prophet are actually great here—each component (trend, seasonality, holidays) is interpretable.

4. Engineering Debt Accumulates Fast
   A Jupyter notebook that "works on my machine" is not a system. Proper abstractions, tests, and documentation pay dividends you can't imagine when you're in research mode.

5. Feedback Loops are Underrated
   In research, you pick a metric and optimize it. In production, the metric itself can change. Building in mechanisms to capture real-world feedback and retrain is what separates good ML systems from great ones.

The Bottom Line

Research gives you the tools. Industry teaches you how to actually use them.`
    },
    {
      id: 'w3',
      title: 'Contributing to Open Source: My Journey with Streamlit Components',
      category: 'Open Source',
      date: 'Feb 15, 2026',
      excerpt: 'Building the Streamlit Reasoning Visualizer taught me more than I expected. Here\'s a behind-the-scenes look at creating a custom Streamlit component from scratch...',
      body: `Building the Streamlit Reasoning Visualizer started as a weekend project. It became a masterclass in the full-stack nature of open-source development.

The Problem

When working with LLMs that have reasoning capabilities (like chain-of-thought models), displaying their thought process in Streamlit was painful. You'd dump raw text, lose the structure, and confuse users.

The Solution

A custom Streamlit component that renders LLM reasoning steps in collapsible, styled sections—with Markdown and LaTeX support.

What I Learned

1. Custom Streamlit Components Are Two Apps in One
   Streamlit components are bidirectional: a Python backend and a React frontend communicating via postMessage. Getting this right took longer than expected.

2. Documentation is the Product
   The component that doesn't get used is the one people can't figure out. Clear README, usage examples, and a demo app were as important as the code itself.

3. Other People's Use Cases Are Surprising
   I built this for displaying reasoning chains. Users started using it for showing diffs, collapsible code sections, and tutorial steps. Open source takes on a life of its own.

4. Dependency Management is Brutal
   Streamlit updates frequently. Pinning versions is essential. I learned this the hard way when a Streamlit upgrade broke the component's iframe communication.

5. Community Feedback Improves Everything
   The first version was good. The version after community issues and PRs was much better. Ship early, iterate often.

If you're thinking about contributing to open source—start with something you actually need. The motivation to maintain it will be much higher.`
    }
  ]
};

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  renderThoughts();
  initThoughtsAdmin();
  initWritingsAdmin();
  initAdminModal();
  initReadingModal();
  initWritingsDelete();
});
/* ─── STORAGE ─── */
function loadStorage() {
  try {
    const t = localStorage.getItem(CONFIG.STORAGE_KEYS.THOUGHTS);
    State.thoughts = t ? JSON.parse(t) : getDefaultThoughts();

    const w = localStorage.getItem(CONFIG.STORAGE_KEYS.WRITINGS);
    State.writings = w ? JSON.parse(w) : [];

    const we = localStorage.getItem(CONFIG.STORAGE_KEYS.WRITING_EDITS);
    State.writingEdits = we ? JSON.parse(we) : {};

    // Restore admin session
    const sess = sessionStorage.getItem(CONFIG.STORAGE_KEYS.ADMIN_SESSION);
    if (sess === 'true') {
      State.isAdmin = true;
      document.body.classList.add('admin-mode');
    }
  } catch (e) {
    State.thoughts     = getDefaultThoughts();
    State.writings     = [];
    State.writingEdits = {};
  }
}

function saveThoughts() {
  localStorage.setItem(CONFIG.STORAGE_KEYS.THOUGHTS, JSON.stringify(State.thoughts));
}

function saveWritings() {
  localStorage.setItem(CONFIG.STORAGE_KEYS.WRITINGS, JSON.stringify(State.writings));
}

function saveWritingEdits() {
  localStorage.setItem(CONFIG.STORAGE_KEYS.WRITING_EDITS, JSON.stringify(State.writingEdits));
}

// Get the effective data for any writing (applies edits for default posts)
function getWritingData(w) {
  const isDefault = !State.writings.some(uw => uw.id === w.id);
  return isDefault && State.writingEdits[w.id]
    ? { ...w, ...State.writingEdits[w.id] }
    : w;
}

function getDefaultThoughts() {
  return [
    {
      id: 't1',
      text: 'The best code I\'ve ever written is the code I didn\'t write. Simplicity is not the absence of complexity — it\'s the result of profound understanding.',
      timestamp: '2026-04-12 · 09:14'
    },
    {
      id: 't2',
      text: 'Every LLM hallucination is a reminder that intelligence without grounding is just convincing nonsense. RAG is not a patch — it\'s a design principle.',
      timestamp: '2026-04-08 · 22:37'
    },
    {
      id: 't3',
      text: 'The stock market is a time machine. Historical patterns inform the future, but they never determine it. That\'s what makes forecasting hard and humbling.',
      timestamp: '2026-03-30 · 11:02'
    },
    {
      id: 't4',
      text: 'Open source is how I learn at 10x speed. Reading other people\'s code with the intent to contribute is the most underrated skill in software.',
      timestamp: '2026-03-22 · 19:45'
    },
    {
      id: 't5',
      text: 'Interpretability > accuracy for any model a human has to act on. A 98% accurate black box loses to an 89% transparent model every time in real-world deployment.',
      timestamp: '2026-03-15 · 14:20'
    },
    {
      id: 't6',
      text: 'Data preprocessing is an art form. 80% of ML work is cleaning data — and the 20% that\'s actual modeling gets all the glamour.',
      timestamp: '2026-03-05 · 08:33'
    }
  ];
}

/* ─── RENDER THOUGHTS ─── */
function renderThoughts() {
  const feed = document.getElementById('thoughts-feed');
  if (!feed) return;
  feed.innerHTML = '';

  const allThoughts = [...State.thoughts];

  if (allThoughts.length === 0) {
    feed.innerHTML = `
      <div class="thoughts-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        <p>No thoughts posted yet. Check back soon!</p>
      </div>`;
    return;
  }

  allThoughts.forEach(t => {
    const card = document.createElement('div');
    card.className = 'thought-card';
    card.dataset.id = t.id;
    card.innerHTML = `
      <button class="thought-edit-btn"   data-id="${t.id}" aria-label="Edit thought">✎</button>
      <button class="thought-delete-btn" data-id="${t.id}" aria-label="Delete thought">✕</button>
      <p class="thought-text">${escapeHtml(t.text)}</p>
      <div class="thought-footer">
        <span class="thought-ts">${t.timestamp}</span>
        <span class="thought-avatar">@ketan</span>
      </div>`;
    feed.appendChild(card);
  });

  // Bind delete buttons
  feed.querySelectorAll('.thought-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      State.thoughts = State.thoughts.filter(t => t.id !== id);
      saveThoughts();
      renderThoughts();
    });
  });

  // Bind edit buttons
  feed.querySelectorAll('.thought-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditThought(btn.dataset.id));
  });
}

/* ─── RENDER WRITINGS ─── */
function renderWritings() {
  const grid  = document.getElementById('writings-grid');
  const empty = document.getElementById('writings-empty');
  if (!grid) return;

  // Merge default (with any edits applied) + user writings
  const defaultDisplay = State.defaultWritings.map(w => getWritingData(w));
  const all = [...defaultDisplay, ...State.writings];

  grid.innerHTML = '';

  if (all.length === 0) {
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  all.forEach(w => {
    const card = document.createElement('article');
    card.className = 'writing-card';
    card.dataset.id = w.id;

    const isUserWriting = State.writings.some(uw => uw.id === w.id);

    card.innerHTML = `
      <button class="writing-edit-btn"   data-id="${w.id}">✎ Edit</button>
      ${isUserWriting ? `<button class="writing-delete-btn" data-id="${w.id}">✕ Delete</button>` : ''}
      <div class="writing-meta">
        <span class="writing-category">${escapeHtml(w.category)}</span>
        <span class="writing-date">${escapeHtml(w.date)}</span>
      </div>
      <h3 class="writing-title">${escapeHtml(w.title)}</h3>
      <p class="writing-excerpt">${escapeHtml(w.excerpt)}</p>
      <a href="#" class="writing-read-more" data-id="${w.id}">Read Article →</a>`;

    grid.appendChild(card);
  });

  // Bind read-more
  grid.querySelectorAll('.writing-read-more').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id   = link.dataset.id;
      const post = [...State.defaultWritings.map(w => getWritingData(w)), ...State.writings].find(w => w.id === id);
      if (post) openReadingModal(post);
    });
  });

  // Bind deletes (user writings only)
  grid.querySelectorAll('.writing-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      State.writings = State.writings.filter(w => w.id !== id);
      saveWritings();
      renderWritings();
    });
  });

  // Bind edit buttons (all writings)
  grid.querySelectorAll('.writing-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditWriting(btn.dataset.id));
  });
}

function initWritingsDelete() {
  renderWritings();
}

/* ─── ADMIN MODAL ─── */
function initAdminModal() {
  const overlay = document.getElementById('admin-modal');
  const closeBtn = document.getElementById('modal-close');
  const loginBtn = document.getElementById('admin-login-btn');
  const pwInput = document.getElementById('admin-password');
  const errorEl = document.getElementById('admin-error');

  // Thoughts admin trigger
  document.getElementById('thoughts-admin-btn')?.addEventListener('click', () => {
    if (State.isAdmin) {
      openThoughtEditor();
    } else {
      State.pendingAction = 'thoughts';
      openModal(overlay);
      setTimeout(() => pwInput?.focus(), 300);
    }
  });

  // Writings admin trigger
  document.getElementById('writings-admin-btn')?.addEventListener('click', () => {
    if (State.isAdmin) {
      openWritingEditor();
    } else {
      State.pendingAction = 'writings';
      openModal(overlay);
      setTimeout(() => pwInput?.focus(), 300);
    }
  });

  closeBtn?.addEventListener('click', () => closeModal(overlay));
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });

  loginBtn?.addEventListener('click', attemptLogin);
  pwInput?.addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });

  // Async: hashes the input and compares against the stored SHA-256 hash.
  // The plaintext password is never compared or stored.
  async function attemptLogin() {
    const pw = pwInput?.value || '';
    if (!pw) return;

    // Disable button while hashing to prevent double-clicks
    if (loginBtn) loginBtn.disabled = true;

    try {
      const inputHash = await hashPassword(pw);
      if (inputHash === CONFIG.ADMIN_PASSWORD_HASH) {
        State.isAdmin = true;
        document.body.classList.add('admin-mode');
        sessionStorage.setItem(CONFIG.STORAGE_KEYS.ADMIN_SESSION, 'true');
        closeModal(overlay);
        if (pwInput) pwInput.value = '';
        if (errorEl) errorEl.style.display = 'none';

        if (State.pendingAction === 'thoughts') openThoughtEditor();
        else if (State.pendingAction === 'writings') openWritingEditor();
        State.pendingAction = null;
      } else {
        if (errorEl) errorEl.style.display = 'block';
        pwInput?.select();
      }
    } finally {
      if (loginBtn) loginBtn.disabled = false;
    }
  }
}

/* ─── THOUGHTS ADMIN ─── */
function initThoughtsAdmin() {
  const overlay   = document.getElementById('thought-modal');
  const closeBtn  = document.getElementById('thought-modal-close');
  const input     = document.getElementById('thought-input');
  const charCount = document.getElementById('thought-chars');
  const saveBtn   = document.getElementById('save-thought-btn');
  const modalTitle = document.getElementById('thought-modal-title');

  // Reset modal to "New Thought" state when closed
  function resetThoughtModal() {
    State.editingThoughtId = null;
    if (input)      input.value = '';
    if (charCount)  charCount.textContent = '0';
    if (modalTitle) modalTitle.textContent = 'New Thought';
    if (saveBtn)    saveBtn.textContent    = 'Post Thought';
  }

  closeBtn?.addEventListener('click', () => { closeModal(overlay); resetThoughtModal(); });
  overlay?.addEventListener('click', e => { if (e.target === overlay) { closeModal(overlay); resetThoughtModal(); } });

  input?.addEventListener('input', () => {
    if (charCount) charCount.textContent = input.value.length;
  });

  saveBtn?.addEventListener('click', saveThought);
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveThought();
  });

  function saveThought() {
    // ── Security: never write to storage unless authenticated
    if (!State.isAdmin) return;

    const text = input?.value.trim();
    if (!text) return;

    if (State.editingThoughtId) {
      // ── EDIT MODE: update existing thought
      const idx = State.thoughts.findIndex(t => t.id === State.editingThoughtId);
      if (idx !== -1) {
        State.thoughts[idx] = {
          ...State.thoughts[idx],
          text,
          edited: true,
          editedAt: formatTimestamp(new Date())
        };
      }
    } else {
      // ── NEW MODE: prepend new thought
      State.thoughts.unshift({
        id:        't' + Date.now(),
        text,
        timestamp: formatTimestamp(new Date())
      });
    }

    saveThoughts();
    renderThoughts();
    closeModal(overlay);
    resetThoughtModal();
  }
}

function openThoughtEditor() {
  State.editingThoughtId = null;
  const modalTitle = document.getElementById('thought-modal-title');
  const saveBtn    = document.getElementById('save-thought-btn');
  if (modalTitle) modalTitle.textContent = 'New Thought';
  if (saveBtn)    saveBtn.textContent    = 'Post Thought';
  const overlay = document.getElementById('thought-modal');
  openModal(overlay);
  setTimeout(() => document.getElementById('thought-input')?.focus(), 300);
}

function openEditThought(id) {
  if (!State.isAdmin) return;
  const thought = State.thoughts.find(t => t.id === id);
  if (!thought) return;

  State.editingThoughtId = id;

  const input      = document.getElementById('thought-input');
  const charCount  = document.getElementById('thought-chars');
  const modalTitle = document.getElementById('thought-modal-title');
  const saveBtn    = document.getElementById('save-thought-btn');
  const overlay    = document.getElementById('thought-modal');

  if (input)      { input.value = thought.text; }
  if (charCount)  charCount.textContent = thought.text.length;
  if (modalTitle) modalTitle.textContent = 'Edit Thought';
  if (saveBtn)    saveBtn.textContent    = 'Save Changes';

  openModal(overlay);
  setTimeout(() => input?.focus(), 300);
}

/* ─── WRITINGS ADMIN ─── */
function initWritingsAdmin() {
  const overlay    = document.getElementById('writing-modal');
  const closeBtn   = document.getElementById('writing-modal-close');
  const saveBtn    = document.getElementById('save-writing-btn');
  const modalTitle = document.getElementById('writing-modal-title');

  function resetWritingModal() {
    State.editingWritingId = null;
    ['writing-title-input', 'writing-category-input', 'writing-body-input'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    if (modalTitle) modalTitle.textContent = 'New Writing';
    if (saveBtn)    saveBtn.textContent    = 'Publish';
  }

  closeBtn?.addEventListener('click', () => { closeModal(overlay); resetWritingModal(); });
  overlay?.addEventListener('click',  e => { if (e.target === overlay) { closeModal(overlay); resetWritingModal(); } });

  saveBtn?.addEventListener('click', () => {
    // ── Security: never write to storage unless authenticated
    if (!State.isAdmin) return;

    const titleEl    = document.getElementById('writing-title-input');
    const categoryEl = document.getElementById('writing-category-input');
    const bodyEl     = document.getElementById('writing-body-input');

    const title    = titleEl?.value.trim();
    const category = categoryEl?.value.trim() || 'General';
    const body     = bodyEl?.value.trim();
    if (!title || !body) return;

    const excerpt = body.slice(0, 150) + (body.length > 150 ? '...' : '');

    if (State.editingWritingId) {
      const id = State.editingWritingId;
      const isUserWriting = State.writings.some(w => w.id === id);

      if (isUserWriting) {
        // ── EDIT user writing in-place
        const idx = State.writings.findIndex(w => w.id === id);
        if (idx !== -1) {
          State.writings[idx] = { ...State.writings[idx], title, category, body, excerpt };
          saveWritings();
        }
      } else {
        // ── EDIT default writing → store as override in writingEdits
        State.writingEdits[id] = { title, category, body, excerpt, editedAt: formatDate(new Date()) };
        saveWritingEdits();
      }
    } else {
      // ── NEW writing
      State.writings.unshift({
        id:      'uw' + Date.now(),
        title,
        category,
        date:    formatDate(new Date()),
        excerpt,
        body
      });
      saveWritings();
    }

    renderWritings();
    closeModal(overlay);
    resetWritingModal();
  });
}

function openWritingEditor() {
  State.editingWritingId = null;
  const modalTitle = document.getElementById('writing-modal-title');
  const saveBtn    = document.getElementById('save-writing-btn');
  if (modalTitle) modalTitle.textContent = 'New Writing';
  if (saveBtn)    saveBtn.textContent    = 'Publish';
  const overlay = document.getElementById('writing-modal');
  openModal(overlay);
  setTimeout(() => document.getElementById('writing-title-input')?.focus(), 300);
}

function openEditWriting(id) {
  if (!State.isAdmin) return;

  // Resolve the writing data (applying edits if default)
  const all  = [...State.defaultWritings.map(w => getWritingData(w)), ...State.writings];
  const post = all.find(w => w.id === id);
  if (!post) return;

  State.editingWritingId = id;

  const titleEl    = document.getElementById('writing-title-input');
  const categoryEl = document.getElementById('writing-category-input');
  const bodyEl     = document.getElementById('writing-body-input');
  const modalTitle = document.getElementById('writing-modal-title');
  const saveBtn    = document.getElementById('save-writing-btn');
  const overlay    = document.getElementById('writing-modal');

  if (titleEl)    titleEl.value    = post.title    || '';
  if (categoryEl) categoryEl.value = post.category || '';
  if (bodyEl)     bodyEl.value     = post.body     || '';
  if (modalTitle) modalTitle.textContent = 'Edit Writing';
  if (saveBtn)    saveBtn.textContent    = 'Save Changes';

  openModal(overlay);
  setTimeout(() => titleEl?.focus(), 300);
}

/* ─── READING MODAL ─── */
function initReadingModal() {
  const overlay = document.getElementById('reading-modal');
  const closeBtn = document.getElementById('reading-modal-close');

  closeBtn?.addEventListener('click', () => closeModal(overlay));
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
}

function openReadingModal(post) {
  const overlay = document.getElementById('reading-modal');
  const content = document.getElementById('reading-content');
  if (!content || !overlay) return;

  content.innerHTML = `
    <h1 id="reading-modal-title">${escapeHtml(post.title)}</h1>
    <div class="rc-meta">
      <span class="rc-category">${escapeHtml(post.category)}</span>
      <span>${escapeHtml(post.date)}</span>
      <span>by Ketan Mahandule</span>
    </div>
    <div class="rc-body">${escapeHtml(post.body)}</div>`;

  openModal(overlay);
}

/* ─── OPEN POST FROM HTML (legacy onclick) ─── */
window.openPost = function(id, e) {
  if (e) e.preventDefault();
  const post = [...State.defaultWritings, ...State.writings].find(w => w.id === id);
  if (post) openReadingModal(post);
};

/* ─── MODAL HELPERS ─── */
function openModal(overlay) {
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(overlay) {
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── UTILS ─── */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatTimestamp(date) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${date.getFullYear()}-${months[date.getMonth()]}-${String(date.getDate()).padStart(2,'0')} · ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
}

function formatDate(date) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
