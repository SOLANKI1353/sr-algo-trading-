SR ALGO TRADING - Angel-only ready build
=======================================

This package is a ready-to-deploy Next.js project (pages-router) modified to support:
- Demo mode by default (no API keys required)
- Settings page to save Angel API key into the database
- Market API endpoint that switches to live mode if Angel API key exists

How to deploy (short):
1. Push this project to GitHub.
2. Create a Neon (or any Postgres) database and get DATABASE_URL.
3. On Vercel project settings add Environment Variables:
   - DATABASE_URL = postgresql://<user>:<pass>@<host>:5432/<db>?sslmode=require
   - JWT_SECRET = any_random_string
   - SCHEDULER_TIMEZONE = Asia/Kolkata
4. Locally or in CI run:
   npm install
   npx prisma generate
   npx prisma migrate deploy   # applies migrations to remote DB
5. Deploy on Vercel (import from GitHub). Visit /settings to paste Angel API key.

Notes:
- pages/api/market.js contains a placeholder for real Angel SmartAPI integration. Replace that block with SDK calls when ready.
- Secure /api/settings with auth if you share access to the site.
