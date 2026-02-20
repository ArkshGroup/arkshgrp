"use client";

import { images } from "@/constant/featured.images";

export default function FeaturedProductsSlider() {
  // Your 3 images

  return (
    <section className="py-16 bg-white w-full">
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

        {/* Images Full Width */}
        <div className="w-full flex flex-row gap-8">
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full h-125 overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={img}
                alt={`Featured ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
