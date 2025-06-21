# 🛒 Geer E-commerce Intern Assignment – Frontend (Next.js + TailwindCSS)

This is a simple **E-commerce Frontend App** built with **Next.js** and **TailwindCSS** as part of the **Geer.in internship assignment**. It features product listing, adding new products, viewing product details, and deleting products — all using in-memory data without a database.

---

## 🔧 Tech Stack

- ✅ **Next.js** – React framework for SSR and API routes  
- 🎨 **Tailwind CSS** – Utility-first modern styling  
- 🧠 **React Hooks** – For state and side effects  
- 📁 **In-memory data** – No database (for prototype/demo purposes)

---

## ✨ Features

- 📦 View all products in a responsive grid  
- 🔍 Search products by name  
- ➕ Add new product (Name, Price, Image URL)  
- 👁️ View individual product details  
- ❌ Delete a product (no page refresh required)  
- 🎨 Fully responsive and styled using TailwindCSS  
- ⚙️ API Routes (GET, POST, DELETE)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Divyas1522/-geer-intern-assignment.-.git
cd frontend


2. Install Dependencies
npm install

3. Run the Development Server
npm run dev

Visit your site at: http://localhost:3000

---

✅ GET /api/products
Returns all products.

✅ POST /api/products
Adds a new product. Example request body:

{
  "name": "Shoes",
  "price": 999,
  "image": "/shoes.jpg"
}

✅ GET /api/products/:id
Returns a single product by ID.

✅ DELETE /api/products/:id
Deletes a product by ID. Triggered from the delete button in UI.

----

##📌 Notes
Data is not persisted — it resets when the server restarts.

Ideal for frontend + API demonstration without database setup.





