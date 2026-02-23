'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { HomeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import PageBanner from '@/components/PageBanner'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: any
  author: string
  date: string
  image?: {
    url?: string
  } | null
}

export default function BlogDetails() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?where[slug][equals]=${params?.slug}&depth=1`,
        )

        const data = await res.json()

        if (!data.docs || data.docs.length === 0) {
          setPost(null)
          setLoading(false)
          return
        }

        setPost(data.docs[0])

        const recentRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?limit=6&depth=1`,
        )
        const recentData = await recentRes.json()
        setRecentPosts(recentData.docs || [])
      } catch (error) {
        console.error('Blog fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.slug) fetchPost()
  }, [params?.slug])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found.
      </div>
    )
  }

  const extractText = () => {
    if (!post.excerpt) return ''
    return (
      post.excerpt?.root?.children
        ?.map((node: any) => node.children?.map((child: any) => child.text).join(''))
        .join(' ') || ''
    )
  }

  return (
    <main className="bg-white min-h-screen">
      <PageBanner
        title={post.title}
        padding="py-12 px-6"
        width="w-425 mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Our Blog', href: '/blog' },
          { name: 'Details' },
        ]}
      />

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-[67%]">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                <Image
                  src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${post.image?.url}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center gap-2 text-gray-500 font-medium mb-6">
                <CalendarDaysIcon className="w-5 h-5 text-[#2257A6]" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>

              <div className="text-gray-700 whitespace-pre-line text-lg">{extractText()}</div>
            </div>

            <aside className="lg:w-[33%]">
              <div className="sticky top-24 bg-white rounded-4xl p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.05)]">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Posts</h3>

                <div className="flex flex-col gap-8">
                  {recentPosts.map((post) => (
                    <Link
                      href={`/blog/${post.slug}`}
                      key={post.id}
                      className="group flex gap-4 items-center"
                    >
                      <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-gray-100">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${post.image?.url}`}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="text-[15px] font-bold text-gray-900 leading-tight group-hover:text-[#2257A6] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-2">
                          <CalendarDaysIcon className="w-4 h-4 text-[#2257A6]" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
