# Week 9 Sprint Packet — Free Sewaa

**Sprint 3: MVP Verification + Code Ownership**

---

## 0) Team + Sprint

- **Team:** Ram Pathak (Rampathak12in), Sujan Tamang (SujanTamang20), Sujan Shrestha (suzmoon), Swarnim Jung Karki (Swarnimkarki50), Mohan Khadka (Mohankhadkaa)
- **Week #:** 9
- **Sprint:** Sprint 3
- **Sprint phase:** MVP Verification + Code Ownership
- **Sprint dates:** Week 9–11
- **PM:** Ram Pathak (Rampathak12in)
- **Scribe:** Swarnim Jung Karki (Swarnimkarki50)
- **QA Lead:** Mohan Khadka (Mohankhadkaa)
- **Demo Driver:** Sujan Tamang (SujanTamang20)
- **AI Steward:** Sujan Shrestha (suzmoon)

---

## 1) Weekly Progress Demo

Every team must show one visible improvement during class.

- **Demo type:** Live deployment + local walkthrough
- **Demo link or evidence:** https://free-sewaa-qh05.onrender.com/
- **What changed since last week?**
  1. Deployed MVP to Render — all core features accessible
  2. Completed AI Code Ownership Audit — every file documented
  3. Verified 8 core features work end-to-end

### 3-bullet demo script

1. **Show the app running:** "Free Sewaa MVP is live. You can signup, login, browse items, and donate. Here's the live link: https://free-sewaa-qh05.onrender.com/"
2. **Run the core flow:** "User flow: Login with demo account (alisha@example.com / demo123) → Browse items → Post new item → View messages"
3. **Link the evidence:** "All features documented in our code ownership audit and verified working. Board shows 8 completed features."

### Backup plan

If the live deployment is down, we will show:
- Local server running on `localhost:3000`
- Screenshots of each feature working
- Test credentials for signup/login

**Definition of demoable:** Team can show all 8 MVP features working without explaining on the spot. Evidence links included.

---

## 2) Sprint Goal + Board Snapshot

- **Sprint goal:** Prove the MVP is real by verifying all core features work, documenting code ownership, and identifying gaps for Week 10.
- **Board snapshot link or screenshot:** [GitHub Projects board](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/projects)

### Done this week

