# Design Doc v1 — Free Sewaa

---

## 1) Project purpose

**One-sentence summary:**  
Free Sewaa is a community-based platform that allows users to donate reusable items and request items from others easily.

**Why this matters:**  
Many usable items are wasted while others are in need. Free Sewaa reduces waste, supports communities, and promotes sustainability by connecting donors with people who need items.

---

## 2) Target users

- **Primary user:**  
  Community users (students, individuals, families) looking for free items  

- **Secondary user (if any):**  
  Donors who want to give away items  

- **What they need:**  
  - Easy way to browse available items  
  - Simple way to post donation items  
  - Quick way to request items  
  - Clear communication with donors  

---

## 3) MVP scope

### In scope now
- Browse available items  
- View item details  
- Request an item  
- Basic donate item form (UI level)  
- Simple navigation between screens  

### Out of scope for now
- Real-time chat or messaging  
- Payment or delivery system  
- Notifications (email/push)  
- Admin dashboard  
- Recommendation system  

---

## 4) Core user flow

Describe the basic flow in 3-5 steps:

1. User opens the Home page  
2. User clicks “Browse Items”  
3. User searches or selects an item  
4. User views item details  
5. User clicks “Request Item” and submits request  

---

## 5) Architecture (C4-lite)

### Context view
- **users:** Donor, Receiver  
- **main system:** Free Sewaa Web App  
- **outside systems/services:** Database, Authentication Service  

### Container view
- **frontend:**  
  HTML, CSS, JavaScript UI (Home, Browse, Detail, Request, Donate)

- **backend:**  
  API server handling requests, validation, and business logic  

- **database:**  
  Stores users, items, and request data  

- **other service (if needed):**  
  Authentication Service for login/signup  

---

### Diagram or image
```text
[User]
   ↓
[Frontend UI]
   ↓
[Backend API]
   ↓
[Database]

(Backend also connects to Authentication Service)
6) Wireframes
Screen 1 - Entry / Home
purpose: Introduce platform and guide user actions
main action: Browse Items or Donate Item
image / sketch:
+----------------------------------+
| Free Sewaa                       |
|----------------------------------|
| Give What You Don’t Need         |
| Get What You Do                  |
|                                  |
| [ Donate Item ]                  |
| [ Browse Items ]                 |
+----------------------------------+
Screen 2 - Core Task
purpose: Allow users to browse and select items
main action: Select item
image / sketch:
+----------------------------------+
| Browse Items                     |
|----------------------------------|
| [ Search... ]                    |
|                                  |
| [ Item Card ]  [ Item Card ]     |
| Title           Title            |
| Location        Location         |
+----------------------------------+
Screen 3 - Result / Detail / Confirmation
purpose: Show item details and allow request
main action: Request item
image / sketch:
+----------------------------------+
| Item Detail                      |
|----------------------------------|
| Title                            |
| Description                      |
| Location                         |
|                                  |
| [ Request Item ]                 |
+----------------------------------+
7) Sprint 1 plan
Top goals
Build Home page UI
Build Browse Items page
Build Item Detail page
Initial issues / work chunks
Issue: Create landing page UI
Issue: Implement item listing layout
Issue: Build item detail page
Issue: Create request button + modal
8) Risks / assumptions
Risks
Team members may face setup issues
Backend integration may take longer than expected
Assumptions
Users understand basic navigation
Initial users will use web version only
9) Scope cut list

If time runs short, cut these first:

Donate item form backend logic
Advanced filtering system
10) Evidence links
Board link: (Add GitHub project board link)
Sprint Packet link: (Add sprint issue link)
Related issues: (Add issue links)
Related PRs (later): (Add PR links)
11) Quality check
 project purpose is clear
 target users are specific
 MVP scope is realistic
 architecture is included
 3 wireframes are included
 Sprint 1 goals are small enough to demo
 risks are honest 
 evidence links are included where possible
