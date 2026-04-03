# Frontend Notes — Free Sewaa (Group)

---

## Why we wrote this
We wrote this document to explain what we built (and what we are planning to build) on the **Free Sewaa frontend**.  
The goal is to keep our UI work clear for the team and easy to demo.

---

## What we worked on (frontend)
The frontend is focused on a simple user experience where someone can:

- open the website
- browse items
- view details of an item
- request an item
- donate/post an item (form)

We kept the UI simple and clean so it is easy to present in our sprint demos.

---

## Pages we included / planned

### 1) Home Page
**Purpose:** Introduce Free Sewaa and guide users to the main actions.

What we made sure is visible:
- App name: **Free Sewaa**
- Short purpose line (community donation / free items)
- Buttons/links to:
  - Browse Items
  - Donate Item

---

### 2) Browse Items Page
**Purpose:** Show the available donated items.

What we focused on:
- item cards / list layout
- basic structure for search/filter (if not fully functional, at least UI-ready)
- clicking an item should lead to the detail view (or simulated detail page)

---

### 3) Item Detail Page
**Purpose:** Show full item information.

Minimum details shown:
- item title
- description
- category
- condition
- location
- request button / request section

---

### 4) Donate Item Page (Form)
**Purpose:** Let a donor post a new item.

Fields (MVP level):
- Title (required)
- Category (required)
- Condition (required)
- Location (required)
- Description (required)

Frontend validation we added/planned:
- required fields check
- show a clear message if something is missing
- show a simple success message after submit (even if backend is not connected yet)

---

### 5) Request Item (Modal or Form Section)
**Purpose:** Let a receiver request an item from the detail page.

Fields (simple MVP):
- Name (required)
- Message (required)

---

## Navigation flow (how we expect the UI to work)
This is the basic flow we followed when building the UI:

1. Home  
2. Browse Items  
3. Item Detail  
4. Request Item  

Donor flow:

1. Home  
2. Donate Item  
3. Submit form → confirmation  

---

## Frontend structure (how we organized it)
We tried to keep files organized so it stays easy to maintain.

Suggested structure (example):

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
