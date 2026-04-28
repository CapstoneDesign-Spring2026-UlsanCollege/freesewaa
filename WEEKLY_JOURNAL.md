# Weekly Journal - Week 8 (Midterm Week)

## Date: April 21-28, 2026

---

### April 28, 2026 (Today)

#### 1. Fixed CI/CD Workflow
- **Issue**: GitHub Actions CI failing
- **Cause**: Folder structure changed but workflow still looking at root files
- **Fix**: Updated `.github/workflows/ci.yml` for new folder structure (html/, css/, js/, server/)
- **Result**: ✅ CI now passes

#### 2. Removed Broken Deploy Workflow
- **Issue**: "Deploy Website to GitHub Pages" workflow failing
- **Cause**: Your Node.js app can't run on GitHub Pages (static only)
- **Fix**: Removed `.github/workflows/pages-deploy.yml`
- **Note**: Use Render.com or Railway for Node.js deployment

#### 3. Project Board Organization
- Created `PROJECT_TASKS.md` with:
  - Sprint 1-6 completed tasks
  - Midterm readiness checklist
  - Team presentation roles
  - Future backlog

#### 4. Added PR #78 Reference
- **PR #78**: "backend connection" by Ram Pathak
- Status: Open (108 commits)
- Contains MySQL/Sequelize backend

---

### April 27, 2026

#### 5. Folder Reorganization ✅
- Moved files to systematic structure:
  ```
  html/     - 27 HTML pages
  css/      - style.css, theme.css, auth.css
  js/       - index.js, site.js, auth.js
  server/   - server.js, package.json
  presentation/ - PPT file
  docs-midterm/   - API.md, DEMO.md, SETUP.md
  ```

#### 6. Added Midterm Documentation
- `DEMO.md` - Demo flow and credentials
- `SETUP.md` - Quick start + deployment
- `API.md` - API reference
- Updated `README.md` with current structure
- Updated `ROADMAP.md` with midterm progress

---

### April 26, 2026

#### 7. Team Roles Updated
- Added presentation roles in README
- Assigned: Pitch (Ram, Sujan T), Demo (Mohan), Q&A (All), Brochure (Swarnim)

---

### Summary This Week

| Task | Status |
|------|--------|
| Fix CI workflow | ✅ Done |
| Remove broken deploy | ✅ Done |
| Reorganize folders | ✅ Done |
| Add midterm docs | ✅ Done |
| Update team roles | ✅ Done |
| Add PROJECT_TASKS.md | ✅ Done |
| Reference PR #78 | ✅ Done |
| Presentation PPT | ✅ Uploaded |

---

### For Midterm Presentation

| Item | Location |
|------|----------|
| Demo | `cd server && node server.js` → http://localhost:3000 |
| Credentials | alisha@example.com / demo123 |
| PPT | `presentation/Midterm Presentation/` |
| Docs | README.md, DEMO.md, SETUP.md |
| Checklist | PROJECT_TASKS.md |

---

*Updated: Week 8 - Midterm*