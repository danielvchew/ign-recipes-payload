import Link from 'next/link'
import Image from "next/image";

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

  return foods.sort((a, b) => a.name.localeCompare(b.name))
}

export default async function FoodsPage() {
  const foods = await getFoods()

  return (
    <main className="page-shell ingredients-page">
      <h1 className="page-title">Ingredients</h1>

      {foods.length === 0 && <p>No foods yet.</p>}

      {foods.length > 0 && (
        <ul className="foods-list">
          {foods.map((food) => (
            <li key={food.id} className="food-row">
              {food.imageUrl && (
                <Image
                  src={food.imageUrl}
                  alt={food.imageAlt ?? food.name}
                  width={64}
                  height={64}
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