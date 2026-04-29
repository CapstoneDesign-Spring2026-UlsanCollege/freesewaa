# AI Code Ownership Audit

> Purpose: Prove that the team understands the project, especially the parts created or changed with AI assistance.

---

## 1) Team + Project

- **Team:** Ram Pathak, Sujan Tamang, Sujan Shrestha, **Swarnim Jung Karki**, Mohan Khadka
- **Project name:** Free Sewaa - Community Donation Platform
- **Current repo:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa
- **Current demo link:** https://free-sewaa-qh05.onrender.com
- **Date updated:** 2026-04-29

**Related:** [AI Code Ownership Audit](AI_CODE_OWNERSHIP_AUDIT.md) (this file)

---

## 2) What Our App Currently Does

Free Sewaa is a community donation platform that helps people give away reusable items for free to those who need them.

- **Feature 1:** Users can browse available items for donation
- **Feature 2:** Users can authenticate (login/signup) and create profiles
- **Feature 3:** Users can donate items and manage their donations
- **Feature 4:** Direct messaging between donors and recipients
- **Feature 5:** Item request and approval system

### Current MVP flow

Our main user can:

1. Visit the landing page and view about/contact information
2. Browse available items in the donation catalog by category
3. Create an account (signup) or login with existing credentials
4. Donate items and view their profile/history
5. Request items from other users
6. Message with donors/recipients

---

## 3) What Works Right Now

