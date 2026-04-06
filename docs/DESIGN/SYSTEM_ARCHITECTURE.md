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
