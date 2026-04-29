# Quick Setup Guide

## Running the App

```bash
# Install dependencies
npm install

# Start server
node server.js
```

## Access
- http://localhost:3000

## Demo Login
- Email: alisha@example.com
- Password: demo123

## Deployment

### Render.com (Recommended)
1. Connect GitHub repo to Render
2. Build command: `npm install`
3. Start command: `node server.js`
4. Set environment variable `PORT=3000`

### Railway
1. Connect GitHub repo to Railway
2. Add MONGO_URI for production database
3. Deploy

## Adding MongoDB (Optional)
Set environment variable:
```bash
export MONGO_URI="mongodb+srv://your-connection-string"
```

## Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>
```

### CSS not loading
- Make sure all 3 CSS files exist: style.css, theme.css, auth.css

### JS errors in browser console
- Check browser for exact error message
- Verify server.js is running without errors in terminal
