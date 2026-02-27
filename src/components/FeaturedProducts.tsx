'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { images } from '@/constant/featured.images'

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false) // State to track mounting

  // 1. Set mounted to true once component hits the browser
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused || !mounted) return
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [currentIndex, isPaused, mounted])

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
    // 2. Safely check for window only after mounting
    const imagesToShow = mounted && window.innerWidth >= 768 ? 3 : 1

    for (let i = 0; i < imagesToShow; i++) {
      visible.push(images[(currentIndex + i) % images.length])
    }
    return visible
  }

  // 3. Return a consistent placeholder during SSR to prevent mismatch
  if (!mounted) {
    return <div className="py-16 bg-white min-h-150" />
  }

  return (
    <section
      className="py-16 bg-[#F5F5F7] w-full"
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full text-[#3498db] hover:bg-[#3498db] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block text-4xl"
          >
            ‹
          </button>

          {/* Images Grid */}
          <div
            className={`flex gap-2 sm:gap-5 md:gap-8 transition-all duration-700 ease-in-out ${
              isTransitioning
                ? 'opacity-40 scale-[0.98] blur-[2px]'
                : 'opacity-100 scale-100 blur-0'
            }`}
          >
            {getVisibleImages().map((img, idx) => (
              <div
                key={`${currentIndex}-${idx}`}
                className="relative w-full 
                 h-80 
                 sm:h-105
                 md:h-130
                 lg:h-150
                 overflow-hidden rounded shadow-xl"
              >
                <Image
                  src={img}
                  alt={`Featured ${currentIndex + idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 100vw,
               (max-width: 1024px) 50vw,
               33vw"
                  priority={currentIndex === 0}
                />
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full text-[#3498db] hover:bg-[#3498db] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block text-4xl"
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
                if (currentIndex === idx) return
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
