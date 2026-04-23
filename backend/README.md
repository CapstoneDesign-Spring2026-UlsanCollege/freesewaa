# Free Sewaa Structured Backend

This backend upgrades the project from local JSON syncing to a real app architecture using:
- Node.js + Express
- MongoDB + Mongoose
- bcrypt password hashing
- JWT authentication
- multer image uploads
- separate APIs for auth, listings, requests, messages, and notifications

## Folder structure
- `src/models` MongoDB models
- `src/controllers` request handlers
- `src/routes` route modules
- `src/middleware` auth and upload middleware
- `uploads` local image storage for development

## Main API routes
- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/me`
- `GET /api/listings`
- `POST /api/listings`
- `PUT /api/listings/:id`
- `DELETE /api/listings/:id`
- `GET /api/requests/mine`
- `POST /api/requests`
- `PATCH /api/requests/:id/status`
- `GET /api/messages/conversations`
- `POST /api/messages/conversations`
- `GET /api/messages/conversations/:id/messages`
- `POST /api/messages/conversations/:id/messages`
- `GET /api/notifications`
- `PATCH /api/notifications/read`

## Run
1. Copy `.env.example` to `.env`
2. Install dependencies in `/backend`
3. Start MongoDB
4. Run `npm start` inside `/backend`

## Production next upgrades
- MongoDB Atlas or dedicated production database
- cloud image storage (Cloudinary / S3)
- refresh tokens and secure httpOnly cookie session flow
- websocket layer for real-time chat and notifications
