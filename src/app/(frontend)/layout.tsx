import type { ReactNode } from "react";
import "./styles.css";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <head>
      {/* Core document metadata */}
      <title>IGN Recipes</title>
      <meta
        name="description"
        content="A Mario-inspired recipe project built for the IGN take-home, using Payload CMS, Next.js, and real recipe content."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph (default social preview) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="IGN Recipes" />
      <meta property="og:title" content="IGN Recipes" />
      <meta
        property="og:description"
        content="A Mario-inspired recipe project built for the IGN take-home, using Payload CMS, Next.js, and real recipe content."
      />

      <meta property="og:image" content="/og-default.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card defaults */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="IGN Recipes" />
      <meta
        name="twitter:description"
        content="A Mario-inspired recipe project built for the IGN take-home, using Payload CMS, Next.js, and real recipe content."
      />
      <meta name="twitter:image" content="/og-default.png" />

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
          <a href="/">Home</a>
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