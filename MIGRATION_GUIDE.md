# Free Sewaa Backend Migration Guide

Your project now includes a real backend architecture in `/backend`.

## What changed
- password hashing with bcrypt
- JWT-based auth
- MongoDB models instead of one large synced JSON state
- image upload support using multer
- separate APIs for:
  - users/auth
  - listings
  - requests
  - messages/conversations
  - notifications

## Frontend status
- `signin.html` and `signup.html` are updated to save JWT after login/signup
- the existing UI still contains local-state logic in `site.js`
- this means auth is connected first, while the rest of the pages should now be migrated page-by-page to the new APIs

## Best migration order
1. browse page -> `GET /api/listings`
2. donate page -> `POST /api/listings`
3. my-posts page -> `GET /api/listings?owner=me`
4. requests page -> `GET /api/requests/mine`
5. messages page -> conversations + messages endpoints
6. notifications page -> notifications endpoints
7. remove old `/api/state` full-state syncing completely

## Why this is better
The old version pushed one full app state object back and forth. That is okay for demos, but not for a real product. The new structure saves each entity separately, which gives you:
- safer auth
- real multi-user data separation
- easier debugging
- real scalability
- cleaner backend/frontend connection
