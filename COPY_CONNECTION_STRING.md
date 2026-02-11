# How to Copy Your Neon Connection String

## Steps:

1. **Click "Show password"** button in the modal
   - This will reveal the actual password in the connection string

2. **Click "Copy snippet"** button
   - This copies the full connection string to your clipboard

3. **Important:** The copied string might have `psql '...'` wrapper
   - You need just the PostgreSQL URL part
   - It should look like: `postgresql://neondb_owner:password@ep-steep-heart-agw4ugej-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require`

4. **Add to your `.env` file**:
   ```bash
   # Create .env if it doesn't exist
   touch .env
   ```

   Then add (remove the `psql '...'` wrapper if present):
   ```env
   DATABASE_URL="postgresql://neondb_owner:your-password@ep-steep-heart-agw4ugej-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"
   NEXTAUTH_SECRET=""
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. **Generate NextAuth secret**:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as the value for `NEXTAUTH_SECRET`

6. **Initialize Prisma**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Note:
- Make sure the connection string includes `?sslmode=require` at the end
- The password should be visible (not masked) in your `.env` file
- Keep your `.env` file secure and never commit it to git!
