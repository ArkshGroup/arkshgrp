'use client'
import Link from 'next/link'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1e4ca1] text-white pt-16 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: About & Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">About us</h3>
          <p className="text-sm leading-relaxed mb-6 opacity-90">
            Arksh is an International Trading, Manufacturing, Hospitality & Services Group
            established in 1978 AD.
          </p>

          <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 inline-block">
            Contact Us
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-2 rounded-full mt-1">
                <MapPinIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">
                152 Rani Devi Marg Lazimpat,
                <br />
                Kathmandu, Nepal.
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full">
                <PhoneIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">+977-1-4002049 / +977 980-2074449 / +977 9802074449</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full">
                <EnvelopeIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">info@arkshgroup.com</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Arkshism', path: '/arkshism' },
              { name: 'News', path: '/news' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'Careers', path: '/career' },
              { name: 'Contact', path: '/contact' },
            ].map((link) => (
              <li key={link.name} className="flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></span>
                <Link
                  href={link.path}
                  className="text-[16px] hover:translate-x-1 transition-transform duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Follow Us (Facebook Embed Placeholder) */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 inline-block">
            Follow us
          </h3>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg aspect-4/5 relative">
            {/* Replace with actual Facebook Page Plugin iframe if needed */}
            <div className="bg-white rounded-lg p-1 overflow-hidden h-75">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FArksh.Group%2F&tabs=timeline&width=340&height=300&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="100%"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Column 4: Locate Us (Google Maps) */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 inline-block">
            Locate us
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg aspect-4/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.86595561561!2d85.3204!3d27.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzEyLjAiTiA4NcKwMTknMTMuNCJF!5e0!3m2!1sen!2snp!4v1645000000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="mt-16 border-t border-white/10 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs opacity-80 gap-4">
          <p>© Copyright {currentYear} ARKSH GROUP. All Rights Reserved</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
