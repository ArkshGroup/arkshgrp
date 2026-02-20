"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation"; // 1. Added notFound import
import { HomeIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import PageBanner from "@/components/PageBanner";
import { blogPosts } from "@/constant/blogs";

export default function BlogDetails() {
  const params = useParams();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  /**
   * MATCHING YOUR BLOGSECTION LOGIC:
   * Finds the post based on the title parameter in the URL.
   */
  const currentPost = blogPosts.find((post) => {
    const generatedSlug = encodeURIComponent(
      post.title.toLowerCase().replace(/\s+/g, "-"),
    );
    // Ensure this matches your folder name (e.g., if folder is [title], use params.title)
    return generatedSlug === params.title || generatedSlug === params.id;
  });

  // 2. FIXED LOGIC: Triggers the global not-found.tsx page
  if (!currentPost) {
    notFound();
    return null; // This line is technically unreachable but good for TS
  }

  return (
    <main className="bg-white min-h-screen ">
      <PageBanner
        title={currentPost.title}
        padding="py-12 px-6"
        width="w-425 mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
          { name: "Our Blog", href: "/blog" },
          { name: "Details" },
        ]}
      />

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-[67%]">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                <Image
                  src={currentPost.image}
                  alt={currentPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center gap-2 text-gray-500 font-medium mb-6">
                <CalendarDaysIcon className="w-5 h-5 text-[#2257A6]" />
                <span className="text-sm md:text-base">{currentPost.date}</span>
              </div>

              <div className="prose prose-lg max-w-none text-gray-600 leading-[1.8]">
                <div className="text-gray-700 whitespace-pre-line text-lg">
                  {currentPost.excerpt}
                </div>
              </div>

              {/* SOCIAL SHARING SECTION */}
              <div className="mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Share This Article
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1877F2] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <FaFacebookF /> Facebook
                  </a>
                  <a
                    href={`https://x.com/intent/tweet?url=${currentUrl}&text=${currentPost.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <FaTwitter /> X
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${currentPost.title} ${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0077B5] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  >
                    <FaLinkedinIn /> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:w-[33%]">
              <div className="sticky top-24 bg-white rounded-4xl p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.05)]">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 relative pb-4">
                  Recent Posts
                  <span className="absolute bottom-0 left-0 w-14 h-0.5 bg-gray-200"></span>
                </h3>
                <div className="flex flex-col gap-8">
                  {blogPosts.slice(0, 6).map((post) => (
                    <Link
                      href={`/blog/${encodeURIComponent(
                        post.title.toLowerCase().replace(/\s+/g, "-"),
                      )}`}
                      key={post.id}
                      className="group flex gap-4 items-center"
                    >
                      <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-gray-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[15px] font-bold text-gray-900 leading-tight group-hover:text-[#2257A6] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-2">
                          <CalendarDaysIcon className="w-4 h-4 text-[#2257A6]" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
