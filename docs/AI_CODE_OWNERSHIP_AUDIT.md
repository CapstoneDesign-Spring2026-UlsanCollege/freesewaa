# AI Code Ownership Audit

## Purpose
This document tracks which files were created with AI assistance and who owns the understanding/maintenance of each file.

---

## Audit Status

| File | Owner | AI Assisted | Understanding |
|------|-------|-----------|-------------|
| server/server.js | Sujan Shrestha | Yes (AI help) | Partial - needs review |
| html/index.html | Mohan Khadka | No | ✅ Complete |
| html/browse.html | Mohan Khadka | No | ✅ Complete |
| html/donate.html | Sujan Tamang | No | ✅ Complete |
| html/item.html | Mohan Khadka | No | ✅ Complete |
| html/profile.html | Sujan Tamang | No | ✅ Complete |
| html/auth.html | Sujan Tamang | No | ✅ Complete |
| html/about.html | Swarnim Jung Karki | No | ✅ Complete |
| html/contact.html | Swarnim Jung Karki | No | ✅ Complete |
| css/style.css | Swarnim Jung Karki | AI copilot | ✅ Complete |
| css/theme.css | Swarnim Jung Karki | AI copilot | ✅ Complete |
| css/auth.css | Swarnim Jung Karki | AI copilot | ✅ Complete |
| js/index.js | Mohan Khadka | No | ✅ Complete |
| js/site.js | Mohan Khadka | No | ✅ Complete |
| js/auth.js | Sujan Tamang | No | ✅ Complete |

---

## Code Ownership by File

### Backend
| File | Owner | Notes |
|------|-------|-------|
| server/server.js | Ram Pathak, Sujan Shrestha | PR #78 - needs review |
| server/package.json | Sujan Shrestha | ✅ Complete |

### Frontend HTML
| File | Owner | Notes |
|------|-------|-------|
| html/*.html | Assigned per file | See table above |

### Frontend CSS
| File | Owner | Notes |
|------|-------|-------|
| css/*.css | Swarnim Jung Karki | AI helped |

### Frontend JavaScript
| File | Owner | Notes |
|------|-------|-------|
| js/*.js | Assigned per file | See table above |

---

## AI Assisted Work

### What We Understand
- HTML structure and semantic tags
- CSS styling and layout
- Basic JavaScript DOM manipulation
- Session-based authentication flow

### What We Don't Fully Understand
- Complex async/await patterns in server.js
- MongoDB aggregation pipelines
- Middleware security patterns

---

## Honest Assessment

### Known Gaps
1. server.js has complex async patterns we need to review
2. Some security features need verification
3. Error handling could be improved

### Risks
- Backend PR #78 has 108 commits - unreviewed code
- Password hashing not yet implemented
- No unit tests for backend

---

## Sign-Off

| Team Member | Date | Status |
|-----------|------|--------|
| Ram Pathak | [Date] | [Signature] |
| Mohan Khadka | [Date] | [Signature] |
| Sujan Tamang | [Date] | [Signature] |
| Sujan Shrestha | [Date] | [Signature] |
| Swarnim Jung Karki | [Date] | [Signature] |

---

*Last Updated: Week 9*