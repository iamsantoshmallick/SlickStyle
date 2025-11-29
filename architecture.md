# THE SLICK STYLE – Architecture Overview

This document explains how the entire front‑end of **THE SLICK STYLE** works. It covers routing, data flow, components, and user journeys. Keep this as a reference when adding new features.

---

## 1. Project Structure (High‑Level)

```
src/
 ├─ components/
 │    ├─ layout/         → Header, CartDrawer, TopSection
 │    ├─ home/           → TopIconNav, HeroCarousel, SectionCarousel
 │    ├─ product/        → ProductPage, ProductGallery, ProductInfo
 │    └─ ui/             → Reusable UI elements
 │
 ├─ pages/
 │    ├─ HomePage.jsx
 │    ├─ DynamicHome.jsx
 │    ├─ CategoryPage.jsx
 │    ├─ ErrorPage.jsx
 │    └─ (future pages)
 │
 ├─ data/
 │    ├─ homeData.json
 │    ├─ productData.json
 │    ├─ nav-carousel.json
 │    └─ products.json
 │
 ├─ features/
 │    └─ shop/           → shopSlice.js (gender)
 │    └─ cart/           → cartSlice.js (cart logic)
 │
 ├─ store.js             → configureStore()
 └─ App.jsx              → Router setup
```

---

## 2. Routing Flow

### **Router Tree**
```
/ (Layout)
 ├─ /                       → HomePage
 ├─ /:gender                → DynamicHome (men or women)
 ├─ /:gender/:category      → CategoryPage (t-shirts, jeans, new-in, etc)
 ├─ /product/:productId     → ProductPage
 └─ *                       → ErrorPage
```

### Route Responsibilities
- **HomePage** – simple landing section.
- **DynamicHome** – hero, icon nav, seasonal sections fed by `homeData.json`.
- **CategoryPage** – listing page filtered from `productData.json`.
- **ProductPage** – gallery, details, size selection, add to cart.
- **ErrorPage** – 404 and invalid gender/category handling.

---

## 3. Global Layout & Navigation

### **Layout.jsx**
```
<Header />
<main><Outlet /></main>
<CartDrawer /> (controlled from header)
```

### **Header Responsibilities**
- Mobile promo banner
- Logo (desktop + mobile)
- MEN / WOMEN navigation (desktop)
- Search, Mic, User, Wishlist
- Cart icon showing total items
- Sidebar menu (mobile + desktop)

### **Sidebar Menu**
Contains:
- MEN/WOMEN switch (TopSection)
- CategoryCarousel (from nav-carousel.json)
- AccordionGrid (mega menu from products.json)

---

## 4. Data Sources

### **1. homeData.json**
Used in **DynamicHome**.
```
homeData[gender] = {
  topNav: [...],
  heroSlides: [...],
  sections: [
    {
      id, type: "productCarousel", title, productIds[], aspectRatio
    }
  ]
}
```

### **2. productData.json**
Used in:
- DynamicHome (sections → products)
- CategoryPage (filters by breadcrumbs)
- ProductPage (full detail view)
- Similar products (You May Also Like)

### **3. nav-carousel.json**
Used in:
- Header sidebar → CategoryCarousel
- Gender-based top categories

### **4. products.json**
Used in:
- AccordionGrid inside sidebar mega menu

---

## 5. Redux Store

### **shopSlice.js**
Manages:
```
state.shop.gender = "men" or "women"
```
Set from:
- URL → DynamicHome
- URL → CategoryPage
- Sidebar tabs (TopSection)
- Desktop MEN/WOMEN nav

### **cartSlice.js**
Manages:
```
items[], totalAmount, totalCount
```
Actions include:
- addToCart
- removeFromCart
- increaseQuantity
- decreaseQuantity

CartDrawer subscribes to this slice.

---

## 5. Shared UI Components

### Breadcrumbs (`src/components/shared/Breadcrumbs.jsx`)
- Can work in **two modes**:
  1. **Auto-mode (no props)** – builds crumbs from the current URL (`useLocation().pathname`).
     - Splits the path into segments, converts `"t-shirts" → "T Shirts"`, and builds clickable links for all but the last segment.
     - Always shows a Home icon that links to `/`.
  2. **Custom mode (`customCrumbs`)** – parent passes an array of `{ label, path? }` objects.
     - Used on **ProductPage** to map `product.breadcrumbs` into structured crumbs.
     - The last crumb is rendered as plain text (current page).

This component centralizes breadcrumb behavior and styling across pages.

### ProductCard (`src/components/shared/ProductCard.jsx`)
- Reusable product tile used for listing views (CategoryPage, future search, etc.).
- Accepts a `product` object and renders:
  - Primary image (supports `product.images[0]` or `product.img`).
  - Discount badge if `product.discount` exists.
  - Brand, title, price, and MRP.
  - Wrapper `<Link>` to `/product/:id`.
- Used in **CategoryPage** so all product grids share the same UX and visual style.

These shared components keep the UI consistent and reduce duplication across pages.

---

## 6. Component Flow

### **1. DynamicHome.jsx**
```
URL → /men
↓
setGender("men")
↓
<TopIconNav data={homeData.men.topNav} />
<HeroCarousel slides={homeData.men.heroSlides} />
SectionCarousel for each configured section
```

### **2. CategoryPage.jsx**
```
/:gender/:category → /men/t-shirts
↓
setGender("men")
↓
Filter productData by:
- gender match (from breadcrumbs)
- category match (from breadcrumbs)
- “new-in” special case → include all
↓
Render product grid
```

### **3. ProductPage.jsx**
```
/product/prod-124
↓
Find product from productData
↓
<ProductGallery images={...} />
<ProductInfo {...} />
↓
On Add To Cart → addToCart({ id, size })
↓
Show CartDrawer
```

### **4. CartDrawer.jsx**
```
cartSlice → items, totals

Quantity + / - updates Redux
Remove item updates Redux
Checkout button placeholder
```

---

## 7. Key User Journeys

### **A. Home → Product → Cart**
```
User opens /men
↓
Clicks a product from carousel
↓
/product/prod-123
↓
Select size → Add to Cart
↓
CartDrawer opens with updated totals
```

### **B. Menu → Mega Menu → Category Listing**
```
User opens sidebar
↓
AccordionGrid → Topwear → T-Shirts
↓
/men/t-shirts → CategoryPage
↓
Grid of filtered products
```

### **C. Navigation Sync**
```
URL gender param → setGender
↓
Header + Sidebar auto-sync their data
(everything updates visually)
```

---

## 8. Notes for Scaling

- Move all data later into a backend API.
- Preload product and category data via RTK Query.
- Use React Suspense for loading skeletons.
- Add sorting + filtering drawer to CategoryPage.
- Add wishlist slice for persistence.

---

## 9. Summary
THE SLICK STYLE follows a clean architecture:
- Routing controls which page to show.
- Redux keeps the global state consistent.
- JSON files feed all dynamic UI data.
- Components remain pure and predictable.
- Data flows one way from route → Redux → UI.

This structure scales easily for more categories, filters, authentication, and real APIs.

---

**End of Document**

