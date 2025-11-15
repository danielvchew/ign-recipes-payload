import type { CollectionConfig } from 'payload';

const Recipes: CollectionConfig = {
  slug: 'recipes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      label: 'Recipe Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'instructions',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ingredients',
      type: 'array',
      fields: [
        {
          name: 'food',
          type: 'relationship',
          relationTo: 'foods',
          required: true,
        },
        {
          name: 'quantity',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

export default Recipes;