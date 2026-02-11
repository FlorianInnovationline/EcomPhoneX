# 🚀 Backend Setup Instructions

I've created all the backend infrastructure files. Follow these steps to get everything working:

## 📋 Step-by-Step Setup

### 1. Install Dependencies

Run this command in your terminal:

```bash
npm install @prisma/client prisma @next-auth/prisma-adapter next-auth @auth/prisma-adapter bcryptjs @types/bcryptjs
```

**If you get permission errors**, run this first:
```bash
sudo chown -R $(whoami) ~/.npm
```

### 2. Set Up Neon Database

1. Go to **https://console.neon.tech**
2. Sign up or log in
3. Click **"Create Project"**
4. Name it "xeno-mobile" (or any name you like)
5. Choose a region close to you
6. Click **"Create Project"**

### 3. Get Your Database Connection String

1. In your Neon project dashboard, find **"Connection Details"**
2. Copy the **connection string** (looks like: `postgresql://user:pass@host/db?sslmode=require`)
3. Save it - you'll need it in the next step

### 4. Create Environment Variables

1. Create a `.env` file in the root of your project:
   ```bash
   touch .env
   ```

2. Add these variables to `.env`:
   ```env
   # Database (paste your Neon connection string here)
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

   # NextAuth Secret (generate with command below)
   NEXTAUTH_SECRET=""
   NEXTAUTH_URL="http://localhost:3000"

   # Stripe (optional for now)
   STRIPE_PUBLIC_KEY=""
   STRIPE_SECRET_KEY=""
   ```

3. **Generate NextAuth Secret**:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as the value for `NEXTAUTH_SECRET` in your `.env` file

### 5. Initialize Prisma

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Push schema to database** (creates all tables):
   ```bash
   npx prisma db push
   ```

3. **(Optional) View your database**:
   ```bash
   npx prisma studio
   ```
   This opens a web interface to view/edit your database

### 6. Restart Your Dev Server

```bash
npm run dev
```

## ✅ What's Been Set Up

- ✅ **Prisma Schema** - Complete database schema in `prisma/schema.prisma`
- ✅ **Prisma Client** - Database client in `lib/prisma.ts`
- ✅ **NextAuth Config** - Authentication setup in `lib/auth.ts`
- ✅ **NextAuth Route** - API route at `app/api/auth/[...nextauth]/route.ts`
- ✅ **Package.json** - Updated with all dependencies

## 🧪 Test It

1. **Check if database is connected**:
   - Visit `http://localhost:3000/admin`
   - Should work without errors now

2. **Verify in Neon Dashboard**:
   - Go to your Neon project
   - Check "Queries" tab - you should see connection activity

## 📝 Next Steps (After Setup)

1. Update `lib/data.ts` to use Prisma instead of mocks
2. Implement authentication in login page
3. Add admin route protection
4. Set up Stripe payments

## 🆘 Troubleshooting

**"PrismaClient not found"**
- Run: `npx prisma generate`

**"Database connection failed"**
- Check your `DATABASE_URL` in `.env`
- Make sure it includes `?sslmode=require`
- Verify your Neon project is active

**"NextAuth error"**
- Make sure `NEXTAUTH_SECRET` is set in `.env`
- Verify `NEXTAUTH_URL` matches your local URL

## 📚 Resources

- **Neon Dashboard**: https://console.neon.tech
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth Docs**: https://next-auth.js.org

---

**Once you complete these steps, the admin dashboard should work!** 🎉
