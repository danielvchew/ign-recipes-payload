import 'dotenv/config';
import payload from 'payload';
import configPromise from '@payload-config';

type SeedIngredient = {
  foodName: string;
  quantity: string;
};

type SeedRecipe = {
  title: string;
  description: string;
  imageUrl: string;
  instructions: string;
  ingredients: SeedIngredient[];
};

// ---- Toadstool / Mario menu data ----
// Image files should live in: public/images/toadstool/<filename>.jpg (or .png / .webp)

const toadstoolRecipes: SeedRecipe[] = [
  // STARTERS & SALADS
  {
    title: 'Toadstool Cheesy Garlic Knots',
    description:
      'Mini mushroom-shaped garlic knots brushed with butter, parmesan, and parsley, served with marinara.',
    imageUrl: '/images/toadstool/toadstool-cheesy-garlic-knots.jpg',
    instructions: [
      'Preheat oven and line a baking tray.',
      'Shape dough into small mushroom-cap knots and place on tray.',
      'Brush generously with garlic butter and sprinkle with parmesan and parsley.',
      'Bake until golden and fluffy.',
      'Serve warm with a side of marinara sauce for dipping.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Pizza Dough', quantity: '400 g' },
      { foodName: 'Garlic Butter', quantity: '3 tbsp' },
      { foodName: 'Parmesan Cheese', quantity: '3 tbsp, grated' },
      { foodName: 'Fresh Parsley', quantity: '1 tbsp, chopped' },
      { foodName: 'Marinara Sauce', quantity: '120 ml' },
    ],
  },
  {
    title: 'Super Mushroom Soup',
    description:
      'Creamy mushroom soup topped with truffle oil and tiny Super Mushroom crackers.',
    imageUrl: '/images/toadstool/super-mushroom-soup.jpg',
    instructions: [
      'Sauté onions and garlic in butter until soft.',
      'Add sliced mushrooms and cook until browned.',
      'Stir in flour, then add stock and simmer.',
      'Blend until smooth, then add cream and season.',
      'Finish with a drizzle of truffle oil and garnish with mushroom crackers.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Button Mushrooms', quantity: '300 g, sliced' },
      { foodName: 'Onion', quantity: '1 small, diced' },
      { foodName: 'Garlic', quantity: '2 cloves, minced' },
      { foodName: 'Butter', quantity: '2 tbsp' },
      { foodName: 'Vegetable Stock', quantity: '750 ml' },
      { foodName: 'Heavy Cream', quantity: '120 ml' },
      { foodName: 'Truffle Oil', quantity: '1 tsp' },
      { foodName: 'Mushroom Crackers', quantity: 'a handful' },
    ],
  },
  {
    title: 'Tomato Soup in Super Mushroom Bowl',
    description:
      'Vegan tomato basil soup with truffle oil, served piping hot in a Super Mushroom bowl.',
    imageUrl: '/images/toadstool/tomato-soup-super-mushroom-bowl.jpg',
    instructions: [
      'Sauté onions and garlic in olive oil until soft.',
      'Add crushed tomatoes and vegetable stock, then simmer.',
      'Season with salt, pepper, and a pinch of sugar.',
      'Blend until smooth and stir in fresh basil.',
      'Serve with a drizzle of truffle oil and extra basil on top.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Crushed Tomatoes', quantity: '800 g' },
      { foodName: 'Onion', quantity: '1 medium, chopped' },
      { foodName: 'Garlic', quantity: '2 cloves, minced' },
      { foodName: 'Olive Oil', quantity: '2 tbsp' },
      { foodName: 'Vegetable Stock', quantity: '500 ml' },
      { foodName: 'Fresh Basil', quantity: '10 leaves' },
      { foodName: 'Truffle Oil', quantity: '1 tsp' },
    ],
  },
  {
    title: 'Piranha Plant Caprese',
    description:
      'Playful caprese with tomato, fresh mozzarella, and asparagus “stem” over mixed greens.',
    imageUrl: '/images/toadstool/piranha-plant-caprese.jpg',
    instructions: [
      'Arrange mixed greens on a serving plate.',
      'Slice tomatoes in half and layer with fresh mozzarella to resemble a Piranha Plant head.',
      'Use asparagus spears as stems and basil leaves as garnish.',
      'Drizzle with apple vinaigrette and season lightly with salt and pepper.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Mixed Greens', quantity: '2 cups' },
      { foodName: 'Tomatoes', quantity: '2 medium, halved' },
      { foodName: 'Fresh Mozzarella', quantity: '120 g, sliced' },
      { foodName: 'Asparagus', quantity: '4 spears, blanched' },
      { foodName: 'Radish', quantity: '2, shaved' },
      { foodName: 'Apple Vinaigrette', quantity: '3 tbsp' },
    ],
  },
  {
    title: 'Super Star Chicken Salad',
    description:
      'Crisp romaine and cabbage with mushrooms, tomatoes, truffle dressing, and grilled chicken.',
    imageUrl: '/images/toadstool/super-star-chicken-salad.jpg',
    instructions: [
      'Combine chopped romaine, cabbage, and grape tomatoes in a large bowl.',
      'Add sliced mushrooms and toss with truffle dressing.',
      'Top with grilled chicken slices and star-shaped parmesan croutons.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Romaine Lettuce', quantity: '2 cups, chopped' },
      { foodName: 'Cabbage', quantity: '1 cup, shredded' },
      { foodName: 'Grape Tomatoes', quantity: '12, halved' },
      { foodName: 'Mushrooms', quantity: '80 g, sliced' },
      { foodName: 'Grilled Chicken Breast', quantity: '150 g, sliced' },
      { foodName: 'Truffle Dressing', quantity: '3 tbsp' },
      { foodName: 'Parmesan Croutons', quantity: 'a handful' },
    ],
  },

  // MAINS
  {
    title: 'Chef Toad Chicken Special',
    description:
      'Oven-roasted chicken with potatoes, tomatoes, and spinach in a lemon beurre blanc.',
    imageUrl: '/images/toadstool/chef-toad-chicken-special.jpg',
    instructions: [
      'Season chicken and roast with potatoes and tomatoes until golden and cooked through.',
      'Sauté spinach briefly in a pan until just wilted.',
      'Prepare lemon beurre blanc in a saucepan.',
      'Plate chicken over potatoes and spinach, then spoon sauce over the top.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Chicken Thighs', quantity: '4 pieces' },
      { foodName: 'Baby Potatoes', quantity: '400 g, halved' },
      { foodName: 'Cherry Tomatoes', quantity: '150 g' },
      { foodName: 'Baby Spinach', quantity: '2 cups' },
      { foodName: 'Butter', quantity: '3 tbsp' },
      { foodName: 'Lemon Juice', quantity: '2 tbsp' },
      { foodName: 'White Wine', quantity: '60 ml' },
    ],
  },
  {
    title: "Bowser's Fireball Challenge",
    description:
      'Giant one-pound meatball in spicy mushroom marinara with Bowser puff pastry.',
    imageUrl: '/images/toadstool/bowsers-fireball-challenge.jpg',
    instructions: [
      'Mix ground meat with breadcrumbs, egg, and seasoning, then shape into a giant meatball.',
      'Sear the meatball, then finish cooking in the oven in a pan of mushroom marinara.',
      'Bake Bowser-themed puff pastry separately until golden.',
      'Serve the meatball over sauce with hot sauce on the side and garnish with parsley.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Ground Beef', quantity: '450 g' },
      { foodName: 'Breadcrumbs', quantity: '60 g' },
      { foodName: 'Egg', quantity: '1 large' },
      { foodName: 'Mushroom Marinara Sauce', quantity: '400 ml' },
      { foodName: 'Mozzarella Cheese', quantity: '100 g, shredded' },
      { foodName: 'Puff Pastry', quantity: '1 sheet, cut to shape' },
      { foodName: 'Hot Sauce', quantity: 'to taste' },
      { foodName: 'Fresh Parsley', quantity: '1 tbsp, chopped' },
    ],
  },
  {
    title: "Yoshi's Fettuccine Alfredo",
    description:
      'Creamy pesto Alfredo pasta with grilled chicken, broccoli, mushrooms, and egg-shaped bread.',
    imageUrl: '/images/toadstool/yoshis-fettuccine-alfredo.jpg',
    instructions: [
      'Cook fettuccine until al dente.',
      'Sauté mushrooms and broccoli in butter, then stir in cream, parmesan, and pesto.',
      'Add grilled chicken slices and toss with the cooked fettuccine.',
      'Serve with toasted egg-shaped bread on the side.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Fettuccine', quantity: '250 g' },
      { foodName: 'Grilled Chicken Breast', quantity: '150 g, sliced' },
      { foodName: 'Broccoli Florets', quantity: '1 cup' },
      { foodName: 'Mushrooms', quantity: '100 g, sliced' },
      { foodName: 'Heavy Cream', quantity: '200 ml' },
      { foodName: 'Parmesan Cheese', quantity: '50 g, grated' },
      { foodName: 'Basil Pesto', quantity: '2 tbsp' },
      { foodName: 'Egg-Shaped Bread', quantity: '2 pieces' },
    ],
  },
  {
    title: 'Mario Burger (Bacon, Mushroom & Cheese)',
    description:
      'All-beef patty with bacon, mushrooms, lettuce, tomato, and cheese on brioche with truffle fries.',
    imageUrl: '/images/toadstool/mario-burger.jpg',
    instructions: [
      'Cook bacon until crispy and set aside.',
      'Sear burger patty to desired doneness.',
      'Sauté mushrooms in butter.',
      'Toast brioche bun, then build burger with lettuce, tomato, cheese, bacon, and mushrooms.',
      'Serve with a side of truffle fries.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Brioche Bun', quantity: '1 bun, sliced' },
      { foodName: 'Beef Patty', quantity: '1 patty (150 g)' },
      { foodName: 'Bacon', quantity: '2 strips' },
      { foodName: 'Mushrooms', quantity: '60 g, sliced' },
      { foodName: 'Lettuce', quantity: '2 leaves' },
      { foodName: 'Tomato', quantity: '2 slices' },
      { foodName: 'American Cheese', quantity: '1 slice' },
      { foodName: 'Truffle Fries', quantity: '1 serving' },
    ],
  },
  {
    title: 'Luigi Burger (Pesto Grilled Chicken)',
    description:
      'Pesto grilled chicken sandwich with Swiss, green pepper, spinach, and truffle fries.',
    imageUrl: '/images/toadstool/luigi-burger.jpg',
    instructions: [
      'Marinate chicken in pesto and grill until cooked through.',
      'Toast brioche bun lightly.',
      'Layer spinach, grilled chicken, Swiss cheese, and grilled green pepper on the bun.',
      'Serve with truffle fries on the side.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Brioche Bun', quantity: '1 bun, sliced' },
      { foodName: 'Chicken Breast', quantity: '1 small, grilled' },
      { foodName: 'Basil Pesto', quantity: '2 tbsp' },
      { foodName: 'Swiss Cheese', quantity: '1 slice' },
      { foodName: 'Green Bell Pepper', quantity: '3 rings, grilled' },
      { foodName: 'Spinach', quantity: '1/2 cup, fresh' },
      { foodName: 'Truffle Fries', quantity: '1 serving' },
    ],
  },
  {
    title: 'Fire Flower Spaghetti & Meatballs',
    description:
      'Spaghetti in spicy mushroom marinara with meatballs and Fire Flower parmesan crisp.',
    imageUrl: '/images/toadstool/fire-flower-spaghetti-meatballs.jpg',
    instructions: [
      'Cook spaghetti until al dente.',
      'Brown meatballs in a pan, then simmer in mushroom marinara sauce.',
      'Toss spaghetti with some of the sauce.',
      'Plate spaghetti, top with meatballs, extra sauce, and a Fire Flower parmesan crisp.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Spaghetti', quantity: '250 g' },
      { foodName: 'Meatballs', quantity: '8 small' },
      { foodName: 'Mushroom Marinara Sauce', quantity: '400 ml' },
      { foodName: 'Parmesan Cheese', quantity: '40 g, grated' },
      { foodName: 'Chili Flakes', quantity: '1/2 tsp' },
      { foodName: 'Fresh Parsley', quantity: '1 tbsp, chopped' },
    ],
  },

  // DESSERTS
  {
    title: '? Block Tiramisu',
    description:
      'Shortbread ? Block filled with tiramisu, coffee-soaked ladyfingers, cocoa, and white chocolate.',
    imageUrl: '/images/toadstool/question-block-tiramisu.jpg',
    instructions: [
      'Layer coffee-soaked ladyfingers with mascarpone cream in a square mold.',
      'Chill until set.',
      'Enclose the tiramisu with shortbread cookie panels decorated like a ? Block.',
      'Dust with cocoa powder and top with a white chocolate power-up.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Ladyfingers', quantity: '12 pieces' },
      { foodName: 'Mascarpone Cheese', quantity: '250 g' },
      { foodName: 'Heavy Cream', quantity: '120 ml' },
      { foodName: 'Espresso', quantity: '120 ml, cooled' },
      { foodName: 'Cocoa Powder', quantity: '2 tbsp' },
      { foodName: 'Shortbread Cookies', quantity: '8 panels' },
      { foodName: 'White Chocolate Decoration', quantity: '1 piece' },
    ],
  },
  {
    title: 'Mt. Beanpole Cake',
    description:
      'Layered chocolate, vanilla, and strawberry cake topped with matcha mousse.',
    imageUrl: '/images/toadstool/mt-beanpole-cake.jpg',
    instructions: [
      'Bake thin layers of chocolate, vanilla, and strawberry sponge.',
      'Stack layers with light buttercream between each.',
      'Top with matcha mousse and chill until set.',
      'Slice to show the colorful tiers.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Chocolate Sponge Cake', quantity: '1 thin layer' },
      { foodName: 'Vanilla Sponge Cake', quantity: '1 thin layer' },
      { foodName: 'Strawberry Sponge Cake', quantity: '1 thin layer' },
      { foodName: 'Buttercream Frosting', quantity: '200 g' },
      { foodName: 'Matcha Mousse', quantity: '200 g' },
    ],
  },
  {
    title: 'Princess Peach Cupcake',
    description:
      'Raspberry-filled funfetti cupcake with buttercream frosting and a Princess Peach crown.',
    imageUrl: '/images/toadstool/princess-peach-cupcake.jpg',
    instructions: [
      'Bake funfetti cupcakes and let them cool completely.',
      'Core the center of each cupcake and fill with raspberry jam.',
      'Pipe buttercream frosting on top.',
      'Finish with a Princess Peach chocolate crown decoration.',
    ].join('\n'),
    ingredients: [
      { foodName: 'Funfetti Cupcakes', quantity: '6 cupcakes' },
      { foodName: 'Raspberry Jam', quantity: '6 tsp' },
      { foodName: 'Buttercream Frosting', quantity: '200 g' },
      { foodName: 'Chocolate Crown Decoration', quantity: '6 pieces' },
    ],
  },
];

