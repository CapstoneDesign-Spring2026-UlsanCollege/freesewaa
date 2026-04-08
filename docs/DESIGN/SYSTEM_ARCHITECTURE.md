# System Architecture — Free Sewaa

---

## Overview

**System Name:** Free Sewaa  
**Type:** Full-stack Web Application (MERN Stack)  
**Purpose:** Community donation platform connecting donors with people who need reusable items

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   Home      │  │   Browse    │  │   Donate    │  │   Chat      │       │
│  │   Page      │  │   Page      │  │   Page      │  │   Page      │       │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘       │
│         │                 │                 │                 │              │
│         └─────────────────┴────────┬────────┴─────────────────┘              │
│                                   │                                           │
│                          ┌────────▼────────┐                                 │
│                          │   JavaScript    │                                 │
│                          │    (api.js)     │                                 │
│                          └────────┬────────┘                                 │
└───────────────────────────────────┼───────────────────────────────────────────┘
                                    │ HTTP/HTTPS
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER (Backend)                              │
│  ┌─────────────────────────────────────────────────────────────────────┐       │
│  │                        Express.js Server                             │       │
│  │                         (Port 3000)                                  │       │
│  └─────────────────────────────────────────────────────────────────────┘       │
│                                    │                                           │
│         ┌──────────────────────────┼──────────────────────────┐               │
│         │                          │                          │               │
│  ┌──────▼──────┐           ┌──────▼──────┐           ┌──────▼──────┐        │
│  │    Auth     │           │    Items    │           │  Messages   │        │
│  │   Routes    │           │   Routes    │           │   Routes    │        │
│  │ /api/auth/* │           │ /api/items/*│           │/api/messages│        │
│  └──────┬──────┘           └──────┬──────┘           └──────┬──────┘        │
│         │                          │                          │               │
│  ┌──────▼──────┐           ┌──────▼──────┐           ┌──────▼──────┐        │
│  │   Auth      │           │    Item     │           │   Message   │        │
│  │ Controller  │           │ Controller  │           │ Controller  │        │
│  └──────┬──────┘           └──────┬──────┘           └──────┬──────┘        │
│         │                          │                          │               │
│         └──────────────────────────┼──────────────────────────┘               │
│                                    │                                           │
│  ┌─────────────────────────────────▼─────────────────────────────────────┐   │
│  │                          Middleware Layer                                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │    CORS     │  │  JWT Auth    │  │  Validator  │  │   Logger    │   │   │
│  │  │  Middleware │  │  Middleware  │  │  Middleware │  │  Middleware │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER (MongoDB)                                │
│                                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐               │
│  │     Users       │  │     Items       │  │    Requests     │               │
│  │   Collection    │  │   Collection    │  │   Collection    │               │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤               │
│  │ - name          │  │ - title         │  │ - itemId        │               │
│  │ - email         │  │ - description   │  │ - requesterId   │               │
│  │ - password (hash)│ │ - category     │  │ - message       │               │
│  │ - phone         │  │ - images[]     │  │ - status        │               │
│  │ - address       │  │ - donorId      │  │ - createdAt     │               │
│  │ - createdAt    │  │ - status        │  └─────────────────┘               │
│  └─────────────────┘  │ - createdAt    │                                    │
│                       └─────────────────┘                                    │
│                                                                          │     │
│                                           ┌─────────────────┐              │     │
│                                           │    Messages     │              │     │
│                                           │   Collection    │              │     │
│                                           ├─────────────────┤              │     │
│                                           │ - senderId      │              │     │
│                                           │ - recipientId   │              │     │
│                                           │ - content       │              │     │
│                                           │ - read          │              │     │
│                                           │ - createdAt     │              │     │
│                                           └─────────────────┘              │     │
└───────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL SERVICES                                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐               │
│  │   MongoDB Atlas  │  │     JWT          │  │   Swagger UI    │               │
│  │   (Cloud DB)     │  │  (Auth Tokens)  │  │   (API Docs)    │               │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘               │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | HTML5, CSS3, JavaScript | User interface |
| **API Client** | Fetch API | HTTP communication |
| **Backend** | Node.js, Express.js | Server logic |
| **Database** | MongoDB | Data storage |
| **Authentication** | JWT | Secure sessions |
| **API Documentation** | Swagger/OpenAPI | API reference |
| **Cloud** | MongoDB Atlas | Database hosting |

---

## Data Flow

### 1. User Registration
```
User Form → /api/auth/register → Controller → User Model → MongoDB
```

### 2. User Login
```
User Form → /api/auth/login → Controller → Validate → JWT Generated → User
```

### 3. Browse Items
```
Browse Page → GET /api/items → Controller → Item Model → MongoDB → Items List
```

### 4. Create Item (Donation)
```
Donate Form → POST /api/items → JWT Validation → Controller → Item Model → MongoDB
```

### 5. Request Item
```
Request Form → POST /api/requests → JWT Validation → Controller → Request Model → MongoDB
```

### 6. Send Message
```
Chat Form → POST /api/messages → JWT Validation → Controller → Message Model → MongoDB
```

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String (default: "user"),
  createdAt: Date
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
  images: [String] (base64),
  donor: { _id: ObjectId, name: String },
  status: String (enum: ["available", "reserved", "donated"]),
  createdAt: Date
}
```

### Requests Collection
```javascript
{
  _id: ObjectId,
  item: ObjectId (ref: Items),
  requester: { _id: ObjectId, name: String },
  message: String,
  status: String (enum: ["pending", "accepted", "rejected"]),
  createdAt: Date
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  sender: ObjectId (ref: Users),
  recipient: ObjectId (ref: Users),
  content: String,
  read: Boolean (default: false),
  createdAt: Date
}
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### Items
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/items` | List all items | No |
| GET | `/api/items/my-items` | List user's items | Yes |
| GET | `/api/items/:id` | Get item details | No |
| POST | `/api/items` | Create new item | Yes |
| PUT | `/api/items/:id` | Update item | Yes |
| DELETE | `/api/items/:id` | Delete item | Yes |

### Requests
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/requests` | Create request | Yes |
| GET | `/api/requests/my-requests` | User's requests | Yes |
| GET | `/api/requests/received` | Received requests | Yes |
| GET | `/api/requests/:id` | Get request | Yes |
| PUT | `/api/requests/:id/status` | Accept/Reject | Yes |

### Messages
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/messages` | Send message | Yes |
| GET | `/api/messages/conversations` | List conversations | Yes |
| GET | `/api/messages/:id` | Get conversation | Yes |
| PUT | `/api/messages/:id/read` | Mark as read | Yes |
| GET | `/api/messages/unread` | Unread count | Yes |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/:id` | Get user profile | Yes |
| PUT | `/api/users/:id` | Update profile | Yes |
| GET | `/api/users/:id/items` | User's items | Yes |

---

## Security

- **Password:** Hashed with bcryptjs
- **Authentication:** JWT tokens with 7-day expiry
- **API Protection:** Middleware validates all protected routes
- **Input Validation:** express-validator sanitizes inputs
- **CORS:** Configured for frontend domain

---

## Deployment

| Component | Service | URL |
|-----------|---------|-----|
| Frontend | Vercel | Pending |
| Backend | Render | https://free-sewaa-api.onrender.com |
| Database | MongoDB Atlas | Cloud-hosted |

---

## File Structure

```
backend/
├── src/
│   ├── server.js           # Entry point
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   └── swagger.js     # Swagger config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── itemController.js
│   │   ├── requestController.js
│   │   └── messageController.js
│   ├── middleware/
│   │   └── auth.js        # JWT verification
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Request.js
│   │   └── Message.js
│   └── routes/
│       ├── auth.js
│       ├── users.js
│       ├── items.js
│       ├── requests.js
│       └── messages.js
├── .env                   # Environment variables
├── .env.example           # Template
└── package.json
```
