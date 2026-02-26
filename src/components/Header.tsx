'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  EnvelopeIcon,
  PhoneIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid'
import logo from '@/assets/logo/logo.jpg'
import { involvements } from '@/constant/involvements.header'
import { menuItems, socialLinks } from '@/constant/header.data'
import type { IconType } from 'react-icons'

interface UnifiedDropdownItem {
  name: string
  href?: string
  subBrands?: { name: string; href: string }[]
  nestedItems?: { name: string; href: string }[]
}

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeNestedMenu, setActiveNestedMenu] = useState<string | null>(null)
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up')
  const [lastScroll, setLastScroll] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScroll && currentScroll > 50) {
        setScrollDir('down')
      } else if (currentScroll < lastScroll) {
        setScrollDir('up')
      }

      setIsScrolled(currentScroll > 10)
      setLastScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleMobileItem = (label: string) => {
    setMobileExpandedItem(mobileExpandedItem === label ? null : label)
  }

  return (
    <header
      className={`w-full font-sans sticky top-0 z-50 bg-white transition-transform duration-500 ${
        scrollDir === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* ================= TOP BAR (Desktop Only) ================= */}
      <div className="hidden lg:flex bg-[#2257A6] text-white py-3.5 px-4 md:px-12 flex-col md:flex-row justify-around items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-[13px] font-medium">
          <a href="mailto:info@arkshgroup.com" className="flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4 text-white" />
            <span>info@arkshgroup.com</span>
          </a>
          <a href="tel:+9779802074449" className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-white" />
            <span>+977 980-2074449 / +977-1-4002049</span>
          </a>
        </div>

        <div className="flex gap-3">
          {socialLinks.map((social, i) => {
            const Icon: IconType = social.icon
            return (
              <div key={i}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white hover:text-[#209AEA] p-1 rounded-full text-[18px] transition-all duration-300 flex items-center justify-center w-8 h-8"
                >
                  <Icon className="w-5 h-4" />
                </a>
              </div>
            )
          })}
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <nav
        className={`max-w-8xl mx-auto px-6 md:px-12 py-3 flex justify-between items-center transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-md'
            : 'bg-white'
        }`}
      >
        <Link href="/" className="relative h-18 w-18 md:h-20 md:w-20 block">
          <Image src={logo} alt="Arksh Group Logo" fill className="object-contain" priority />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-7">
          {menuItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : item.href !== '#' && pathname.startsWith(item.href)

            const dropdownItems = (
              item.label === 'Involvements' ? involvements : item.subMenu
            ) as UnifiedDropdownItem[]

            const hasDropdown = item.isDropdown || (item.subMenu && item.subMenu.length > 0)

            return (
              <div
                key={item.label}
                className="relative group py-4"
                onMouseLeave={() => setActiveNestedMenu(null)}
              >
                {hasDropdown ? (
                  <>
                    <button
                      className={`font-semibold text-[16px] flex items-center gap-1 ${
                        isActive ? 'text-[#209AEA]' : 'text-[#005ABA] hover:text-[#209AEA]'
                      }`}
                    >
                      {item.label}
                      <ChevronDownIcon className="w-3 h-3 ml-0.5 opacity-70" />
                    </button>

                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <ul className="w-72 bg-white border border-gray-100 shadow-xl py-2 rounded-lg">
                        {dropdownItems?.map((sub) => (
                          <li key={sub.name} className="px-5 py-2.5 hover:bg-gray-50">
                            {sub.href ? (
                              <Link href={sub.href} className="text-[14px] text-[#0057B7]">
                                {sub.name}
                              </Link>
                            ) : (
                              <span className="text-[14px] text-[#0057B7]">{sub.name}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-semibold text-[16px] ${
                      isActive ? 'text-[#209AEA]' : 'text-[#005ABA] hover:text-[#209AEA]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-[#005ABA]" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white z-40 overflow-y-auto px-6 py-6 space-y-4">
          {menuItems.map((item) => {
            const dropdownItems = item.label === 'Involvements' ? involvements : item.subMenu || []

            const hasDropdown = dropdownItems.length > 0
            const isExpanded = mobileExpandedItem === item.label

            return (
              <div key={item.label}>
                <div className="flex justify-between items-center">
                  <Link
                    href={item.href || '#'}
                    onClick={() => setIsOpen(false)}
                    className="font-semibold text-[#005ABA]"
                  >
                    {item.label}
                  </Link>

                  {hasDropdown && (
                    <button onClick={() => toggleMobileItem(item.label)}>
                      {isExpanded ? (
                        <ChevronUpIcon className="w-4 h-4 text-[#005ABA]" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-[#005ABA]" />
                      )}
                    </button>
                  )}
                </div>

                {hasDropdown && isExpanded && (
                  <div className="pl-4 mt-2 space-y-2 border-l border-gray-200">
                    {dropdownItems.map((sub: UnifiedDropdownItem) => (
                      <Link
                        key={sub.name}
                        href={sub.href || '#'}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-[#3E80C9]"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </header>
  )
}
