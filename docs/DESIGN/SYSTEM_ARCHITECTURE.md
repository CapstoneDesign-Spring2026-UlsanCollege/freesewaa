
# Architecture Sketch — Free Sewaa

---

## 1) Architecture summary

**System name:**  
Free Sewaa

**Main users:**  
- Donor (posts items for donation)  
- Receiver / Community User (browses and requests items)  

**Main job of the system:**  
Enable users to donate reusable items and allow others to browse and request them through a simple web platform.

---

## 2) Context view

### Fill this in

**Users**
- Donor: creates listings, manages items, responds to requests  
- Receiver: browses items, views details, sends requests  

**Main system**
- Free Sewaa Web Application  

**External services / systems**
- Database (stores users, items, requests)  
- Authentication Service (login/signup handling)  

---

### Simple text version

```md
[Donor] ----------------------> [Free Sewaa Web App] ----------------------> [Database]
[Receiver] -------------------> [Free Sewaa Web App] ----------------------> [Database]
[Free Sewaa Web App] ---------> [Authentication Service]
````

---

### Notes

* Donors upload item details such as title, category, description, and location
* Receivers search, filter, and request items
* The Database stores all users, listings, and request records
* Authentication ensures only logged-in users can post or request items

---

## 3) Container view

### Fill this in

**Frontend / UI**

* main screens:

  * Home (Landing Page)
  * Browse Items Page
  * Item Detail Page
  * Request Item Modal
  * Donate Item Form
  * My Items Page

* key actions:

  * Browse items
  * Search and filter listings
  * View item details
  * Request an item
  * Post a donation item
  * Manage personal listings

---

**Backend / Logic**

* main responsibilities:

  * Handle API requests from frontend
  * Manage item creation and retrieval
  * Process item request submissions
  * Link users with their items and requests
  * Control access for authenticated users

* validation / rules:

  * Required fields must be filled (title, category, description, location)
  * Only authenticated users can post or request items
  * Each request must be linked to a valid item
  * Input data must be validated before storing

---

**Database / Storage**

* main data stored:

  * Users (name, email, password)
  * Items (title, category, description, location, condition)
  * Requests (user ID, item ID, message, status)
  * Ownership data (which user posted which item)

---

**Other service (if needed)**

* service: Authentication Service
* purpose: Manage login, signup, and user identity

---

### Simple text version

```md
[Frontend / UI]
  -> sends requests to [Backend / API]
  -> receives item data and request status

[Backend / API]
  -> handles logic and validation
  -> manages users, items, and requests
  -> stores data in [Database]
  -> communicates with [Authentication Service]

[Database]
  -> stores users / items / requests
```

---

### Expanded container sketch

```md
[Frontend UI]
(Home | Browse | Detail | Donate | My Items)
                |
                v
        [Backend / API Server]
        - item management
        - request handling
        - validation
        - access control
           /          \
          v            v
   [Database]   [Authentication Service]
   - users      - login/signup
   - items      - session/token check
   - requests
```

---

## 4) Sprint 1 focus

**What part are we actually building first?**

* Frontend MVP including Home page, Browse page, Item Detail page, and Request flow UI

**What is out of scope for now?**

* Real-time chat or messaging system
* Payment or delivery system
* Advanced admin dashboard
* Recommendation system
* Push notifications

---

## 5) Quality check

* [x] users are visible
* [x] the system is visible
* [x] major internal parts are visible
* [x] external dependencies are visible
* [x] the diagram matches our MVP
* [x] the diagram matches our wireframes
* [x] the diagram is small enough to explain in 30 seconds

---

## 6) Example labels you can steal

Good labels:

* Donor
* Receiver
* Free Sewaa Web App
* Frontend UI
* Backend API
* Database
* Authentication Service

---

## Final rule

This architecture is specific enough to directly create Sprint issues such as:

* Build Home page UI
* Build Browse Items page
* Build Item Detail page
* Implement Request Item modal
* Set up backend API routes
* Design database schema (users, items, requests)
* Implement authentication system

```

---

