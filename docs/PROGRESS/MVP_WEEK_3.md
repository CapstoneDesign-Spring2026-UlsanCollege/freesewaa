# 📌 Week 3 MVP Specifications – Free Sewaa

## Overview
Week 3 focuses on delivering a **complete frontend-only MVP flow** for Free Sewaa. The goal is to demonstrate the core user journey—from browsing items to requesting and posting—using a stable and interactive interface.

---

## 🔹 Core Features

### 1. App Setup & Navigation
- Structured app with working navigation:
  - Home
  - Browse Items
  - Post Item  
- Runs locally without errors.

---

### 2. Browse Items
- Display items in a clean grid/list UI  
- Each item shows: title, category, location/short description  
- Data sourced from mock items and `localStorage`

---

### 3. Category Filtering
- Filter items by category  
- Includes “All” option  
- Updates instantly on selection  

---

### 4. Item Detail View
- Click item → open modal/page  
- Displays full details:
  - title, description, category, location  
- Includes back/close functionality  

---

### 5. Request Item Flow
- “Request Item” button in detail view  
- Confirmation step required  
- On success:
  - show feedback message  
  - reveal donor contact info  
- Optional: store request status in `localStorage`  

---

### 6. Post Item + Validation
- Form with required fields:
  - title, description, category, location, contact  
- Input validation (including email format if used)  
- On submit:
  - show success message  
  - reset form  
  - save to `localStorage`  
  - item appears in Browse  

---

## 🎯 Demo Plan
Show the full user flow:
1. Browse items  
2. Apply category filter  
3. Open item details  
4. Request item → confirm → reveal contact  
5. Post new item → validate → appears in Browse  

---

## 📦 Deliverables
- Working Week 3 MVP (merged to `main`)  
- GitHub evidence:
  - Issues for each feature  
  - PR(s) with implementation  
  - Commits + screenshots/video  

---

## ✅ Conclusion
Week 3 delivers a **functional frontend MVP** that demonstrates the full product flow and prepares the project for backend integration in the next sprint.
