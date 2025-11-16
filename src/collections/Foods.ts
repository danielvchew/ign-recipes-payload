import type { CollectionConfig } from 'payload';

const Foods: CollectionConfig = {
  slug: 'foods',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'image',
      label: 'Food Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imageUrl',
      label: 'Food Image URL',
      type: 'text',
      required: false,
    },
  ],
};

export default Foods;