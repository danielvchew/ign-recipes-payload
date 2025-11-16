import React from 'react'
import Link from 'next/link'

import './styles.css'

export default function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <h1 className="home-title">Welcome to IGN Recipes</h1>

        <p className="home-intro">
          IGN Recipes is a Mushroom Kingdom–themed recipe catalog built with Next.js and Payload CMS.
          It&apos;s designed to show how editors can manage recipes and ingredients in Payload while
          the frontend stays fast, simple, and on brand.
        </p>

        {/* Requirements */}
        <section className="home-section">
          <h2>Requirements</h2>
          <p>
            Before running the commands below, make sure these are installed on your machine:
          </p>
          <ul>
            <li>
              <strong>Node.js 18+</strong> (Node 20+ recommended).
            </li>
            <li>
              <strong>pnpm</strong> for package management (
              <code>npm install -g pnpm</code> if you don&apos;t have it yet).
            </li>
            <li>
              <strong>Git</strong> to clone this repository.
            </li>
          </ul>
        </section>

        {/* Getting started */}
        <section className="home-section">
          <h2>Getting started</h2>
          <ol>
            <li>
              Run <code>pnpm dev</code> and open <code>http://localhost:3000</code>.
            </li>
            <li>
              Log into the Payload admin at <code>/admin</code> to add or edit recipes and ingredients.
            </li>
            <li>
              By default the catalog is empty. Run <code>pnpm seed:toadstool</code> to load a set of Toadstool Cafe–inspired demo recipes so you can see the full experience with data,
              relations, and images.
            </li>
          </ol>
        </section>

        {/* Project requirements */}
        <section className="home-section">
          <h2>Project requirements</h2>
          <ul>
            <li>
              Using Payload CMS, create a backend composed of at least two collections: <strong>Recipes</strong> and <strong>Foods</strong>.
            </li>
            <li>
              <strong>Recipes collection:</strong> Include fields for title, description, instructions, and ingredients. The ingredients field must define a "has many" relationship to Foods and track the quantity of each food.
            </li>
            <li>
              <strong>Foods collection:</strong> At minimum, store the food name. (This project extends it with optional image support.)
            </li>
            <li>
              <strong>Frontend pages:</strong> Implement a Recipe List page, a Recipe Detail page, and a Food Detail page that lists all recipes using that food as an ingredient.
            </li>
          </ul>
        </section>

        {/* What was delivered */}
        <section className="home-section">
          <h2>What&apos;s included</h2>
          <ul>
            <li>
              <strong>Milestone 1 – Backend:</strong> Payload collections for recipes and foods, with
              relations, image fields, and a seed script.
            </li>
            <li>
              <strong>Milestone 2 – Frontend:</strong> Public recipe and ingredient list pages, plus
              detail views that show linked ingredients.
            </li>
            <li>
              <strong>Bonus weekend polish:</strong> Mario-themed styling, search, A–Z sorting, and a
              pre-populated catalog of video-game dishes from Toadstool Cafe.
            </li>
          </ul>
        </section>

        {/* What I learned */}
        <section className="home-section">
          <h2>What I learned</h2>
          <ul>
            <li>
              Defining Payload collections for Recipes and Foods, including a typed <code>hasMany</code> relationship that stores ingredient quantities.
            </li>
            <li>
              Writing a repeatable TypeScript seed script that creates foods first, then links recipes to ingredients by ID and attaches static image URLs.
            </li>
            <li>
              Building a Next.js App Router frontend that queries the Payload REST API for list and detail views, including reverse lookups for recipes using a specific food.
            </li>
            <li>
              Working with Payload&apos;s media fields alongside public assets under <code>/public/images</code>, then wiring them into the UI.
            </li>
            <li>
              Polishing the UX with search, A–Z sorting, and a consistent Mario-themed visual style based on Pico-style cards and custom CSS.
            </li>
          </ul>
        </section>

        <section className="home-section">
          <h2>Tech &amp; implementation</h2>
          <ul>
            <li>Payload CMS 3.x for content modeling, access control, and the admin UI.</li>
            <li>Next.js App Router with React Server Components for the public frontend.</li>
            <li>TypeScript and <code>tsx</code> for strongly typed seed scripts and API calls.</li>
            <li>Payload REST API for fetching recipes, ingredients, and reverse relations.</li>
            <li>Custom CSS (inspired by Pico.css) for cards, navigation, and the Mushroom Kingdom theme.</li>
          </ul>
        </section>

        {/* Links */}
        <div className="links">
          <Link href="/recipes" className="link-button primary-link">
            Browse recipes
          </Link>
          <Link href="/foods" className="link-button primary-link">
            Browse ingredients
          </Link>
          <Link href="/admin" className="link-button primary-link">
            Open Admin Panel
          </Link>
        </div>
      </div>
    </div>
  )
}