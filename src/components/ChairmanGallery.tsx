"use client";

import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { HomeIcon } from "@heroicons/react/24/solid";
import { chairmanGalleryData } from "@/constant/chairman.gallery.data";

export default function ChairmanGallery() {
  return (
    <main className="bg-white min-h-screen pb-20 font-sans">
      <PageBanner
        title="Chairman / Managing Director Gallery"
        padding="py-16 px-6"
        textAlign="center"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
          {
            name: "About",
            href: "/about",
            icon: <HomeIcon className="w-4 h-4" />,
          },
          { name: "MD Gallery" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chairmanGalleryData.map((item) => (
            <Link
              href={`/md-gallery/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, "-"))}`}
              key={item.id}
              className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Card Title Footer */}
              <div className="p-5 border-t border-gray-50 bg-white">
                <h3 className="text-[#1a1a1a] text-lg font-bold group-hover:text-[#2257A6] transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
