'use client'

import React from 'react'
import Image from 'next/image'

export default function AppLoader() {
  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#E6F2FF]"
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <Image
            src="/logo.jpg"
            alt="Arksh Group"
            width={200}
            height={70}
            priority
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-[#1E73BE]/20" />
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#1E73BE] animate-spin"
              style={{ animationDuration: '0.8s' }}
            />
          </div>
          <p className="text-sm font-semibold text-[#1E73BE] uppercase tracking-widest">
            Loading...
          </p>
        </div>
      </div>
    </div>
  )
}
