# Sprint 1 Document — Free Sewaa


## 1) Sprint goal 
**Sprint 1 Goal:**  
A community user can **browse donated items and open an item detail view** in the Free Sewaa web app (frontend MVP).

---

## 2) User stories (1–3 maximum)

### Story 1 (Chosen) — Browse + Item Detail (Highest Priority)
**As a** community user, **I want** to browse available donation items and open an item detail view, **so that** I can understand the item before requesting it.

### Story 2 — Donate Item Form (UI) (Medium Priority)
**As a** donor, **I want** to fill out a donate item form, **so that** I can submit an item for donation (frontend MVP).

### Story 3 — Request Item (UI flow) (Medium Priority)
**As a** receiver, **I want** to request an item and get confirmation, **so that** I know my request was sent (frontend MVP).

---

## 3) One chosen story for the sprint + why
### Chosen story: Story 1 — Browse + Item Detail

**Why we chose it first:**
- This is the core workflow of Free Sewaa (discover items first).
- It is easy to demo and grade quickly.
- Other workflows (request, donate) depend on having item details available.
- It can be completed with mock/static data if backend is not ready.

---

## 4) Buildable GitHub Issues (What / Why / Owner / Definition of Done)

### Sprint 1 chosen build issue
**Issue:** Create item detail view (Issue #19)  
**Link:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/19

**What:**  
Create an item detail page or modal that shows full information for a selected donation item.

**Why:**  
Item details are required for the user to decide whether to request an item, and it is essential for a sprint demo.

**Owner (single owner):**  
Ram Pathak

**Definition of Done (DoD):**
- [ ] User can open an item detail view from the item listing
- [ ] Detail view shows: title, description, category, condition, location
- [ ] Donor contact information is visible (or clearly marked as placeholder if not implemented yet)
- [ ] Request action/button exists on the detail view (even if it is UI-only)
- [ ] No console errors during normal use
- [ ] Screenshot/GIF proof attached in PR or issue comment
- [ ] Linked PR references the issue (ex: “Fixes #19”)
- [ ] At least 1 teammate review comment exists before merge

---

### Related Sprint 1 issues (supporting work)
These issues support the Sprint 1 MVP and demo readiness:

- Improve item posting form validation (Issue #20)  
  https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/20

- Implement request and contact donor confirmation flow (Issue #21)  
  https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/21

- Implement category filter for item listings (Issue #26)  
  https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/26

---

## 5) Definition of Done for active work (team rule)
Work is considered “done” only if:
- DoD checklist items are complete
- One owner is assigned
- Evidence links are present (issue + PR/commit)
- Screenshot/GIF proof is attached

---

## 6) Ownership rule
Each active issue must have **one owner** (others can help, but one person is accountable).

---

## 7) First slice started (proof)
We will prove Sprint 1 moved beyond planning by linking at least:
- one branch
- one commit
- one PR (open or merged)

**Evidence (update with real links):**
- Branch created: TBD
- First commit: TBD
- PR link: TBD

---

## 8) Evidence links (must be real before final submission)

**Repository**
- https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa

**Decision evidence (documentation decision)**
- Decision issue for frontend design doc (Issue #50):  
  https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/50

**Chosen Sprint 1 build issue**
- Issue #19:  
  https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/19

**Related Sprint 1 issues**
- Issue #20: https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/20  
- Issue #21: https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/21  
- Issue #26: https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues/26  

**PR evidence**
- PR list (open/closed): https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pulls
- Specific PR link: TBD

**Commit evidence**
- First commit link: TBD

**Screenshot / demo evidence**
- Screenshot/GIF link (attach in PR or issue comment): TBD

---

## 9) Risks / blockers
- Backend endpoints may not be ready → we can use mock/static item data for Sprint 1 demo.
- Merge conflicts if multiple people edit same files → keep PRs small and coordinate ownership.
- Styling/asset paths can break after merges → test all pages before merge.

---

## 10) Next move
**Next move:**  
Finish the Item Detail View MVP (Issue #19) with a demo-ready flow from listing → detail, then add request confirmation UI (Issue #21) and basic donate form validation (Issue #20).

---
