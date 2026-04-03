## Week 3 MVP Specifications (for `CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa`)

## Overview

## Features to Implement

### Feature 1: App Setup + Navigation
- Create/confirm app structure (components, styling, routes or page switching).
- Add navigation between:
  - Home
  - Browse Items
  - Post Item
- Ensure app runs locally without errors.

### Feature 2: Browse Items (Item Listing)
- Display donation items in a clean list/grid UI.
- Each item card should show at minimum:
  - title
  - category
  - location (or short description)
- Items should come from:
  - mock sample items, and/or
  - items saved in `localStorage` from Post Item.

### Feature 3: Category Filter (Browse Improvement)
- Add category filtering UI (buttons or dropdown).
- Support an “All” option (default).
- Filtering updates the displayed items immediately.

### Feature 4: Item Detail View (Modal or Page)
- Clicking an item opens a modal or detail page.
- Show full item details (minimum):
  - title
  - description
  - category
  - location
  - donor contact field placeholder (hidden until request)
- Provide close/back behavior.

### Feature 5: Request Item + Contact Donor Confirmation Flow
- Add “Request Item” action inside the detail view.
- Confirmation step required (confirm dialog/modal).
- After confirmation:
  - show a success/feedback message
  - reveal donor contact info
- Optional: store “requested” status in `localStorage` to prevent duplicate requests.

### Feature 6: Post Item Form + Validation
- Build Post Item form with required fields:
  - title, description, category, location, contact (email/phone)
- Validate required fields (and email format if using email).
- On successful submission:
  - show success message
  - clear the form
  - persist new item to `localStorage`
  - confirm the new item appears in Browse list.

## Demo Plan (Week 3)
During the demo, show:
1. Browse Items list
2. Category filtering
3. Item detail modal/page
4. Request → confirm → donor contact reveal
5. Post Item → validation → successful submit → item appears in Browse

## Deliverables
- Demoable Week 3 React MVP in the repo (merged to `main`)
- GitHub evidence:
  - linked issues for each feature
  - PR(s) showing implementation
  - commits and screenshots/video for backup demo

## Conclusion
Week 3 delivers the first complete **frontend-only MVP flow** for Free Sewaa. The sprint outcome 
is a stable demo that proves the product concept end-to-end and sets the foundation for Week 4 improvements and backend integration.
