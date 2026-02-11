# How to Get Your Neon Connection String

## Steps:

1. **Close the popup** (click the X or click outside)

2. **Find "Get connected to your new database" card** on the dashboard

3. **Click on "Connection string"** (not "Neon init" or "IDE extension")

4. **Copy the connection string** - it will look like:
   ```
   postgresql://user:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require
   ```

5. **Add it to your `.env` file**:
   ```bash
   # Create .env file if it doesn't exist
   touch .env
   ```

   Then add:
   ```env
   DATABASE_URL="paste-your-connection-string-here"
   NEXTAUTH_SECRET=""
   NEXTAUTH_URL="http://localhost:3000"
   ```

6. **Generate NextAuth secret**:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as the value for `NEXTAUTH_SECRET`

## Alternative: Get Connection String from Sidebar

If you can't find the card:
1. Look in the left sidebar
2. Click on "Settings" 
3. Find "Connection Details" or "Connection String"
4. Copy the connection string from there

---

**Note:** We're using Prisma directly, so you don't need the `neonctl init` command from the popup. Just get the connection string and add it to `.env`!
