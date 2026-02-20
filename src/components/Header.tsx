"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  EnvelopeIcon,
  PhoneIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import logo from "@/assets/logo/logo.jpg";
import { involvements } from "@/constant/involvements.header";
import { menuItems, socialLinks } from "@/constant/header.data";
import type { IconType } from "react-icons";

interface UnifiedDropdownItem {
  name: string;
  href?: string;
  subBrands?: { name: string; href: string }[];
  nestedItems?: { name: string; href: string }[];
}

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeNestedMenu, setActiveNestedMenu] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(
    null,
  );
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setScrollDir("down");
      } else if (currentScroll < lastScroll) {
        setScrollDir("up");
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const toggleMobileItem = (label: string) => {
    setMobileExpandedItem(mobileExpandedItem === label ? null : label);
  };

  return (
    <header
      className={`w-full bg-white font-sans sticky top-0 z-50 shadow-sm transition-transform duration-500 ${
        scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* ================= TOP BAR ================= */}
      <div className="bg-[#2257A6] text-white py-3 px-4 md:px-12 flex flex-col md:flex-row justify-around items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-[13px] font-medium">
          <a
            href="mailto:info@arkshgroup.com"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <EnvelopeIcon className="w-4 h-4 text-white" />
            <span>info@arkshgroup.com</span>
          </a>
          <a
            href="tel:+9779802074449"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <PhoneIcon className="w-4 h-4 text-white" />
            <span>+977 980-2074449 / +977-1-4002049</span>
          </a>
        </div>

        <div className="flex gap-3">
          {socialLinks.map((social, i) => {
            const Icon: IconType = social.icon;
            const hasBrands = social.brands && social.brands.length > 0;
            return (
              <div key={i} className="relative group/social">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white hover:text-[#209AEA] p-1.5 rounded-full text-[18px] transition-all duration-300 flex items-center justify-center w-8 h-8"
                >
                  <Icon className="w-4 h-4" />
                </a>
                {hasBrands && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/social:opacity-100 group-hover/social:visible transition-all duration-300 z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-4 w-72 border border-gray-100 relative">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100"></div>
                      <div className="grid grid-cols-3 gap-3 relative z-10">
                        {social.brands?.map((brand, index) => (
                          <a
                            key={index}
                            href={brand.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-1.5 rounded-lg border border-gray-50 hover:border-blue-300 hover:shadow-sm transition-all bg-white"
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
            );
          })}
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex justify-between items-center">
        <Link href="/" className="relative h-14 w-14 md:h-16 md:w-16">
          <Image
            src={logo}
            alt="Arksh Group Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-7">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href !== "#" && pathname.startsWith(item.href);
            const dropdownItems = (
              item.label === "Involvements" ? involvements : item.subMenu
            ) as UnifiedDropdownItem[];
            const hasDropdown =
              item.isDropdown || (item.subMenu && item.subMenu.length > 0);

            return (
              <div
                key={item.label}
                className="relative group py-4"
                onMouseLeave={() => setActiveNestedMenu(null)}
              >
                {hasDropdown ? (
                  <>
                    <button
                      className={`font-semibold text-[15px] flex items-center gap-1 transition-colors ${isActive ? "text-[#209AEA]" : "text-[#005ABA] hover:text-[#209AEA]"}`}
                    >
                      {item.label}
                      <ChevronDownIcon className="w-3 h-3 ml-0.5 opacity-70" />
                    </button>
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <ul className="w-72 bg-white border border-gray-100 shadow-xl py-2 rounded-lg">
                        {dropdownItems?.map((sub) => {
                          const children = sub.subBrands || sub.nestedItems;
                          const hasChildren = children && children.length > 0;
                          return (
                            <li
                              key={sub.name}
                              className="relative px-5 py-2.5 hover:bg-gray-50 flex justify-between items-center cursor-pointer group/nested"
                              onMouseEnter={() => setActiveNestedMenu(sub.name)}
                            >
                              {sub.href ? (
                                <Link
                                  href={sub.href}
                                  className="text-[14px] text-[#0057B7] block w-full"
                                >
                                  {sub.name}
                                </Link>
                              ) : (
                                <span className="text-[14px] text-[#0057B7] block w-full">
                                  {sub.name}
                                </span>
                              )}
                              {hasChildren && (
                                <ChevronRightIcon className="w-3 h-3 text-gray-400" />
                              )}
                              {hasChildren && activeNestedMenu === sub.name && (
                                <div className="absolute left-full top-0 pl-1">
                                  <ul className="w-64 bg-white border border-gray-100 shadow-xl py-2 rounded-lg max-h-[70vh] overflow-y-auto">
                                    {children.map((nested) => (
                                      <li
                                        key={nested.name}
                                        className="px-5 py-3 hover:bg-gray-50 text-[13px] font-medium text-[#3E80C9]"
                                      >
                                        <a
                                          href={nested.href}
                                          target={
                                            nested.href.startsWith("http")
                                              ? "_blank"
                                              : "_self"
                                          }
                                          rel="noopener noreferrer"
                                          className="block w-full"
                                        >
                                          {nested.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-semibold text-[15px] transition-colors border-b-2 pb-1 ${isActive ? "text-[#209AEA] border-[#209AEA]" : "text-[#005ABA] border-transparent hover:text-[#209AEA] hover:border-[#209AEA]"}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="lg:hidden p-2 text-[#005ABA]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 py-4 z-50 overflow-y-auto max-h-[calc(100vh-80px)]">
          {menuItems.map((item) => {
            const isActive =
              item.href !== "#" && pathname.startsWith(item.href);
            const dropdownItems = (
              item.label === "Involvements" ? involvements : item.subMenu
            ) as UnifiedDropdownItem[];
            const hasDropdown = dropdownItems && dropdownItems.length > 0;
            const isExpanded = mobileExpandedItem === item.label;

            return (
              <div
                key={item.label}
                className="border-b border-gray-50 last:border-none"
              >
                {hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileItem(item.label)}
                      className={`w-full flex justify-between items-center px-8 py-4 font-bold transition-all ${
                        isActive || isExpanded
                          ? "text-[#209AEA] bg-blue-50"
                          : "text-[#005ABA]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isExpanded ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="bg-gray-50/50 py-2">
                        {dropdownItems.map((sub) => {
                          const children = sub.subBrands || sub.nestedItems;
                          const hasChildren = children && children.length > 0;

                          return (
                            <div key={sub.name} className="px-8 mb-2">
                              {/* Sub-Brand Heading / Main Item */}
                              <div className="pl-4 border-l-2 border-[#209AEA]/30">
                                {sub.href ? (
                                  <Link
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 text-[15px] text-[#0057B7] font-semibold hover:text-[#209AEA]"
                                  >
                                    {sub.name}
                                  </Link>
                                ) : (
                                  <div className="py-2 text-[12px] text-[#2257A6] font-bold uppercase tracking-wider opacity-70">
                                    {sub.name}
                                  </div>
                                )}

                                {/* Nested Items with thin blue borders */}
                                {hasChildren && (
                                  <ul className="mt-1 space-y-1">
                                    {children.map((nested) => (
                                      <li
                                        key={nested.name}
                                        className="pl-4 border-l border-blue-200"
                                      >
                                        <Link
                                          href={nested.href}
                                          onClick={() => setIsOpen(false)}
                                          className="block py-2 text-[14px] text-gray-600 active:text-[#209AEA] transition-colors"
                                        >
                                          {nested.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-8 py-4 font-bold transition-all ${
                      isActive ? "bg-blue-50 text-[#209AEA]" : "text-[#005ABA]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
