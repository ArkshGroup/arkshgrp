import { CollectionConfig } from 'payload'

const Contact: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'id',
    group: 'BOOKINGS',
  },
  access: {
    read: () => true,
    create: () => true,

    update: ({ req }) => {
      return (
        req.user?.role === 'admin'  || req.user?.role === 'editor'
      )
    },

    // create: ({ req }) => {
    //   return (
    //     req.user?.role === 'admin' || req.user?.role === 'viewer' || req.user?.role === 'editor'
    //   )
    // },

    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
  
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
        name: 'email',
        type: 'email',
        required: true,
        label: 'Email',
      },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Read',
          value: 'read',
        },
      ],
      admin: {
        position: 'sidebar', // optional, shows in sidebar
      },
    },
  ],
}

export default Contact
