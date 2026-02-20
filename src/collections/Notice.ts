import { CollectionConfig } from 'payload'

const Notice: CollectionConfig = {
  slug: 'notice',
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
      return req.user?.role === 'admin'
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Notice Title',
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Notice Image',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      label: 'Active Status',
    },
  ],
}

export default Notice
