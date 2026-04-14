# Ketan Mahandule Portfolio — Deployment Guide

## 🚀 Deploying to Netlify

### Method 1: Drag & Drop (Fastest)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign in / create a free account
3. From the dashboard, drag the entire **Portfolio** folder into the deploy area
4. Your site goes live instantly with a `xyz.netlify.app` URL
5. Optionally, connect a custom domain in **Site Settings → Domain management**

### Method 2: GitHub + Netlify (Recommended for Updates)
1. Create a GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
3. Select your repo — leave all build settings empty (it's a static site)
4. Click **Deploy site** ✅

Every time you push to GitHub, Netlify auto-deploys.

---

## 🔐 Admin Password

Your default admin password is: **`ketan@admin2024`**

To change it, edit this line in `js/main.js`:
```js
ADMIN_PASSWORD: 'ketan@admin2024',
```

### How Admin Mode Works
- Click **"+ New Post"** or **"+ Add Thought"** → password prompt appears
- Enter password → you're in **admin mode** for the session
- Add thoughts or writings — they save to your browser's **localStorage**
- On your next visit, enter password again to manage content

> **Note:** Since this is a static site, thoughts and writings live in your browser's localStorage. They're visible to everyone who visits from *your* browser. For content visible across all devices/visitors, a backend service (Firebase Firestore or Supabase) would be needed as a next step.

---

## 📁 File Structure

```
Portfolio/
├── index.html          ← Main page (all sections)
├── netlify.toml        ← Netlify routing config
├── css/
│   ├── style.css       ← Main styles (dark theme, layout)
│   └── animations.css  ← Keyframes & scroll reveal
├── js/
│   └── main.js         ← All interactivity, admin, content
└── README.md           ← This file
```

---

## ✏️ Customizing Content

### Add/Update Projects
Edit the `projects-grid` div in `index.html` to add more project cards.

### Add Research Papers
Edit the `research-grid` div in `index.html`.

### Update Default Thoughts
Edit `getDefaultThoughts()` in `js/main.js`.

### Update Default Blog Posts
Edit `State.defaultWritings` array in `js/main.js`.

---

## 🌐 Live URL
After deploying, your site will be at: `https://[site-name].netlify.app`
