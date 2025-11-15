import type { ReactNode } from "react";
import "./styles.css";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <head>
      <title>IGN Recipes</title>
      {/* Pico.css – lightweight theme */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
      />
    </head>
    <body>
    <header className="nav-shell">
      <div className="nav-inner">
        <span className="brand">IGN Recipes</span>
        <nav>
          <a href="/recipes">Recipes</a>
          <a href="/foods">Ingredients</a>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    </body>
    </html>
  );
}