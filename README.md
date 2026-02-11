# Xeno Mobile - Premium E-commerce UI Foundation

A premium, Apple/Tesla-level e-commerce platform focused on selling smartphones (initially Xiaomi), targeting Portugal first with plans to expand to the EU.

## 🎯 Current Status: UI-Only Mode

**This project is currently in UI-ONLY mode.** All data is mocked and the app runs without any backend dependencies.

✅ **What Works:**
- Complete UI/UX with premium design
- All storefront pages (Home, Shop, Product, Cart, Checkout)
- Admin dashboard UI
- Animations and interactions
- Internationalization (EN + PT-PT)
- Cart state management (localStorage)

❌ **Not Implemented (Backend Phase):**
- Database (Postgres/Neon)
- Authentication
- Payment processing (Stripe)
- Server-side data persistence
- Webhooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- **No backend setup required!**

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

That's it! No environment variables or database setup needed.

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
/app
  /[locale]          # Storefront pages (i18n)
    page.tsx         # Home page with hero animation
    shop/            # Product listing
    product/[slug]/  # Product detail page
    cart/            # Shopping cart
    checkout/        # Checkout flow
    order/           # Order pages
  /admin             # Admin dashboard (UI only)
    page.tsx         # Dashboard overview
    products/        # Product management UI
    orders/          # Order management UI
/components
  /ui                # shadcn/ui base components
  /storefront        # Storefront-specific components
  /admin             # Admin-specific components
/lib
  /data              # Data access layer (mocked)
    mock-data.ts     # Mock product data
    products.ts      # Product queries (replace with API calls)
    orders.ts        # Order queries (replace with API calls)
  /types             # TypeScript type definitions
  /store             # Zustand stores (cart)
  config.ts          # App configuration
  utils.ts           # Utility functions
/messages            # i18n translation files
```

## 🎨 Design System

The design system emphasizes:
- **Typography**: Large, elegant headlines with quiet body text
- **Colors**: Near-white backgrounds with subtle gray/ink text
- **Spacing**: Generous whitespace, editorial spacing
- **Animations**: Smooth, 60fps micro-interactions with `prefers-reduced-motion` support

## 🌍 Internationalization

The app supports English (EN) and Portuguese (PT-PT) with:
- URL-based locale routing (`/en`, `/pt`)
- Language toggle in navbar
- Persistent language preference (localStorage)
- SEO-friendly implementation

## 🛒 E-commerce Features (UI Only)

- Product catalog with variants (storage, color)
- Shopping cart with persistent storage (localStorage)
- Checkout flow UI (no payment processing)
- Order pages (success, detail view)
- Admin dashboard UI

## 📦 Mock Data

All product data is stored in `lib/data/mock-data.ts`. The app includes:
- 6 Xiaomi products
- Multiple variants per product (storage, color)
- Product images (placeholder URLs)
- Mock orders for admin view

## 🔌 Backend Integration (Future)

The code is structured to easily plug in backend services:

### Data Access Layer

All data access goes through abstraction layers in `lib/data/`:
- `lib/data/products.ts` - Product queries (currently mocked)
- `lib/data/orders.ts` - Order queries (currently mocked)

To add backend:
1. Replace mock functions with real API calls
2. Keep the same TypeScript interfaces (`lib/types/index.ts`)
3. No component refactoring needed!

### Type Definitions

All types are defined in `lib/types/index.ts`:
- `Product`, `Variant`, `ProductImage`
- `Order`, `OrderItem`, `Address`
- `User`, `Role`

These types match what your future Prisma schema will generate.

### TODO Comments

Look for `// TODO:` comments throughout the codebase:
- Auth checks in `app/admin/layout.tsx`
- Sign out in `components/admin/header.tsx`
- Payment processing in `app/[locale]/checkout/page.tsx`
- Middleware auth in `middleware.ts`

## 🎬 Hero Phone Animation

The home page features a hero phone image (`/public/phone.png`) with:
- Initial rotation animation on load (-8deg to 0deg)
- Scroll-based parallax and rotation
- Respects `prefers-reduced-motion`

**Important**: 
1. Add your hero phone PNG to `/public/phone.png`
2. Recommended: Transparent background PNG, 9:16 aspect ratio
3. The image should be a clean product render (ideally 800-1200px width)
4. If the image is missing, the page will show a broken image - replace it before deploying

## 📝 Next Steps (Backend Phase)

When ready to add backend:

1. **Database Setup**
   - Set up Neon Postgres
   - Create Prisma schema (use types from `lib/types/index.ts`)
   - Run migrations

2. **Authentication**
   - Set up NextAuth
   - Uncomment auth checks in admin layout
   - Implement sign in/out

3. **API Routes**
   - Replace `lib/data/products.ts` with API calls
   - Replace `lib/data/orders.ts` with API calls
   - Create server actions for mutations

4. **Stripe Integration**
   - Set up Stripe account
   - Implement checkout flow
   - Add webhook handler

5. **Image Storage**
   - Set up Cloudflare R2 or S3
   - Implement image upload
   - Update product image URLs

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy (no environment variables needed for UI-only mode)

The app will work perfectly on Vercel without any backend configuration.

## 📄 License

Private project - All rights reserved

---

**Note**: This is a UI foundation. All backend functionality is mocked and ready to be replaced with real implementations when needed.
