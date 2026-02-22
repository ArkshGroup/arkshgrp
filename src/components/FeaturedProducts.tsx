'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { images } from '@/constant/featured.images'

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [currentIndex, isPaused])

  const handleNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setIsTransitioning(false)
    }, 400)
  }

  const handlePrev = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      setIsTransitioning(false)
    }, 400)
  }

  const getVisibleImages = () => {
    const visible = []
    // Determine number of images based on screen size
    const imagesToShow = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1
    for (let i = 0; i < imagesToShow; i++) {
      visible.push(images[(currentIndex + i) % images.length])
    }
    return visible
  }

  return (
    <section
      className="py-16 bg-white w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#3498db] mb-2 tracking-tight">
            Our Featured Products & Services
          </h2>
          <div className="w-20 h-1 bg-[#3498db] mx-auto mb-6"></div>
          <p className="text-lg font-bold text-blue-900">
            Discover our latest products and services.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-4 md:px-12">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-lg rounded-full text-[#3498db] hover:bg-[#3498db] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block"
          >
            ‹
          </button>

          {/* Images Grid */}
          <div
            className={`flex gap-4 sm:gap-6 md:gap-8 transition-all duration-700 ease-in-out ${
              isTransitioning
                ? 'opacity-40 scale-[0.98] blur-[2px]'
                : 'opacity-100 scale-100 blur-0'
            }`}
          >
            {getVisibleImages().map((img, idx) => (
              <div
                key={idx}
                className="relative w-full h-75 sm:h-100 md:h-112.5 overflow-hidden rounded-xl shadow-lg"
              >
                <Image
                  src={img}
                  alt={`Featured ${currentIndex + idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="100vw"
                  priority={currentIndex + idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-lg rounded-full text-[#3498db] hover:bg-[#3498db] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block"
          >
            ›
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentIndex(idx)
                  setIsTransitioning(false)
                }, 300)
              }}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentIndex === idx ? 'w-10 bg-[#3498db]' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
