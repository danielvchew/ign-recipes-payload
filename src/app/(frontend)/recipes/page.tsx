import Link from "next/link";
import { stringify } from "qs-esm"

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
    | null;
  imageUrl?: string | null;
};

async function getRecipes(searchQuery?: string): Promise<RecipeSummary[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

  // Build Payload "where" only if we have a query
  let where: any | undefined;

  if (searchQuery && searchQuery.trim().length > 0) {
    where = {
      or: [
        // title contains q
        { title: { contains: searchQuery } },
        // description contains q
        { description: { contains: searchQuery } },
        // OPTIONAL: if you want ingredient names too later, you can add a
        // custom field or denormalized field and query it here.
      ],
    };
  }

  // Build query string using qs-esm so Payload understands nested where
  const queryString = stringify(
    {
      where,
      depth: 2,
      limit: 50,
      sort: "title",
    },
    { addQueryPrefix: true, skipNulls: true },
  );

  console.log("[getRecipes] queryString:", queryString);
  const res = await fetch(`${baseUrl}/api/recipes${queryString}`, {
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
    imageUrl: doc.imageUrl ?? null,
  }));

  return recipes;
}

export default async function RecipesPage({ searchParams, }: {
  searchParams?: { q?: string };
}) {
  const rawQuery = searchParams?.q ?? "";
  const query = rawQuery.toString().trim();

  // Ask Payload to filter via "where" instead of doing it in memory
  const recipes = await getRecipes(query);

  // Payload already sorted via sort: "title" in getRecipes, but this is harmless
  recipes.sort((a, b) => a.title.localeCompare(b.title));

  const filteredRecipes = recipes;

  return (
    <>
      <h1 className="page-title">Recipes</h1>

      {/* Show what we're searching for, if anything */}
      {query && (
        <p className="recipes-search-summary">
          Showing results for:{" "}
          <span className="recipes-search-term">{rawQuery}</span>
        </p>
      )}

      {filteredRecipes.length === 0 && (
        <p className="recipes-search-empty">No recipes found for that search.</p>
      )}

      {filteredRecipes.length > 0 && (
        <section className="recipe-list">
          {filteredRecipes.map((recipe) => {
            const imageObject =
              typeof recipe.image === "object" && recipe.image !== null
                ? recipe.image
                : null;

            const imageUrl = imageObject?.url || recipe.imageUrl || "";
            const imageAlt = imageObject?.alt || recipe.title;

            return (
              <article key={recipe.id} className="recipe-card">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={imageAlt}
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