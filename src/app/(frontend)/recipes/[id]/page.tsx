import Link from 'next/link';
import type { Recipe } from '@/payload-types';

type RecipeDetail = Recipe & {
  ingredients?: {
    id: string | number;
    quantity: string;
    food?: {
      id: string | number;
      name?: string | null;
    } | string | number | null;
  }[];
};

interface RecipePageProps {
  params: { id: string };
}

async function getRecipe(id: string): Promise<RecipeDetail> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/recipes/${id}?depth=2`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }

  const data = await res.json();
  return data as RecipeDetail;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipe(params.id);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{recipe.title}</h1>

      {recipe.description && (
        <p style={{ marginTop: '1rem' }}>{recipe.description}</p>
      )}

      <section style={{ marginTop: '2rem' }}>
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
      </section>

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient) => {
              const food =
                typeof ingredient.food === 'object' && ingredient.food !== null
                  ? ingredient.food
                  : null;

              return (
                <li key={ingredient.id ?? `${ingredient.food}-${ingredient.quantity}`}>
                  {ingredient.quantity} ×{' '}
                  {food ? (
                    <Link href={`/foods/${food.id}`}>
                      {food.name ?? 'Unknown food'}
                    </Link>
                  ) : (
                    <span>{'Unknown food'}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}