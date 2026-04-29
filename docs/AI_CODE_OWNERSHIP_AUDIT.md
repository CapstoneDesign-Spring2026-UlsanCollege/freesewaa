# AI Code Ownership Audit

> Purpose: Prove that the team understands the project, especially the parts created or changed with AI assistance.

---

## 1) Team + Project

- **Team:** Rampathak12, Sujan Tamang, Sujan Shrestha, Swarnim Jung Karki, Mohan Khadka
- **Project name:** [Your project name - e.g., "Community Donation Platform"]
- **Current repo:** https://github.com/[owner]/[repo]
- **Current demo link:** [Live URL or deployment link if available]
- **Date updated:** 2026-04-29

---

## 2) What Our App Currently Does

Write this in normal human language.

- **Feature 1:** Users can browse available items for donation
- **Feature 2:** Users can authenticate (login/signup) and create profiles
- **Feature 3:** Users can donate items and manage their donations
- **Feature 4:** Contact page for reaching out with inquiries

### Current MVP flow

Our main user can:

1. Visit the landing page and view about/contact information
2. Browse available items in the donation catalog
3. Create an account (signup) or login with existing credentials
4. Donate items and view their profile/history

---

## 3) What Works Right Now

| Working item | Evidence link | Owner who can explain it |
|---|---|---|
| Homepage loads and displays correctly | [Link to deployed site or screenshot] | Sujan Tamang, Swarnim Jung Karki |
| Browse page shows donation items | [Link to deployed site or screenshot] | Sujan Tamang, Swarnim Jung Karki |
| Authentication flow (signup/login) | [Link to live demo or test evidence] | Sujan Shrestha, Sujan Tamang |
| User profile page displays user info | [Link to deployed site or screenshot] | Sujan Tamang |
| Donation form functional | [Link to deployed site or test evidence] | Sujan Tamang, Sujan Shrestha |
| Responsive CSS styling | [Link to screenshot showing mobile/desktop] | Swarnim Jung Karki |

---

## 4) Code We Understand

| Code area | File / folder | What it does | Who can explain it? | Evidence |
|---|---|---|---|---|
| HTML structure - Home | `html/index.html` | Main landing page with navigation | Sujan Tamang, Swarnim Jung Karki | [Link to PR or commit] |
| HTML structure - Browse | `html/browse.html` | Lists donation items for users to browse | Sujan Tamang, Swarnim Jung Karki | [Link to PR or commit] |
| HTML structure - Donate | `html/donate.html` | Form for users to submit donation items | Sujan Tamang | [Link to PR or commit] |
| HTML structure - Profile | `html/profile.html` | User profile page showing user details | Sujan Tamang | [Link to PR or commit] |
| HTML structure - Auth | `html/auth.html` | Login/signup form | Sujan Tamang | [Link to PR or commit] |
| HTML structure - About | `html/about.html` | About page for the application | Swarnim Jung Karki | [Link to PR or commit] |
| HTML structure - Contact | `html/contact.html` | Contact form and contact information | Swarnim Jung Karki | [Link to PR or commit] |
| HTML structure - Item detail | `html/item.html` | Individual item detail page | Sujan Tamang, Swarnim Jung Karki | [Link to PR or commit] |
| CSS styling - Main | `css/style.css` | Base styling and layout | Swarnim Jung Karki | [Link to PR or commit] |
| CSS styling - Theme | `css/theme.css` | Color scheme and theme variables | Swarnim Jung Karki | [Link to PR or commit] |
| CSS styling - Auth | `css/auth.css` | Authentication page specific styles | Swarnim Jung Karki | [Link to PR or commit] |
| JavaScript - Home page | `js/index.js` | Home page interactions and DOM manipulation | Mohan Khadka | [Link to PR or commit] |
| JavaScript - Site-wide | `js/site.js` | Global site functionality and utilities | Mohan Khadka | [Link to PR or commit] |
| JavaScript - Authentication | `js/auth.js` | Login/signup form validation and requests | Sujan Shrestha | [Link to PR or commit] |
| Backend - Server setup | `server/server.js` | Express server, routing, API endpoints, database | Rampathak12in (YOU) | [Link to PR or commit] |
| Backend - Dependencies | `server/package.json` | Node.js dependencies and scripts | Sujan Shrestha | [Link to PR or commit] |

---

## 5) Code We Do NOT Fully Understand Yet

Be honest. This is not automatically bad. Hiding it is bad.

| Code area | What is confusing? | Risk level | Owner | Next step |
|---|---|---|---|---|
| server.js async/await patterns | Error handling chain and promise resolution unclear | High | Rampathak12in | Review code comments and add documentation in next PR |
| MongoDB aggregation pipelines | Complex queries for filtering/sorting donations | Medium | Rampathak12in | Pair programming session or add inline comments |
| Express middleware security | Password hashing and session middleware not fully reviewed | High | Rampathak12in, Sujan Shrestha | Security review needed before production |
| Frontend-backend API integration | How requests flow from forms to server responses | Medium | Sujan Shrestha, Mohan Khadka | API documentation and testing needed |

---

## 6) AI-Assisted Work

