"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import PageBanner from "./PageBanner";
import { galleryData } from "@/constant/gallery.data";

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const categories = [
    "All",
    "Events",
    "Automobiles",
    "Corporate",
    "Wellness",
    "Award Ceremony",
  ];

  const filteredItems =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  return (
    <main className="bg-white min-h-screen">
      {/* Header Banner */}
      <PageBanner
        title="Gallery"
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
          { name: "Gallery" },
        ]}
      />

      {/* Gallery Section */}
      <section className="py-10 sm:py-12 md:py-15 bg-white">
        <div className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                  filter === cat
                    ? "bg-[#3498db] text-white shadow-lg shadow-blue-200"
                    : "bg-gray-50 text-gray-500 hover:bg-blue-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative h-56 sm:h-72 md:h-80 lg:h-88 overflow-hidden rounded-lg sm:rounded-2xl md:rounded-[30px] bg-gray-100 shadow-md transition-all duration-500 hover:shadow-2xl"
              >
                {/* FIX: The Link now wraps BOTH the image and the overlay. 
                  This ensures the entire card is a clickable area.
                */}
                <Link
                  href={`/gallery/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, "-"))}`}
                  className="block w-full h-full relative"
                >
                  {/* Image */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay (Inside the Link) */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#2c3e50]/90 via-transparent to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6 md:p-10">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                      <div className="flex-1">
                        <p className="text-white bg-[#3498db] inline-block px-2 sm:px-2.5 py-0.5 sm:p-1 rounded text-xs font-bold uppercase tracking-[0.2em] mb-1.5 sm:mb-2 sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-500">
                          {item.category}
                        </p>
                        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          {item.title}
                        </h3>
                      </div>
                      <span className="inline-flex justify-center items-center bg-blue-400/80 text-blue-100 text-sm sm:text-base md:text-lg font-semibold px-4 py-1 sm:px-5 sm:py-3 rounded-full shadow-sm shrink-0">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* View More Footer */}
          <div className="mt-10 sm:mt-12 md:mt-16 text-center">
            <button className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 border-2 border-[#3498db] text-[#3498db] font-bold text-sm sm:text-base rounded-full hover:bg-[#3498db] hover:text-white transition-all duration-300">
              View Full Gallery
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
