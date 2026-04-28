# Database Schema

Free Sewaa uses MongoDB (local or Atlas).

## Collections

### 1. users
```javascript
{
  id: String (unique),
  name: String,
  email: String (unique),
  phone: String (unique),
  password: String (hashed),
  location: String,
  bio: String,
  role: String ('user' | 'admin'),
  isBlocked: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)
- `phone` (unique)
- `id` (unique)

### 2. states
```javascript
{
  userId: String,
  currentListings: Number,
  completedDonations: Number,
  receivedItems: Number,
  rating: Number,
  lastActive: Date
}
```

### 3. listings
```javascript
{
  id: String (unique),
  userId: String,
  title: String,
  description: String,
  category: String (Electronics | Furniture | Clothing | Books | Other),
  condition: String (New | Like New | Good | Fair),
  imageUrl: String,
  status: String (available | reserved | given),
  requestCount: Number,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId`
- `category`
- `status`

### 4. requests
```javascript
{
  id: String (unique),
  listingId: String,
  requesterId: String,
  message: String,
  status: String (pending | accepted | declined),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `listingId`
- `requesterId`
- `status`

### 5. conversations
```javascript
{
  id: String (unique),
  listingId: String,
  buyerId: String,
  sellerId: String,
  lastMessage: String,
  lastMessageAt: Date,
  createdAt: Date
}
```

**Indexes:**
- `listingId`
- `buyerId`
- `sellerId`

### 6. messages
```javascript
{
  id: String (unique),
  conversationId: String,
  senderId: String,
  content: String,
  read: Boolean,
  createdAt: Date
}
```

**Indexes:**
- `conversationId`
- `senderId`

### 7. notifications
```javascript
{
  id: String (unique),
  userId: String,
  type: String (request | message | status | system),
  title: String,
  message: String,
  read: Boolean,
  link: String,
  createdAt: Date
}
```

**Indexes:**
- `userId`
- `read`

### 8. meta
```javascript
{
  key: String (unique),
  value: String
}
```

---

## Relationships

```
users ───< listings (one-to-many)
users ───< requests (one-to-many)
users ───< conversations (one-to-many)
listings ───< requests (one-to-many)
listings ───< conversations (one-to-many)
conversations ───< messages (one-to-many)
notifications ───< users (many-to-one)
```

---

## API Endpoints

| Collection | Methods |
|------------|---------|
| users | GET, POST, PUT, DELETE |
| listings | GET, POST, PUT, DELETE |
| requests | GET, POST, PUT |
| conversations | GET, POST |
| messages | GET, POST |
| notifications | GET, PUT |

---

*Last Updated: Week 8 - Midterm*