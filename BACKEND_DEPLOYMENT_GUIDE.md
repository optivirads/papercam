# Cloud Backend REST API & Database Deployment Guide

This guide details how to deploy the **PSC Master Cloud REST API Server** (`server/index.cjs`) and **Cloud Database** to production cloud platforms.

---

## 1. Cloud REST API Architecture

- **Backend Entry Point**: `server/index.cjs`
- **Database Connector**: `server/db.cjs` (persists to `server/data.json` or connects to MongoDB/PostgreSQL)
- **Local Dev Endpoint**: `http://localhost:5000/api`
- **Live Production Endpoint**: Configured via `VITE_API_URL` environment variable.

---

## 2. Deploying Backend to Render (Free Cloud Hosting)

1. Sign up at [render.com](https://render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository (`Papercam`).
4. Configure service settings:
   - **Name**: `pscmaster-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
5. Click **Create Web Service**.
6. Render will assign a live URL, e.g., `https://pscmaster-api.onrender.com`.

---

## 3. Deploying Database to MongoDB Atlas (Free 512MB Cluster)

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Copy your Connection String (`mongodb+srv://<username>:<password>@cluster0.mongodb.net/pscmaster`).
3. Set Environment Variable in Render:
   - `DATABASE_URL` = `mongodb+srv://...`

---

## 4. Connecting Frontend & Android Mobile App to Production API

1. Update `.env` in the root directory:
   ```env
   VITE_API_URL=https://pscmaster-api.onrender.com/api
   ```
2. Re-compile the frontend and Android Release artifacts:
   ```cmd
   npm run build
   npx cap sync
   cd android && gradlew bundleRelease assembleRelease
   ```
3. Upload the updated [papercam-psc-master-release.aab](file:///c:/Users/abhin/Desktop/Papercam/papercam-psc-master-release.aab) to Google Play Console!