| Area | AI tool used | What AI helped with | What humans checked/changed | Evidence |
|---|---|---|---|---|
| server.js | GitHub Copilot | Express routing setup, error handling structure, async function patterns | Rampathak12in reviewed all code, added custom error messages, modified middleware order | [Link to PR #78 or commit] |
| css/style.css | GitHub Copilot | CSS flexbox layouts, responsive breakpoints, color variable definitions | Swarnim Jung Karki reviewed styling, adjusted spacing values, customized theme colors | [Link to PR or commit] |
| css/theme.css | GitHub Copilot | CSS variable definitions, color palette, typography scale | Swarnim Jung Karki tested on multiple browsers, refined color contrast for accessibility | [Link to PR or commit] |
| css/auth.css | GitHub Copilot | Form styling, button states, error message styling | Swarnim Jung Karki adjusted animations, modified transition timings | [Link to PR or commit] |

---

## 7) Bugs / Unreliable Features

| Bug / problem | Severity | Evidence link | Owner | Next action |
|---|---|---|---|---|
| Password hashing not implemented | P0 | [Link to Issue or PR comment] | Rampathak12in, Sujan Shrestha | Implement bcrypt password hashing before next sprint |
| Session timeout not configured | P1 | [Link to Issue or PR comment] | Rampathak12in | Add session expiration logic |
| No input validation on donate form | P1 | [Link to Issue or PR comment] | Sujan Shrestha, Mohan Khadka | Add client-side and server-side validation |
| Error messages unclear to users | P2 | [Link to Issue or PR comment] | Sujan Tamang, Rampathak12in | Improve error message UX |
| No unit tests for backend | P2 | [Link to Issue or PR comment] | Rampathak12in | Write basic tests for API endpoints |
| CSS not fully responsive on small screens | P2 | [Link to Issue or PR comment] | Swarnim Jung Karki | Test and fix mobile breakpoints |

---

## 8) Risk List

| Risk | Why it matters | Mitigation | Owner |
|---|---|---|---|
| PR #78 has 108 commits - large unreviewed code | Security and code quality risk | Split into smaller PRs for review, add documentation | Rampathak12in, Sujan Shrestha |
| No unit tests for backend API | Hard to maintain and debug in future | Write tests for core endpoints, integrate CI/CD testing | Rampathak12in |
| MongoDB queries not optimized | Could cause performance issues at scale | Review query efficiency, add indexes as needed | Rampathak12in |
| Authentication flow needs security review | Passwords not hashed, sessions not tested | Implement bcrypt, test with security checklist | Rampathak12in, Sujan Shrestha |
| Limited error handling in frontend | Poor user experience on failures | Add error boundaries and user-friendly messages | Mohan Khadka, Sujan Shrestha |

---

## 9) Team Ownership Map

Each student must own at least one part of the project.

| Student | Owned area | Can explain? | Evidence link | Needs help with |
|---|---|---|---|---|
| Rampathak12 | Backend server, Express routing, API endpoints, database setup | Clear | [Link to PR #78 or commits] | Security implementation, unit tests |
| Sujan Tamang | HTML frontend (browse, donate, item, profile, auth pages), user authentication logic | Clear | [Link to PR or commits] | Advanced JavaScript patterns |
| Swarnim Jung Karki | CSS styling (all stylesheets), responsive design, theme implementation | Clear | [Link to PR or commits] | Advanced CSS animations |
| Sujan Shrestha | JavaScript validation (auth.js), password hashing implementation, API integration | Needs work | [Link to PR or commits] | Backend security patterns, full auth flow |
| Mohan Khadka | JavaScript functionality (index.js, site.js), DOM manipulation, user interactions | Clear | [Link to PR or commits] | API error handling, async patterns |

---

## 10) Top 3 Stabilization Goals

Before adding more features, we will stabilize:

1. **Security & Password Hashing** - Implement bcrypt password hashing in server.js, review authentication middleware, test login flow end-to-end by [DATE]
2. **Backend API Testing** - Write unit tests for all API endpoints, ensure CI passes, document API with examples by [DATE]
3. **Input Validation & Error Handling** - Add validation to all forms (frontend + backend), improve error messages for user clarity by [DATE]

---

## 11) Definition of Done for Sprint 3

By the end of Sprint 3, we should be able to show:

- [x] Core MVP flow works (browse → donate → profile)
- [x] Core MVP flow has evidence (deployed or video demo)
- [ ] P0 bugs are fixed (password hashing)
- [x] Every member can explain one code/doc/test area
- [x] AI-assisted work has been reviewed by humans
- [ ] Weekly Sprint Packet links this audit

---

## Honest Assessment Summary

**Strengths:**
- Frontend pages are well structured and understood by owners
- CSS styling is complete and responsive
- Basic authentication flow is in place
- Clear division of work among team members

**Gaps:**
- Backend security implementation incomplete (no password hashing)
- Limited automated testing
- Some async/await patterns need documentation
- PR #78 is too large and needs to be split for easier review

**Path Forward:**
- Implement security fixes in Week 10
- Add unit tests during QA sprint
- Add inline code documentation for complex functions
- Conduct code review sessions for high-risk areas

---

## Sign-Off

| Team Member | GitHub Username | Date | Status |
|-----------|---|------|--------|
| Rampathak12 | Rampathak12 | 2026-04-29 | ✅ Reviewed |
| Sujan Tamang | [username] | 2026-04-29 | ⏳ Pending |
| Sujan Shrestha | [username] | 2026-04-29 | ⏳ Pending |
| Swarnim Jung Karki | [username] | 2026-04-29 | ⏳ Pending |
| Mohan Khadka | [username] | 2026-04-29 | ⏳ Pending |

---

*Last Updated: 2026-04-29 (Week 9)*
