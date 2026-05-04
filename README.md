# Anshika Jain — Portfolio Website

A modern, dark-themed portfolio website built with React + Vite.

## 🚀 Quick Start (Local)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → Opens at http://localhost:5173
```

## 🌐 Hosting Options

### Option 1: Vercel (Recommended — Free & Easy)
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Your site is live at `yourname.vercel.app` 🎉

### Option 2: Netlify (Free)
1. Run `npm run build` → generates a `dist/` folder
2. Go to [netlify.com](https://netlify.com) → Sites → Drag & drop the `dist/` folder
3. Done! Or connect GitHub for auto-deploys.

### Option 3: GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build
npm run deploy
```

## 📁 Project Structure

```
portfolio/
├── index.html          # Entry HTML
├── vite.config.js      # Vite config
├── package.json
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # Entire portfolio (all sections + styles)
```

## ✏️ Customization

All content lives in the `data` object at the top of `src/App.jsx`.
Update your experience, skills, projects, and contact info there.
