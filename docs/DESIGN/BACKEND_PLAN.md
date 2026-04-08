# Free Sewaa — Backend Development Plan

---

## Overview

This document outlines the backend development plan for Free Sewaa, a community donation platform.

**Current Status:** Frontend MVP complete, backend development to begin

**Target:** Full-stack application with real database and authentication

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |
| API Style | RESTful |
| Deployment | Vercel / Railway |

---

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  location: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Items Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  condition: String,
  location: String,
  image: String (URL),
  donorId: ObjectId (ref: Users),
  status: String (available/reserved/claimed),
  createdAt: Date,
  updatedAt: Date
}
```

### Requests Collection

```javascript
{
  _id: ObjectId,
  itemId: ObjectId (ref: Items),
  requesterId: ObjectId (ref: Users),
  donorId: ObjectId (ref: Users),
  status: String (pending/approved/rejected),
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Messages Collection

```javascript
{
  _id: ObjectId,
  conversationId: String,
  senderId: ObjectId (ref: Users),
  receiverId: ObjectId (ref: Users),
  itemId: ObjectId (ref: Items),
  message: String,
  read: Boolean,
  createdAt: Date
}
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | User login |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/logout | User logout |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/:id | Get user profile |
| PUT | /api/users/:id | Update user profile |
| GET | /api/users/:id/items | Get user's donated items |

### Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/items | Get all items (with filters) |
| GET | /api/items/:id | Get single item |
| POST | /api/items | Create new item |
| PUT | /api/items/:id | Update item |
| DELETE | /api/items/:id | Delete item |
| GET | /api/items/user/:userId | Get items by user |

### Requests

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/requests | Create request |
| GET | /api/requests/:id | Get request details |
| PUT | /api/requests/:id/status | Update request status |
| GET | /api/requests/user/:userId | Get user's requests |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/messages/:conversationId | Get conversation messages |
| POST | /api/messages | Send message |
| PUT | /api/messages/:id/read | Mark as read |

---

## Development Phases

### Phase 1: Project Setup
- [ ] Initialize Node.js project
- [ ] Set up Express server
- [ ] Connect to MongoDB
- [ ] Set up folder structure

### Phase 2: Authentication
- [ ] User registration endpoint
- [ ] User login endpoint
- [ ] JWT token generation
- [ ] Password hashing
- [ ] Auth middleware

### Phase 3: Items API
- [ ] CRUD for items
- [ ] Image upload (Cloudinary/S3)
- [ ] Category filtering
- [ ] Search functionality

### Phase 4: Requests API
- [ ] Create request
- [ ] Approve/reject request
- [ ] Request notifications

### Phase 5: Messages API
- [ ] Real-time chat setup
- [ ] Message history
- [ ] Unread count

### Phase 6: Integration
- [ ] Connect frontend to backend
- [ ] Replace localStorage with API calls
- [ ] Test all flows

### Phase 7: Deployment
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Set up environment variables
- [ ] Final testing

---

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   ├── requestController.js
│   │   └── messageController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Request.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── items.js
│   │   ├── requests.js
│   │   └── messages.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── helpers.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

---

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## Security Measures

- Password hashing with bcrypt
- JWT tokens with expiration
- Input validation
- Rate limiting
- CORS configuration
- Environment variables for secrets

---

## Next Steps

1. Create backend folder structure
2. Set up MongoDB Atlas account
3. Initialize Node.js project
4. Start with authentication APIs
5. Test with Postman
6. Connect to frontend

---

**Created:** Week 6  
**Last Updated:** Week 6  
**Owner:** Sujan Tamang (Developer)
