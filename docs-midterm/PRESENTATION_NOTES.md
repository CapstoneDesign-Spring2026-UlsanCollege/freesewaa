# Presentation Notes - Midterm Demo

## Demo Flow Script

### 1. Introduction (30 seconds)
**Speaker: Ram Pathak, Sujan Tamang**

"Free Sewaa is a community donation platform that helps people give away reusable items for free to those who need them."

- Problem: People throw away usable items, others need them but don't know where to get
- Solution: A web platform connecting donors with recipients

---

### 2. Live Demo (3-4 minutes)
**Demo: Mohan Khadka**

#### Step 1: Homepage
1. Open browser → http://localhost:3000
2. Show homepage with featured items
3. Click "Browse Items" → show item grid

#### Step 2: User Registration
1. Click "Sign Up"
2. Fill form: name, email, password
3. Submit → redirect to profile

#### Step 3: Browsing Items
1. Show category filters (Electronics, Furniture, Clothing, Books, Other)
2. Show item cards with images
3. Click on an item → show details

#### Step 4: Requesting an Item
1. Click "Request This Item"
2. Add message to donor
3. Submit request

#### Step 5: Donor View
1. Show notification for new request
2. View requester profile
3. Accept/Decline request

#### Step 6: Messaging
1. Show message thread
2. Send message between donor and recipient
3. Arrange pickup location

---

### 3. Technical Overview (30 seconds)
**Speaker: Sujan Shrestha**

- Frontend: HTML, CSS, JavaScript (vanilla)
- Backend: Node.js with Express
- Database: Local JSON files (MongoDB ready)
- Authentication: Session-based

---

### 4. Q&A Preparation

| Question | Answer |
|----------|--------|
| Why not use real database? | JSON for MVP, MongoDB PR ready for post-midterm |
| How do users trust each other? | Rating system planned for post-midterm |
| Is this mobile-friendly? | Basic responsive - full mobile in Phase 2 |
| How do you handle issues? | Our 9 bugs documented in docs/ISSUES/ |

---

### 5. Backup Plan
**Sujan Shrestha**: If demo fails
- Show pre-recorded video
- Show screenshots in presentation

---

### 6. Demo Credentials

| Account | Email | Password | Role |
|---------|-------|----------|------|
| Donor | alisha@example.com | demo123 | Donor |
| Recipient | ramas@example.com | demo123 | Requester |

---

### 7. Key Features to Highlight

- [x] User registration/login
- [x] Browse items by category
- [x] Search functionality
- [x] Request items
- [x] Message system
- [x] Item status tracking
- [x] User profiles

---

### 8. Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Server won't start | `cd server && node server.js` |
| Port in use | Kill process on port 3000 |
| Login fails | Use demo credentials above |

---

*For internal use only - Week 8 Midterm*