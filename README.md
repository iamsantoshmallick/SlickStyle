# THE SLICK STYLE – E-Commerce Frontend

A modern, high-performance fashion e-commerce frontend built with **React 19**, **Vite**, **Redux Toolkit**, **Tailwind CSS 4**, and a fully component-driven architecture.

This project powers the online storefront for **THE SLICK STYLE**, featuring dynamic product pages, gender-based navigation, reusable UI components, and a smooth, mobile-first shopping experience.

---

## 🚀 Features

### **Frontend Framework**

* React 19 (Concurrent-ready, improved rendering)
* Vite for lightning-fast dev + optimized builds

### **State & Data Management**

* Redux Toolkit store with:

  * `shopSlice` (gender, category navigation)
  * `cartSlice` (cart items, quantity, totals)
* JSON-driven product and navigation data

### **UI & Styling**

* Tailwind CSS v4 (JIT, utility-first)
* Lucide React icons for consistent icons
* Smooth scrollbars, sticky headers, carousels

### **Smart Navigation**

* Dynamic routing: `/men`, `/women`, `/men/t-shirts`, `/product/:id`
* Automatic + custom breadcrumbs
* Sidebar navigation synced with Redux

### **Components**

* Reusable product cards
* Product image gallery with zoom-ready design
* Category and hero carousels
* Mobile-friendly sidebar menu
* Cart drawer with quantity controls

---

## 🏗 Project Structure

```txt
src/
├── components/
│   ├── layout/
│   │   └── Header.jsx
│   ├── cart/
│   │   └── CartDrawer.jsx
│   ├── navbar/
│   │   ├── TopSection.jsx
│   │   ├── CategoryCarousel.jsx
│   │   └── AccordionGrid.jsx
│   ├── shared/
│   │   ├── Breadcrumbs.jsx
│   │   └── ProductCard.jsx
│   └── product/
│       ├── ProductPage.jsx
│       ├── ProductInfo.jsx
│       └── ProductGallery.jsx
│
├── features/
│   ├── shop/shopSlice.js
│   └── cart/cartSlice.js
│
├── pages/
│   ├── HomePage.jsx
│   ├── DynamicHome.jsx
│   ├── CategoryPage.jsx
│   └── ErrorPage.jsx
│
├── data/
│   ├── productData.json
│   ├── nav-carousel.json
│   ├── products.json
│   └── homeData.json
│
└── App.jsx
```

---

## 📦 Installation

```bash
git clone <repo-url>
cd slick-style-frontend
npm install
npm run dev
```

---

## 🔗 Routing Overview

| Route                 | Description                                     |
| --------------------- | ----------------------------------------------- |
| `/`                   | Main landing page                               |
| `/men` `/women`       | Gender home page with hero + category carousels |
| `/men/t-shirts`       | Category listing page                           |
| `/product/:productId` | Full product details page                       |

Routing is powered by **React Router v6** with a nested layout.

---

## 🛒 Cart System

The cart uses **Redux Toolkit** and supports:

* Size-based variant tracking
* Add / remove / increment / decrement
* Live total price + item count
* Cart drawer with outside-click detection
* Global scroll lock when open

---

## 🧭 Breadcrumb System

Breadcrumbs support auto + custom modes:

* Auto-generated from URL paths
* CustomCrumbs for product pages using product JSON
* Intelligent path mapping (men → /men, t-shirts → /men/t-shirts)
* Home icon always shown separately

---

## 🎨 UI/UX Highlights

* Sticky header + scroll-locked mobile sidebar
* Animated carousels (Swiper-based)
* Smooth transitions on hover
* Clean mobile-first layout
* Accessible button and link focus states

---

## 📁 Data Driven

The site is fully powered by structured JSON:

* Navigation items
* Category carousels
* Product catalog
* Dynamic breadcrumbs
* Accordion menu data

This makes it easy to scale your store without editing components.

---

## 🧪 Future Enhancements

* Wishlist persistence
* User auth + addresses
* Full checkout flow
* API integration
* Admin dashboard for product management

---

## 📝 License

This project belongs to **THE SLICK STYLE** brand. All assets, design, and code are proprietary unless licensed otherwise.

---

## ❤️ Credits

Developed by Santosh Mallick.
