import { CollectionConfig } from 'payload'

const Blog: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    group: 'CONTENT',
  },
  access: {
    read: () => true,

    update: ({ req }) => {
      return (
        req.user?.role === 'admin' || req.user?.role === 'editor'
      )
    },

    create: ({ req }) => {
      return (
        req.user?.role === 'admin'  || req.user?.role === 'editor'
      )
    },

    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },

    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Blog Media (Image)',
    },
    {
      name: 'author',
      type: 'text',

      required: true,
      label: 'Author',
    },
    {
      name: 'tags',
      type: 'array', // array of strings
      label: 'Tags',
      labels: {
        singular: 'Tag',
        plural: 'Tags',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Blog
