# Deployment Guide

## Option 1: Render (Free)

### Steps:
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Background Worker"
4. Connect your GitHub repo
5. Settings:
   - **Root Directory:** backend
   - **Build Command:** npm install
   - **Start Command:** npm start
6. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
   - `NODE_ENV` = production
7. Click "Deploy"

---

## Option 2: Railway (Free Tier)

### Steps:
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
6. Deploy!

---

## Option 3: Vercel

### Steps:
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repo
4. Set root directory to `backend`
5. Add environment variables
6. Deploy!

---

## After Deployment:

Update frontend `js/api.js`:
```javascript
const API_URL = 'https://your-backend-url.onrender.com/api';
```

---

## Free Tier Limits:

| Platform | Free Tier |
|----------|-----------|
| Render | 750 hours/month |
| Railway | $5 credit/month |
| Vercel | 100GB bandwidth |

---

**Recommend: Render** - easiest setup, good free tier.
