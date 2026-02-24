// payload/collections/Gallery.ts
import { CollectionConfig } from 'payload'

export const GalleryAlbum: CollectionConfig = {
  slug: 'gallery-album',
  admin: {
    useAsTitle: 'image',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