// ---------------- SEED LOGIC ----------------

async function run() {
  const config = await configPromise;

  await payload.init({
    config,
  });

  console.log('Seeding Toadstool recipes…');

  // 1. Collect unique food names from all recipes
  const foodNames = new Set<string>();
  for (const recipe of toadstoolRecipes) {
    for (const ing of recipe.ingredients) {
      foodNames.add(ing.foodName);
    }
  }

  // 2. Upsert foods and build name -> id map
  const foodNameToId = new Map<string, number>();

  for (const name of foodNames) {
    const existing = await payload.find({
      collection: 'foods',
      where: { name: { equals: name } } as any,
      limit: 1,
    });

    let doc;
    if (existing.docs.length > 0) {
      doc = existing.docs[0];
    } else {
      doc = await payload.create({
        collection: 'foods',
        data: { name },
      });
    }

    // In SQLite, IDs are numeric; store them as numbers
    foodNameToId.set(name, doc.id as number);
  }

  // 3. Upsert recipes
  for (const recipe of toadstoolRecipes) {
    const existing = await payload.find({
      collection: 'recipes',
      where: { title: { equals: recipe.title } } as any,
      limit: 1,
    });

    const ingredients = recipe.ingredients.map((ing) => ({
      // We know these foods exist because we seeded them above
      food: foodNameToId.get(ing.foodName) as number,
      quantity: ing.quantity,
    }));

    const data: any = {
      title: recipe.title,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      instructions: recipe.instructions,
      ingredients,
    };

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'recipes',
        id: existing.docs[0].id,
        data,
      });
      console.log(`Updated recipe: ${recipe.title}`);
    } else {
      await payload.create({
        collection: 'recipes',
        data,
      });
      console.log(`Created recipe: ${recipe.title}`);
    }
  }

  console.log('✅ Toadstool seed complete.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});