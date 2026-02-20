import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    read: () => true,
    create: ({ req }) => {
      return (
        req.user?.role === 'admin'  || req.user?.role === 'editor'
      )
    },
    update: ({ req }) => {
      return (
        req.user?.role === 'admin'  || req.user?.role === 'editor'
      )
    },
    delete: ({ req }) => {
      return (
        req.user?.role === 'admin' 
      )
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: true,
  admin: {
    useAsTitle: 'alt',
    group: 'MEDIA',
  },
}
