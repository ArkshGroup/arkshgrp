// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Contact from './collections/Contact'
import Blog from './collections/Blog'
import Notice from './collections/Notice'
import Gallery from './collections/Gallery'
import Category from './collections/Category'
import Career from './collections/Career'
import Applications from './collections/Applications'
import Bookings from './collections/Bookings'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Hotel Peaceeland Admin',
      description:
        'Hotel Peaceeland is a hotel in Nepal, dedicated to providing a comfortable and welcoming experience for guests.',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/loader1.png',
        },
      ],
    },

    components: {
      Nav: '../src/components/Nav.tsx',
      graphics: {
        Logo: '../src/components/LoginLogo.tsx',
      },
      header: ['../src/components/Header.tsx'],
    },
  },
  cors: [ 'https://hotelpeaceland.com', 'https://www.hotelpeaceland.com'],
  collections: [

    Contact,
    Bookings,
    Gallery,
    Category,
    Media,
    Notice,
    Blog,
    Career,
    Applications,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})
