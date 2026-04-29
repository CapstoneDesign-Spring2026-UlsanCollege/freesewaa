## Create These GitHub Issues

Below are 8 detailed bug issues. Create them in your GitHub repo using the web interface or gh CLI.

---

### Issue 1: P0 - Password Stored in Plain Text

**Title:**
```
[severity:p0] Password stored in plain text - no hashing implemented
```

**Labels:** bug, severity:p0, security, backend

**Body:**
```markdown
## Summary
Passwords are stored in the database in plain text without any hashing. This is a critical security vulnerability.

## Severity
P0 - Critical security flaw. Passwords can be extracted from the database in readable form.

## Area
Backend / Security

## Evidence
File: `server/server.js` lines 82, 98, 825, 855, 882
- Demo user password: `123456` stored as plain text
- Admin password: `admin12345` stored as plain text  
- Comparison uses direct string match: `user.password !== password`

## Steps to Reproduce
1. Start MongoDB locally or connect to Atlas
2. Register a new user or check existing user
3. Query the users collection in MongoDB
4. Observe password field contains plain text

## Expected Behavior
Passwords should be hashed using bcrypt or similar before storing.

## Actual Behavior
Passwords stored as: `password: "123456"` in plain text.

## User Impact
If database is compromised, all user passwords are exposed. Violates OWASP security guidelines.

## Suspected Cause
Password hashing was planned but never implemented in the backend.

## Suggested Fix
- Install bcrypt: `npm install bcrypt`
- Hash password on signup before storing
- Use bcrypt.compare() for login verification

## Acceptance Criteria
- [ ] Passwords hashed in database
- [ ] Login uses bcrypt.compare()
- [ ] Security review passes

## Related Documentation
- [AI Code Ownership Audit](docs/AI_CODE_OWNERSHIP_AUDIT.md)
```

---

### Issue 2: P1 - No Input Validation on API Routes

**Title:**
```
[severity:p1] No input validation on signup/auth API routes
```

**Labels:** bug, severity:p1, backend, needs-investigation

**Body:**
```markdown
## Summary
API routes for signup and authentication have no input validation. Invalid, empty, or malicious data can be submitted.

## Severity
P1 - High. Invalid data can corrupt database or cause crashes.

## Area
Backend / API

## Evidence
File: `server/server.js` lines 800-830
- Signup accepts any input without validation
- No email format check
- No password length/complexity requirements
- No sanitization of user input

## Steps to Reproduce
1. Send POST to /api/auth/signup with empty fields
2. Send POST with invalid email format
3. Observe request succeeds or crashes server

## Expected Behavior
Input should be validated before processing.

## Actual Behavior
Server accepts empty or invalid data.

## User Impact
Users can register with invalid data. Database can contain corrupted records.

## Suggested Fix
Add validation middleware like express-validator or joi.

## Acceptance Criteria
- [ ] Email validated for format
- [ ] Password has minimum length
- [ ] Required fields checked
- [ ] Invalid input returns 400 error

## Related Documentation
- [AI Code Ownership Audit](docs/AI_CODE_OWNERSHIP_AUDIT.md)
```

---

### Issue 3: P1 - No Tests for Backend API

**Title:**
```
[severity:p1] No unit tests for backend API endpoints
```

**Labels:** bug, severity:p1, testing, backend

**Body:**
```markdown
## Summary
There are no tests for the backend API. This makes it impossible to verify the API works correctly.

## Severity
P1 - High. Critical functionality has no test coverage.

## Area
Testing / Backend

## Evidence
- No test files in repository
- No test scripts in package.json
- CI workflow only runs file count checks

## Steps to Reproduce
1. Check for test files: `find . -name "*.test.js" -o -name "*.spec.js"`
2. Check package.json scripts
3. Observe no test commands exist

## Expected Behavior
Core API endpoints should have unit tests.

## Actual Behavior
No tests exist for any backend functionality.

## User Impact
Bugs can be introduced without detection. Deployment confidence is low.

## Suggested Fix
- Install Jest: `npm install --save-dev jest`
- Write basic tests for /health, /auth routes
- Add test script to package.json

## Acceptance Criteria
- [ ] Tests exist for API endpoints
- [ ] Tests run in CI
- [ ] All tests pass

## Related Documentation
- [AI Code Ownership Audit](docs/AI_CODE_OWNERSHIP_AUDIT.md)
```

---

### Issue 4: P2 - CI Workflow Doesn't Test Backend

**Title:**
```
[severity:p2] CI workflow only counts files, doesn't run backend tests
```

**Labels:** bug, severity:p2, ci-cd, testing

