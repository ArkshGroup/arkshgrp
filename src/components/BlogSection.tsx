'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  HomeIcon,
  UserIcon,
  TagIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid'
import PageBanner from './PageBanner'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

interface BlogCategory {
  id: string
  category: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: any
  author: string
  date: string
  category?: BlogCategory[]
  image?: {
    url?: string
  } | null
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?depth=1&limit=100`,
        )
        const data = await res.json()
        setPosts(Array.isArray(data.docs) ? data.docs : [])
      } catch (error) {
        console.error('Blog fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ===================== */
  /* FULL PAGE LOADER     */
  /* ===================== */

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#E4F0FD]">
        <Box>
          <CircularProgress size={70} thickness={4} sx={{ color: '#3498db' }} />
        </Box>
      </main>
    )
  }

  /* ===================== */
  /* ORIGINAL PAGE BELOW   */
  /* ===================== */

  return (
    <main className="bg-[#E4F0FD] font-sans min-h-screen pb-20">
      <PageBanner
        title="Blogs"
        padding="py-12 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Our Blogs' },
        ]}
      />

      <section className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-9 md:py-10">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No blog posts found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
              {currentPosts.map((post) => {
                if (!post.image?.url) return null

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
                  >
                    <div className="relative h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${post.image.url}`}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {post.category && post.category.length > 0 && (
                        <div className="absolute bottom-4 left-5 bg-white/90 backdrop-blur-sm text-[#3498db] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-lg z-20">
                          {post.category.map((cat) => cat.category).join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="p-5 sm:p-6 md:p-8 flex flex-col grow">
                      <div className="flex items-center gap-4 text-gray-400 text-[12px] mb-4 font-medium uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <UserIcon className="w-3.5 h-3.5 text-[#3498db]" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TagIcon className="w-3.5 h-3.5 text-[#3498db]" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-[#2c3e50] mb-4 leading-snug group-hover:text-[#3498db] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-[#5d6d7e] text-sm md:text-[15px] leading-relaxed mb-8 line-clamp-3">
                        {(() => {
                          if (!post.excerpt) return ''
                          const text =
                            post.excerpt?.root?.children
                              ?.map((node: any) =>
                                node.children?.map((child: any) => child.text).join(''),
                              )
                              .join(' ') || ''
                          return text
                        })()}
                      </p>

                      <div className="mt-auto pt-6 border-t border-gray-50">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-[#3498db] font-extrabold text-[12px] uppercase tracking-widest group/btn"
                        >
                          Continue Reading
                          <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-[#3498db] hover:border-[#3498db] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm border ${
                      currentPage === number
                        ? 'bg-[#1E4CA1] text-white border-[#3498db] scale-110'
                        : 'bg-white text-[#2c3e50] border-gray-100 hover:border-[#3498db] hover:text-[#3498db]'
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-[#3498db] hover:border-[#3498db] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}
