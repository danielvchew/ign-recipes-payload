import Link from 'next/link';

type FoodDetail = {
  id: string | number;
  name: string;
  image?: {
    url?: string;
    alt?: string;
  } | null;
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
    image: data.image ?? null,
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

  // Safely extract the food image (could be null / undefined)
  const foodImage =
    typeof food.image === 'object' && food.image !== null ? food.image : null;

  return (
    <main style={{ padding: '2rem' }}>
      {foodImage?.url && (
        <div style={{ marginBottom: '1.5rem', maxWidth: '240px' }}>
          <img
            src={foodImage.url}
            alt={foodImage.alt ?? food.name}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      <h1>{food.name}</h1>
      <p>Food ID: {food.id}</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>Recipes using this food</h2>

        {recipes.length === 0 && <p>No recipes use this food yet.</p>}

        {recipes.length > 0 && (
          <ul style={{ marginTop: '1rem' }}>
            {recipes.map((recipe) => {
              const image =
                typeof recipe.image === 'object' && recipe.image !== null
                  ? recipe.image
                  : null;

              return (
                <li
                  key={recipe.id}
                  style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'flex-start',
                  }}
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
                    <h3>
                      <Link href={`/recipes/${recipe.id}`}>
                        {recipe.title}
                      </Link>
                    </h3>

                    {recipe.description && (
                      <p style={{ marginTop: '0.25rem' }}>
                        {recipe.description}
                      </p>
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