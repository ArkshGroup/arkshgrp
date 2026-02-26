'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { HomeIcon, CalendarDaysIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import PageBanner from '@/components/PageBanner'
import RichText from '@/components/RichText'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

interface BlogCategory {
  id?: string
  category: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: unknown
  content?: unknown
  author: string
  date: string
  category?: BlogCategory[] | null
  image?: { url?: string } | null
}

export type { BlogPost }

type BlogDetailsProps = {
  initialPost?: BlogPost | null
  initialRecentPosts?: BlogPost[] | null
}

export default function BlogDetails({
  initialPost = null,
  initialRecentPosts = null,
}: BlogDetailsProps) {
  const params = useParams()
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const [post, setPost] = useState<BlogPost | null>(initialPost)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>(initialRecentPosts ?? [])
  const [loading, setLoading] = useState(!initialPost)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  useEffect(() => {
    if (initialPost && initialPost.slug === slug) {
      setPost(initialPost)
      setRecentPosts(initialRecentPosts ?? [])
      setLoading(false)
      return
    }
    const fetchPost = async () => {
      try {
        const [res, recentRes] = await Promise.all([
          fetch(
            `${PAYLOAD_BASE_URL}/api/blogs?where[slug][equals]=${encodeURIComponent(slug)}&depth=1`,
          ),
          fetch(`${PAYLOAD_BASE_URL}/api/blogs?limit=7&depth=1&sort=-date`),
        ])
        const data = await res.json()
        if (!data.docs || data.docs.length === 0) {
          setPost(null)
          setLoading(false)
          return
        }
        setPost(data.docs[0])
        const recentData = await recentRes.json()
        setRecentPosts(recentData.docs || [])
      } catch (error) {
        console.error('Blog fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchPost()
  }, [slug, initialPost, initialRecentPosts])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#2257A6]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#2257A6] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="mb-4">Blog not found.</p>
          <Link href="/blog" className="text-[#2257A6] font-medium hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    )
  }

  const payloadUrl = PAYLOAD_BASE_URL
  const imageUrl = post.image?.url
  const hasContent =
    post.content && typeof post.content === 'object' && (post.content as { root?: unknown }).root
  const bodyContent = hasContent ? post.content : post.excerpt

  const recentFiltered = useMemo(
    () => recentPosts.filter((p) => p.slug !== post.slug).slice(0, 6),
    [recentPosts, post.slug],
  )

  const shareUrl = useMemo(() => encodeURIComponent(currentUrl), [currentUrl])
  const shareTitle = useMemo(() => encodeURIComponent(post.title), [post.title])
  const shareText = useMemo(
    () => encodeURIComponent(`${post.title} ${currentUrl}`),
    [post.title, currentUrl],
  )

  return (
    <main className="bg-white min-h-screen">
      <PageBanner
        title={post.title}
        padding="py-12 px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Our Blog', href: '/blog' },
          { name: post.title },
        ]}
      />

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-[67%]">
              {imageUrl ? (
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                  <Image
                    src={`${payloadUrl}${imageUrl}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full aspect-video rounded-3xl mb-8 bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 text-gray-500 font-medium mb-6">
                <span className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5 text-[#2257A6]" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                {post.author && (
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-[#2257A6]" />
                    {post.author}
                  </span>
                )}
                {Array.isArray(post.category) && post.category.length > 0 && (
                  <span className="flex items-center gap-2 flex-wrap">
                    <TagIcon className="w-5 h-5 text-[#2257A6] shrink-0" />
                    {post.category.map((c) => c.category).join(', ')}
                  </span>
                )}
              </div>

              <div className="prose prose-lg max-w-none text-gray-600 leading-[1.8]">
                <RichText
                  data={bodyContent as Parameters<typeof RichText>[0]['data']}
                  className="text-gray-700 prose-p:mb-4 prose-headings:text-gray-900"
                />
              </div>

              <div className="mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Share This Article</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1877F2] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <FaFacebookF /> Facebook
                  </a>
                  <a
                    href={`https://x.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1DA1F2] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <FaTwitter /> Twitter
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0077B5] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <FaLinkedinIn /> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <aside className="lg:w-[33%]">
              <div className="sticky top-24 bg-white rounded-4xl p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.05)]">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 relative pb-4">
                  Recent Posts
                  <span className="absolute bottom-0 left-0 w-14 h-0.5 bg-gray-200"></span>
                </h3>

                <div className="flex flex-col gap-8">
                  {recentFiltered.length === 0 ? (
                    <p className="text-gray-500 text-sm">No other posts yet.</p>
                  ) : (
                    recentFiltered.map((recentPost) => {
                      const rpImageUrl =
                        recentPost.image &&
                        typeof recentPost.image === 'object' &&
                        'url' in recentPost.image
                          ? (recentPost.image as { url?: string }).url
                          : undefined
                      return (
                        <Link
                          href={`/blog/${recentPost.slug}`}
                          key={recentPost.id}
                          className="group flex gap-4 items-center"
                        >
                          <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-gray-100">
                            {rpImageUrl ? (
                              <Image
                                src={`${payloadUrl}${rpImageUrl}`}
                                alt={recentPost.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs">
                                No img
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[15px] font-bold text-gray-900 leading-tight group-hover:text-[#2257A6] transition-colors line-clamp-2">
                              {recentPost.title}
                            </h4>
                            <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-2">
                              <CalendarDaysIcon className="w-4 h-4 text-[#2257A6] shrink-0" />
                              <span>{new Date(recentPost.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </Link>
                      )
                    })
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
