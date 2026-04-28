# Weekly Sprint Packet — Week 6

## MVP Link
https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/releases/tag/v1.0

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

# Current Status Overview

## ✅ DONE

- Premium frontend UI (Home, Browse, Donate, Chat pages)
- Browse page with search and category filtering
- Donate page with image upload and live preview
- User authentication flow (login/logout)
- Documentation templates and sprint packets
- Bug fixes (timestamp, chat button)
- **Backend API (Node.js/Express + MongoDB)**
- **PR #61: Backend API merged**

## 🚧 IN PROGRESS

- Database integration (MongoDB Atlas setup)
- Frontend-backend connection

---

# ❌ REMAINING WORK

### High Priority - Open Issues

| # | Issue | Tasks Left |
|---|-------|------------|
| **#26** | Category Filter | - Complete UI update on filter select<br>- Mark "Done when" items as complete |
| **#21** | Request/Contact Flow | - Frontend confirmation message<br>- Donor contact display<br>- Request button feedback |
| **#20** | Form Validation | - Required field indicators<br>- Better placeholders/labels<br>- Clear success messages |

### Medium Priority - UI Polish

| Task | Details |
|------|---------|
| **UI Consistency** | - Spacing uniformity<br>- Button style consistency<br>- Page layout alignment<br>- Responsive/mobile view check |
| **Navigation Clarity** | - Easy movement between Home, Browse, Post Item, Profile<br>- Consistent nav bar across pages |
| **Demo Polish** | - Clean demo path (3-5 steps)<br>- No broken buttons<br>- No dummy/placeholder text in key areas |
| **README Cleanup** | - Remove outdated "planned" wording<br>- Match features to actual app<br>- Add Week 6 progress |

### Backend Next Steps

| Task | Details |
|------|---------|
| **MongoDB Setup** | Create free MongoDB Atlas cluster |
| **Connect Frontend** | Replace localStorage with API calls |
| **Test API** | Verify all endpoints work with Postman |

---

# Open GitHub Issues

| # | Issue | Priority | Owner |
|---|-------|----------|-------|
| #26 | Category filter for item listings | High | (assign) |
| #21 | Request/contact donor confirmation | High | (assign) |
| #20 | Item posting form validation | High | (assign) |

---

# Pull Requests

| # | PR | Status | Author |
|---|-----|--------|--------|
| #61 | Backend API (Node.js/Express) | Open | Swarnim Jung Karki |

---

# Full Vertical Slice Target

```
Post Item → Browse Item → Request Item → Contact/Confirmation
```

---

# Demo

**Demo Link:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/releases/tag/v1.0

**Backup Demo:** *(add backup video or screenshots here)*

---

### Demo Script

1. Introduce **Free Sewaa**, a community donation platform.
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

# Project Board

**Project Board:** https://github.com/orgs/CapstoneDesign-Spring2026-UlsanCollege/projects/14/views/1

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
- **Created complete Node.js/Express backend API**
- **PR #61: Backend API submitted**

## What Broke / Problems

- Browse page items showed "Just now" forever (timestamp issue)
- Chat button didn't pass item context to chat page
- Some documentation files had inconsistent naming
- Backend not connected to frontend yet

## How It Was Fixed

- Changed donate.js to save timestamp as number instead of string
- Updated browse.html to pass item ID to chat via URL parameter
- Created backend API with all necessary endpoints

## Next Sprint Plan

- ~~Set up Node.js/Express backend~~ ✅ DONE
- Merge PR #61
- Set up MongoDB Atlas
- Connect frontend to backend API
- Complete frontend polish (issues #20, #21, #26)
- Implement real authentication
- Add database integration

## Risks / Blockers

- MongoDB Atlas setup required
- Frontend-backend connection complexity
- Team coordination for merging PRs

---

# Individual Contribution Receipts

---

### Swarnim Jung Karki (Scribe)

**Commits:**
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/07288ffe257548a3b0433f71c51dd230331549f6
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/b716c3974cf4ef5b91400ab15409931378c187a8
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/56905ddeea9c0358c0b9bbcd449545d807c5ab2e
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/e331937
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/e5c7db2
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/22da582
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/2ec0476
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/0f52ea2
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/585cc74

**Pull Requests:**
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/61

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
- Added remaining work status to sprint packet
- Created BACKEND_PLAN.md
- **Created complete Node.js/Express backend API**
- **Created PR #61 for backend implementation**

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
