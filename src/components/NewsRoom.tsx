"use client";

import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  CalendarIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import {
  ceoCorner,
  chairmanCorner,
  newsArticles,
} from "@/constant/news.room.data";

export default function NewsRoom() {
  return (
    <main className="bg-[#eef3f8] font-sans min-h-screen">
      {/* HEADER */}
      <section
        className="relative py-10 sm:py-14 md:py-20 text-center text-white"
        style={{
          backgroundImage: "url('https://arkshgroup.com/banner4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* SKY BLUE OVERLAY */}
        <div className="absolute inset-0 bg-blue-900/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-5 tracking-tight">
            News Room
          </h1>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold flex-wrap">
            <HomeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="opacity-60">/</span>
            <span className="opacity-90">News Room</span>
          </div>
        </div>
      </section>

      {/* CHAIRMAN CORNER */}
      <section className="py-10 sm:py-14 md:py-20">
        <div className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
          <SectionTitle title="Chairman's Corner" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {chairmanCorner.map((item) => (
              <a
                key={item.id}
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition block"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.thumbnail}
                    className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Chairman Video"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CEO CORNER */}
      <section className="pb-10 sm:pb-14 md:pb-20">
        <div className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
          <SectionTitle title="CEO's Corner" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {ceoCorner.map((item) => (
              <a
                key={item.id}
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition block"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.thumbnail}
                    className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
                    alt="CEO Video"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS GRID */}
      <section className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6 py-16 sm:py-20 md:py-24">
        <SectionTitle title="Latest News & Updates" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col bg-white rounded-lg sm:rounded-2xl md:rounded-[20px] overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-64 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {article.category && (
                  <span className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5 bg-[#3498db] text-white text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase px-3 sm:px-3.5 md:px-4 py-1 sm:py-1.5 rounded-full">
                    {article.category}
                  </span>
                )}
              </div>

              <div className="p-4 sm:p-5 md:p-8 flex flex-col grow">
                <div className="flex items-center gap-2 text-gray-400 text-[11px] sm:text-[12px] md:text-[13px] mb-2.5 sm:mb-3 md:mb-4">
                  <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3498db]" />
                  {article.date}
                </div>

                <h3 className="text-base sm:text-lg md:text-[18px] font-bold text-[#2c3e50] mb-2.5 sm:mb-3 md:mb-4 group-hover:text-[#3498db] transition line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-[#5d6d7e] text-sm sm:text-[14px] md:text-[15px] mb-5 sm:mb-6 md:mb-8 line-clamp-3">
                  {article.excerpt}
                </p>

                <Link
                  href={`/news/${article.id}`}
                  className="inline-flex items-center gap-1 text-[#3498db] font-bold text-[11px] sm:text-[11.5px] md:text-[12px] uppercase"
                >
                  Read More
                  <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center items-center gap-2 sm:gap-2.5 md:gap-3">
          <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-lg md:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base bg-[#4A90E2] text-white shadow-[0_10px_20px_rgba(52,152,219,0.3)] transition-transform hover:scale-105">
            1
          </button>
          <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-lg md:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#3498db] transition-all">
            2
          </button>
          <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-lg md:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all">
            3
          </button>
          <span className="text-gray-300 px-1 sm:px-1.5 md:px-2 font-bold text-sm sm:text-base">
            ...
          </span>
          <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-lg md:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all">
            10
          </button>
        </div>
      </section>
    </main>
  );
}

/* TITLE */

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-center mb-10 sm:mb-12 md:mb-14">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E73BE]">
        {title}
      </h2>
      <div className="w-12 sm:w-14 md:w-16 h-1 bg-[#3498db] mx-auto mt-3 sm:mt-3.5 md:mt-4 rounded-full"></div>
    </div>
  );
}
