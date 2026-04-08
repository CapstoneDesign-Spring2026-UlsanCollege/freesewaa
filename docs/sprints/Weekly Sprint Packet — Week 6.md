# Weekly Sprint Packet — Week 6

## Team

**Team Name:** Free Sewaa  
**Repository:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa  
**Sprint:** Week 6 — Backend Setup & Feature Integration

---

### Sprint Roles (Week 6)

| Role            | Team Member        |
| --------------- | ------------------ |
| Project Manager | Ram Pathak         |
| Scribe          | Swarnim Jung Karki |
| QA Lead         | Sujan Shrestha     |
| Demo Driver     | Mohan Khadka       |
| Developer       | Sujan Tamang       |

---

# Demo

**Demo Link:** *(add working demo link here)*

**Backup Demo:** *(add backup video or screenshots here)*

---

### Demo Script

1. Introduce **Free Sewaa**, a community donation platform connecting donors with people who need reusable items.
2. Show the **homepage** with premium UI design.
3. Demonstrate **user authentication** (login/logout flow).
4. Show the **browse page** with item cards and category filtering.
5. Demonstrate **posting a donation item** with live preview.
6. Show the **chat system** for donor-receiver communication.
7. Highlight GitHub evidence: **issues, pull requests, and commits**.

---

# Backup Demo Plan

If the live demo fails, present:

- Screenshots of all pages (Home, Browse, Donate, Chat)
- Recorded demo video
- GitHub commits and pull requests

---

# Project Board Snapshot

**Project Board:** https://github.com/orgs/CapstoneDesign-Spring2026-UlsanCollege/projects/14/views/1

---

# Current Board State

### To Do

- Backend API integration planning
- Database schema design
- User authentication with JWT

### Doing

- Frontend-backend connection setup
- API endpoints development
- Code review and testing

### Done

- Premium frontend UI completed
- Browse page with filtering
- Donate page with image upload
- Chat system UI
- All documentation templates updated

---

# Current Status Overview

## ✅ DONE

- Premium frontend UI (Home, Browse, Donate, Chat pages)
- Browse page with search and category filtering
- Donate page with image upload and live preview
- User authentication flow (login/logout)
- Documentation templates and sprint packets
- Bug fixes (timestamp, chat button)

## 🚧 IN PROGRESS

- Backend API development
- Database integration planning

## ❌ REMAINING (Priority Order)

### High Priority

1. **Backend Setup**
   - Set up Node.js/Express server
   - Create database schema (Users, Items, Messages)
   - Implement REST API endpoints

2. **User Authentication**
   - Connect frontend to backend auth
   - JWT token implementation
   - Password hashing

