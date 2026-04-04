---
name: Bug
about: Report a problem in the Free Sewaa platform
title: "[Bug] Request and item actions were not fully reflected across pages"
labels: bug
assignees: ""
---

## Summary

Actions such as sending requests, canceling requests, and removing posted items were not consistently reflected across the related pages.

---

## Affected Feature

Which part of Free Sewaa is affected?

- Homepage
- Post Item
- Browse Items
- Request Item
- Contact Donor
- Login / Signup
- Other:

Affected: Request Item, My Requests, My Donations

---

## Steps to Reproduce

1. Go to: `browse.html` or `my-donations.html`
2. Click on: request item / remove item / cancel request
3. Enter: request message if needed
4. Submit / Continue: confirm the action
5. See error: action does not fully update or reflect properly across connected pages

---

## Expected Behavior

When the user sends a request, cancels a request, or removes an item, the related page state should update clearly and consistently.

---

## Actual Behavior

Some actions were missing or not clearly handled, making the frontend feel incomplete.

---

## Screenshots / Evidence

Add proof if available.

- Screenshot: Available
- Screen recording: N/A
- Console error: N/A
- Related commit: Frontend logic improvement pass
- Related PR: N/A
- Related issue: N/A

---

## Demo Impact

Does this bug affect the team demo?

- [x] Yes
- [ ] No

If yes, explain how it affects the demo:

Core product actions are part of the main user journey. If they do not work properly, the demo flow breaks.

---

## Possible Cause

Frontend state and UI update logic were not consistently managed across pages.

---

## Suggested Fix

Connect actions to a shared frontend state flow and ensure all related pages re-render correctly after user actions.

---

## Owner

Who will work on this bug?

- Name: sujan shrestha / Frontend Team
- Role: Frontend Developer

---

## Notes

This issue was fixed by improving request flow, item removal flow, and frontend state consistency.
