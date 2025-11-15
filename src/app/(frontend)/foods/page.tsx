import Link from 'next/link'

type FoodSummary = {
  id: string | number
  name: string
  imageUrl?: string
  imageAlt?: string
}

async function getFoods(): Promise<FoodSummary[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/foods?limit=100`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch foods: ${res.status}`)
  }

  const data = await res.json()

  const foods: FoodSummary[] = (data.docs ?? []).map((doc: any) => ({
    id: doc.id,
    name: doc.name ?? 'Unnamed food',
    imageUrl: doc.image?.url,
    imageAlt: doc.image?.alt,
  }))

  return foods
}

export default async function FoodsPage() {
  const foods = await getFoods()

  return (
    <main>
      <h1>Ingredients</h1>

      {foods.length === 0 && <p>No foods yet.</p>}

      {foods.length > 0 && (
        <ul style={{ marginTop: '1.5rem' }}>
          {foods.map((food) => (
            <li key={food.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              {food.imageUrl && (
                <img
                  src={food.imageUrl}
                  alt={food.imageAlt ?? food.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginRight: '0.75rem',
                  }}
                />
              )}
              <Link href={`/foods/${food.id}`}>{food.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}