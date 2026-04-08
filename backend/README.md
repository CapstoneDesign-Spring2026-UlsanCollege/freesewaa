# Free Sewaa Backend

Node.js/Express API for Free Sewaa community donation platform.

## Setup

```bash
npm install
```

## Configure

Edit `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

## Run

```bash
npm run dev    # Development
npm start      # Production
```

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Items
- GET /api/items
- GET /api/items/:id
- POST /api/items
- PUT /api/items/:id
- DELETE /api/items/:id

### Requests
- POST /api/requests
- GET /api/requests/:id
- PUT /api/requests/:id/status

### Messages
- POST /api/messages
- GET /api/messages/:conversationId

## Status

✅ API Structure Complete  
🔄 MongoDB Connection Needed  
🔄 Testing Needed
