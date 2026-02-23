import { CollectionConfig } from 'payload'

const Blog: CollectionConfig = {
  slug: 'blogs',

  admin: {
    useAsTitle: 'title',
    group: 'CONTENT',
  },

  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    // ✅ FIXED SLUG FIELD
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.title) {
              data.slug = data.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
            }
          },
        ],
      },
    },

    {
      name: 'excerpt',
      type: 'richText',
      required: true,
    },

    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'author',
      type: 'text',
      required: true,
    },

    {
      name: 'category',
      type: 'array',
      labels: {
        singular: 'Category',
        plural: 'Categories',
      },
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Blog