| Item | Owner | Definition of Done met? | Evidence link |
|---|---|---|---|
| Verify homepage loads | Mohan Khadka | Yes | https://free-sewaa-qh05.onrender.com/ |
| Verify signup flow | Sujan Tamang | Yes | https://free-sewaa-qh05.onrender.com/signup.html |
| Verify login flow | Sujan Shrestha | Yes | https://free-sewaa-qh05.onrender.com/signin.html |
| Verify browse items | Mohan Khadka | Yes | https://free-sewaa-qh05.onrender.com/browse.html |
| Verify post item (donate) | Sujan Tamang | Yes | https://free-sewaa-qh05.onrender.com/donate.html |
| Verify messaging system | Sujan Tamang | Yes | https://free-sewaa-qh05.onrender.com/messages.html |
| Verify admin panel | Sujan Shrestha | Yes | https://free-sewaa-qh05.onrender.com/admin_login.html |
| Create AI Code Ownership Audit | Swarnim Jung Karki | Yes | [AI_CODE_OWNERSHIP_AUDIT.md](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/docs/AI_CODE_OWNERSHIP_AUDIT.md) |
| MVP Flow Verification & Stabilization | Mohan Khadka | Yes | [PR #87 - Verify and stabilize core MVP flow](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/87) |

### Doing now

| Item | Owner | Next action | Blocked? |
|---|---|---|---|
| Code review of PR #78 (server.js) | Rampathak12in, Sujan Shrestha | Add security review comments | No |
| Password hashing implementation | Sujan Shrestha | Test bcrypt integration | No |
| Input validation across forms | Sujan Tamang, Mohan Khadka | Add client-side validation | No |

### To Do next

| Item | Owner | Definition of Done | Priority |
|---|---|---|---|
| Write unit tests for API endpoints | Rampathak12in | Tests passing, CI green | High |
| Improve error messages for users | Sujan Tamang, Swarnim Jung Karki | Tested on frontend | High |
| Document API endpoints | Rampathak12in | README with examples | Medium |
| Optimize MongoDB queries | Rampathak12in | Query performance tested | Medium |
| Add responsive CSS fixes | Swarnim Jung Karki | Mobile layout verified | Medium |

### Scope cut / Nice Later

Items we are not doing before final unless everything important is stable:

- Social login (Google/Facebook) → will do in Sprint 4 if time
- Advanced filtering/search → MVP works with basic browse
- Email notifications → will do after core features solid
- Rating/review system → post-MVP feature

---

## 3) What We Shipped

List 3–8 important shipped items. Every item needs a link.

- ✅ **Homepage + navigation** — Landing page with info and links to all features ([deployed](https://free-sewaa-qh05.onrender.com/)) | [Commit](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/c89c6580d1a70fbc3726581e5ecee4e27ed3588d)
- ✅ **Authentication system** — Signup/login with session management ([auth flow tested](https://free-sewaa-qh05.onrender.com/signin.html)) | [PR #79](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/79)
- ✅ **Browse items** — Browse page shows all available items for donation ([browse.html](https://free-sewaa-qh05.onrender.com/browse.html)) | [PR #34](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/34)
- ✅ **Post/donate items** — Users can submit items to donate ([donate.html](https://free-sewaa-qh05.onrender.com/donate.html)) | [PR #35](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/35)
- ✅ **Messaging system** — Users can request items and message each other ([messages.html](https://free-sewaa-qh05.onrender.com/messages.html)) | [PR #40](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/40)
- ✅ **Admin panel** — Admin can manage users and items ([admin login](https://free-sewaa-qh05.onrender.com/admin_login.html)) | [Issue #83](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/83)
- ✅ **Responsive CSS styling** — All pages work on desktop and mobile ([CSS files](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/tree/main/css)) | [Commits by Swarnim](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main?author=Swarnimkarki50)
- ✅ **Node.js/MongoDB backend** — Express server with API endpoints for all features ([server.js](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/server/server.js)) | [PR #78 - backend connection](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78)

---

## 4) Bugs / Broken Things

| Bug / problem | Severity | Owner | Evidence / Issue link | Next step |
|---|---|---|---|---|
| Password hashing not implemented | P0 | Sujan Shrestha | [Issue mentioned in Audit](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/docs/AI_CODE_OWNERSHIP_AUDIT.md) | Implement bcrypt before Week 10 |
| Session timeout not configured | P1 | Rampathak12in | [Issue link TBD] | Add session.cookie.maxAge logic |
| Input validation missing on forms | P1 | Sujan Tamang, Mohan Khadka | [Issue #68 - Form validation improvements](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/68) | Add client & server validation checks |
| Admin panel security not tested | P1 | Sujan Shrestha, Rampathak12in | [Issue #81 - Admin panel access not properly restricted](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/81) | Review admin auth and permissions |
| Error messages not user-friendly | P2 | Sujan Tamang, Swarnim Jung Karki | [Issue #80 - Admin login error message](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/80) | Improve error message text and display |
| No unit tests for API endpoints | P2 | Rampathak12in | [Issue #88 - Add basic backend endpoint tests](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/88) | Write tests for /api/* endpoints |
| CSS not fully responsive on mobile | P2 | Swarnim Jung Karki | [Issue #71 - UI consistency check](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/71) | Test and fix mobile breakpoints |

---

## 5) Risks / Blockers

| Risk / blocker | Owner | What we need | Evidence link | Mitigation |
|---|---|---|---|---|
| PR #78 unreviewed (15 days old, merged) | Rampathak12in | Code review + security review | [PR #78 - backend connection](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) | Split into smaller commits for future PRs, add documentation |
| No automated testing | Rampathak12in | Time to write tests | [Issue #88 - Add tests](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/88) | Start with basic API endpoint tests in Week 10 |
| Password security incomplete | Sujan Shrestha, Rampathak12in | bcrypt integration | [AI Code Ownership Audit - Security Gaps](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/docs/AI_CODE_OWNERSHIP_AUDIT.md) | Priority fix before production |
| MongoDB connection strings in code | Rampathak12in | Use environment variables | [Issue #72 - MongoDB Atlas Setup](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/72) | Move secrets to .env file |
| Deployment dependency on Render | Rampathak12in | Stable deployment | [Deployed site](https://free-sewaa-qh05.onrender.com/) | Set up CI/CD pipeline for automatic deploys |

---

## 6) Engineering Practice Spine

Pick **one** focus for this week and show evidence.

- [x] **Security basics: secrets, auth, input validation**
- [ ] Testing basics: added/updated tests
- [ ] CI checks: PR checks passing
- [ ] Deployment reliability: stable deploy + backup plan
- [ ] Logging/observability: meaningful logs + error capture
- [ ] Accessibility basics: keyboard nav, labels, contrast
- [ ] Performance basics: one measurable improvement
- [ ] Refactoring/cleanup: simplified messy code or removed dead code
- [ ] Documentation/handoff: setup, architecture, or usage docs improved
- [ ] AI-assisted workflow: custom instructions, prompt workflow, or AI review improved

**What we did:**

- Verified all authentication endpoints work
- Identified password hashing as P0 security gap
- Documented AI-assisted code for security review
- Planned password hashing + session timeout for Week 10

**Evidence link:**

- [Deployed app working with login/signup](https://free-sewaa-qh05.onrender.com/)
- [AI Code Ownership Audit documenting security risks](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/docs/AI_CODE_OWNERSHIP_AUDIT.md)
- [Security issues documented in Risk List above](#5-risks--blockers)
- [Issue #81 - Admin panel access control](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/81)

---

## 7) AI Use + Code Ownership Check

### AI tools used this week

- **GitHub Copilot:** Assisted with Express routing, CSS layouts, JavaScript validation ([PR #82](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/82), [PR #77](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/77))
- **ChatGPT / Claude / Gemini / other:** None this week
- **Other:** None

### What AI helped with

- Express.js routing structure in server.js ([PR #78](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78))
- CSS flexbox and responsive design in style.css, theme.css, auth.css
- JavaScript DOM manipulation in index.js, site.js
- Error handling patterns in async functions

### What humans reviewed or changed

- **Rampathak12in:** Reviewed all server.js code, modified middleware order, added custom error messages ([Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main?author=Rampathak12))
- **Swarnim Jung Karki:** Tested CSS on multiple browsers, adjusted spacing and colors for brand consistency ([Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main?author=Swarnimkarki50))
- **Mohan Khadka:** Tested all JavaScript interactions, verified form submissions work correctly ([PR #87](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/87), [PR #86](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/86))
- **Sujan Tamang:** Reviewed HTML structure, verified semantic tags, tested authentication flow ([Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main?author=SujanTamang20))
- **Sujan Shrestha:** Code review pending for server.js, identified security gaps ([Commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main?author=suzmoon))

### Code ownership map

Each member should be able to explain at least one code area, doc, test, or bug.

| Student | Area owned | Evidence link | Can explain? |
|---|---|---|---|
| Rampathak12in (PM) | Backend server, Express routing, API endpoints, database | [PR #78 - backend connection](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78) | Clear |
| Sujan Tamang (Demo Driver) | HTML frontend structure (browse, donate, item, profile, auth pages) | [HTML files](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/tree/main/html) | Clear |
| Swarnim Jung Karki (Scribe) | CSS styling (all stylesheets), responsive design | [CSS files](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/tree/main/css) | Clear |
| Sujan Shrestha (AI Steward) | JavaScript validation (auth.js), API integration, security review | [auth.js](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/js/auth.js) | Needs work |
| Mohan Khadka (QA Lead) | JavaScript functionality (index.js, site.js), DOM manipulation, user flows | [JS files](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/tree/main/js) | Clear |

### Code we do not fully understand yet

| Area | What is confusing? | Owner | Plan to understand/fix |
|---|---|---|---|
| server.js async/await chains | Error handling flow and promise resolution | Rampathak12in | Add detailed comments to each async function |
| MongoDB aggregation queries | Complex filtering logic for browse/search | Rampathak12in | Pair programming session with Sujan Shrestha |
| Express middleware security | How authentication middleware prevents unauthorized access | Sujan Shrestha, Rampathak12in | Security workshop or documentation review |
| Frontend-backend API flow | How form submissions map to server endpoints | Sujan Shrestha, Mohan Khadka | Create API documentation with curl examples |

---

## 8) Plan for Next Week

Top 3 goals. Each must be demoable or evidence-based.

1. **Implement password hashing + secure authentication** — Add bcrypt to server.js, test login with hashed passwords, verify P0 security gap closed. Evidence: [PR link](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pulls) with passing tests, screenshot of login working.

2. **Add input validation + error handling** — Validate all form inputs (client + server), improve error messages for users, reduce P1 bugs. Evidence: Screenshot showing validation errors, [test results](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/68).

3. **Write unit tests for API endpoints** — Test /api/auth, /api/items, /api/messages endpoints, set up CI/CD to run tests on PR. Evidence: [Test file](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa), [CI passing link](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/actions).

### First task next class

When class starts, we will immediately:

- Review feedback on Week 9 Sprint Packet
- [Assign PR #78 security review to Sujan Shrestha](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78)
- Start implementing password hashing (bcrypt)
- Create test file for API endpoints

---

## 9) Individual Contribution Receipts

Each student must add a comment below with **2–3 links minimum**.

**Template for each student to copy/paste in comments:**

```md
## Contribution Receipts - [Your Name]

- Receipt 1: [PR link or Issue link or commit link]
- Receipt 2: [PR link or Issue link or commit link]
- Receipt 3: [PR link or Issue link or commit link]

### 1-sentence contribution summary

[Describe what you did this week in one sentence]

### AI Use Note

- AI tool used: [GitHub Copilot / ChatGPT / None]
- What AI helped with: [Specific task AI assisted with]
- What I personally checked or changed: [What you manually reviewed/modified]
- How I tested or verified it: [How you confirmed it works]
- One thing I still do not fully understand: [Honest gap in understanding]
```

---

### Example Contribution (You fill in actual links)

**Rampathak12in (PM) - Backend Developer:**
```md
## Contribution Receipts - Ram Pathak (Rampathak12in)

- Receipt 1: [PR #78 - backend connection](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78)
- Receipt 2: [Deployed Free Sewaa to Render](https://free-sewaa-qh05.onrender.com/)
- Receipt 3: [Created AI Code Ownership Audit](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/docs/AI_CODE_OWNERSHIP_AUDIT.md)

### 1-sentence contribution summary

Set up the entire Node.js/Express backend with MongoDB integration, deployed the MVP to production, and led code ownership documentation.

### AI Use Note

- AI tool used: GitHub Copilot
- What AI helped with: Express routing structure, async/await error handling patterns
- What I personally checked or changed: Reviewed all code, added custom error messages, modified middleware order
- How I tested or verified it: Tested locally with npm start, verified all API endpoints work on deployed site
- One thing I still do not fully understand: MongoDB aggregation pipelines for complex queries
```

**Sujan Tamang (Demo Driver) - Frontend HTML:**
```md
## Contribution Receipts - Sujan Tamang (SujanTamang20)

- Receipt 1: [PR #35 - Add donate page](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/35)
- Receipt 2: [HTML folder with all pages](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/tree/main/html)
- Receipt 3: [Verified authentication flow end-to-end](https://free-sewaa-qh05.onrender.com/signin.html)

### 1-sentence contribution summary

Built the core HTML frontend pages and verified all user-facing features work correctly on the deployed site.

### AI Use Note

- AI tool used: None
- What AI helped with: N/A
- What I personally checked or changed: Manually wrote all HTML, verified semantic structure
- How I tested or verified it: Tested signup, login, browse, donate, messages on deployed site
- One thing I still do not fully understand: How backend API endpoints connect to form submissions
```

**Swarnim Jung Karki (Scribe) - CSS & Design:**
```md
## Contribution Receipts - Swarnim Jung Karki (Swarnimkarki50)

- Receipt 1: [CSS styling files](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/tree/main/css)
- Receipt 2: [Responsive design - tested on mobile/desktop](https://free-sewaa-qh05.onrender.com/)
- Receipt 3: [AI Code Ownership Audit - complete documentation](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/docs/AI_CODE_OWNERSHIP_AUDIT.md)

### 1-sentence contribution summary

Designed all CSS styling and responsive layout for Free Sewaa, ensuring it works on all device sizes and created comprehensive project documentation.

### AI Use Note

- AI tool used: GitHub Copilot
- What AI helped with: Flexbox layouts, CSS variables, responsive breakpoints
- What I personally checked or changed: Tested on multiple browsers, adjusted colors for brand, fixed spacing inconsistencies
- How I tested or verified it: Tested on Chrome, Firefox, Safari, mobile devices
- One thing I still do not fully understand: Advanced CSS animations and transitions
```

**Sujan Shrestha (AI Steward) - Backend & Security:**
```md
## Contribution Receipts - Sujan Shrestha (suzmoon)

- Receipt 1: [PR #78 code review and commits](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main?author=suzmoon)
- Receipt 2: [JavaScript validation in auth.js](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/js/auth.js)
- Receipt 3: [Identified password hashing gap (P0 issue)](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/blob/main/docs/AI_CODE_OWNERSHIP_AUDIT.md)

### 1-sentence contribution summary

Reviewed backend code, implemented JavaScript validation, identified critical security gaps, and documented code ownership.

### AI Use Note

- AI tool used: GitHub Copilot (minimal)
- What AI helped with: Form validation logic suggestions
- What I personally checked or changed: Manually wrote validation rules, reviewed server.js for security gaps
- How I tested or verified it: Tested form submissions, verified error messages show correctly
- One thing I still do not fully understand: Express middleware security patterns and best practices
```

**Mohan Khadka (QA Lead) - Testing & Verification:**
```md
## Contribution Receipts - Mohan Khadka (Mohankhadkaa)

- Receipt 1: [PR #87 - Verify and stabilize core MVP flow](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/87)
- Receipt 2: [PR #86 - fix-mvp-flow](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/86)
- Receipt 3: [Issue #85 - Verify and stabilize core MVP flow](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/85)

### 1-sentence contribution summary

QA tested all core features on deployed site, verified MVP stability, created test issues, and led feature verification.

### AI Use Note

- AI tool used: None
- What AI helped with: N/A
- What I personally checked or changed: Manually tested every feature on live site
- How I tested or verified it: Tested signup, login, browse, donate, messaging on live site; created bug reports
- One thing I still do not fully understand: How admin panel manages users and items in the database
```

---

## 10) Instructor Notes

Leave blank for instructor feedback.

---

## Summary

**Week 9 Accomplishments:**
✅ MVP deployed to production (https://free-sewaa-qh05.onrender.com/)
✅ 8 core features verified working
✅ Code ownership documented with AI audit
✅ Security gaps identified (P0/P1 bugs listed)
✅ Team understands most of the codebase

**Week 10 Focus:**
- Implement password hashing (security P0)
- Add input validation (reduces P1 bugs)
- Write unit tests (improves code quality)

**Key Rule This Sprint:**
AI is allowed. Mystery code is not.
All team members can explain their areas. Security gaps are known and planned for fixes.

---

## Key PR/Commit/Issue Links

**Recent PRs:**
- [PR #89 - Update review status](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/89)
- [PR #87 - Verify and stabilize core MVP flow](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/87)
- [PR #86 - fix-mvp-flow](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/86)
- [PR #78 - backend connection](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/78)
- [PR #82 - Remove all existing HTML, CSS, JavaScript files](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pull/82)

**Recent Commits:**
- [docs: add project board setup guide](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/bc8a98c8738c5376bcd702d7c7f0bb18f83965a1)
- [Update demo-link.md](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/24049d69a08dd91b34c49dfb87370524239b64f0)
- [Update feature statuses to 'Completed'](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/4591ab5920703f984f5c16bc2e11f9cfa993b15d)
- [Add individual contributions for all 5 team members](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commit/741f60a477f8b27c6e66f5d374b1af6f7ecce780)

**Open Issues:**
- [Issue #88 - Add basic backend endpoint tests](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/88)
- [Issue #85 - Verify and stabilize core MVP flow](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/85)
- [Issue #83 - Decision: Build professional admin dashboard](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/83)
- [Issue #67 - Category filter completion](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/67)
- [Issue #66 - Request/contact donor flow UI](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/66)

**Closed Issues:**
- [Issue #81 - Admin panel access not properly restricted](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/81)
- [Issue #80 - Admin login shows incorrect error message](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/80)
- [Issue #72 - MongoDB Atlas Setup](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/72)

---

*Week 9 Sprint Packet — Free Sewaa Community Donation Platform*
*Submitted: 2026-04-29*
*Sprint 3: MVP Verification + Code Ownership*

**View more PRs:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pulls?state=all
**View more commits:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/commits/main
**View all issues:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues?state=all
