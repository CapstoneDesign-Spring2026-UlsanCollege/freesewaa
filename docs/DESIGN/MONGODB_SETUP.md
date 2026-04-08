# MongoDB Atlas Setup Guide

## Step 1: Create Account

1. Go to: https://www.mongodb.com/atlas
2. Click "Start Free"
3. Sign up with Google or Email

---

## Step 2: Create Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (Sandbox)
3. Select region closest to you (e.g., Singapore)
4. Click "Create"

---

## Step 3: Create User

1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Set:
   - **Username:** free-sewaa
   - **Password:** (generate secure password)
   - **Database User Privileges:** "Read and write to any database"
4. Click "Add User"

---

## Step 4: Allow Access

1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Click "Confirm"

---

## Step 5: Get Connection String

1. Go to "Deployment" → "Database"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

Example:
```
mongodb+srv://free-sewaa:YOUR_PASSWORD@cluster.mongodb.net/free-sewaa
```

---

## Step 6: Update .env

Edit `backend/.env`:
```
MONGODB_URI=mongodb+srv://free-sewaa:YOUR_PASSWORD@cluster.mongodb.net/free-sewaa
```

---

## Step 7: Test

```bash
cd backend
npm install
npm run dev
```

If you see "MongoDB connected" - success!

---

## Troubleshooting

**Error: Authentication failed?**
- Check username and password in .env

**Error: Network access?**
- Make sure you added 0.0.0.0/0 to Network Access

**Error: Cluster not found?**
- Wait a few minutes for cluster to be ready

---

*Owner: Sujan Tamang (Developer)*
