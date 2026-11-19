"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setMobileMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.href = "/contact";
    }
  };

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/#service" },
    { name: "Store", href: "/online-store" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#CBCFB8]/95 backdrop-blur-md shadow-xs py-2.5 sm:py-3 border-b border-[#1E3227]/10"
          : "bg-[#CBCFB8]/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none py-2.5 sm:py-4 md:py-6 border-b border-[#1E3227]/10 md:border-b-0"
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between w-full">

          {/* ── LEFT: Official Bharath MedGuru Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group text-decoration-none select-none py-1 flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Bharath MedGuru"
              className="h-8 sm:h-11 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(30, 50, 39, 0.35))",
              }}
            />
          </Link>

          {/* ── CENTRE: Clean floating links (no container capsule) ── */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-[15px] lg:text-[16px] font-medium text-[#1E3227]/85 hover:text-[#1E3227] transition-colors relative py-1 text-decoration-none after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1E3227] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* ── RIGHT: Contact Us Pill (scrolls directly to Get in Touch) ── */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs lg:text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer active:translate-y-px bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white shadow-xs"
            >
              Order / Enquire
            </button>
          </div>

          {/* ── MOBILE MENU BUTTON (High-contrast, bold, always visible) ── */}
          <div className="flex md:hidden items-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#1E3227] text-white hover:bg-[#15241c] active:scale-95 transition-all cursor-pointer shadow-md border border-[#1E3227]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" strokeWidth={2.5} />
              ) : (
                <Menu className="w-5 h-5 text-white" strokeWidth={2.5} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ── FROSTED SAGE MOBILE MENU PANEL ── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mt-3 mx-4 p-5 rounded-2xl shadow-xl space-y-4 animate-in slide-in-from-top-2 duration-200"
          style={{
            backgroundColor: "rgba(203, 207, 184, 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(30, 50, 39, 0.14)",
          }}
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#1E3227] px-3 py-2 rounded-lg hover:bg-black/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5 border-t border-[#1E3227]/10">
            <button
              onClick={scrollToContact}
              className="w-full flex items-center justify-center py-3 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white transition-colors shadow-xs"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
