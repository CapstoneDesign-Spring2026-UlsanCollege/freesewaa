# Wireframes — Free Sewaa 

## Product Context
Free Sewaa is a community-driven donation and resource-sharing platform that connects people who want to give away usable items with those who need them.

The MVP focuses on a simple and efficient user flow:
**Browse → View → Request**
 
---

## Screen 1 - Entry / Home  
**Screen name:** Home (Landing Page)

**Purpose:**  
To introduce Free Sewaa and guide users toward the two primary actions: browsing items or donating items.

**Main user action:**  
- Browse Items  
- Donate an Item  

**What appears on this screen:**  
- **title:** Free Sewaa  
- **headline:** Give What You Don’t Need. Get What You Do.  
- **short description:** Free Sewaa connects generous hearts with those in need — completely free.  
- **input/search/filter area:** None (landing page only)  
- **main buttons:**  
  - Primary: Donate an Item  
  - Secondary: Browse Items  
- **optional navigation:** Home | Browse Items | Donate | My Items  

**What happens next:**  
- Clicking **Browse Items → navigates to Browse screen**  
- Clicking **Donate → navigates to Donate form**

### SCREENSHOT:

<img width="1271" height="587" alt="Screenshot 2026-03-25 124712" src="https://github.com/user-attachments/assets/26dfcb48-59fc-4e8f-a55f-c7e318b7e020" />


---

## Screen 2 - Core Task  
**Screen name:** Browse Items (Listing Page)

**Purpose:**  
To allow users to search, filter, and explore available donation items.

**Main user action:**  
Select an item to view its details.

**What appears on this screen:**  
- **key content:** Grid of item cards (image, title, category, location, condition)  
- **form / interaction area:**  
  - Search bar ("Search items...")  
  - Category filters (All, Clothing, Books, Furniture, etc.)  
  - Sorting/filter dropdown (Condition, Newest First)  
- **main action:** Click item card  
- **feedback note:** "X items found"  

**What happens next:**  
Clicking an item → navigates to Item Detail screen  

### SCREENSHOTS:

<img width="1273" height="587" alt="Screenshot 2026-03-25 124801" src="https://github.com/user-attachments/assets/f7926309-825d-4a46-adb3-ac9d307a12f1" />

---

## Screen 3 - Result / Detail / Confirmation  
**Screen name:** Item Detail + Request Flow  

**Purpose:**  
To present complete item details and allow the user to request the item.

**Main user action:**  
Request the item by sending a message to the donor.

**What appears on this screen:**  
- **result / detail:**  
  - Item image  
  - Title  
  - Category & condition  
  - Location & time posted  
  - Description  
  - Donor information  
- **main action button:** Request This Item  
- **interaction:** Opens request modal  
- **validation:** Required fields (name, message)

**What happens next:**  
- User submits request → request is sent  
- User can contact donor or return to browsing  

---

### SCREENSHOTS:
<img width="1279" height="589" alt="Screenshot 2026-03-25 124823" src="https://github.com/user-attachments/assets/9c2a0028-f90b-41c3-b983-3f404ef30d7d" />

---

### Quick sketch box (Request Modal)
<img width="1184" height="491" alt="Screenshot 2026-03-25 124901" src="https://github.com/user-attachments/assets/4c21ac18-bd5e-4b48-9c87-36dc2451b12d" />
<img width="1252" height="587" alt="Screenshot 2026-03-25 124926" src="https://github.com/user-attachments/assets/76ac1421-69c2-41ef-aeba-00745d44a9e7" />

---

## Flow check  
Describe the user flow in 3 steps:

1. User lands on Home page and clicks **Browse Items**  
2. User searches or filters items and selects one  
3. User views item details and submits a request  

---

## Quality check  
- [x] only 3 screens max  
- [x] each screen has one clear purpose  
- [x] main action is obvious  
- [x] screens match the MVP  
- [x] screens align with implemented UI  
- [x] labels are clear and easy to understand  

---

## Final rule  
Each screen clearly communicates:
- what the user sees  
- what the user can do  
- what happens next  

No ambiguity remains in the user flow.
