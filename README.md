# IGN Coding Assessment – Recipes & Foods App (Payload CMS + Next.js)

This project is a coding assessment for IGN.  
It implements a basic recipe application using **Payload CMS** for the backend and **Next.js App Router** for the frontend.

The goal was to build:
- A backend with **two collections**: Recipes and Foods  
- A relationship between them  
- A small frontend with three pages  
- Image upload support  
- Clean, readable code

Below is the structure, milestones, and how the project meets each requirement.

---

## ✔ Requirements (Provided in Assessment)

### Backend
- **Recipes collection** with:  
  - title  
  - description  
  - instructions  
  - ingredients → has-many relationship to Foods  
  - quantity per ingredient  
- **Foods collection** with:  
  - name  
- Nice-to-have:  
  - Image upload support  

### Frontend
Create 3 pages:
1. **Recipe List Page**  
2. **Recipe Detail Page**  
3. **Food Detail Page**, showing all recipes that use that food  

Nice-to-have:
- Images for Foods and Recipes  

---

## ✔ Milestones Completed

### **Milestone 1 – Backend Complete**
- Implemented **Foods** and **Recipes** collections  
- Configured relationships (Recipe.ingredients → Foods + quantity)  
- Enabled Payload Media Uploads  
- Verified admin panel CRUD works end-to-end  

### **Milestone 2 – Frontend Pages Complete**
- `/recipes` – list view with images  
- `/recipes/[id]` – detail view with images + ingredients  
- `/foods` – ingredients list page  
- `/foods/[id]` – detail page showing all recipes using that ingredient  
- Data fetched via Payload REST API  

### **Milestone 3 – Nice-to-Have Features**
- Image upload support for both collections  
- Basic global navigation header  
- Back links between pages  
- Simple, readable layout  

---

## ✔ Project Structure

```
src/
  collections/
    Foods.ts
    Recipes.ts
  app/
    layout.tsx
    page.tsx
    recipes/
      page.tsx
      [id]/
        page.tsx
    foods/
      page.tsx
      [id]/
        page.tsx
  payload.config.ts
  payload-types.ts
```

---

## ✔ Running the App Locally

### Install dependencies:
```bash
pnpm install
```

### Start development server:
```bash
pnpm dev
```

Admin panel will be at:
```
http://localhost:3000/admin
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
