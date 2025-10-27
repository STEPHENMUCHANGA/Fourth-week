# SmartLerner_OAuth - MERN App with Google OAuth and Seed Script

This archive contains a ready-to-run MERN starter project for SmartLerner with Google OAuth integration and a seed script.

## Quick steps

1. Backend
   - cd backend
   - cp .env.example .env and fill in MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, FRONTEND_URL
   - npm install
   - npm run seed   # populates sample users, courses, lessons
   - npm run dev

2. Frontend
   - cd frontend
   - cp .env.example .env
   - npm install
   - npm run dev

## OAuth flow (local)
- Configure Google Cloud OAuth client with callback: http://localhost:5000/api/auth/google/callback
- In Google Console add JavaScript origins: http://localhost:5173 and http://localhost:5000
- When user clicks "Login with Google" they'll be redirected to Google, then back to frontend with token in querystring.

## Deployment
- Backend: Deploy backend folder to Render. Set env vars on Render (MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, FRONTEND_URL_PROD)
- Frontend: Deploy frontend folder to Vercel. Set env var VITE_API_BASE_URL to your backend base (e.g., https://your-backend.onrender.com/api)