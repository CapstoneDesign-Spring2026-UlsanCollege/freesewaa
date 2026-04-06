# Design Doc v1 — Free Sewaa

---

## 1) Project purpose

**One-sentence summary:**  
Free Sewaa is a community-based platform that allows users to donate reusable items and request items from others easily.

**Why this matters:**  
Many usable items are wasted while others are in need. Free Sewaa helps reduce waste, supports communities, and promotes sustainability by connecting donors with people who need useful items.

---

## 2) Target users

- **Primary user:**  
  Community users such as students, individuals, and families looking for free reusable items  

- **Secondary user (if any):**  
  Donors who want to give away items they no longer need  

- **What they need:**  
  - An easy way to browse available items  
  - A simple way to post donation items  
  - A quick way to request items  
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

Describe the basic flow in 3–5 steps:

1. User opens the Home page  
2. User clicks **Browse Items**  
3. User searches for or selects an item  
4. User views item details  
5. User clicks **Request Item** and submits a request  

---

## 5) Architecture (C4-lite)

### Context view
- **users:** Donor, Receiver  
- **main system:** Free Sewaa Web App  
- **outside systems/services:** Database, Authentication Service  

### Container view
- **frontend:**  
  HTML, CSS, and JavaScript UI for Home, Browse, Detail, Request, and Donate pages  

- **backend:**  
  API server handling requests, validation, and business logic  

- **database:**  
  Stores users, items, and request data  

- **other service (if needed):**  
  Authentication Service for login and signup  

### Diagram or image
```text
[User]
   ↓
[Frontend UI]
   ↓
[Backend API]
   ↓
[Database]

[Backend API] ↔ [Authentication Service]

6) Wireframes
Screen 1 - Entry / Home

purpose: Introduce the platform and guide user actions
main action: Browse Items or Donate Item

image / sketch:

+----------------------------------+
| Free Sewaa                       |
|----------------------------------|
| Give What You Don’t Need         |
| Get What You Do                  |
|                                  |
| [ Donate Item ] [ Browse Items ] |
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
Issue: Create request button and modal

8) Risks / assumptions
Risks
Team members may face setup issues
Backend integration may take longer than expected
Assumptions
Users understand basic navigation
Initial users will use the web version only
9) Scope cut list

If time runs short, cut these first:

Donate item form backend logic
Advanced filtering system

## 10) Evidence links

- **Board link:** https://github.com/orgs/CapstoneDesign-Spring2026-UlsanCollege/projects/14/views/1
- **Sprint Packet link:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/22
- **Related issues:**  
  - https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/19  
  - https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/20  
  - https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/21  
  - https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/22  
  - https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/26  

- **Related PRs (later):**  
  - https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/24  
  - https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/23  
  - https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/13
