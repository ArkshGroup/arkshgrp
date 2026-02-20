import { CollectionConfig } from 'payload'

const Gallery: CollectionConfig = {
  slug: 'photos',
  admin: {
    useAsTitle: 'id',
    group: 'MEDIA',
  },
  access: {
    read: () => true,

    update: ({ req }) => {
      return (
        req.user?.role === 'admin'  || req.user?.role === 'editor'
      )
    },

    create: ({ req }) => {
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Gallery Image',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Category',
      admin: {
        description: 'Select or create a new category',
      },
    },
    {
      name: 'drive_link',
      type: 'text',
      required: false,
      label: 'Drive Link',
    },
  ],
}

export default Gallery
