# Free Sewaa Firebase Auth Setup

This project now supports:
- Real Google sign in
- Real phone number OTP sign in
- Backend token verification with Firebase Admin

## 1) Create a Firebase project
- Go to Firebase Console
- Create or open your project
- Add a **Web App**
- Copy the web config values

## 2) Enable providers
In **Authentication > Sign-in method** enable:
- Google
- Phone

## 3) Set authorized domains
Add the domains you will use, for example:
- localhost
- 127.0.0.1
- your deployed domain

## 4) Fill frontend config
Open `firebase-config.js` and replace every placeholder with your real Firebase web app config.

## 5) Create service account for backend
In Firebase Console:
- Project settings
- Service accounts
- Generate new private key

Then set these values in your environment:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Important:
- Keep line breaks in the private key. If you paste it into `.env`, use `\n` between lines.

## 6) Install backend dependency
At the project root:
```bash
npm install
```

If you also use the structured backend folder directly:
```bash
cd backend
npm install
```

## 7) Start the app
At the project root:
```bash
npm start
```

## 8) Test flows
### Google
- Open `signin.html` or `signup.html`
- Click **Continue with Google**
- Complete the popup

### Phone OTP
- Enter a real phone number
- Click **Send Verification Code**
- Complete reCAPTCHA
- Enter the SMS code
- Submit

## 9) Common issues
### Google popup blocked
Allow popups in your browser.

### reCAPTCHA not showing
Make sure Firebase config is filled correctly and phone auth is enabled.

### `Firebase is not configured`
You still have placeholder values in `firebase-config.js`.

### `Firebase Admin is not configured on the server`
Your backend env variables for Firebase Admin are still missing.
