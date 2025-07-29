# 🛒 Angular E-Commerce App (Nx)

This is a simple front-end e-commerce application built with **Angular 20** using the **Nx standalone** workspace structure.

## 🚀 Tech Stack

- **Framework:** Angular 20 (standalone components)
- **Workspace:** Nx (monorepo, standalone)
- **Styling:** Angular Material
- **Testing:** Vitest
- **State Management:** Angular Signals

---

## 📦 Features

✅ Product listing from the API  
✅ Add products to cart with arbitrary quantity control
✅ Minimum order amount validation
✅ Cart page with total quantities and prices  
✅ Fully responsive layout  
✅ Tried to adhere to a modular and reusable component architecture  
✅ Basic unit testing included

---

## 📄 Acceptance Criteria Implemented

- **AC01**: Two routes created:

  - `/products`: Displays list of products
  - `/cart`: Displays cart contents

- **AC02**: Product page:

  - Fetches and lists products from the provided API
  - Enables adding a valid amount of each product to the cart (with respect to `minOrderAmount`)
  - Prevents adding more than the available amount

- **AC03**: Cart page:
  - Displays total quantity and total price of added products

## 📄 Additional Extra Features

- To address duplicate IDs in the API data, I introduced a remapping utility that guarantees each product has a unique ID before rendering.
- Due to limited time, fallback support for a missing image was not included in this version.

---

## 📂 Project Structure
