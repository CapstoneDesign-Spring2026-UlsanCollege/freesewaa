---
name: Bug
about: Report a problem in the Free Sewaa platform
title: "[Bug] Admin login shows invalid response error after account creation"
labels: bug
assignees: ""
---

## Summary

After attempting to create or log in with an admin account, the system displays an incorrect error message:  
"Account created, but the response format was invalid."

This creates confusion and interrupts the admin authentication flow.

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

Affected: Admin Login / Authentication System

---

## Steps to Reproduce

1. Go to: `admin-login.html`
2. Enter: admin email and password
3. Click on: **Sign In**
4. Observe the message displayed below the button

---

## Expected Behavior

After successful account creation or login:
- The system should return a valid response
- Admin should be redirected to the admin dashboard
- A proper success message should be shown (if needed)

---

## Actual Behavior

The system shows:
"Account created, but the response format was invalid."

This indicates a failure in response handling even if the account may have been created successfully.

---

## Screenshots / Evidence

Add proof if available.

- Screenshot: Available (admin login UI showing error message)
- Screen recording: N/A
- Console error: Not confirmed
- Related commit: Admin panel implementation
- Related PR: N/A
- Related issue: N/A

---

## Demo Impact

Does this bug affect the team demo?

- [x] Yes
- [ ] No

If yes, explain how it affects the demo:

Admin login is a core part of the system. If authentication fails or shows incorrect errors, the admin dashboard cannot be demonstrated properly.

---

## Possible Cause

- Frontend expecting a different API response structure
- Backend returning invalid or inconsistent JSON
- Missing fields like `success`, `token`, or `admin`
- Improper response parsing in frontend JavaScript

---

## Suggested Fix

- Standardize backend response format (JSON structure)
- Ensure frontend correctly parses API response
- Add proper success/error handling for admin login
- Validate response before displaying messages

---

## Owner

Who will work on this bug?

- Name: sujan shrestha / Frontend Team
- Role: Frontend Developer

---

## Notes

This issue is likely caused by a mismatch between frontend expectations and backend response structure. Fixing the API response handling will resolve the problem.
