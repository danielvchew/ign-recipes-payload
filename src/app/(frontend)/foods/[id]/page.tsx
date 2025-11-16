import Link from 'next/link';

type FoodDetail = {
  id: string | number;
  name: string;
  image?: {
    url?: string;
    alt?: string;
  } | null;
  imageUrl?: string | null;
};

type RecipeSummaryForFood = {
  id: string | number;
  title: string;
  description: string;
  image?: {
    url?: string;
    alt?: string;
  } | null;
};

interface FoodPageProps {
  params: { id: string };
}

async function getFoodById(id: string): Promise<FoodDetail> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/foods/${id}?depth=1`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch food: ${res.status}`);
  }

  const data = await res.json();

  return {
    id: data.id,
    name: data.name ?? 'Unknown food',
    image:
      data.image && typeof data.image === 'object'
        ? data.image
        : null,
    imageUrl: data.imageUrl ?? null,
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
    image: doc.image ?? null,
  }));
}

export default async function FoodPage({ params }: FoodPageProps) {
  const { id } = params;

  const food = await getFoodById(id);
  const recipes = await getRecipesByFood(id);

  const uploadedImage =
    food.image && typeof food.image === 'object' ? food.image : null;

  // prefer uploaded image; fall back to imageUrl string
  const displayImageUrl = uploadedImage?.url ?? food.imageUrl ?? null;
  const displayAlt = uploadedImage?.alt ?? food.name;

  return (
    <main className="page-shell food-detail-page">
      {displayImageUrl && (
        <div className="food-detail-image-wrapper">
          <img
            src={displayImageUrl}
            alt={displayAlt}
            className="food-detail-image"
          />
        </div>
      )}

      <h1 className="food-detail-name">{food.name}</h1>

      <section className="food-detail-recipes">
        <h2 className="food-detail-section-title">Recipes using this food</h2>

        {recipes.length === 0 && <p>No recipes use this food yet.</p>}

        {recipes.length > 0 && (
          <ul className="food-detail-recipes-list">
            {recipes.map((recipe) => {
              const image =
                typeof recipe.image === 'object' && recipe.image !== null
                  ? recipe.image
                  : null;

              return (
                <li key={recipe.id} className="food-detail-recipe-row">
                  {image?.url && (
                    <div className="food-detail-recipe-thumb">
                      <img
                        src={image.url}
                        alt={image.alt ?? recipe.title}
                      />
                    </div>
                  )}

                  <div>
                    <h3>
                      <Link href={`/recipes/${recipe.id}`}>
                        {recipe.title}
                      </Link>
                    </h3>

                    {recipe.description && (
                      <p>{recipe.description}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}