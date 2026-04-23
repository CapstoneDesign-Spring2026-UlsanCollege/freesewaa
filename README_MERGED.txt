Free Sewaa merged flow

How it works:
- index.html = public pre-login landing interface from the first ZIP
- signin.html / signup.html = auth screens from the first ZIP
- app.html = post-login main app interface from the second ZIP
- After sign in, sign up, Google button, or phone flow submit, the user is redirected to app.html
- Login state is simulated with localStorage key: freesewaa-auth
- If already logged in, opening index.html or auth pages redirects to app.html
- Logging out clears localStorage and returns to the landing page

Main files:
- index.html
- signin.html
- signup.html
- app.html
- theme.css
- site.js
