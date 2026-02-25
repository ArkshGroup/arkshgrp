// payload/collections/Gallery.ts
import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
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
      name: 'category',
      type: 'select',
      options: ['Events', 'Automobiles', 'Corporate', 'Wellness', 'Award Ceremony'],
      required: true,
    },
    {
      name: 'year',
      type: 'text',
    },

    // ✅ Multiple Images Field
    {
      name: 'images',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
