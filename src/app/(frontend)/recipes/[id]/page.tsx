import Link from 'next/link';
import Image from 'next/image';
import type { Recipe } from '@/payload-types';
import type { Metadata } from 'next';

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
  params: Promise<{ id: string }>;
}

const baseUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

function buildAbsoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, baseUrl).toString();
}

async function getRecipe(id: string): Promise<RecipeDetail> {
  const res = await fetch(`${baseUrl}/api/recipes/${id}?depth=2`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }

  const data = await res.json();
  return data as RecipeDetail;
}

export async function generateMetadata(
  { params }: RecipePageProps,
): Promise<Metadata> {

  const { id } = await params;

  const recipe = await getRecipe(id);

  let imageUrl: string | null = null;

  if (recipe.image && typeof recipe.image === 'object' && 'url' in recipe.image) {
    const img = recipe.image as any;
    imageUrl = img.url ?? null;
  }

  if (!imageUrl && recipe.imageUrl) {
    imageUrl = recipe.imageUrl;
  }

  const ogImageUrl = buildAbsoluteUrl(imageUrl ?? '/og-default.png');

  const title = `${recipe.title} – IGN Recipes`;
  const description =
    recipe.description ??
    'Mario-inspired cookbook built with Payload CMS + Next.js.';

  return {
    title,
    description,

    // Base URL for building absolute links (including canonical)
    metadataBase: new URL(baseUrl),

    // Per-page canonical URL
    alternates: {
      canonical: `/recipes/${id}`,
    },

    openGraph: {
      type: 'article',
      title,
      description,
      url: `/recipes/${id}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {

  const { id } = await params;

  const recipe = await getRecipe(id);

  let imageUrl: string | null = null;
  let imageAlt: string | undefined;

  if (recipe.image && typeof recipe.image === 'object' && 'url' in recipe.image) {
    const img = recipe.image as any;
    imageUrl = img.url ?? null;
    imageAlt = img.alt ?? undefined;
  }

  if (!imageUrl && recipe.imageUrl) {
    imageUrl = recipe.imageUrl;
  }

  if (!imageAlt) {
    imageAlt = recipe.title;
  }

  // JSON-LD
  const absoluteImageUrl = buildAbsoluteUrl(
    imageUrl ?? '/og-default.png',
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description:
      recipe.description ??
      "Mario-inspired cookbook built with Payload CMS + Next.js.",
    image: [absoluteImageUrl],
    mainEntityOfPage: buildAbsoluteUrl(`/recipes/${id}`),
    author: {
      "@type": "Organization",
      name: "IGN Recipes",
    },
    recipeIngredient:
      recipe.ingredients?.map((ingredient) => {
        const food =
          typeof ingredient.food === 'object' && ingredient.food !== null
            ? ingredient.food
            : null;

        const foodName = food?.name ?? 'Unknown ingredient';

        return `${ingredient.quantity} ${foodName}`;
      }) ?? [],
    recipeInstructions: recipe.instructions
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => ({
        "@type": "HowToStep",
        text: line.trim(),
      })),
  };

  return (
    <main className="recipe-detail-page">
      {imageUrl && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={800}
            height={600}
            priority
            sizes="(max-width: 768px) 100vw, 720px"
            style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
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
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </main>
  );
}