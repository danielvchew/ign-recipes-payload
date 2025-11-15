import Link from 'next/link';

type RecipeSummaryForFood = {
  id: string | number;
  title: string;
  description: string;
};

interface FoodPageProps {
  params: { id: string };
}

async function getFoodById(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/foods/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch food: ${res.status}`);
  }

  const data = await res.json();

  return {
    id: data.id,
    name: data.name ?? 'Unknown food',
  };
}

async function getRecipesByFood(foodId: string): Promise<RecipeSummaryForFood[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

  // reverse lookup query
  const res = await fetch(
    `${baseUrl}/api/recipes?where[ingredients.food][equals]=${foodId}&depth=1`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes for food: ${res.status}`);
  }

  const data = await res.json();

  // array of recipe documents
  const docs = data.docs ?? [];

  return docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title ?? 'Untitled recipe',
    description: doc.description ?? '',
  }));
}

export default async function FoodPage({ params }: FoodPageProps) {
  const { id } = params;

  const food = await getFoodById(id);

  const recipes = await getRecipesByFood(id);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{food.name}</h1>
      <p>Food ID: {food.id}</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>Recipes using this food</h2>

        {/* If no recipes, show a simple message */}
        {recipes.length === 0 && <p>No recipes use this food yet.</p>}

        {/* If we have recipes, render a list */}
        {recipes.length > 0 && (
          <ul style={{ marginTop: '1rem' }}>
            {recipes.map((recipe) => (
              <li key={recipe.id} style={{ marginBottom: '1rem' }}>
                <h3>
                  <Link href={`/recipes/${recipe.id}`}>
                    {recipe.title}
                  </Link>
                </h3>
                {recipe.description && (
                  <p style={{ marginTop: '0.25rem' }}>{recipe.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}