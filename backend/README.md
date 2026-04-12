# Free Sewaa — Backend API

A Node.js/Express backend API for Free Sewaa, a community donation platform.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Rate Limiting:** express-rate-limit
- **API Docs:** Swagger/OpenAPI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

```bash
cd backend
npm install
```

### Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/free-sewaa
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

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
| GET | /api/users/:id/items | Get user's items |

### Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/items | Get all items |
| GET | /api/items/my-items | Get my items |
| GET | /api/items/:id | Get single item |
| POST | /api/items | Create item |
| PUT | /api/items/:id | Update item |
| DELETE | /api/items/:id | Delete item |

### Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/requests | Create request |
| GET | /api/requests/my-requests | Get my requests |
| GET | /api/requests/received | Get requests for my items |
| GET | /api/requests/:id | Get request details |
| PUT | /api/requests/:id/status | Update request status |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/messages | Send message |
| GET | /api/messages/conversations | Get all conversations |
| GET | /api/messages/unread | Get unread count |
| GET | /api/messages/:conversationId | Get conversation messages |
| PUT | /api/messages/:id/read | Mark message as read |

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   ├── requestController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Request.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── items.js
│   │   ├── requests.js
│   │   ├── messages.js
│   │   └── users.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| JWT_EXPIRES_IN | Token expiration time |
| NODE_ENV | Environment (development/production) |

## License

MIT
