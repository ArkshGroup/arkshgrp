"use client";

import {
  HomeIcon,
  EyeIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ScaleIcon,
  WrenchIcon,
  HandRaisedIcon,
  HeartIcon,
  SparklesIcon,
  HandThumbUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import PageBanner from "./PageBanner";

export default function AboutSection() {
  return (
    <main className="bg-white font-sans">
      {/* 1. BLUE BANNER SECTION (Provided by you) */}
      <PageBanner
        title="About Us"
        padding="py-12 px-6"
        width="w-425 mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon /> },
          { name: "About Us" },
        ]}
      />

      {/* 2. WHO ARE WE SECTION (Provided by you) */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-start gap-6">
          <span className="bg-blue-50 text-[#3498db] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
            Our Story
          </span>
          <h2 className="text-5xl font-medium text-[#2c3e50] mb-4">
            Who Are We?
          </h2>
          <div className="space-y-6 text-[#5d6d7e] leading-relaxed text-lg text-justify">
            <p>
              The story of Arksh Group began in 1978 when Dr. Rajesh Kazi
              Shrestha, a vibrant entrepreneur, founded Rajesh Concern with a
              focus on trade and hospitality. Through importing various goods
              from around the world, Rajesh Concern played a vital role in
              promoting Nepal and strengthening trade relations with many
              countries. His dedication and success made him one of the most
              accomplished importers in Nepal, committed to serving their
              customers diligently.
            </p>
            <p>
              Arksh Group has now evolved into a versatile and dynamic business
              conglomerate. The Group has diversified its reach across various
              sectors and is engaged in a wide range of businesses including
              automobiles, food industry, hotels & restaurants, food &
              beverages, metal & minerals, tours & travels, carpet & flooring,
              clothing & shoes, health & wellness, beauty & cosmetics, IT and
              more.
            </p>
            <p>
              Today, Arksh Group stands as one of the most trusted business
              groups in Nepal. Its impressive growth is a result of deeply
              understanding local markets, people, and customs, allowing them to
              excel in every segment of their business.
            </p>
          </div>
        </div>
      </div>

      {/* 3. VISION & MISSION SECTION */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center mb-12">
            <span className="bg-blue-50 text-[#3498db] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              Our Purpose
            </span>
            <h2 className="text-5xl font-bold text-[#3498db]">
              Our Vision & Mission
            </h2>
            <div className="w-20 h-1 bg-[#3498db] mt-4"></div>
          </div>

          {/* Vision Card */}
          <div className="mb-16">
            <div className="bg-white inline-flex items-center gap-4 px-8 py-4 rounded-xl shadow-sm border border-gray-100 mb-6">
              <div className="bg-[#3498db] p-2.5 rounded-lg text-white">
                <EyeIcon className="w-7 h-7" />
              </div>
              <span className="text-3xl font-bold text-[#3498db]">
                Our Vision
              </span>
            </div>
            <div className="bg-white p-10 rounded-2xl border-t-4 border-[#3498db] shadow-md max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                To be recognized as an ethical business group committed to
                empowering and uplifting society through continuous and
                meaningful efforts.
              </p>
            </div>
          </div>

          {/* Mission Grid */}
          <div className="flex flex-col items-center">
            <div className="bg-white inline-flex items-center gap-4 px-8 py-4 rounded-xl shadow-sm border border-gray-100 mb-10">
              <div className="bg-[#3498db] p-2.5 rounded-lg text-white">
                <RocketLaunchIcon className="w-7 h-7" />
              </div>
              <span className="text-3xl font-bold text-[#3498db]">
                Our Mission
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Sustainable Growth",
                  desc: "To become sustainably-growing business group through carefully planned strategies.",
                },
                {
                  title: "Customer Value",
                  desc: "To create optimum value for our customers by understanding and exceeding their expectations.",
                },
                {
                  title: "Employer of Choice",
                  desc: "To become 'Employer of Choice' by providing growth opportunities and work-life balance.",
                },
                {
                  title: "Equal Opportunities",
                  desc: "To provide equal opportunities regardless of age, caste, gender, race, and religion.",
                },
                {
                  title: "Community Support",
                  desc: "To empower communities by providing support and opportunities that unite society.",
                },
                {
                  title: "Business Excellence",
                  desc: "To uphold the highest standards of integrity, quality, service, innovation, and excellence.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border-t-4 border-[#3498db] shadow-sm text-left hover:shadow-md transition-shadow"
                >
                  <h4 className="text-[#3498db] text-xl font-bold mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col items-center mb-16">
            <span className="bg-blue-50 text-[#3498db] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              Our Core Values
            </span>
            <h2 className="text-5xl font-bold text-[#3498db]">
              The Principles That Guide Us
            </h2>
            <div className="w-24 h-1 bg-[#3498db] mt-4 mb-4"></div>
            <p className="text-gray-500 font-medium italic">
              Our values shape who we are and how we work together
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                label: "Accountability",
                icon: <CheckCircleIcon />,
                desc: "Taking responsibility for our actions and decisions",
              },
              {
                label: "Determination",
                icon: <ArrowTrendingUpIcon />,
                desc: "Pursuing our goals with unwavering resolve",
              },
              {
                label: "Discipline",
                icon: <ClockIcon />,
                desc: "Maintaining high standards in all we do",
              },
              {
                label: "Equality",
                icon: <ScaleIcon />,
                desc: "Treating everyone with fairness and respect",
              },
              {
                label: "Hard-Work",
                icon: <WrenchIcon />,
                desc: "Putting in our best effort in everything we do",
              },
              {
                label: "Helpfulness",
                icon: <HandRaisedIcon />,
                desc: "Supporting others in their journey to success",
              },
              {
                label: "Honesty",
                icon: <HeartIcon />,
                desc: "Being truthful and transparent in all our dealings",
              },
              {
                label: "Kindness",
                icon: <SparklesIcon />,
                desc: "Showing compassion and care in our interactions",
              },
              {
                label: "Respect",
                icon: <HandThumbUpIcon />,
                desc: "Valuing and honoring the dignity of all",
              },
              {
                label: "Trust",
                icon: <ShieldCheckIcon />,
                desc: "Building reliable and lasting relationships",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center group"
              >
                <div className="bg-blue-50 text-[#3498db] p-4 rounded-full mb-6 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-10 h-10">{value.icon}</div>
                </div>
                <h4 className="text-2xl font-bold text-[#2c3e50] mb-3">
                  {value.label}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed px-2">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
