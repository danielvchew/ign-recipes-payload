import Link from 'next/link';

type IngredientSummary = {
  id: number;
  foodName: string;
  quantity: number;
};

type RecipeSummary = {
  id: string | number;
  title: string;
  description: string;
  ingredients: {
    id: string | number;
    foodName: string;
    quantity: string;
  }[];
  image?: {
    id: string | number;
    url?: string;
    alt?: string | null;
  } | string | number | null;
};


async function getRecipes(): Promise<RecipeSummary[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/recipes?depth=2`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }

  const data = await res.json();

  const recipes: RecipeSummary[] = (data.docs ?? []).map((doc: any) => {
    return {
      id: doc.id,
      title: doc.title,
      description: doc.description ?? '',
      ingredients: (doc.ingredients ?? []).map((ing: any) => ({
        id: ing.id,
        foodName: ing.food?.name ?? 'Unknown food',
        quantity: ing.quantity ?? '',
      })),
      image: doc.image ?? null,
    };
  });

  return recipes;
}

export default async function RecipePage() {
  const recipes = await getRecipes();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Recipes</h1>

      {/* no recipes found */}
      {recipes.length === 0 && <p>No recipes yet.</p>}

      {/* recipes found -> display list */}
      {recipes.length > 0 && (
        <section style={{ marginTop: '1.5rem' }}>
          {recipes.map((recipe) => {
            const image =
              typeof recipe.image === 'object' && recipe.image !== null
                ? recipe.image
                : null

            return (
              <article
                key={recipe.id}
                style={{ marginBottom: '2rem', display: 'flex', gap: '1.5rem' }}
              >
                {image?.url && (
                  <div style={{ flex: '0 0 160px' }}>
                    <img
                      src={image.url}
                      alt={image.alt ?? recipe.title}
                      style={{
                        width: '160px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                )}

                <div>
                  <h2>
                    <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                  </h2>
                  {recipe.description && (
                    <p style={{ marginTop: '0.5rem' }}>{recipe.description}</p>
                  )}
                </div>
              </article>
            )
          })}
        </section>
      )}
    </main>
  );
}