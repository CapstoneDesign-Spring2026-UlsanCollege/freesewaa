# Free Sewaa

> A community donation platform connecting donors with people who need reusable items.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: In Progress](https://img.shields.io/badge/Status-In%20Progress-blue)](https://github.com/CapstoneDesign-Spring2026-UlsanCollege/Free_Sewaa)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://mongodb.com/)

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

### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file with your MongoDB URI
cp .env.example .env

# Start development server
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Setup Frontend
Simply open any HTML file in your browser, or use a local server:
```bash
# Using Python
python3 -m http.server 8080

# Or using npx
npx serve .
```

Then open `http://localhost:8080/home.html`

---

## 📖 API Documentation

Interactive API documentation is available at `/api-docs` when the backend is running.

**Example:** `http://localhost:3000/api-docs`

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/items` | List all items |
| POST | `/api/items` | Create new item |
| GET | `/api/items/:id` | Get item details |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |
| POST | `/api/requests` | Create request |
| PUT | `/api/requests/:id/status` | Accept/reject request |
| POST | `/api/messages` | Send message |
| GET | `/api/messages/conversations` | Get conversations |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth** | JWT (JSON Web Tokens) |
| **API Docs** | Swagger/OpenAPI |
| **Hosting** | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure

```
Free_Sewaa/
├── .github/                    # GitHub templates
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config/           # Database & Swagger config
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Auth middleware
│   │   ├── models/           # Mongoose schemas
│   │   └── routes/           # API routes
│   ├── .env.example          # Environment template
│   ├── package.json
│   └── README.md
├── docs/                      # Documentation
│   ├── DESIGN/                # Design documents
│   ├── ISSUES/                # Issue tracking
│   ├── PROGRESS/              # MVP progress
│   ├── PROJECT/               # Project docs
│   └── sprints/               # Sprint packets
├── css/                       # Stylesheets
├── js/                        # Frontend scripts
├── *.html                     # Frontend pages
├── README.md
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

---

## 🔧 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/free-sewaa
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

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
