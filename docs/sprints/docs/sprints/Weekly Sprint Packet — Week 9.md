# Sprint Packet — Week 9

## MVP Verification + Code Ownership

**Sprint:** Sprint 3 — Week 9

---

## Team

| Role | Team Member |
|------|------------|
| Project Manager | Ram Pathak |
| Scribe | Swarnim Jung Karki |
| QA Lead | Mohan Khadka |
| Demo Driver | Sujan Tamang |
| Developer | Sujan Shrestha |

---

## Sprint Goal

**Prove the MVP is real** by:
1. Run it locally
2. Document what works / what is broken
3. Audit code ownership
4. Collect evidence

---

## Run It (Local Setup)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Commands
```bash
cd Free_Sewaa
cd server
npm install
npm start
# Server runs on http://localhost:3000
```

### Demo Credentials
```
Email: alisha@example.com
Password: demo123
```

---

## MVP Verification Checklist

| Feature | Status | Evidence |
|---------|--------|---------|
| Homepage loads | [ ] | Screenshot |
| User signup works | [ ] | Screenshot |
| User login works | [ ] | Screenshot |
| Browse items works | [ ] | Screenshot |
| Post item works | [ ] | Screenshot |
| Request item works | [ ] | Screenshot |
| Messaging works | [ ] | Screenshot |
| Admin panel works | [ ] | Screenshot |
| CI/CD passes | [ ] | Screenshot |

---

## Code Ownership Audit

**See:** `docs/AI_CODE_OWNERSHIP_AUDIT.md`

| File | Owner | AI Assisted | Understand |
|------|-------|-----------|-----------|
| server.js | Sujan Shrestha | Yes | Partial |
| html/*.html | Assigned | Some AI | Yes |
| css/*.css | Swarnim Karki | Yes | Yes |
| js/*.js | Assigned | No | Yes |

---

## What Ships

- ✅ 27 HTML pages
- ✅ 3 CSS files
- ✅ 3 JS files
- ✅ Node.js/MongoDB backend
- ✅ Authentication
- ✅ Messaging system

---

## What Is Broken

- [ ] CI workflow needs verification
- [ ] Password hashing not implemented
- [ ] No unit tests

---

## Risks / Blockers

- Backend PR #78 unreviewed (108 commits)
- Time for full code review

---

## Individual Contributions

### Ram Pathak
- Role: PM
- Focus: Backend verification
- PRs: [Links]

### Swarnim Jung Karki
- Role: Documentation
- Focus: Sprint docs, audit
- PRs: [Links]

### Mohan Khadka
- Role: QA
- Focus: Feature verification
- PRs: [Links]

### Sujan Tamang
- Role: Demo
- Focus: Demo script
- PRs: [Links]

### Sujan Shrestha
- Role: Developer
- Focus: Backend review
- PRs: [Links]

---

## Next Steps

1. Verify all features work locally
2. Take screenshots for evidence
3. Review backend code
4. Merge PR #78 if safe

---

*Week 9 - MVP Verification*