**Body:**
```markdown
## Summary
The CI workflow only verifies file counts and folder existence. It doesn't start the server or run any tests.

## Severity
P2 - Medium. CI provides minimal confidence in code quality.

## Area
CI/CD

## Evidence
File: `.github/workflows/ci.yml`
- Only runs: `ls html/*.html | wc -l`
- No `npm install` or `npm start`
- No backend tests executed
- No linting

## Steps to Reproduce
1. Look at CI workflow file
2. Check recent CI runs
3. Observe only file counting is done

## Expected Behavior
CI should install dependencies, start server, and run tests.

## Actual Behavior
CI just counts files and exits.

## User Impact
Buggy code can be merged without detection.

## Suggested Fix
Add backend startup and test steps to CI workflow.

## Acceptance Criteria
- [ ] CI installs dependencies
- [ ] CI starts server
- [ ] CI runs tests
- [ ] CI reports results

## Related Documentation
- [AI Code Ownership Audit](docs/AI_CODE_OWNERSHIP_AUDIT.md)
```

---

### Issue 5: P2 - No Error Handling in API Routes

**Title:**
```
[severity:p2] API routes have no try-catch error handling
```

**Labels:** bug, severity:p2, backend, needs-investigation

**Body:**
```markdown
## Summary
API routes don't have error handling. Server can crash silently on errors.

## Severity
P2 - Medium. Unhandled errors can crash the server.

## Area
Backend

## Evidence
File: `server/server.js` routes 800-900
- No try-catch blocks around async operations
- No error responses sent to client
- Errors logged only to console

## Steps to Reproduce
1. Trigger an error (e.g., disconnect MongoDB)
2. Observe server behavior
3. Check error logs

## Expected Behavior
Errors should be caught and return meaningful HTTP responses.

## Actual Behavior
Server may crash or return 500 without clear message.

## User Impact
Users see generic errors or empty responses.

## Suggested Fix
Add try-catch blocks with proper error responses.

## Acceptance Criteria
- [ ] All routes have error handling
- [ ] Errors return proper HTTP codes
- [ ] Error messages are helpful

## Related Documentation
- [AI Code Ownership Audit](docs/AI_CODE_OWNERSHIP_AUDIT.md)
```

---

### Issue 6: P2 - README Has Wrong Setup Commands

**Title:**
```
[severity:p2] README shows npm start but server is in subdirectory
```

**Labels:** bug, severity:p2, documentation, ci-cd

**Body:**
```markdown
## Summary
README says to run `npm start` but the backend server is in the `server/` subdirectory.

## Severity
P2 - Medium. Developers following README will get errors.

## Area
Documentation

## Evidence
README.md lines 61-72:
```
npm start
```
But server is in `server/server.js` requiring:
```
cd server && npm start
```

## Steps to Reproduce
1. Clone repository fresh
2. Follow README exactly
3. Run `npm start` in root
4. Observe error (no package.json in root)

## Expected Behavior
README should reflect actual project structure.

## Actual Behavior
Commands don't work as documented.

## User Impact
New developers cannot set up the project.

## Suggested Fix
Update README with correct commands:
```bash
cd server
npm install
npm start
```

## Acceptance Criteria
- [ ] README has correct setup commands
- [ ] Developer can follow README and run app

## Related Documentation
- [AI Code Ownership Audit](docs/AI_CODE_OWNERSHIP_AUDIT.md)
```

---

### Issue 7: P3 - Demo Credentials in Code

**Title:**
```
[severity:p3] Demo credentials visible in source code
```

**Labels:** bug, severity:p3, security, documentation

**Body:**
```markdown
## Summary
Demo credentials (username/password) are hardcoded in server.js.

## Severity
P3 - Low. Not a production security issue since it's demo data.

## Area
Security / Backend

## Evidence
File: `server/server.js` lines 82, 98
```javascript
{
  email: 'alisha@example.com',
  password: '123456'
}
```

## Steps to Reproduce
1. Open server/server.js
2. Find hardcoded credentials

## Expected Behavior
Demo data should be seeded from environment or separate file.

## Actual Behavior
Credentials in source code.

## User Impact
Low - these are demo accounts, not production.

## Suggested Fix
Move demo data to .env or seed file.

## Acceptance Criteria
- [ ] Credentials moved to config
- [ ] Not in source code

## Related Documentation
- [AI Code Ownership Audit](docs/AI_CODE_OWNERSHIP_AUDIT.md)
```

---

### Issue 8: P3 - Missing Environment Setup Guide

**Title:**
```
[severity:p3] No MongoDB setup instructions in docs
```

**Labels:** bug, severity:p3, documentation, database

**Body:**
```markdown
## Summary
Documentation doesn't explain how to set up MongoDB for local development.

## Severity
P3 - Low. Easy to figure out but slows onboarding.

## Area
Documentation / Database

## Evidence
- MONGODB_SETUP.md exists but assumes prior knowledge
- No quick start guide for local MongoDB

## Steps to Reproduce
1. New developer follows README
2. MongoDB connection needed
3. No clear instructions for local setup

## Expected Behavior
Clear MongoDB setup instructions in README or docs.

## Actual Behavior
Developer must research MongoDB setup independently.

## User Impact
Slows developer onboarding.

## Suggested Fix
Add "How to set up MongoDB locally" section to docs.

## Acceptance Criteria
- [ ] MongoDB setup documented
- [ ] Local development possible

## Related Documentation
- [AI Code Ownership Audit](docs/AI_CODE_OWNERSHIP_AUDIT.md)
```

---

## Summary Table

| Issue Title | Severity | Labels | Evidence |
|---|---|---|---|
| Password stored in plain text | P0 | bug,severity:p0,security,backend | server/server.js lines 82,98 |
| No input validation on API | P1 | bug,severity:p1,backend | server/server.js lines 800-830 |
| No tests for backend | P1 | bug,severity:p1,testing | No test files |
| CI only counts files | P2 | bug,severity:p2,ci-cd | .github/workflows/ci.yml |
| No error handling | P2 | bug,severity:p2,backend | server/server.js |
| README wrong commands | P2 | bug,severity:p2,docs | README.md lines 61-72 |
| Demo credentials in code | P3 | bug,severity:p3,security | server/server.js lines 82,98 |
| No MongoDB setup guide | P3 | bug,severity:p3,docs | docs/DESIGN/MONGODB_SETUP.md |