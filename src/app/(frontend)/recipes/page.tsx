import Link from "next/link";

type RecipeSummary = {
  id: string | number;
  title: string;
  description: string;
  ingredients: {
    id: string | number;
    foodName: string;
    quantity: string;
  }[];
  image?:
    | {
    id: string | number;
    url?: string;
    alt?: string | null;
  }
    | string
    | number
    | null;
};

async function getRecipes(): Promise<RecipeSummary[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/recipes?depth=2`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }

  const data = await res.json();

  const recipes: RecipeSummary[] = (data.docs ?? []).map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    description: doc.description ?? "",
    ingredients: (doc.ingredients ?? []).map((ing: any) => ({
      id: ing.id,
      foodName: ing.food?.name ?? "Unknown food",
      quantity: ing.quantity ?? "",
    })),
    image: doc.image ?? null,
  }));

  return recipes;
}

export default async function RecipesPage({
                                            searchParams,
                                          }: {
  searchParams?: { q?: string };
}) {
  // 1. Read the query from ?q=...
  const rawQuery = searchParams?.q ?? "";
  const query = rawQuery.toString().trim().toLowerCase();

  // 2. Get all recipes from Payload
  const recipes = await getRecipes();

  // 3. Filter in memory if there is a query
  const filteredRecipes = query
    ? recipes.filter((recipe) => {
      const textParts: string[] = [
        recipe.title,
        recipe.description,
        ...recipe.ingredients.map((ing) => ing.foodName),
      ];

      const haystack = textParts.join(" ").toLowerCase();
      return haystack.includes(query);
    })
    : recipes;

  return (
    <>
      <h1 className="page-title">Recipes</h1>

      {/* Show what we're searching for, if anything */}
      {query && (
        <p style={{ marginBottom: "1rem" }}>
          Showing results for: <strong>{rawQuery}</strong>
        </p>
      )}

      {filteredRecipes.length === 0 && (
        <p>No recipes found for that search.</p>
      )}

      {filteredRecipes.length > 0 && (
        <section className="recipe-list">
          {filteredRecipes.map((recipe) => {
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
                    <Link href={`/recipes/${recipe.id}`}>
                      {recipe.title}
                    </Link>
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