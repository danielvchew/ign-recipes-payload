import type { CollectionConfig } from 'payload';

const Foods: CollectionConfig = {
  slug: 'foods',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

export default Foods;