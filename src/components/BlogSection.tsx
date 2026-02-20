"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  UserIcon,
  TagIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import PageBanner from "./PageBanner";
import { blogPosts } from "@/constant/blogs";

export default function BlogSection() {
  return (
    <main className="bg-[#E4F0FD] font-sans min-h-screen">
      <PageBanner
        title="Blogs"
        padding="py-12 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
          { name: "Our Blogs" },
        ]}
      />

      <section className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-9 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="relative h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {post.category && (
                  <div className="absolute bottom-4 left-5 bg-white/90 backdrop-blur-sm text-[#3498db] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-lg z-20">
                    {post.category}
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 md:p-8 flex flex-col grow">
                <div className="flex items-center gap-4 text-gray-400 text-[12px] mb-4 font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5 text-[#3498db]" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TagIcon className="w-3.5 h-3.5 text-[#3498db]" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-[#2c3e50] mb-4 leading-snug group-hover:text-[#3498db] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* SHOW ONLY 30 CHARACTERS */}
                <p className="text-[#5d6d7e] text-sm md:text-[15px] leading-relaxed mb-8">
                  {post.excerpt.length > 30
                    ? `${post.excerpt.substring(0, 30)}...`
                    : post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50">
                  <Link
                    href={`/blog/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="inline-flex items-center gap-1.5 text-[#3498db] font-extrabold text-[12px] uppercase tracking-widest group/btn"
                  >
                    Continue Reading
                    <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
