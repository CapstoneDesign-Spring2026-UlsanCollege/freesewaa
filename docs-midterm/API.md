# API Reference

## Authentication

### POST /api/auth/signup
Register a new user.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { "id": "user-123", "name": "John Doe", ... },
  "auth": { "userId": "user-123", "isAuthenticated": true }
}
```

### POST /api/auth/signin
Login user.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### GET /api/health
Check server health.

**Response:**
```json
{ "ok": true, "service": "freesewaa-backend" }
```

## State Management

### GET /api/state?userId={id}
Get user state (listings, requests, messages, etc.)

### PUT /api/state?userId={id}
Update user state.