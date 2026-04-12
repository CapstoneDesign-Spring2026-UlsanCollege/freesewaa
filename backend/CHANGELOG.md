# Changelog — Free Sewaa Backend

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-04-08

### Added
- Node.js/Express backend API
- MongoDB connection with Mongoose
- JWT authentication (register, login, logout)
- User, Item, Request, Message models
- CRUD operations for all resources
- Swagger API documentation at /api-docs
- Rate limiting middleware
- Database indexes for performance
- Input validation for auth endpoints

### Security
- Password hashing with bcryptjs
- JWT token-based authentication
- Rate limiting on all routes
- Input sanitization

### API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `GET /api/items` - List all items
- `POST /api/items` - Create item (auth required)
- `GET /api/items/:id` - Get item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `POST /api/requests` - Create request
- `GET /api/requests` - List requests
- `POST /api/messages` - Send message
- `GET /api/messages/conversations` - Get conversations

### Documentation
- Swagger UI available at /api-docs
- README with setup instructions
- Environment variable template (.env.example)