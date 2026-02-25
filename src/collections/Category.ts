import { CollectionConfig } from 'payload'



const Category: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'MEDIA',
    description: 'Categories for Gallery. Add categories here, then assign them to Gallery items.',
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
        req.user?.role === 'admin' || req.user?.role === 'editor'
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
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description:
          'URL-friendly version of the category name (e.g., "players", "championships", "trainings")',
      },
    },
  ],
}

export default Category
