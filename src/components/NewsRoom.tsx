'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  HomeIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlayIcon,
} from '@heroicons/react/24/solid'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import Spinner from './Spinner'

import 'swiper/css'
import 'swiper/css/navigation'

const NEWS_PER_PAGE = 6
const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''
const SWIPER_MODULES = [Autoplay, Navigation]
const SWIPER_BREAKPOINTS = {
  0: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
} as const

function getYouTubeId(url: string): string | null {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  const match = url.match(regExp)
  return match ? match[1] : null
}

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  link: string
  image?: { url?: string } | null
  date: string
}

interface YoutubeNews {
  id: string
  youtubeUrl: string
  cornerType: 'chairman' | 'ceo'
}

export default function NewsRoom() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [chairmanCorner, setChairmanCorner] = useState<YoutubeNews[]>([])
  const [ceoCorner, setCeoCorner] = useState<YoutubeNews[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [newsRes, chairmanRes, ceoRes] = await Promise.all([
          fetch(`${PAYLOAD_BASE_URL}/api/news?sort=-date&limit=100&depth=1`),
          fetch(
            `${PAYLOAD_BASE_URL}/api/youtube-news?where[cornerType][equals]=chairman&sort=order`,
          ),
          fetch(`${PAYLOAD_BASE_URL}/api/youtube-news?where[cornerType][equals]=ceo&sort=order`),
        ])

        const [newsData, chairmanData, ceoData] = await Promise.all([
          newsRes.json(),
          chairmanRes.json(),
          ceoRes.json(),
        ])

        setNewsArticles(Array.isArray(newsData.docs) ? newsData.docs : [])
        setChairmanCorner(Array.isArray(chairmanData.docs) ? chairmanData.docs : [])
        setCeoCorner(Array.isArray(ceoData.docs) ? ceoData.docs : [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const indexOfLastNews = currentPage * NEWS_PER_PAGE
  const indexOfFirstNews = indexOfLastNews - NEWS_PER_PAGE
  const currentNews = useMemo(
    () => newsArticles.slice(indexOfFirstNews, indexOfLastNews),
    [newsArticles, indexOfFirstNews, indexOfLastNews],
  )

  const totalPages = useMemo(
    () => Math.ceil(newsArticles.length / NEWS_PER_PAGE),
    [newsArticles.length],
  )

  const paginate = useCallback(
    (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > totalPages) return
      setCurrentPage(pageNumber)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [totalPages],
  )

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  )

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#eef3f8]">
        <Spinner color="#1E73BE" />
      </main>
    )
  }

  return (
    <main className="bg-[#E6F2FF] font-sans min-h-screen">
      {/* HEADER */}
      <section
        className="relative py-10 sm:py-14 md:py-21 text-center text-white"
        style={{
          backgroundImage: "url('https://arkshgroup.com/banner4.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight">
            News Room
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold">
            <HomeIcon className="w-4 h-4" />
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="opacity-60">/</span>
            <span className="opacity-90">News Room</span>
          </div>
        </div>
      </section>

      {/* CHAIRMAN */}
      <section className="py-12 md:py-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          <SectionTitle title="Chairman's Corner" />

          <div className="relative px-10">
            <Swiper
              modules={SWIPER_MODULES}
              spaceBetween={20}
              slidesPerView={3}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{ prevEl: '#chairman-prev', nextEl: '#chairman-next' }}
              loop={chairmanCorner.length > 3}
              breakpoints={SWIPER_BREAKPOINTS}
            >
              {chairmanCorner.map((item, index) => {
                const videoId = getYouTubeId(item.youtubeUrl)
                const thumbnailUrl = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : null

                return (
                  <SwiperSlide key={item.id}>
                    <a
                      href={item.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative w-full min-h-80 aspect-4/3 overflow-hidden bg-gray-900 sm:min-h-96 md:min-h-50">
                        {thumbnailUrl && (
                          <Image
                            src={thumbnailUrl}
                            alt="Chairman's Corner Video"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={index === 0}
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1D8AD2] text-white shadow-xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                            <PlayIcon className="h-7 w-7 ml-0.5" />
                          </span>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            <button
              id="chairman-prev"
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-[#1E73BE] p-3 rounded-full shadow-xl text-[#1E73BE] hover:text-white transition-all duration-300"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              id="chairman-next"
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-[#1E73BE] p-3 rounded-full shadow-xl text-[#1E73BE] hover:text-white transition-all duration-300"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* CEO */}
      <section className="py-12 md:py-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          <SectionTitle title="CEO's Corner" />

          <div className="relative px-10">
            <Swiper
              modules={SWIPER_MODULES}
              spaceBetween={20}
              slidesPerView={3}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{ prevEl: '#ceo-prev', nextEl: '#ceo-next' }}
              loop={ceoCorner.length > 3}
              breakpoints={SWIPER_BREAKPOINTS}
            >
              {ceoCorner.map((item, index) => {
                const videoId = getYouTubeId(item.youtubeUrl)
                const thumbnailUrl = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : null

                return (
                  <SwiperSlide key={item.id}>
                    <a
                      href={item.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative w-full min-h-80 aspect-4/3 overflow-hidden bg-gray-900 sm:min-h-96 md:min-h-50">
                        {thumbnailUrl && (
                          <Image
                            src={thumbnailUrl}
                            alt="CEO's Corner Video"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={index === 0}
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1D8AD2] text-white shadow-xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                            <PlayIcon className="h-5 w-5 ml-0.5" />
                          </span>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            <button
              id="ceo-prev"
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-[#1E73BE] p-3 rounded-full shadow-xl text-[#1E73BE] hover:text-white transition-all duration-300"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              id="ceo-next"
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-[#1E73BE] p-3 rounded-full shadow-xl text-[#1E73BE] hover:text-white transition-all duration-300"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* NEWS GRID (UNCHANGED) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20">
        <SectionTitle title="Latest News & Updates" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentNews.map((article) => {
            const imageUrl =
              article.image && typeof article.image === 'object' && article.image?.url
                ? `${PAYLOAD_BASE_URL}${article.image.url}`
                : null
            return (
              <Link
                key={article.id}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full min-h-64 aspect-4/3 sm:min-h-72 overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <CalendarIcon className="w-4 h-4 text-[#3498db] shrink-0" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>

                  <h3 className="text-lg font-bold text-[#2c3e50] mb-3 group-hover:text-[#3498db] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-[#5d6d7e] text-sm mb-5 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-[#3498db] font-bold text-xs uppercase">
                    Read More
                    <ChevronRightIcon className="w-4 h-4" />
                  </span>
                </div>
              </Link>
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

            {pageNumbers.map((number) => (
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
      </section>
    </main>
  )
}

const SectionTitle = React.memo(function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1E73BE]">{title}</h2>
      <div className="w-16 h-1 bg-[#3498db] mx-auto mt-4 rounded-full"></div>
    </div>
  )
})
