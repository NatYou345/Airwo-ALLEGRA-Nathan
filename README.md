# Airdge

Next.js application using Prisma and SQLite.

## Getting Started

Install dependencies and configure secrets:

```bash
npm ci
cp .env.example .env
# Set JWT_SECRET and SEED_ADMIN_PASSWORD in .env
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Verification

```bash
npm run lint
npm run build
npm audit --omit=dev
```

Never commit `.env` or `prisma/dev.db`; both are ignored because they may contain secrets or personal data.

## Deployment

The `vercel-build` script generates Prisma Client, applies migrations, and builds the application.
