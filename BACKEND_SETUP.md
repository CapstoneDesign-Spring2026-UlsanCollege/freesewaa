# Free Sewaa Backend Setup

## What is connected now
- Sign up and sign in go through a real Node backend.
- Demo Google button signs into the seeded demo account.
- App state is loaded from the backend on page load.
- Changes from donate, browse, requests, messages, profile, saved items, and notifications sync back to the backend.
- Data is persisted in `db.json`.

## Demo account
- Email: `alisha@example.com`
- Password: `demo123`

## Run locally
1. Open the project folder in terminal.
2. Run:
   ```bash
   node server.js
   ```
3. Open:
   ```
   http://localhost:3000
   ```

## Files added or changed
- `server.js` — backend server and API routes
- `package.json` — project start scripts
- `auth.js` — real auth requests to backend
- `site.js` — backend state loading and syncing
- `logout.html` — backend-aware logout
- `signin.html`, `signup.html`, `index.html` — session guard update

## Current backend shape
### Auth routes
- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/google-demo`
- `POST /api/auth/logout`

### State routes
- `GET /api/state?userId=...`
- `PUT /api/state?userId=...`

## Important note
This is a strong starter backend for your product demo and class project, but it is not production security yet.
For real launch later, next upgrades should be:
- hashed passwords
- JWT or session cookies
- database like PostgreSQL or MySQL
- separate tables for users, listings, messages, requests
- image upload storage
- role-based admin controls
- validation and rate limiting
