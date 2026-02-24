'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  HomeIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import 'swiper/css'
import 'swiper/css/navigation'

/* ---------------- TYPES ---------------- */

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  link: string
  image: {
    url: string
  }
  date: string
}

interface YoutubeNews {
  id: string
  youtubeUrl: string
  cornerType: 'chairman' | 'ceo'
}

/* ---------------- COMPONENT ---------------- */

export default function NewsRoom() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  const [chairmanCorner, setChairmanCorner] = useState<YoutubeNews[]>([])
  const [ceoCorner, setCeoCorner] = useState<YoutubeNews[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const newsPerPage = 6

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch News
        const newsRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/news?sort=-publishedDate&limit=100`,
        )
        const newsData = await newsRes.json()

        // Fetch Chairman
        const chairmanRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/youtube-news?where[cornerType][equals]=chairman&sort=order`,
        )
        const chairmanData = await chairmanRes.json()

        // Fetch CEO
        const ceoRes = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/youtube-news?where[cornerType][equals]=ceo&sort=order`,
        )
        const ceoData = await ceoRes.json()

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

  const indexOfLastNews = currentPage * newsPerPage
  const indexOfFirstNews = indexOfLastNews - newsPerPage
  const currentNews = newsArticles.slice(indexOfFirstNews, indexOfLastNews)
  const totalPages = Math.ceil(newsArticles.length / newsPerPage)

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getYouTubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    const match = url.match(regExp)
    return match ? match[1] : null
  }

  /* FULL PAGE LOADER     */

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#eef3f8]">
        <Box>
          <CircularProgress size={70} thickness={4} sx={{ color: '#1E73BE' }} />
        </Box>
      </main>
    )
  }

  return (
    <main className="bg-[#E6F2FF] font-sans min-h-screen">
      {/* HEADER */}
      <section
        className="relative py-10 sm:py-14 md:py-20 text-center text-white"
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

      {/* CHAIRMAN CORNER */}
      <section className="py-18">
        <div className="w-full max-w-8xl mx-auto px-4 relative group">
          <SectionTitle title="Chairman's Corner" />

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              prevEl: '#chairman-prev',
              nextEl: '#chairman-next',
            }}
            loop={chairmanCorner.length > 3}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {chairmanCorner.map((item) => {
              const videoId = getYouTubeId(item.youtubeUrl)
              const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''

              return (
                <SwiperSlide key={item.id}>
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition block"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={thumbnail}
                        alt="Chairman Video"
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#2257A6] rounded-full p-4 shadow-lg text-white text-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          ▶
                        </div>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              )
            })}
          </Swiper>

          <button
            id="chairman-prev"
            className="absolute left-0 top-[60%] -translate-y-1/2 z-20 bg-white hover:bg-[#1E73BE] p-3 rounded-full shadow-xl text-[#1E73BE] hover:text-white transition-all ml-4 opacity-0 group-hover:opacity-100 disabled:opacity-30"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            id="chairman-next"
            className="absolute right-0 top-[60%] -translate-y-1/2 z-20 bg-white hover:bg-[#1E73BE] p-3 rounded-full shadow-xl text-[#1E73BE] hover:text-white transition-all mr-4 opacity-0 group-hover:opacity-100 disabled:opacity-30"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* CEO CORNER */}
      <section className="py-15">
        <div className="w-full max-w-8xl mx-auto px-4 relative group">
          <SectionTitle title="CEO's Corner" />

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              prevEl: '#ceo-prev',
              nextEl: '#ceo-next',
            }}
            loop={ceoCorner.length > 3}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {ceoCorner.map((item) => {
              const videoId = getYouTubeId(item.youtubeUrl)
              const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''

              return (
                <SwiperSlide key={item.id}>
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition block"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={thumbnail}
                        alt="CEO Video"
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-[#2257A6] rounded-full p-4 shadow-lg text-white text-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          ▶
                        </div>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              )
            })}
          </Swiper>

          <button
            id="ceo-prev"
            className="absolute left-0 top-[60%] -translate-y-1/2 z-20 bg-white hover:bg-[#1E73BE] p-3 rounded-full shadow-xl text-[#1E73BE] hover:text-white transition-all ml-4 opacity-0 group-hover:opacity-100 disabled:opacity-30"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            id="ceo-next"
            className="absolute right-0 top-[60%] -translate-y-1/2 z-20 bg-white hover:bg-[#1E73BE] p-3 rounded-full shadow-xl text-[#1E73BE] hover:text-white transition-all mr-4 opacity-0 group-hover:opacity-100 disabled:opacity-30"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* NEWS GRID */}
      <section className="w-full max-w-8xl mx-auto px-4 py-20">
        <SectionTitle title="Latest News & Updates" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentNews.map((article) => (
            <Link
              key={article.id}
              href={article.link}
              target="_blank"
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={article.image?.url}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <CalendarIcon className="w-4 h-4 text-[#3498db]" />
                  {new Date(article.date).toLocaleDateString()}
                </div>

                <h3 className="text-lg font-bold text-[#2c3e50] mb-4 group-hover:text-[#3498db] transition">
                  {article.title}
                </h3>

                <p className="text-[#5d6d7e] text-sm mb-6 line-clamp-3">{article.excerpt}</p>

                <div className="mt-auto inline-flex items-center gap-1 text-[#3498db] font-bold text-xs uppercase">
                  Read More
                  <ChevronRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
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
      </section>
    </main>
  )
}

/* ---------------- SECTION TITLE ---------------- */

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1E73BE]">{title}</h2>
      <div className="w-16 h-1 bg-[#3498db] mx-auto mt-4 rounded-full"></div>
    </div>
  )
}
