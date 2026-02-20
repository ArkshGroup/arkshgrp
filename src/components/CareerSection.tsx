"use client";

import React, { useEffect, useState } from "react";
import {
  MapPinIcon,
  BriefcaseIcon,
  UsersIcon,
  ChevronRightIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  CloudArrowUpIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { JOBS_DATA } from "@/constant/career.data";

// --- Mock Data ---

export default function CareerSection() {
  const [selectedJob, setSelectedJob] = useState<(typeof JOBS_DATA)[0] | null>(
    null,
  );
  const [employmentStatus, setEmploymentStatus] = useState("Unemployed");
  const [hasReferrer, setHasReferrer] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const finalSubmission = {
      ...data,
      employmentStatus,
      hasReferrer,
    };

    console.log("Form Submitted:", finalSubmission);
    alert("Application Submitted Successfully!");
  };

  const handleApplyNow = (title: string) => {
    setSelectedPosition(title);
    document
      .getElementById("application-form")
      ?.scrollIntoView({ behavior: "smooth" });
    setSelectedJob(null);
  };

  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedJob]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. Header/Banner */}
      <div
        className="relative h-60 flex items-center justify-center text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Join Our Team</h1>
          <nav className="flex justify-center items-center space-x-2 text-sm">
            <HomeIcon className="w-4 h-4" />
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span className="opacity-80">Careers</span>
          </nav>
        </div>
      </div>

      {/* 2. Job Listings */}
      <div className="max-[400px] mx-auto px-4 py-16 space-y-4">
        {JOBS_DATA.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-gray-800">
                  {job.title}
                </h3>
                <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  Active
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4 text-blue-600" />{" "}
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4 text-blue-600" /> {job.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <UsersIcon className="w-4 h-4 text-blue-600" />{" "}
                  {job.positions}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedJob(job)}
                className="px-5 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Details
              </button>
              <button
                onClick={() => handleApplyNow(job.title)}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Apply Now <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedJob.title}
                </h2>
                <p className="text-sm text-blue-600 font-medium">
                  {selectedJob.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto flex-1">
              <div className="flex flex-col md:flex-row">
                {/* Main Content Area */}
                <div className="flex-2 p-8 space-y-8">
                  {/* About Section (if exists in mock data) */}
                  {selectedJob.about && (
                    <section className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                        About Company
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {selectedJob.about.company}
                      </p>
                    </section>
                  )}

                  {/* Requirements Section */}
                  <section className="space-y-4">
                    <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <AcademicCapIcon className="w-5 h-5 text-blue-600" />
                      Requirements & Skills
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {selectedJob.requirements?.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Role Description (for Social Media Strategist type data) */}
                  {selectedJob.about?.role && (
                    <section className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-800">
                        Role Description
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {selectedJob.about.role}
                      </p>
                    </section>
                  )}
                </div>

                {/* Sidebar Info Area */}
                <div className="flex-1 bg-gray-50 p-8 border-l border-gray-100 space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Job Information
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <ClockIcon className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">
                            Employment Type
                          </p>
                          <p className="text-sm font-semibold text-gray-800">
                            {selectedJob.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <UsersIcon className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Openings</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {selectedJob.positions}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <PaperAirplaneIcon className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Posted On</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {selectedJob.posted}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <XMarkIcon className="w-5 h-5 text-red-500 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Deadline</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {selectedJob.deadline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button
                      onClick={() => handleApplyNow(selectedJob.title)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                    >
                      Apply for this Position
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Application Form */}
      <div id="application-form" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-2">
              Personal Information
            </h2>
            <p className="text-gray-400">Tell us about yourself</p>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {/* Full Name */}
              <div className="relative group">
                <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[14px] z-10">
                  Full Name
                </label>
                <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 transition-all">
                  <UserIcon className="w-5 h-5 text-gray-400 mr-4" />
                  <input
                    name="fullName"
                    type="text"
                    className="w-full outline-none text-gray-700 bg-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
              {/* Email */}
              <div className="relative group">
                <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[14px] z-10">
                  Email Address
                </label>
                <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 transition-all">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-4" />
                  <input
                    name="email"
                    type="email"
                    className="w-full outline-none text-gray-700 bg-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              {/* Location */}
              <div className="relative group">
                <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[14px] z-10">
                  Location
                </label>
                <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 transition-all">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mr-4" />
                  <input
                    name="location"
                    type="text"
                    className="w-full outline-none text-gray-700 bg-transparent"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
              {/* Phone */}
              <div className="relative group">
                <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[14px] z-10">
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 transition-all">
                  <PhoneIcon className="w-5 h-5 text-gray-400 mr-4" />
                  <input
                    name="phoneNumber"
                    type="tel"
                    className="w-full outline-none text-gray-700 bg-transparent"
                    placeholder="+977"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-center py-6">
              <h2 className="text-3xl font-semibold text-slate-800 mb-2">
                Professional Details
              </h2>
              <p className="text-gray-400">Tell us about your career</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="relative group">
                <label className="absolute -top-3.5 left-4 bg-white px-2 text-[14px] text-blue-600 flex items-center gap-2 z-10">
                  <BriefcaseIcon className="w-5 h-5" /> Position Applying For
                </label>
                <select
                  name="position"
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white appearance-none outline-none focus:border-blue-500 transition text-gray-700"
                  required
                >
                  <option value="">Select a Position</option>
                  {JOBS_DATA.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative group">
                <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[14px] z-10">
                  Expected Salary
                </label>
                <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 focus-within:border-blue-500">
                  <span className="text-gray-400 font-bold mr-2">$</span>
                  <input
                    name="expectedSalary"
                    type="number"
                    className="w-full outline-none text-gray-700"
                    required
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[14px] z-10">
                  Available Start Date
                </label>
                <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4">
                  <input
                    name="startDate"
                    type="date"
                    className="w-full outline-none text-gray-500"
                    required
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[14px] z-10">
                  Years of Experience
                </label>
                <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 focus-within:border-blue-500">
                  <ClockIcon className="w-5 h-5 text-gray-400 mr-4" />
                  <input
                    name="experience"
                    type="text"
                    className="w-full outline-none text-gray-700"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Employment Status */}
            <div>
              <p className="text-gray-600 font-bold mb-6 text-sm">
                Current Employment Status
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Employed", icon: BuildingOfficeIcon },
                  { label: "Unemployed", icon: UserIcon },
                  { label: "Self-employed", icon: BriefcaseIcon },
                  { label: "Student", icon: AcademicCapIcon },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setEmploymentStatus(item.label)}
                    className={`py-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${employmentStatus === item.label ? "border-blue-600 bg-blue-50 text-blue-600 shadow-lg" : "border-gray-100 bg-gray-50/50 text-gray-400"}`}
                  >
                    <item.icon className="w-8 h-8 stroke-[1.5px]" />
                    <span className="font-bold text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Upload */}
            <div className="pt-10 text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Documents & References
              </h2>
              <p className="text-gray-400 mb-8">
                Upload your documents and provide references
              </p>
              <div className="border-2 border-dashed border-gray-200 rounded-[40px] p-12 bg-gray-50/30 hover:bg-gray-50 transition cursor-pointer group relative">
                <input
                  type="file"
                  id="resume-upload"
                  name="resume"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CloudArrowUpIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Upload Your Resume
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Drag and drop your file here or click to browse
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Accepted formats: PDF, DOC, DOCX (max 5MB)
                  </p>
                </label>
              </div>
            </div>

            {/* Referrer Toggle & Fields */}
            <div className="space-y-6">
              <div
                className="flex items-center gap-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-100 cursor-pointer"
                onClick={() => setHasReferrer(!hasReferrer)}
              >
                <div
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${hasReferrer ? "bg-blue-600" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${hasReferrer ? "left-7" : "left-1"}`}
                  ></div>
                </div>
                <span className="text-gray-600 font-bold text-sm">
                  Do you have a referrer?
                </span>
              </div>

              {hasReferrer && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 p-8 bg-gray-50/30 rounded-[30px] border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="relative group">
                    <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[12px] z-10">
                      Referrer Name
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 bg-white focus-within:border-blue-500">
                      <UserIcon className="w-5 h-5 text-gray-400 mr-4" />
                      <input
                        name="referrerName"
                        type="text"
                        className="w-full outline-none text-gray-700 bg-transparent"
                        placeholder="Enter referrer name"
                        required={hasReferrer}
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="absolute -top-3 left-6 bg-white px-2 text-blue-600 text-[12px] z-10">
                      Referrer Email
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 bg-white focus-within:border-blue-500">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-4" />
                      <input
                        name="referrerEmail"
                        type="email"
                        className="w-full outline-none text-gray-700 bg-transparent"
                        placeholder="Enter referrer email"
                        required={hasReferrer}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="flex items-center gap-3 px-16 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl text-lg group"
              >
                <PaperAirplaneIcon className="w-6 h-6 -rotate-12 group-hover:translate-x-1 transition-transform" />
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
