# Frontend Notes — Free Sewaa (Group)

---

## Why we wrote this
We wrote this document to explain what we built and what we plan to build on the **Free Sewaa frontend**.  
The goal is to keep our UI work clear for the team and easy to present during sprint demos.

---

## What we worked on (frontend)
The frontend is focused on creating a simple and user-friendly experience where a user can:

- open the website
- browse available items
- view item details
- request an item
- donate or post an item using a form

We kept the UI simple and clean so it is easy to understand, use, and present in our sprint demos.

---

## Pages we included / planned

### 1) Home Page
**Purpose:** Introduce Free Sewaa and guide users to the main actions.

**What we made sure is visible:**
- App name: **Free Sewaa**
- Short purpose line about community donation and free reusable items
- Buttons or links to:
  - Browse Items
  - Donate Item

---

### 2) Browse Items Page
**Purpose:** Show the available donated items.

**What we focused on:**
- Item cards or list layout
- Basic structure for search or filter features
- Clicking an item should lead to the detail view, or to a simulated detail page if full navigation is not complete yet

---

### 3) Item Detail Page
**Purpose:** Show full item information.

**Minimum details shown:**
- Item title
- Description
- Category
- Condition
- Location
- Request button or request section

---

### 4) Donate Item Page (Form)
**Purpose:** Let a donor post a new item.

**Fields (MVP level):**
- Title (required)
- Category (required)
- Condition (required)
- Location (required)
- Description (required)

**Frontend validation we added or planned:**
- Required field checking
- Clear message if something is missing
- Simple success message after submission, even if the backend is not connected yet

---

### 5) Request Item (Modal or Form Section)
**Purpose:** Let a receiver request an item from the detail page.

**Fields (simple MVP):**
- Name (required)
- Message (required)

---

## Navigation flow (how we expect the UI to work)
This is the basic flow we followed when building the UI.

**User flow:**
1. Home  
2. Browse Items  
3. Item Detail  
4. Request Item  

**Donor flow:**
1. Home  
2. Donate Item  
3. Submit form  
4. Confirmation message  

---

## Frontend structure (how we organized it)
We tried to keep files organized so the project stays easy to maintain and improve.

**Suggested structure (example):**

```text
frontend/
  index.html
  browse.html
  donate.html
  item.html
  css/
    styles.css
  js/
    app.js
    browse.js
    donate.js
    item.js
