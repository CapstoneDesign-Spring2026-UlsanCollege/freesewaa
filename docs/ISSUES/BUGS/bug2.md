---
name: Bug
about: Report a problem in the Free Sewaa platform
title: "[Bug] Uploaded and preview images were too large and inconsistent"
labels: bug
assignees: ""
---

## Summary

Images across the website were appearing too large, stretched, or inconsistent, especially in item cards and featured sections.

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

Affected: Homepage, Browse Items, Post Item

---

## Steps to Reproduce

1. Go to: `home.html` or `browse.html`
2. Click on: item cards / featured sections
3. Enter: N/A
4. Submit / Continue: View item images
5. See error: Images appear oversized, stretched, or visually unbalanced

---

## Expected Behavior

All images should use a professional fixed-size layout with proper cropping and consistent card presentation.

---

## Actual Behavior

Images were displayed too large and made the UI look unprofessional and inconsistent.

---

## Screenshots / Evidence

Add proof if available.

- Screenshot: Available
- Screen recording: N/A
- Console error: N/A
- Related commit: UI refinement update
- Related PR: N/A
- Related issue: N/A

---

## Demo Impact

Does this bug affect the team demo?

- [x] Yes
- [ ] No

If yes, explain how it affects the demo:

Oversized and badly fitted images reduce visual quality and make the platform look like a template rather than a real product.

---

## Possible Cause

Image containers did not have fixed aspect ratios, and CSS sizing rules were not standardized.

---

## Suggested Fix

Use fixed image containers, apply `object-fit: cover`, and standardize media sizing across item cards and homepage sections.

---

## Owner

Who will work on this bug?

- Name: sujan shrestha / Frontend Team
- Role: UI / Frontend Developer

---

## Notes

This issue was fixed by improving image container sizing, card media layout, and shared CSS rules.
