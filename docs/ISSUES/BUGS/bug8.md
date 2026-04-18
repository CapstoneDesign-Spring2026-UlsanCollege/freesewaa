## Bug
Admin login displays incorrect error after account creation:
`Account created, but the response format was invalid.`

## Steps to Reproduce
1. Go to Admin Login page
2. Create or submit admin account credentials
3. Click **Sign In**
4. Check the response message under the button

## Actual Behavior
System shows:
`Account created, but the response format was invalid.`

## Expected Behavior
If account creation succeeds, the app should:
- return a valid JSON response in the expected format
- log the admin in or redirect to the admin dashboard
- show a proper success message instead of an error

## Suspected Cause
Frontend and backend response schema mismatch.
Possible examples:
- frontend expects JSON but receives plain text or unexpected object
- missing fields such as `token`, `admin`, `role`, or `message`
- signup/login handler reusing incorrect parser logic

## Impact
High — blocks or confuses admin authentication flow.

## Evidence
See attached screenshot from admin login page.
