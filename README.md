## IGN Recipes – Payload CMS + Next.js

IGN Recipes is a Mushroom Kingdom–themed recipe catalog built with **Payload CMS** and **Next.js App Router**.  
It demonstrates how editors manage Recipes and Foods in Payload while the frontend stays fast, simple, and on brand.

---

## Post‑Project Improvements & Review Updates

After completing the original assessment requirements, several production‑level enhancements were implemented to strengthen performance, UX, and maintainability. These updates reflect feedback from senior engineers and demonstrate continued learning beyond the initial scope.

### **1. True Payload‑Backed Search**
- Implemented Payload’s `where` query capability to perform server‑side filtering.
- Replaced client‑side `.filter()` logic with a real database query.
- Added `qs-esm` to serialize nested Payload query parameters.
- Added database indexes on `title` and `description` fields for faster lookups.
- Result: More accurate, scalable search aligned with real‑world API usage.

### **2. Next.js Image Optimization Upgrade**
- Replaced all `<img>` tags with Next.js `<Image>` across Recipes and Foods pages.
- Added `remotePatterns` to `next.config.mjs` for Payload media.
- Result: Faster page loads, reduced layout shift, and production‑ready image handling.

### **3. GraphQL Integration & SEO Enhancements**
- Updated the Recipes list page to use the Payload GraphQL endpoint instead of the REST API, keeping the same server-side search semantics.
- Designed the GraphQL query shape to mirror Payload&apos;s `where` filters so blank searches return all recipes and non-blank searches filter by title or description.
- Added global metadata defaults in the Next.js App Router layout (title, description, Open Graph) plus per-recipe `generateMetadata` for dynamic titles, descriptions, and OG/Twitter tags.
- Added canonical URLs and JSON-LD `Recipe` schema on recipe detail pages so search engines can better index and potentially surface rich recipe results.


---

## Project requirements (from assessment)

- Build a Payload CMS backend with **two collections**: Recipes and Foods
- Recipes must include:
    - title
    - description
    - instructions
    - ingredients (has-many Foods)
    - quantity per ingredient
- Foods must include at least a **name**
- Build 3 public pages using Next.js:
    1. Recipe List
    2. Recipe Detail
    3. Food Detail (showing recipes that use that food)
- Optional: image support for Foods + Recipes

---

## What’s included

### **Milestone 1 – Backend**
- Payload collections for Recipes and Foods
- Typed `hasMany` relationship for ingredients + quantities
- Payload Media upload enabled
- Admin panel CRUD verified

### **Milestone 2 – Frontend**
- `/recipes` list view with images
- `/recipes/[id]` detail view with ingredient links
- `/foods` list of ingredients
- `/foods/[id]` detail page showing all recipes using that food
- Sorting, layout, and styling

### **Bonus weekend polish**
- Mario-themed UI styling
- A–Z sorting
- Search bar for recipes
- Pre-populated Toadstool Café dataset
- Consistent theming across all pages

---

## What I learned

- Defining Payload collections and relationships in TypeScript
- Creating a typed `hasMany` field for ingredients with quantities
- Writing a reusable seed script that creates linked collections
- Handling static images alongside Payload’s media uploads
- Building a Next.js App Router frontend that consumes Payload’s REST API
- Improving UX with search, sorting, navigation, and consistent theme work

---

## Tech / tools used

**Backend**
- Payload CMS
- Payload Media Uploads
- SQLite (local dev)

**Frontend**
- Next.js App Router
- TypeScript
- Pico.css (global styling)

**Tooling**
- pnpm
- tsx (for seed runner)
- Node script to auto-ensure `.env` exists for local dev

---

## Running the App Locally

### Prerequisites
You'll need:
- **Node.js v18+**
- **pnpm**

### 1. Clone and install
```bash
git clone <repo-url>
cd ign-recipes-payload
pnpm install
```

### 2. Start the development server
```bash
pnpm dev
```

Visit:

- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin

> **Note:**  
> With a brand‑new database, the **Recipes** and **Foods** collections will be empty.  
> Nav links and search will not return results until you add data via the admin panel or run the seed script.

### 3. (Recommended) Load Toadstool Café Demo Data
Open a new terminal window (leave `pnpm dev` running) and run:

```bash
pnpm seed:toadstool
```

---

## Payload Boilerplate Docs (Generated Template)

> The following section is part of the original Payload template used to create this project.  
> It is kept here for completeness and setup reference.

---

## Payload Quick Start Documentation

This template comes configured with the bare minimum to get started.

### Development

1. Clone repo  
2. `cd project && cp .env.example .env`  
3. Add `MONGODB_URI` if using Mongo/S3  
4. `pnpm install && pnpm dev`  
5. Visit `http://localhost:3000`

### Docker (Optional)

- Update `MONGODB_URI` in `.env`  
- Run `docker-compose up`  
- Login and create admin user  

### Collections

- **Users** – Auth-enabled admin users  
- **Media** – Upload-enabled collection  

For more, see:  
https://payloadcms.com/docs/configuration/collections

---

## Questions

If you have issues, reach out via Discord or GitHub Discussions.
