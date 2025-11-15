import React from 'react'
import './styles.css'
import Link from 'next/link'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body style={{ margin: 0, background: 'black', color: 'white' }}>
    <nav
      style={{
        display: 'flex',
        gap: '1.5rem',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333',
        marginBottom: '2rem',
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/recipes">Recipes</Link>
      <Link href="/foods">Ingredients</Link>

      {/* push Admin link to the far right */}
      <div style={{ marginLeft: 'auto' }}>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>

    <div style={{ padding: '0 2rem' }}>{children}</div>
    </body>
    </html>
  )
}