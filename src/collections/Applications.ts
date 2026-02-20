import { CollectionConfig } from 'payload'

const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'name',
    group: 'CAREER',
  },
  access: {
    read: ({ req }) => {
      return (
        req.user?.role === 'admin' || req.user?.role === 'viewer' || req.user?.role === 'editor'
      )
    },
    create: () => true, // Allow public submissions
    update: ({ req }) => {
      return (
        req.user?.role === 'admin' || req.user?.role === 'editor'
      )
    },
    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      label: 'Phone Number',
    },
    {
      name: 'position',
      type: 'text',
      required: false,
      label: 'Position Applied For',
      admin: {
        description: 'The job title or position they are applying for',
      },
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'CV/Resume',
      admin: {
        description: 'Uploaded CV or resume file',
      },
    },
  ],
}

export default Applications
