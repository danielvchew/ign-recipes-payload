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

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <>
      <h1>Recipes</h1>

      {recipes.length === 0 && <p>No recipes yet.</p>}

      {recipes.length > 0 && (
        <section className="recipe-list">
          {recipes.map((recipe) => {
            const image =
              typeof recipe.image === "object" && recipe.image !== null
                ? recipe.image
                : null;

            return (
              <article key={recipe.id} className="recipe-card">
                {image?.url && (
                  <img
                    src={image.url}
                    alt={image.alt ?? recipe.title}
                  />
                )}

                <div>
                  <h2>
                    <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                  </h2>
                  {recipe.description && <p>{recipe.description}</p>}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}