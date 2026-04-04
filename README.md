# Requirement Posting Flow (Next.js + Strapi)

A full-stack app for posting event hiring requirements in a guided 4-step flow.

## Stack
- Frontend: Next.js + React + TypeScript
- Backend/Data: Strapi (SQLite by default; acts as CMS + data layer)

## What is implemented
1. **Step 1 – Event Basics**: name, type, date/date range, location, optional venue, and hiring category (planner/performer/crew).
2. **Step 2 & 3 – Category Specific Fields**: dynamic fields based on selected category.
3. **Step 4 – Submission**: payload review and submit.
4. **Storage**: requirements are stored in Strapi under a `Requirement` collection type with `hiringFor` and `details`.

## Local setup
### 1) Install dependencies
```bash
npm install
```

### 2) Configure Strapi environment
```bash
cp backend/.env.example backend/.env
```

### 3) Run backend + frontend
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Strapi admin: http://localhost:1337/admin
- Strapi API: http://localhost:1337/api/requirements

## Important Strapi permission step
In Strapi admin:
1. Go to **Settings → Users & Permissions Plugin → Roles → Public**.
2. Enable `create` for the `Requirement` collection type.
3. Save permissions.

Without this, the frontend POST request will be blocked by Strapi permissions.
