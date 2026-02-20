"use client";

import { businessVerticals } from "@/constant/business.verticals";

export default function MajorInvolvements() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#3498db] mb-2 uppercase tracking-tight">
            Major Involvements
          </h2>
          <div className="w-16 h-1 bg-[#3498db] mx-auto mb-6"></div>
          <p className="text-xl font-semibold text-blue-900">
            Our Business Verticals
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessVerticals.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative group overflow-hidden rounded-4xl shadow-lg h-64 transition-all duration-300 bg-white hover:bg-blue-50 hover:shadow-lg"
              >
                <div className="relative z-10 p-8 flex flex-col items-start justify-center h-full">
                  {/* Icon in white circle */}
                  <div className="bg-white p-3 rounded-full shadow-md mb-4 w-12 h-12 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-800 font-medium leading-relaxed max-w-[90%]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
