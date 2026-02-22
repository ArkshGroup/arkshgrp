'use client'
import { companies } from '@/constant/companies'
import Image from 'next/image'

export default function OurCompanies() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl font-bold text-[#3498db] mb-2 tracking-tight">
          Our Companies
        </h2>
        <div className="w-20 h-1 bg-[#3498db] mx-auto mb-6"></div>
        <p className="text-md sm:text-lg font-bold text-blue-900 mb-16">
          Discover our associated companies.
        </p>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 justify-items-center items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="
                w-32 sm:w-40 md:w-48
                h-32 sm:h-40 md:h-48
                relative
                transition-transform duration-300
                hover:scale-105
                hover:shadow-[0_0_25px_rgba(52,152,219,0.35),0_0_45px_rgba(255,255,255,0.9)]
                rounded-xl
              "
            >
              <Image src={company.logo} alt={company.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
