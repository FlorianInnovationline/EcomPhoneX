# Environment Variables Reference

All variables needed for the app to work (local dev, admin, Vercel).

---

## Required (core)

| Variable | Where | Description |
|----------|--------|-------------|
| **DATABASE_URL** | Local + Vercel | PostgreSQL connection string (e.g. Neon). Format: `postgresql://user:password@host/database?sslmode=require` |
| **NEXTAUTH_SECRET** | Local + Vercel | Secret for NextAuth session signing. Generate: `openssl rand -base64 32` |
| **NEXTAUTH_URL** | Local + Vercel | Full URL of the app. Local: `http://localhost:3000` — Vercel: `https://your-project.vercel.app` (no trailing slash) |
| **AUTH_TRUST_HOST** | Vercel (recommended) | Set to `true` so NextAuth trusts the host header on Vercel; fixes login/redirect “untrusted host” errors. |

Without the first three, the app will not run correctly (DB errors, login/redirect failures). On Vercel, add `AUTH_TRUST_HOST=true` so admin/login work.

---

## Vercel deployment

In **Vercel → Project → Settings → Environment Variables**, set for **Production** (and Preview if you use it):

- `DATABASE_URL` — same Neon connection string as local
- `NEXTAUTH_URL` — **must be your live Vercel URL** (e.g. `https://ecomphonex.vercel.app`)
- `NEXTAUTH_SECRET` — same as local (or a new one; keep it secret)
- **`AUTH_TRUST_HOST`** = **`true`** — tells NextAuth to trust the request host (needed on Vercel so login/redirects work; fixes “untrusted host” errors)

Redeploy after changing env vars.

---

## Optional

| Variable | Where | Description |
|----------|--------|-------------|
| **BLOB_READ_WRITE_TOKEN** | Vercel | Vercel Blob token for persisting product image uploads in production. Without it, image upload in admin is disabled on Vercel. |
| **STRIPE_SECRET_KEY** | Server | Stripe API secret (e.g. `sk_test_...` or `sk_live_...`) for payments. |
| **STRIPE_WEBHOOK_SECRET** | Server | Stripe webhook signing secret (e.g. `whsec_...`) for webhooks. |
| **STRIPE_PUBLIC_KEY** / **NEXT_PUBLIC_STRIPE_PUBLIC_KEY** | Client | Stripe publishable key for checkout UI (only if you use Stripe on the frontend). |

---

## Auto-set (do not add yourself)

- **VERCEL** — Set by Vercel in deployment; used to disable filesystem image upload in serverless.
- **NODE_ENV** — Set by Next.js (`development` / `production`).

---

## Local setup checklist

1. Create `.env` in project root (never commit it).
2. Add `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
3. Run `npx prisma generate` and `npx prisma db push` (or `db:migrate`).
4. Run `npm run dev` — admin at `/admin`, login at `/login`.

## Vercel checklist

1. Add `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET` in Vercel env vars.
2. Add **`AUTH_TRUST_HOST`** = **`true`** (so NextAuth trusts the host and login works).
3. (Optional) Add `BLOB_READ_WRITE_TOKEN` for product image uploads.
4. Deploy; login and admin should work at your Vercel URL.
