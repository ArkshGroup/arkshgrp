'use client'
import { brands } from '@/constant/brands'
import Image from 'next/image'

export default function OurBrands() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl font-bold text-[#3498db] mb-2 tracking-tight">
          Our Brands
        </h2>
        <div className="w-20 h-1 bg-[#3498db] mx-auto mb-6"></div>
        <p className="text-md sm:text-lg font-bold text-blue-900 mb-16">
          Discover our latest brands and products.
        </p>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 justify-items-center items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="
                w-32 sm:w-36 md:w-40 lg:w-48
                h-32 sm:h-36 md:h-40 lg:h-48
                relative
                transition-transform duration-300
                hover:scale-105
                hover:shadow-[0_0_25px_rgba(52,152,219,0.35),0_0_45px_rgba(255,255,255,0.9)]
                rounded-xl
              "
            >
              <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
