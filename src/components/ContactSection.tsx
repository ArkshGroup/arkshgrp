'use client'

import { useState, useCallback } from 'react'
import PageBanner from './PageBanner'
import {
  HomeIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  ClockIcon,
  PaperAirplaneIcon,
  UserIcon,
  TagIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline'
import { HomeIcon as HomeIconSolid } from '@heroicons/react/24/solid'
import toast, { Toaster } from 'react-hot-toast'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function ContactSection() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(`${PAYLOAD_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (!res.ok) throw new Error('Submission failed')

      setSuccess(true)
      toast.success('Message sent successfully!')
      setFormData(INITIAL_FORM)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [formData])

  return (
    <section>
      <Toaster position="top-center" reverseOrder={false} /> {/* ✅ ADDED */}
      <PageBanner
        title="Contact Us"
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          {
            name: 'Home',
            href: '/',
            icon: <HomeIconSolid className="w-5 h-5" />,
          },
          { name: 'Contact' },
        ]}
      />
      <div className="w-full bg-gray-50 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E73BE] mb-4 sm:mb-6">
              Get in <span className="border-b border-blue-500 px-2">Touch</span> with Us
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Whether you have a question about our services, need a quote, or want to discuss a
              project, our team is ready to respond to all your inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Contact Information Cards */}
            <div className="space-y-6 md:space-y-8">
              {/* Call Us Card */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 flex gap-4 md:gap-6 border border-transparent hover:border-blue-100">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-xl bg-[#1E73BE] transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <PhoneIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-[#1E73BE] text-sm md:text-base font-semibold">
                    +977-1-4002069
                  </p>
                  <p className="text-[#1E73BE] text-sm md:text-base font-semibold">
                    +977 980-2076449
                  </p>
                </div>
              </div>

              {/* Visit Us Card */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 flex gap-4 md:gap-6 border border-transparent hover:border-blue-100">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-xl bg-[#1E73BE] transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <MapPinIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    152 Rani Devi Marg Lazimpat, Kathmandu, Nepal.
                  </p>
                </div>
              </div>

              {/* Email Us Card */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 flex gap-4 md:gap-6 border border-transparent hover:border-blue-100">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-xl bg-[#1E73BE] transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <EnvelopeIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-[#1E73BE] text-sm md:text-base font-semibold break-all">
                    info@arkshgroup.com
                  </p>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 flex gap-4 md:gap-6 border border-transparent hover:border-blue-100">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-xl bg-[#1E73BE] transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <ClockIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    Business Hours
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Sunday - Friday: 09:30 AM - 5:30 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 border border-gray-100">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1E73BE] mb-12">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="relative">
                  <label className="absolute -top-3.5 left-4 bg-white px-2 flex items-center gap-2 text-[#1E73BE] font-medium z-10">
                    <UserIcon className="w-5 h-5" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent transition text-gray-900 bg-transparent"
                    required
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="relative">
                    <label className="absolute -top-3.5 left-4 bg-white px-2 flex items-center gap-2 text-[#1E73BE] font-medium z-10">
                      <EnvelopeIcon className="w-5 h-5" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent transition text-gray-900 bg-transparent"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label className="absolute -top-3.5 left-4 bg-white px-2 flex items-center gap-2 text-[#1E73BE] font-medium z-10">
                      <PhoneIcon className="w-5 h-5" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent transition text-gray-900 bg-transparent"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-3.5 left-4 bg-white px-2 flex items-center gap-2 text-[#1E73BE] font-medium z-10">
                    <TagIcon className="w-5 h-5" />
                    What's this about?
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent transition bg-transparent ${
                      formData.subject === '' ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="" disabled hidden>
                      Select a Subject
                    </option>
                    <option value="General Inquiry" className="text-gray-900">
                      General Inquiry
                    </option>
                    <option value="Customer Support" className="text-gray-900">
                      Customer Support
                    </option>
                    <option value="Sales Inquiry" className="text-gray-900">
                      Sales Inquiry
                    </option>
                  </select>
                </div>

                <div className="relative">
                  <label className="absolute -top-3.5 left-4 bg-white px-2 flex items-center gap-2 text-[#1E73BE] font-medium z-10">
                    <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent transition text-gray-900 bg-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group/btn w-full bg-[#1E73BE] hover:bg-[#165aa7] text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-xl shadow-lg shadow-blue-100 hover:shadow-blue-200 disabled:opacity-70"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <PaperAirplaneIcon className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 -rotate-12" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Map Section */}
      <div className="w-full h-125 grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.057797746535!2d85.3195244150622!3d27.715454982787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190000000000%3A0x0!2zMjfCsDQyJzU1LjYiTiA4NcKwMTknMTguMiJF!5e0!3m2!1sen!2snp!4v1625654321000!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  )
}
