"use client";
import { brands } from "@/constant/brands";
import Image from "next/image";

export default function OurBrands() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-5xl font-bold text-[#3498db] mb-2 tracking-tight">
          Our Brands
        </h2>
        <div className="w-20 h-1 bg-[#3498db] mx-auto mb-6"></div>
        <p className="text-lg font-bold text-blue-900 mb-16">
          Discover our latest brands and products.
        </p>

        {/* Logos Only — Same as Companies */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-80 justify-items-center items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className=" w-60 h-60 relative
                transition-all duration-300
                hover:scale-105
                hover:shadow-[0_0_25px_rgba(52,152,219,0.35),0_0_45px_rgba(255,255,255,0.9)]
                rounded-xl"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
