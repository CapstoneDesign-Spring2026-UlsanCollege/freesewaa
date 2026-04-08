# MongoDB Atlas Setup

## Quick Steps

### 1. Go to MongoDB Atlas
```
https://www.mongodb.com/atlas
```
Click "Start Free" → Sign up with Google

---

### 2. Create Cluster
- Click "Build a Database"
- Choose **FREE** tier
- Select Region: Singapore (or closest to you)
- Click "Create"

**Wait 2-3 minutes for cluster to be ready**

---

### 3. Create User
1. Click "Security" → "Database Access"
2. Click "Add New Database User"
3. Fill in:
   - Username: `freesewaa`
   - Password: `(click Generate button)`
   - Role: "Read and write to any database"
4. Click "Add User"

---

### 4. Allow Access
1. Click "Security" → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Click "Confirm"

---

### 5. Get Connection String
1. Go to "Deployment" → "Database"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your user password from Step 3

Example:
```
mongodb+srv://freesewaa:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/freeSewaa
```

---

### 6. Update Backend
Open `backend/.env` and replace the MONGODB_URI line:
```
MONGODB_URI=mongodb+srv://freesewaa:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/freeSewaa
```

---

### 7. Start Backend
```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ MongoDB connected: cluster0.xxxxx
🚀 Free Sewaa server running on port 5000
```

---

## Done!
