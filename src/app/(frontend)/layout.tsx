import type { ReactNode } from "react";
import "./styles.css";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <head>
      <title>IGN Recipes</title>

      {/* Pico.css – base reset / layout */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
      />
    </head>
    <body>
    <header className="nav-shell">
      <div className="nav-inner">
            <span className="brand">
              <span className="brand-icon" aria-hidden="true">
                🍄
              </span>
              <span className="brand-text">IGN Recipes</span>
            </span>

        <nav className="nav-links">
          <a href="/recipes">Recipes</a>
          <a href="/foods">Ingredients</a>

          {/* Search sends ?q= to /recipes */}
          <form className="nav-search" action="/recipes" method="GET">
            <input
              type="text"
              name="q"
              placeholder="Search recipes…"
              aria-label="Search recipes"
            />
          </form>
        </nav>
      </div>
    </header>

    <main>
      {/* Centered white “card” shell for all pages */}
      <div className="page-shell">{children}</div>
    </main>
    </body>
    </html>
  );
}