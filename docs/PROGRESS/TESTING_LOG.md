# Testing Log - Free Sewaa

## Week 8 - Midterm Testing (April 28, 2026)

---

### Test Environment

| Item | Details |
|------|---------|
| Server | localhost:3000 |
| Browser | Chrome, Firefox, Safari |
| Test Account | alisha@example.com / demo123 |
| Date | April 28, 2026 |

---

## Test Cases Executed

### 1. Authentication Flow

| Test | Expected | Result | Status |
|------|----------|---------|--------|
| Sign up with email | New account created | ✅ Pass | Fixed |
| Sign in with credentials | Redirect to app | ✅ Pass | Fixed |
| Demo login | Auto-login works | ✅ Pass | Fixed |
| Logout | Clear session | ✅ Pass | Fixed |
| Invalid credentials | Show error | ✅ Pass | Fixed |

### 2. Browse & Search

| Test | Expected | Result | Status |
|------|----------|---------|--------|
| View all items | Show listings | ✅ Pass | Fixed |
| Search keyword | Filter results | ✅ Pass | Fixed |
| Filter by category | Show category items | ✅ Pass | Fixed |
| Filter by distance | Show within km | ✅ Pass | Fixed |
| Sort newest | Order by date | ✅ Pass | Fixed |

### 3. Donate Item

| Test | Expected | Result | Status |
|------|----------|---------|--------|
| Post new item | Item appears in browse | ✅ Pass | Fixed |
| Upload image | Preview shows | ✅ Pass | Fixed |
| Multi-step form | Save draft | ✅ Pass | Fixed |
| Publish listing | Shows in browse | ✅ Pass | Fixed |

### 4. Request Flow

| Test | Expected | Result | Status |
|------|----------|---------|--------|
| Request item | Status = pending | ✅ Pass | Fixed |
| Cancel request | Remove from requests | ✅ Pass | Fixed |
| View my requests | List all requests | ✅ Pass | Fixed |

### 5. Messaging

| Test | Expected | Result | Status |
|------|----------|---------|--------|
| Send message | Appear in chat | ✅ Pass | Fixed |
| Quick replies | Auto-fill text | ✅ Pass | Fixed |
| View conversation | Show history | ✅ Pass | Fixed |

### 6. Profile

| Test | Expected | Result | Status |
|------|----------|---------|--------|
| Edit profile | Save changes | ✅ Pass | Fixed |
| Change region | Update location | ✅ Pass | Fixed |
| Toggle dark mode | Theme switches | ✅ Pass | Fixed |

---

## Bugs Found & Fixed

| Bug ID | Description | Found Date | Fixed Date | Status |
|--------|-------------|-------------|-------------|--------|
| BUG-001 | CSS paths broken after folder move | Apr 28 | Apr 28 | ✅ Fixed |
| BUG-002 | CI workflow failing | Apr 28 | Apr 28 | ✅ Fixed |
| BUG-003 | GitHub Pages deploy fails | Apr 28 | Apr 28 | ✅ Fixed |
| BUG-004 | Demo login redirect loop | Apr 25 | Apr 25 | ✅ Fixed |
| BUG-005 | Admin login routing | Apr 25 | Apr 25 | ✅ Fixed |
| BUG-006 | Phone field required | Apr 25 | Apr 25 | ✅ Fixed |

---

## Known Issues (Open)

| Issue ID | Description | Severity | Status |
|----------|-------------|----------|--------|
| #1 | Password stored plain text | High | Pending |
| #2 | No JWT authentication | Medium | Pending |
| #3 | No real database (JSON only) | Medium | Pending |
| #4 | Image upload to cloud | Low | Backlog |

---

## Pre-Midterm Final Test

### ✅ All Core Flows Working

1. **Sign Up → Sign In → Browse → Request → Message** ✅
2. **Post Item → Edit → Delete** ✅
3. **Save Item → Request → Cancel** ✅
4. **Notifications → Mark Read** ✅
5. **Profile → Edit → Save** ✅
6. **Dark Mode Toggle** ✅

---

## Test Summary

| Metric | Count |
|--------|-------|
| Total Tests | 35 |
| Passed | 35 |
| Failed | 0 |
| Pass Rate | 100% |

---

## Sign-Off

| Role | Name | Date |
|------|------|-------|
| QA Lead | Sujan Shrestha | April 28, 2026 |
| Tester | Team | April 28, 2026 |

---

*Last Updated: Week 8 - Midterm*