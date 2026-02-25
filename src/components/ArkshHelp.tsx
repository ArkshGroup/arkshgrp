'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { HomeIcon, CalendarIcon } from '@heroicons/react/24/solid'
import PageBanner from '@/components/PageBanner'
import { blogPosts2 } from '@/constant/blogs'
import Link from 'next/link'

export default function ArkshHelps() {
  const [activeVideo, setActiveVideo] = useState<{
    url: string
    type: string
  } | null>(null)

  const videos = [
    {
      id: 1,
      type: 'youtube',
      url: 'https://www.youtube.com/embed/pf4TcOifDlI',
    },
    {
      id: 2,
      type: 'youtube',
      url: 'https://www.youtube.com/embed/x_6_acDjvB8',
    },
    {
      id: 3,
      type: 'instagram',
      url: 'https://www.instagram.com/p/DN7akceDzhC/embed/',
    },
  ]

  const getThumbnail = (url: string) => {
    const videoId = url.split('/').pop()?.split('?')[0]
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  return (
    <main className="bg-white min-h-screen font-sans pb-20">
      <PageBanner
        title="Arksh Helps"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Arksh Helps' },
        ]}
      />

      {/* Get More Insights Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2257A6] mt-4 relative inline-block">
            Get More Insights
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#49B2E7]"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts2.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-'))}`}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center text-[#49B2E7] text-sm mb-3">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>
                  <h3 className="text-lg font-bold text-[#2257A6] mb-3 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <button className="mt-auto w-fit px-6 py-2 bg-[#49B2E7] text-white rounded-full text-sm font-semibold hover:bg-[#2257A6] transition-colors shadow-md">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Delivering Happiness Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2257A6] relative inline-block">
            Delivering Happiness
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#49B2E7]"></span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative rounded-2xl overflow-hidden aspect-9/12 shadow-xl group border border-gray-100"
              >
                {video.type === 'instagram' ? (
                  /* IN-PAGE SCROLLABLE INSTAGRAM IFRAME */
                  <div className="w-full h-full overflow-y-auto bg-white">
                    <iframe
                      src={video.url}
                      className="w-full h-[150%] border-none" // Height set higher to allow internal scroll
                    ></iframe>
                  </div>
                ) : (
                  /* YOUTUBE THUMBNAIL (CLICKABLE) */
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setActiveVideo({ url: video.url, type: video.type })}
                  >
                    <Image
                      src={getThumbnail(video.url)}
                      alt="Happiness Video"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-10 border-t-transparent border-l-18 border-l-white border-b-10 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal (Only for YouTube) */}
      {activeVideo && activeVideo.type === 'youtube' && (
        <div
          className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-110 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>
            <iframe
              src={`${activeVideo.url}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Giving Back Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#2257A6] mb-12 flex flex-col items-center gap-2">
            <span>🤝 Giving Back to the Community</span>
            <div className="w-16 h-1 bg-[#49B2E7]"></div>
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Our mission goes beyond business, it’s about building a better tomorrow. A portion of
              the profits generated through our operations at NPWC is proudly donated to charitable
              foundations and social initiatives that uplift communities across Nepal. Through our
              ongoing programs, we invest in education and health projects that help empower the
              underprivileged across the nation. Every contribution we make directly supports
              positive change — creating opportunities where they are needed most.
            </p>
            <p>
              This commitment extends to our hospitality venture, Hotel Peace Land, located in the
              sacred heart of Lumbini. A significant portion of the profit generated from the hotel
              is channeled toward the promotion and growth of Lumbini, the birthplace of Lord
              Buddha. This financial support helps fund crucial initiatives for cultural
              preservation, environmental stewardship, and community upliftment within the Greater
              Lumbini Area, ensuring that the success of the hotel directly contributes to
              maintaining the spiritual and historical significance of this global peace hub.
            </p>{' '}
            <p>
              We believe that every act of kindness can spark a lasting impact. With your trust and
              support, we continue to champion community welfare, promote sustainable growth, and
              inspire hope across Nepal.
            </p>
            <p className="font-bold text-[#2257A6]">
              We believe that every act of kindness can spark a lasting impact.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