3. **Request/Contact Flow** (Issue #21)
   - Implement item request functionality
   - Add donor confirmation step
   - Contact confirmation flow

4. **Form Validation** (Issue #20)
   - Complete form validation improvements
   - Error handling and user feedback

### Medium Priority

5. **Category Filter Completion** (Issue #26)
   - Finish category filter implementation
   - Update UI dynamically

6. **Real Database Integration**
   - MongoDB setup
   - Connect localStorage to database

7. **Real-time Chat**
   - Socket.io or Firebase integration
   - Live message updates

### Low Priority

8. **Update README**
   - Remove "planned" status from completed features
   - Update project status

---

# Open GitHub Issues

| # | Issue | Status | Owner |
|---|-------|--------|-------|
| #26 | Implement category filter for item listings | Open | (assign) |
| #21 | Implement request and contact donor confirmation flow | Open | (assign) |
| #20 | Improve item posting form validation | Open | (assign) |

---

# Full Vertical Slice Target

The core user flow to complete:

```
Post Item → Browse Item → Request Item → Contact/Confirmation
```

This is the main goal outlined in the README.

---

# Sprint Notes

## What Shipped

- Completed premium frontend redesign
- Fixed browse.html with full functionality (search, filtering, modal view)
- Updated documentation templates
- Fixed sprint packet filenames
- Added bug_report.yml template
- Created Week 6 sprint packet
- Updated QUESTIONS.md document
- Fixed time display bug in browse page
- Fixed chat button to pass item ID

## What Broke / Problems

- Browse page items showed "Just now" forever (timestamp issue)
- Chat button didn't pass item context to chat page
- Some documentation files had inconsistent naming

## How It Was Fixed

- Changed donate.js to save timestamp as number instead of string
- Updated browse.html to pass item ID to chat via URL parameter
- Created browse.html with full functionality

## Next Sprint Plan

- Set up Node.js/Express backend
- Connect frontend to API
- Implement real authentication
- Add database integration

  # 🚀 Sprint Packet — Sprint 6 (Week 6)

---

## Team

**Team Name:** Free Sewaa
**Repository:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa
**Sprint:** Sprint 6 — Week 6 (Backend Integration & Core System Features)

---

### Sprint Roles

| Role            | Team Member        |
| --------------- | ------------------ |
| Project Manager | Sujan Shrestha     |
| Scribe          | Mohan Khadka       |
| QA Lead         | Ram Pathak         |
| Demo Driver     | Swarnim Jung Karki |
| Developer       | Sujan Tamang       |

---

# 🎬 Demo

**Backup Demo:**

(Add demo video or screenshots here)

---

### 🎯 Demo Script

* Introduce Free Sewaa as a community-based donation platform
* Explain transition from frontend-only to backend-supported system

**Demonstrate:**

* Backend integration (Node.js / Firebase)
* Data handling for item posting
* Real-time chat system (UI or concept)
* User profile dashboard (My Items / My Requests)
* Notification system design
* Security improvements (validation and authentication)
* GitHub workflow (Issue → Branch → Commit → PR)

---

# 🧯 Backup Demo Plan

If live demo fails:

* Show screenshots of:

  * Backend structure
  * Form data flow
  * Chat/profile UI
* Show GitHub commits and pull requests
* Explain system architecture

---

# 📊 Board Snapshot

### To Do

* Complete backend API integration
* Fully implement real-time chat system
* Finalize notification system
* Improve authentication and validation

### Doing

* Backend setup (Node.js / Firebase)
* Connecting frontend to backend
* Designing chat and profile system
* Testing data flow

### Done

* Planned backend architecture
* Initial backend integration setup
* Designed user profile dashboard
* Defined notification system structure
* Improved validation logic
* Practiced GitHub workflow

---

# 👥 Owners

| Responsibility          | Owner              |
| ----------------------- | ------------------ |
| Sprint coordination     | Sujan Shrestha     |
| Documentation & notes   | Mohan Khadka       |
| QA testing & validation | Ram Pathak         |
| Demo presentation       | Swarnim Jung Karki |
| Backend & development   | Sujan Tamang       |

---

# ✅ Definition of Done

* [ ] Backend is set up (Node.js or Firebase)
* [ ] Frontend is connected to backend
* [ ] Form data is handled correctly
* [ ] Chat system is designed or partially implemented
* [ ] User profile dashboard is created
* [ ] Validation is working properly
* [ ] Basic authentication is implemented
* [ ] No major errors in system
* [ ] Code is committed and pushed
* [ ] Pull Request is created



---

# 🧠 Sprint Notes

## 🚀 What Shipped

* Backend integration concept (Node.js / Firebase)
* System architecture planning
* Real-time chat system design
* User profile dashboard design
* Notification system planning
* Improved validation and security basics
* Full GitHub workflow practice

---

## ❌ What Broke

* Backend not fully integrated
* Chat system incomplete
* Data not stored permanently
* Some features still in design phase

---

## 🔧 How It Was Fixed

* Improved system planning
* Tested basic backend connections
* Fixed validation issues
* Broke work into smaller tasks

---

## 🔜 Next Sprint Plan (Sprint 7)

* Complete backend integration
* Fully implement chat system
* Connect dashboard with real data
* Add notifications
* Improve authentication

---

## ⚠️ Risks / Blockers

* Backend complexity
* Real-time chat challenges
* Time constraints
* Integration issues

---

# 📌 Individual Contribution Receipts

Each member must provide:

* GitHub commits
* Pull Requests
* Issues
* Screenshots

---

### Mohan Khadka

* Commits: (add links)
* PR: (add link)
* Issues: (add link)

### Sujan Tamang

* Commits: (add links)
* PR: (add link)

### Ram Pathak

* QA testing
* Validation

### Swarnim Jung Karki

* Demo
* Presentation

### Sujan Shrestha

* Sprint coordination
* Project management

---

## 📍 Save File As

docs/sprints/Weekly Sprint Packet — Week 6.md


## Risks / Blockers

- Backend integration complexity
- Time constraints for feature development
- Team coordination for merging

---

# Individual Contribution Receipts

---

### Swarnim Jung Karki (Scribe)

**Commits:**
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/07288ffe257548a3b0433f71c51dd230331549f6 (Update SYSTEM_ARCHITECTURE.md)
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/b716c3974cf4ef5b91400ab15409931378c187a8 (Add Frontend Notes document)
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/56905ddeea9c0358c0b9bbcd449545d807c5ab2e (Update Design Doc V1)
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/e331937 (Add Week 6 sprint packet)

**Pull Requests:**
- *(add PR links)*

**Issues:**
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/26

**Work Done:**
- Created browse.html with search, filtering, and modal functionality
- Fixed time display bug in donate/browse flow
- Fixed chat button to pass item context
- Updated SYSTEM_ARCHITECTURE.md
- Added Frontend_Design.md documentation
- Updated DESIGN_DOC-V1.md
- Created Week 6 Sprint Packet
- Updated QUESTIONS.md document
- QA testing and bug reporting

---

### Ram Pathak

**Commits:**
- *(add commit links)*

**Pull Requests:**
- *(add PR links)*

**Issues:**
- *(add issue links)*

---

### Sujan Shrestha

**Commits:**
- *(add commit links)*

**Pull Requests:**
- *(add PR links)*

**Issues:**
- *(add issue links)*

---

### Mohan Khadka

**Commits:**
- *(add commit links)*

**Pull Requests:**
- *(add PR links)*

**Issues:**
- *(add issue links)*

---

### Sujan Tamang

**Commits:**
- *(add commit links)*

**Pull Requests:**
- *(add PR links)*

**Issues:**
- *(add issue links)*

---
