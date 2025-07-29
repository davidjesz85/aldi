# 🛒 Angular E-Commerce App (Nx)

This is a simple front-end e-commerce application built with **Angular 20** using the **Nx standalone** workspace structure.

## 🚀 Tech Stack

- **Framework:** Angular 20 (standalone components)
- **Workspace:** Nx (monorepo, standalone)
- **Styling:** Angular Material
- **Testing:** Vitest
- **Component Library** Angular Material
- **Prioritizing** Angular Signals

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

## 📄 Additional Notes

- To address duplicate IDs in the API data, I introduced a remapping utility that guarantees each product has a unique ID before rendering.
- Due to limited time, fallback support for a missing image was not included in this version.
- Error handling is basic and would require improvements for a production-grade application.
- Amount validation is currently enforced only through button disablement in the UI. Due to time constraints, server-side or method-level validation has not been implemented, which means the logic could be bypassed via browser developer tools.

---

## 📂 Project Structure
