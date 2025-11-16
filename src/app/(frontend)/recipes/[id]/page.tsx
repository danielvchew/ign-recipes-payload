import Link from 'next/link';
import type { Recipe } from '@/payload-types';

type RecipeDetail = Recipe & {
  image?: {
    id: string | number;
    url?: string;
    alt?: string | null;
  } | string | number | null;
  imageUrl?: string | null;
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

  let imageUrl: string | null = null;
  let imageAlt: string | undefined;

  if (recipe.image && typeof recipe.image === 'object' && 'url' in recipe.image) {
    const img = recipe.image as any;
    imageUrl = img.url ?? null;
    imageAlt = img.alt ?? undefined;
  }

  // Fallback to the plain URL field (used by the seed script)
  if (!imageUrl && recipe.imageUrl) {
    imageUrl = recipe.imageUrl;
  }

  if (!imageAlt) {
    imageAlt = recipe.title;
  }

  return (
    <main className="recipe-detail-page">
      {imageUrl && (
        <div style={{ marginBottom: '1.5rem' }}>
          <img
            src={imageUrl}
            alt={imageAlt}
            style={{ maxWidth: '400px', width: '100%', borderRadius: '8px' }}
          />
        </div>
      )}

      <h1>{recipe.title}</h1>

      {recipe.description && (
        <p style={{ marginTop: '1rem' }}>{recipe.description}</p>
      )}

      <section style={{ marginTop: '2rem' }}>
        {/* Instructions */}
        <h3 style={{ marginTop: '2rem' }}>Instructions</h3>

        {recipe.instructions
          .split('\n')
          .filter((line) => line.trim().length > 0)
          .map((line, idx) => (
            <p key={idx} style={{ marginBottom: '0.5rem' }}>
              {line}
            </p>
          ))}
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