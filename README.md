# Free Sewaa

> A community donation platform connecting donors with people who need reusable items.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: In Progress](https://img.shields.io/badge/Status-In%20Progress-blue)](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://mongodb.com/)

---

## Live Deployment

This project is deployed from the GitHub `main` branch using Render.

- Live website: https://free-sewaa-qh05.onrender.com
- Signup page: https://free-sewaa-qh05.onrender.com/signup.html
- Admin login: https://free-sewaa-qh05.onrender.com/admin_login.html

Admin demo account:

```text
Email: admin@freesewaa.local
Password: admin12345
```

User demo account:

```text
Email: pathakram09555gmail.com
Password:123456
```

---

## 🎯 About

**Free Sewaa** is a community-based donation platform that enables people to give away usable items for free to those who need them. The mission is to reduce waste, support communities, and make helping others simple and accessible.

### Features
- 🔐 User authentication (signup/login)
- 📦 Browse available donation items
- 🎁 Post items for donation
- 📋 Request items
- 💬 Direct messaging between users

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa.git
cd Free_Sewaa
```

### 2. Install Dependencies & Run Backend
```bash
npm install

# Create .env file (optional - works without it for demo)
# Add MONGO_URI for production database connection

# Start server
npm start
```

The backend runs on `http://localhost:3000`

### 3. Access the App
Open your browser and go to:
- **Landing page:** http://localhost:3000
- **Sign in:** http://localhost:3000/signin.html
- **App:** http://localhost:3000/app.html

**Demo Account:**
- Email: `ram@example.com`
- Password: `ram123`

---

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/signin` | Login user |
| POST | `/auth/google-demo` | Demo Google login |
| POST | `/auth/logout` | Logout user |

### State Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/state?userId={id}` | Get user state |
| PUT | `/state?userId={id}` | Update user state |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health status |

### Request/Response Examples

**Signup:**
```json
POST /api/auth/signup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Signin:**
```json
POST /api/auth/signin
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { "id": "user-123", "name": "John Doe", ... },
  "auth": { "userId": "user-123", "isAuthenticated": true }
}
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | JSON file storage (production: MongoDB ready) |
| **Deployment** | Ready for Vercel, Render, Railway |

---

## 📁 Project Structure

```
Free_Sewaa/
├── .github/                    # GitHub templates & workflows
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/              # CI/CD workflows
├── docs/                       # Documentation
│   ├── DESIGN/                 # Design documents
│   ├── ISSUES/                 # Issue tracking
│   ├── PROGRESS/               # MVP progress
│   ├── PROJECT/                # Project docs
│   └── sprints/                # Sprint packets
├── server/                     # Node.js backend
│   ├── server.js               # Express server
│   └── package.json            # Dependencies
├── *.html                      # Frontend pages (18 pages)
│   ├── index.html              # Landing page
│   ├── signin.html             # Sign in
│   ├── signup.html             # Sign up
│   ├── app.html                # Main app after login
│   ├── browse.html             # Browse items
│   ├── donate.html             # Post donation
│   └── ... (14 more pages)
├── css/                        # Stylesheets
│   ├── style.css               # Landing page styles
│   ├── theme.css               # App pages styles
│   └── auth.css                # Auth pages styles
├── js/                         # Frontend scripts
│   ├── index.js                # Landing page JS
│   ├── site.js                 # App pages JS
│   └── auth.js                 # Auth pages JS
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── ROADMAP.md
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000

# Database (optional - uses local JSON if not set)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/free-sewaa

# For MySQL (alternative)
# MYSQL_URI=mysql://user:password@localhost:3306/freesewaa
```

> **Note:** The app works without any environment variables for local demo. Add database connection strings when ready for production.

---

## 👥 Team

| Role | Name |
|------|------|
| Project Manager | Ram Pathak |
| Scribe | Swarnim Jung Karki |
| QA Lead | Sujan Shrestha |
| Demo Driver | Mohan Khadka |
| Developer | Sujan Tamang |

---

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [PROJECT_IDEA_PITCH.md](docs/PROJECT/PROJECT_IDEA_PITCH.md) | Project concept and goals |
| [USER_STORIES.md](docs/PROJECT/USER_STORIES.md) | User stories and flows |
| [SYSTEM_ARCHITECTURE.md](docs/DESIGN/SYSTEM_ARCHITECTURE.md) | System architecture |
| [BACKEND_PLAN.md](docs/DESIGN/BACKEND_PLAN.md) | Backend development plan |
| [MONGODB_SETUP.md](docs/DESIGN/MONGODB_SETUP.md) | MongoDB Atlas setup guide |
| [DEPLOYMENT.md](docs/DESIGN/DEPLOYMENT.md) | Deployment guide |
| [Weekly Sprint Packets](docs/sprints/) | Weekly progress tracking |

---

## 📋 Quick Reference

---

## 🔗 Links

- **Repository:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa
- **Project Board:** https://github.com/orgs/CapstoneDesign-Spring2026-UlsanCollege/projects/14
- **Pull Requests:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/pulls
- **Issues:** https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa/issues

---

## 📋 Development Workflow

```
Issue → Branch → Code → PR → Review → Merge
```

1. Create an issue
2. Create a branch: `git checkout -b feature/your-feature`
3. Make changes
4. Create PR with description
5. Team reviews and merges

---

## 📅 Weekly Sprints

- [Week 1 Sprint Packet](docs/sprints/Weekly%20Sprint%20Packet%20—%20Week%201.md)
- [Week 2 Sprint Packet](docs/sprints/Weekly%20Sprint%20Packet%20—%20Week%202.md)
- [Week 3 Sprint Packet](docs/sprints/Weekly%20Sprint%20Packet%20—%20Week%203.md)
- [Week 4 Sprint Packet](docs/sprints/Weekly%20Sprint%20Packet%20—%20Week%204.md)
- [Week 5 Sprint Packet](docs/sprints/Weekly%20Sprint%20Packet%20—%20Week%205.md)
- [Week 6 Sprint Packet](docs/sprints/Weekly%20Sprint%20Packet%20—%20Week%206.md)

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙏 Mission

> To build a platform that connects communities, reduces waste, and helps people in need by making sharing simple and accessible.