| Working item | Evidence link | Owner who can explain it |
|---|---|---|
| Homepage loads and displays correctly | [Live demo](https://free-sewaa-qh05.onrender.com) | Swarnim Jung Karki |
| Browse page shows donation items | [Live demo](https://free-sewaa-qh05.onrender.com/browse.html) | Sujan Tamang, Swarnim Jung Karki |
| Authentication flow (signup/login) | [Live demo](https://free-sewaa-qh05.onrender.com/signup.html) | Ram Pathak, Sujan Shrestha |
| User profile page displays user info | [PR #78](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) | Sujan Tamang |
| Donation form functional | [Live demo](https://free-sewaa-qh05.onrender.com/donate.html) | Ram Pathak, Sujan Shrestha |
| Responsive CSS styling | [CSS files](css/) | Swarnim Jung Karki |
| Messaging system | [server.js](server/server.js) | Sujan Shrestha, Ram Pathak |
| MongoDB backend connection | [PR #78](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) | Ram Pathak |

---

## 4) Code We Understand

| Code area | File / folder | What it does | Who can explain it? | Evidence |
|---|---|---|---|---|
| HTML structure - Home | `html/index.html` | Main landing page with navigation | Sujan Tamang, Swarnim Jung Karki | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| HTML structure - Browse | `html/browse.html` | Lists donation items for users to browse | Sujan Tamang, Swarnim Jung Karki | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| HTML structure - Donate | `html/donate.html` | Form for users to submit donation items | Sujan Tamang | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| HTML structure - Profile | `html/profile.html` | User profile page showing user details | Sujan Tamang | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| HTML structure - Auth | `html/auth.html` | Login/signup form | Sujan Tamang | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| HTML structure - About | `html/about.html` | About page for the application | Swarnim Jung Karki | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| HTML structure - Contact | `html/contact.html` | Contact form and contact information | Swarnim Jung Karki | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| HTML structure - Item detail | `html/item.html` | Individual item detail page | Sujan Tamang, Swarnim Jung Karki | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| CSS styling - Main | `css/style.css` | Base styling and layout | Swarnim Jung Karki | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| CSS styling - Theme | `css/theme.css` | Color scheme and theme variables | Swarnim Jung Karki | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| CSS styling - Auth | `css/auth.css` | Authentication page specific styles | Swarnim Jung Karki | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| JavaScript - Home page | `js/index.js` | Home page interactions and DOM manipulation | Mohan Khadka | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| JavaScript - Site-wide | `js/site.js` | Global site functionality and utilities | Mohan Khadka | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| JavaScript - Authentication | `js/auth.js` | Login/signup form validation and requests | Sujan Shrestha | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Backend - Server setup | `server/server.js` | Express server, routing, API endpoints, database | Ram Pathak | [PR #78](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) |
| Backend - Dependencies | `server/package.json` | Node.js dependencies and scripts | Sujan Shrestha | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Board Reset Kanban | `board/` | Development kanban board | Swarnim Jung Karki | [Commit cc84b3f](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/cc84b3f) |

---

## 5) Code We Do NOT Fully Understand Yet

Be honest. This is not automatically bad. Hiding it is bad.

| Code area | What is confusing? | Risk level | Owner | Next step |
|---|---|---|---|---|
| server.js async/await patterns | Error handling chain and promise resolution unclear | High | Ram Pathak | Review code comments, add inline documentation |
| MongoDB aggregation pipelines | Complex queries for filtering/sorting donations | Medium | Ram Pathak | Pair programming session or inline comments |
| Express middleware security | Password hashing and session middleware not fully reviewed | High | Ram Pathak, Sujan Shrestha | Security review before production |
| Frontend-backend API integration | How requests flow from forms to server responses | Medium | Sujan Shrestha, Mohan Khadka | API documentation needed |
| Complex database schemas | Multi-collection relationships | Medium | Ram Pathak | Add documentation |

---

## 6) AI-Assisted Work

| Area | AI tool used | What AI helped with | What humans checked/changed | Evidence |
|---|---|---|---|---|
| server.js | GitHub Copilot | Express routing setup, error handling structure, async function patterns | Ram Pathak reviewed all code, added custom error messages | [PR #78](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) |
| css/style.css | GitHub Copilot | CSS flexbox layouts, responsive breakpoints, color variable definitions | Swarnim Jung Karki reviewed styling, adjusted spacing | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| css/theme.css | GitHub Copilot | CSS variable definitions, color palette, typography scale | Swarnim Jung Karki tested, refined contrast | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| css/auth.css | GitHub Copilot | Form styling, button states, error message styling | Swarnim Jung Karki adjusted animations | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| board/App.jsx | GitHub Copilot | React component structure, DnD Kit integration | Swarnim Jung Karki reviewed, added localStorage | [Commit cc84b3f](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/cc84b3f) |

---

## 7) Bugs / Unreliable Features

| Bug / problem | Severity | Evidence link | Owner | Next action |
|---|---|---|---|---|
| Password hashing not implemented | P0 | [Issue #68](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/68) | Ram Pathak, Sujan Shrestha | Implement bcrypt before production |
| Session timeout not configured | P1 | - | Ram Pathak | Add session expiration |
| No input validation on donate form | P1 | - | Sujan Shrestha, Mohan Khadka | Add validation |
| Error messages unclear to users | P2 | - | Sujan Tamang | Improve error UX |
| No unit tests for backend | P2 | - | Ram Pathak | Write tests for API |

---

## 8) Risk List

| Risk | Why it matters | Mitigation | Owner |
|---|---|---|---|
| PR #78 unreviewed code | Security/quality | Split into smaller PRs | Ram Pathak, Sujan Shrestha |
| No unit tests for backend | Hard to maintain | Write core endpoint tests | Ram Pathak |
| MongoDB queries not optimized | Performance issues | Review queries, add indexes | Ram Pathak |
| Authentication needs security review | Passwords not hashed | Implement bcrypt | Ram Pathak, Sujan Shrestha |

---

## 9) Team Ownership Map

| Student | GitHub Username | Owned area | Can explain? | Evidence |
|---|---|---|---|---|
| Ram Pathak | Rampathak12 | Backend server, Express routing, API, MongoDB | ✅ Clear | [PR #78](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) |
| Sujan Tamang | [Username needed] | HTML pages (browse, donate, item, profile, auth) | ✅ Clear | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| **Swarnim Jung Karki** | **Swarnimkarki50** | **CSS styling (all), responsive design, documentation, Board Reset app** | **✅ Clear** | **[Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main)** |
| Sujan Shrestha | [Username needed] | JavaScript validation, API integration | Needs review | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Mohan Khadka | [Username needed] | JavaScript (index.js, site.js), DOM manipulation | ✅ Clear | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |

---

## 10) Top 3 Stabilization Goals

1. **Security & Password Hashing** - Implement bcrypt, review middleware, test login
2. **Backend API Testing** - Write unit tests for API endpoints, CI passes
3. **Input Validation & Error Handling** - Add validation to all forms

---

## 11) Sign-Off

| Team Member | GitHub Username | Date | Status |
|-----------|---|------|--------|
| Ram Pathak | Rampathak12 | 2026-04-29 | ✅ Reviewed |
| Sujan Tamang | SujanTamang20 | 2026-04-29 |  **✅ Reviewed** |
| Sujan Shrestha | [**suzmoon** ] | 2026-04-29 |  **✅ Reviewed**  |
| **Swarnim Jung Karki** | **Swarnimkarki50** | **2026-04-29** | **✅ Reviewed** |
| Mohan Khadka | [Username needed] | 2026-04-29 | ⏳ Pending |

---

## Team Members - Individual Contributions

### Ram Pathak (Rampathak12) - Backend Lead

| Area | File/Link | Evidence |
|---|---|---|
| Backend server | `server/server.js` | [PR #78](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) |
| MongoDB setup | `docs/DESIGN/MONGODB_SETUP.md` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| API endpoints | `server/server.js` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Sprint packets | `docs/sprints/` | Weekly updates |
| Demo deployment | Render | [Live demo](https://free-sewaa-qh05.onrender.com) |

---

### Sujan Tamang (SujanTamang20) - Frontend Developer

| Area | File/Link | Evidence |
|---|---|---|
| HTML pages | `html/*.html` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Profile page | `html/profile.html` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Auth pages | `html/auth.html`, `html/signup.html` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Donate page | `html/donate.html` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Sprint docs | `docs/sprints/SPRINT_*.md` | Sprint docs |

---

### Sujan Shrestha (suzmoon) - Backend Developer

| Area | File/Link | Evidence |
|---|---|---|
| JavaScript validation | `js/auth.js` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| API integration | `server/server.js` | [PR #78](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) |
| Authentication flow | `js/auth.js`, `server/server.js` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Package dependencies | `server/package.json` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Backend security | Password hashing prep | [Issue #68](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/68) |

---

### Mohan Khadka - Frontend Developer

| Area | File/Link | Evidence |
|---|---|---|
| JavaScript interactivity | `js/index.js`, `js/site.js` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| DOM manipulation | `js/site.js` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Browse page | `html/browse.html` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Item detail page | `html/item.html` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |

---

### Swarnim Jung Karki (Swarnimkarki50) - Frontend & Design Lead

| Area | File/Link | Evidence |
|---|---|---|
| CSS styling | `css/style.css`, `css/theme.css`, `css/auth.css` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Documentation | `CONTRIBUTORS.md`, `README.md`, AI audit | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Board Reset Kanban | `board/` | [Commit cc84b3f](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/cc84b3f) |
| Database schema | `docs/DESIGN/DATABASE_SCHEMA.md` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Presentation files | `presentation/`, `docs-midterm/` | Midterm docs |
| Coding policy | `docs/POLICY.md` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |
| Testing log | `docs/PROGRESS/TESTING_LOG.md` | [Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main) |

---

*Last Updated: 2026-04-29 (Week 9)*
