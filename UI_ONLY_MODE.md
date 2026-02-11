# UI-Only Mode Documentation

## Overview

This project is currently in **UI-ONLY mode**. All backend functionality is mocked, and the app runs completely without any database, authentication, or payment processing.

## Architecture

### Data Flow

```
Components → Data Access Layer → Mock Data
                ↓
         (Future: API Routes)
```

### Key Principles

1. **Abstraction**: All data access goes through `lib/data/` functions
2. **Type Safety**: All types defined in `lib/types/index.ts`
3. **Easy Migration**: Replace mock functions with real API calls - no component changes needed

## File Structure

### Data Access Layer

- `lib/data/products.ts` - Product queries (currently mocked)
- `lib/data/orders.ts` - Order queries (currently mocked)
- `lib/data/mock-data.ts` - Static mock data

### Type Definitions

- `lib/types/index.ts` - All TypeScript interfaces

These types match what your future Prisma schema will generate.

## Adding Backend (Future)

### Step 1: Replace Data Access Functions

In `lib/data/products.ts`:

```typescript
// Before (mocked)
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  return mockProducts.filter(...)
}

// After (real API)
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(filters),
  })
  return response.json()
}
```

### Step 2: Add Authentication

1. Uncomment auth checks in `app/admin/layout.tsx`
2. Implement sign in/out in `components/admin/header.tsx`
3. Add auth middleware in `middleware.ts`

### Step 3: Add Payment Processing

1. Update `app/[locale]/checkout/page.tsx`
2. Create Stripe checkout session
3. Add webhook handler

## Mock Data

All products are defined in `lib/data/mock-data.ts`. To add more products:

1. Add product object to `mockProducts` array
2. Include variants and images
3. No other changes needed!

## Testing

The app works perfectly without any backend:
- ✅ All pages render
- ✅ Cart functionality (localStorage)
- ✅ Product browsing
- ✅ Checkout flow (redirects to success)
- ✅ Admin dashboard (no auth required)

## Benefits of This Approach

1. **Fast Development**: Build and test UI without backend setup
2. **Easy Backend Integration**: Just replace data access functions
3. **No Refactoring**: Components don't need changes
4. **Type Safety**: Same types used throughout
