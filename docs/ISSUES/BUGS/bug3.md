---
name: Bug
about: Report a problem in the Free Sewaa platform
title: "[Bug] No professional logout option available after user login"
labels: bug
assignees: ""
---

## Summary

After login, the user did not have a clear and professional way to log out of the platform.

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

Affected: Login / Signup, Homepage, Settings

---

## Steps to Reproduce

1. Go to: `login.html`
2. Click on: login
3. Enter: valid user credentials
4. Submit / Continue: Continue to homepage
5. See error: No clear logout button available in the header or account area

---

## Expected Behavior

After login, the user should see a professional account menu with a logout option, ideally inside the profile/settings dropdown.

---

## Actual Behavior

Logout was missing or not clearly accessible, which created confusion in the user flow.

---

## Screenshots / Evidence

Add proof if available.

- Screenshot: Available
- Screen recording: N/A
- Console error: N/A
- Related commit: Logout dropdown improvement
- Related PR: N/A
- Related issue: N/A

---

## Demo Impact

Does this bug affect the team demo?

- [x] Yes
- [ ] No

If yes, explain how it affects the demo:

Without logout, the authentication flow feels incomplete and unprofessional during the demo.

---

## Possible Cause

The user account area was not fully designed with a dropdown/settings structure.

---

## Suggested Fix

Add a profile dropdown with links such as Profile, Settings, and Log out. Also provide logout access in the settings page.

---

## Owner

Who will work on this bug?

- Name: sujan shrestha  / Frontend Team
- Role: Frontend Developer

---

## Notes

This issue was fixed by adding a professional user dropdown menu and logout functionality.
