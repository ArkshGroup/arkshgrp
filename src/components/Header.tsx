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
  const [mobileNestedExpanded, setMobileNestedExpanded] = useState<string | null>(null)
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
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const toggleMobileItem = (label: string) => {
    setMobileExpandedItem(mobileExpandedItem === label ? null : label)
    setMobileNestedExpanded(null)
  }

  const toggleMobileNested = (label: string) => {
    setMobileNestedExpanded(mobileNestedExpanded === label ? null : label)
  }

  return (
    <header
      className={`w-full font-sans sticky top-0 z-50 transition-transform duration-500 ${
        scrollDir === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* TOP BAR */}
      {/* TOP BAR */}
      <div className="hidden md:flex bg-[#2257A6] text-white py-3.5 px-4 md:px-12 flex-col md:flex-row justify-around items-center gap-4">
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
            const hasBrands = social.brands && social.brands.length > 0

            return (
              <div key={i} className="relative group/social">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white hover:text-[#209AEA] p-1 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <Icon className="w-5 h-4" />
                </a>

                {hasBrands && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/social:opacity-100 group-hover/social:visible transition-all duration-300 z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-4 w-72 border border-gray-100">
                      <div className="grid grid-cols-3 gap-3">
                        {social.brands?.map((brand, index) => (
                          <a
                            key={index}
                            href={brand.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="relative w-16 h-16">
                              <Image
                                src={brand.logo}
                                alt={brand.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* NAVBAR */}
      <nav
        className={`max-w-8xl mx-auto px-6 md:px-12 py-3 flex justify-between items-center ${isScrolled ? 'bg-white/70 backdrop-blur-xl shadow-md' : 'bg-white'}`}
      >
        <Link href="/" className="relative h-20 w-20 block">
          <Image src={logo} alt="Arksh Group Logo" fill className="object-contain" priority />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-7">
          {menuItems.map((item) => {
            const isInvolvement = item.label === 'Involvements'

            const dropdownItems: UnifiedDropdownItem[] = isInvolvement
              ? involvements
              : item.subMenu || []

            const hasDropdown = item.isDropdown || (item.subMenu && item.subMenu.length > 0)

            return (
              <div
                key={item.label}
                className="relative group py-4"
                onMouseLeave={() => setActiveNestedMenu(null)}
              >
                {hasDropdown ? (
                  <>
                    <button className="font-semibold text-[16px] text-[#005ABA] flex items-center gap-1">
                      {item.label}
                      <ChevronDownIcon className="w-3 h-3" />
                    </button>

                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <ul className="w-72 bg-white border shadow-xl py-2 rounded-lg">
                        {dropdownItems.map((sub) => {
                          const children = isInvolvement
                            ? (sub.subBrands ?? [])
                            : (sub.nestedItems ?? [])

                          const hasChildren = children.length > 0

                          return (
                            <li
                              key={sub.name}
                              className="relative px-5 py-2.5 hover:bg-gray-50 flex justify-between items-center"
                              onMouseEnter={() => hasChildren && setActiveNestedMenu(sub.name)}
                            >
                              {sub.href ? (
                                <Link href={sub.href} className="text-[14px] text-[#0057B7] w-full">
                                  {sub.name}
                                </Link>
                              ) : (
                                <span className="text-[14px] text-[#0057B7] w-full">
                                  {sub.name}
                                </span>
                              )}

                              {hasChildren && (
                                <ChevronRightIcon className="w-3 h-3 text-gray-400" />
                              )}

                              {hasChildren && activeNestedMenu === sub.name && (
                                <div className="absolute left-full top-0 pl-1">
                                  <ul className="w-64 bg-white border shadow-xl py-2 rounded-lg">
                                    {children.map((nested) => (
                                      <li
                                        key={nested.name}
                                        className="px-5 py-3 hover:bg-gray-50 text-[13px] text-[#3E80C9]"
                                      >
                                        <a
                                          href={nested.href}
                                          target={
                                            nested.href.startsWith('http') ? '_blank' : '_self'
                                          }
                                          rel="noopener noreferrer"
                                        >
                                          {nested.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className="font-semibold text-[16px] text-[#005ABA]">
                    {item.label}
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* MOBILE TOGGLE */}
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

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t px-6 py-4 space-y-3">
          {menuItems.map((item) => {
            const isInvolvement = item.label === 'Involvements'

            const dropdownItems: UnifiedDropdownItem[] = isInvolvement
              ? involvements
              : item.subMenu || []

            const hasDropdown = item.isDropdown || (item.subMenu && item.subMenu.length > 0)

            return (
              <div key={item.label}>
                {hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileItem(item.label)}
                      className="flex justify-between w-full py-2 font-semibold text-[#005ABA]"
                    >
                      {item.label}
                      {mobileExpandedItem === item.label ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </button>

                    {mobileExpandedItem === item.label && (
                      <div className="pl-4 space-y-2">
                        {dropdownItems.map((sub) => {
                          const children = isInvolvement
                            ? (sub.subBrands ?? [])
                            : (sub.nestedItems ?? [])

                          const hasChildren = children.length > 0

                          return (
                            <div key={sub.name}>
                              {hasChildren ? (
                                <>
                                  <button
                                    onClick={() => toggleMobileNested(sub.name)}
                                    className="flex justify-between w-full py-1 text-[14px] text-[#3E80C9]"
                                  >
                                    {sub.name}
                                    {mobileNestedExpanded === sub.name ? (
                                      <ChevronUpIcon className="w-4 h-4" />
                                    ) : (
                                      <ChevronDownIcon className="w-4 h-4" />
                                    )}
                                  </button>

                                  {mobileNestedExpanded === sub.name && (
                                    <div className="pl-4 space-y-1">
                                      {children.map((nested) => (
                                        <a
                                          key={nested.name}
                                          href={nested.href}
                                          target={
                                            nested.href.startsWith('http') ? '_blank' : '_self'
                                          }
                                          rel="noopener noreferrer"
                                          className="block py-1 text-[13px] text-[#0057B7]"
                                        >
                                          {nested.name}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={sub.href || '#'}
                                  className="block py-1 text-[14px] text-[#3E80C9]"
                                >
                                  {sub.name}
                                </Link>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="block py-2 font-semibold text-[#005ABA]">
                    {item.label}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      )}
    </header>
  )
}
