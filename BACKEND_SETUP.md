# Backend Setup Guide

This guide will help you set up the full backend for Xeno Mobile e-commerce platform.

## Prerequisites

- Node.js 18+ and npm
- A Neon PostgreSQL database account (free tier works)
- A Vercel account (for hosting and optional blob storage)

## Step 1: Database Setup (Neon)

1. **Create a Neon account** at [neon.tech](https://neon.tech)
2. **Create a new project** (choose a region close to you)
3. **Copy your connection string** from the Neon dashboard
   - It will look like: `postgresql://user:password@host/database?sslmode=require`

## Step 2: Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Vercel Blob (Optional - for image uploads)
# BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Stripe (Optional - for payments)
# STRIPE_SECRET_KEY="sk_test_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## Step 3: Install Dependencies

```bash
npm install
npm install -D tsx  # For running seed script
```

## Step 4: Database Migration

1. **Push the schema to your database:**
```bash
npm run db:push
```

Or create a migration:
```bash
npm run db:migrate
```

2. **Seed the database with sample data:**
```bash
npm run db:seed
```

This will create:
- An admin user: `admin@xenomobile.com` (no password required for now)
- Sample categories (Phones, Android, Xiaomi, Watches, VR Glasses)
- Sample products (Xiaomi 13 Pro, Xiaomi 14)
- A featured collection
- Homepage sections

## Step 5: Run the Development Server

```bash
npm run dev
```

## Step 6: Access Admin Dashboard

1. Go to `http://localhost:3000/login`
2. Login with: `admin@xenomobile.com` (no password needed for now)
3. You'll be redirected to `/admin`

## Adding products via terminal (CLI)

You can add full products to the database with a script; they will appear in the storefront and in the admin dashboard.

1. **Install dependencies** (if not already): `npm install`
2. **Create a JSON file** with an array of products, e.g. `scripts/products-to-add.json`. Use `scripts/products-to-add.example.json` as a template (copy it to `products-to-add.json` and edit).
3. **Run the script:**
   - `npm run add-products` — uses `scripts/products-to-add.json`
   - `npm run add-products -- path/to/your-products.json` — use a custom file
4. **Refresh the admin** at `/admin/products` to see the new products.

Each product in the JSON must have at least: `title`, `slug`, `brand`, and `variants` (array with at least one variant: `sku`, `price`). Optional: `shortDescription`, `description`, `status`, `isFeatured`, `primaryCategoryId`, `images`, `specs`. Duplicate slugs are skipped (existing products are not overwritten).

**Assign products to categories** (after adding products):  
`npm run assign-categories`  
This creates any missing categories (phones, android, xiaomi, watches, vr-glasses, earbuds, lifestyle) and assigns each product to the correct category. Edit `scripts/assign-product-categories.ts` to change the mapping.

Run each command on its own line (do not paste multiple commands with `#` comments on one line, or the shell may pass the comment as an argument).

## Database Schema Overview

The Prisma schema includes:

- **Users** - Authentication and roles (ADMIN, STAFF, CUSTOMER)
- **Categories** - Hierarchical categories (parent/child relationships)
- **Products** - Products with status (DRAFT, PUBLISHED, ARCHIVED)
- **Variants** - Product variants with pricing, inventory, attributes
- **ProductImages** - Product images with sorting
- **ProductSpecs** - Flexible product specifications (grouped)
- **Collections** - Curated product collections
- **HomepageSections** - Homepage configuration
- **Orders** - Order management
- **Reviews** - Product reviews

## Admin Features

### Categories (`/admin/categories`)
- List all categories
- Create/edit/delete categories
- Hierarchical support (parent/child)

### Products (`/admin/products`)
- List all products (including drafts)
- Create/edit products with:
  - Variants (SKU, price, inventory, attributes)
  - Images (upload and reorder)
  - Specs (grouped key/value pairs)
  - Status (Draft/Published/Archived)
- Preview drafts before publishing

### Collections (`/admin/collections`)
- Create/edit collections
- Add/remove products
- Sort products within collections

### Orders (`/admin/orders`)
- View all orders
- Update order status
- View order details

## Storefront Integration

The storefront now reads from the database:
- Homepage pulls from `homepage_sections` and featured products
- Product pages show published products only
- Collections display products from database
- All data is fetched server-side for SEO

## Next Steps

1. **Image Upload**: Set up Vercel Blob or S3 for product images
2. **Product CRUD**: Complete the product create/edit forms
3. **Category CRUD**: Complete the category create/edit forms
4. **Collection CRUD**: Complete the collection management
5. **Homepage Management**: Build UI for managing homepage sections
6. **Password Auth**: Implement proper password hashing for admin users
7. **Stripe Integration**: Add payment processing

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Check that your Neon project is active
- Ensure SSL mode is set to `require`

### Migration Errors
- Make sure you've run `npm run db:push` or `npm run db:migrate`
- Check that all required fields have defaults or are nullable

### Auth Issues
- Verify `NEXTAUTH_SECRET` is set
- Check that `NEXTAUTH_URL` matches your dev URL
- Clear browser cookies and try again

## Production Deployment

1. **Set environment variables in Vercel** (Project → Settings → Environment Variables):
   - `DATABASE_URL` – your Neon connection string
   - `NEXTAUTH_URL` – **must be your exact Vercel URL**, e.g. `https://ecomphonex.vercel.app` (no trailing slash). If this is wrong or missing, login redirects and cookies will fail.
   - `NEXTAUTH_SECRET` – same value as locally (or generate a new one)
   - `BLOB_READ_WRITE_TOKEN` (if using Vercel Blob)

2. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed production (optional):**
   ```bash
   npm run db:seed
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

## Support

For issues or questions, check:
- Prisma docs: https://www.prisma.io/docs
- NextAuth docs: https://next-auth.js.org
- Neon docs: https://neon.tech/docs
