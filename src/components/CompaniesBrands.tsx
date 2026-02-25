"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";
import PageBanner from "@/components/PageBanner";
import c1 from "@/assets/company/company1.png";
import c2 from "@/assets/company/company2.png";
import c3 from "@/assets/company/company3.png";
import c4 from "@/assets/company/company4.png";
import c5 from "@/assets/company/company5.png";
import c6 from "@/assets/company/company7.png";

import b1 from "@/assets/brands/b1.png";
import b2 from "@/assets/brands/b2.png";
import b3 from "@/assets/brands/b3.png";
import b4 from "@/assets/brands/b4.png";
import b5 from "@/assets/brands/b5.png";

const COMPANIES = [
  { id: 1, name: "NIB", logo: c1 },
  { id: 2, name: "Arksh Digital", logo: c2 },
  { id: 3, name: "Rajesh Concern", logo: c3 },
  { id: 4, name: "Himalayan Organic Agro", logo: c4 },
  { id: 5, name: "Hotel Peaceland", logo: c5 },
  { id: 6, name: "Book My Ticket", logo: c6 },
];

const BRANDS = [
  { id: 1, name: "HIGER", logo: b1 },
  { id: 2, name: "Golden Dragon", logo: b2 },
  { id: 3, name: "JUBAO", logo: b3 },
  { id: 4, name: "Tafeli", logo: b4 },
  { id: 5, name: "Didian", logo: b5 },
];

export default function CompaniesBrands() {
  const [activeTab, setActiveTab] = useState<"companies" | "brands">(
    "companies",
  );

  const displayData = useMemo(
    () => (activeTab === "companies" ? COMPANIES : BRANDS),
    [activeTab],
  );

  return (
    <main className="bg-white min-h-screen pb-20 font-sans">
      {/* Page Banner with Breadcrumbs */}
      <PageBanner
        title="Companies & Brands"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
          { name: "Companies & Brands" },
        ]}
      />

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Toggle Buttons */}
          <div className="flex justify-center items-center gap-4 mb-16">
            <button
              onClick={() => setActiveTab("companies")}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 min-w-55 shadow-md ${
                activeTab === "companies"
                  ? "bg-[#2257A6] text-white"
                  : "bg-[#49B2E7] text-white hover:bg-[#2257A6]"
              }`}
            >
              Associated Companies
            </button>
            <button
              onClick={() => setActiveTab("brands")}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 min-w-55 shadow-md ${
                activeTab === "brands"
                  ? "bg-[#2257A6] text-white"
                  : "bg-[#49B2E7] text-white hover:bg-[#2257A6]"
              }`}
            >
              Associated Brands
            </button>
          </div>

          {/* Grid Layout for Logos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayData.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-center justify-center p-8 bg-white border border-gray-100 rounded-xl shadow-blue-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative w-full aspect-square max-w-45">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
