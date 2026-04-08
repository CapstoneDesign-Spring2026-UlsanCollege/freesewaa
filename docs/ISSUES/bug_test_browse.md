## Bug: Browse page not showing donated items correctly

### Description
Items posted from the Donate page don't display correctly on the Browse page because of a data mismatch.

### Steps to Reproduce
1. Go to Donate page
2. Fill out the form and post an item
3. Go to Browse page
4. Item appears but time shows incorrectly (says "Just now" forever)

### Expected Behavior
- Items should show correct time (e.g., "5m ago", "2h ago")
- Items should persist and update time as expected

### Actual Behavior
- Time field is saved as string "Just now" instead of timestamp
- browse.js uses `item.timestamp` but donate.js saves `item.posted = "Just now"`
- Time never updates correctly

### Files Affected
- `js/donate.js` - saves wrong time format
- `js/browse.js` - expects timestamp but gets string

### Suggested Fix
In `donate.js`, change:
```javascript
posted: "Just now"
```
to:
```javascript
timestamp: Date.now()
```

Then in `browse.js`, use `item.timestamp` for the timeAgo function.

---

## Bug: Chat button on item cards not passing item context

### Description
When clicking "Chat with Donor" from item modal, no item information is passed.

### Files Affected
- `browse.html` - modal chat link

### Suggested Fix
Pass item ID via URL parameter:
```javascript
href="chat.html?itemId=${item.id}"
```

---

## Bug: Items saved to localStorage but browse page shows empty

### Description
Items saved from donate page may not appear on browse page if localStorage is empty or corrupted.

### Suggested Fix
Add sample items to localStorage on first load if empty, for demo purposes.

---

## Backend Testing Checklist

### API Endpoints Needed
- [ ] GET /api/items - Fetch all items
- [ ] POST /api/items - Create new item
- [ ] GET /api/items/:id - Get single item
- [ ] DELETE /api/items/:id - Delete item
- [ ] POST /api/auth/login - User login
- [ ] POST /api/auth/signup - User registration
- [ ] GET /api/users/:id/items - Get user's items

### Database Schema
- [ ] Users collection (name, email, password, createdAt)
- [ ] Items collection (title, description, category, condition, location, image, donorId, createdAt)
- [ ] Messages collection (senderId, receiverId, itemId, message, createdAt)

### Authentication
- [ ] JWT token generation
- [ ] Password hashing
- [ ] Protected routes middleware

### Testing
- [ ] Test all API endpoints with Postman
- [ ] Test frontend-backend integration
- [ ] Test authentication flow
- [ ] Test error handling

---

## Owner
- **Name:** Swarnim Jung Karki
- **Role:** QA Lead
- **Status:** Reported
