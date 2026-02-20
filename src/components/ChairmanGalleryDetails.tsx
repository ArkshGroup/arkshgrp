"use client";

import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { galleryData } from "@/constant/gallery.data";
import PageBanner from "@/components/PageBanner";

// Lightbox Core
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Lightbox Plugins
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { chairmanGalleryData } from "@/constant/chairman.gallery.data";
import { useParams, notFound } from "next/navigation";

export default function ChairmanGalleryDetails() {
  const [index, setIndex] = useState(-1);
  const params = useParams();

  const slides = chairmanGalleryData.map((item) => ({
    src: item.image,
    alt: item.title,
    // Add download url if it's different, otherwise it uses src
    download: `${item.image}?download`,
  }));
  const currentPost = chairmanGalleryData.find((post) => {
    const generatedSlug = encodeURIComponent(
      post.title.toLowerCase().replace(/\s+/g, "-"),
    );
    // Ensure this matches your folder name (e.g., if folder is [title], use params.title)
    return generatedSlug === params.title || generatedSlug === params.id;
  });
  if (!currentPost) {
    notFound();
    return null; // This line is technically unreachable but good for TS
  }

  return (
    <main className="bg-white min-h-screen">
      <PageBanner
        title={currentPost.title}
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
          {
            name: "Gallery",
            href: "/gallery",
            icon: <HomeIcon className="w-4 h-4" />,
          },
          { name: currentPost.title },
        ]}
      />

      <section className="py-10 sm:py-12 md:py-15 bg-white">
        <div className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {chairmanGalleryData.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setIndex(i)}
                className="group relative h-56 sm:h-72 md:h-80 lg:h-88 overflow-hidden rounded sm:rounded md:rounded bg-gray-100 shadow-md transition-all duration-500 hover:shadow-2xl cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        // Add plugins here
        plugins={[Zoom, Download, Slideshow, Fullscreen, Thumbnails]}
        // Optional: Plugin configurations
        zoom={{ maxZoomPixelRatio: 3 }}
        slideshow={{ autoplay: false, delay: 3000 }}
      />
    </main>
  );
}
