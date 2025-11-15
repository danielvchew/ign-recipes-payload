import Link from 'next/link';

type IngredientSummary = {
  id: number;
  foodName: string;
  quantity: number;
};

type RecipeSummary = {
  id: number;
  title: string;
  description: string;
  ingredients: IngredientSummary[];
};


async function getRecipes(): Promise<RecipeSummary[]> {
  const res = await fetch("http://localhost:3000/api/recipes?depth=2", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }

  const data = await res.json();

  const recipes: RecipeSummary[] = (data.docs ?? []).map((doc: any) => {
    return {
      id: doc.id,
      title: doc.title,
      description: doc.description ?? "",
      ingredients: (doc.ingredients ?? []).map((ing: any) => ({
        id: ing.id,
        foodName: ing.food?.name ?? "Unknown food",
        quantity: ing.quantity ?? 0,
      })),
    };
  });

  return recipes;
}

export default async function RecipePage() {
  // Load from Payload instead of hardcoded dummy data
  const recipes = await getRecipes();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Recipes</h1>

      {/* no recipes found */}
      {recipes.length === 0 && <p>No recipes yet.</p>}

      {/* recipes found -> display list */}
      {recipes.length > 0 && (
        <ul style={{ marginTop: "1.5rem", listStyle: "none", padding: 0 }}>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              style={{
                marginBottom: "1.5rem",
                borderBottom: "1px solid #444",
                paddingBottom: "1rem",
              }}
            >
              <h2>
                <Link href={`/recipes/${recipe.id}`}>
                  {recipe.title}
                </Link>
              </h2>
              <p>{recipe.description}</p>

              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.quantity} × {ingredient.foodName}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}