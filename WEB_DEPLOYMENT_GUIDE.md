# Full Responsive Web Application & Web Deployment Guide

**PSC Master** is fully optimized as a **Responsive Desktop & Mobile Web Application**.

---

## 1. Responsive Features Overview

- **Desktop CBT Split-Screen Exam Mode**: Desktop users (`≥ 768px`) experience a split-screen exam interface with question options on the left and an OMR Question Palette + Timer on the right.
- **Permanent Left Navigation Sidebar**: Clean desktop sidebar replacing the mobile drawer.
- **Multi-Column Dashboard & Course Grids**: Expands to fill 1080p and 4K desktop displays while remaining sleek on mobile smartphones.
- **Single Page Application (SPA) Routing**: Configured in `vercel.json` for smooth client-side routing.

---

## 2. 1-Click Free Web Hosting on Vercel

1. Log in to [vercel.com](https://vercel.com) with your GitHub account.
2. Click **Add New Project**.
3. Import your GitHub repository: **`optivirads/papercam`**.
4. Configure environment variables:
   - `VITE_API_URL` = `https://pscmaster-api.onrender.com/api`
5. Click **Deploy**.
6. Vercel will assign your live public domain, e.g.:  
   `https://papercam.vercel.app` (or custom domain `https://pscmaster.in`).

---

## 3. Free Web Hosting on Netlify

1. Log in to [netlify.com](https://netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Select GitHub repo `optivirads/papercam`.
4. Build command: `npm run build` | Publish directory: `dist`.
5. Set environment variable `VITE_API_URL` = `https://pscmaster-api.onrender.com/api`.
6. Click **Deploy site**.
