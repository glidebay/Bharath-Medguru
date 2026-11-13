"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
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

  const navLinks = [
    { name: "Technology", href: "#service" },
    { name: "Health", href: "#about" },
    { name: "Activity", href: "#session" },
    { name: "Insights", href: "#gallery" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#CBCFB8]/85 backdrop-blur-md shadow-xs py-3.5 border-b border-[#1E3227]/10"
        : "bg-transparent py-5 sm:py-6"
        }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between">

          {/* ── LEFT: Official Bharath MedGuru Logo ── */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group text-decoration-none select-none py-1"
          >
            <img
              src="/logo.png"
              alt="Bharath MedGuru"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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

          {/* ── RIGHT: Translucent Moss Cart pill + Dark Shop pill ── */}
          <div className="hidden sm:flex items-center gap-3">

            {/* Shop the Ring Pill (solid deep forest) */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs lg:text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer active:translate-y-px"
              style={{
                backgroundColor: "#1E3227",
                color: "#CBCFB8",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#15241c";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1E3227";
                e.currentTarget.style.color = "#CBCFB8";
              }}
            >
              Contact Us
            </button>
          </div>

          {/* ── MOBILE MENU BUTTON (Below 820px round burger button) ── */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-4 py-2 rounded-full text-xs font-medium tracking-wide"
              style={{
                backgroundColor: "#1E3227",
                color: "#CBCFB8",
              }}
            >
              Shop
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1E3227] transition-all cursor-pointer"
              style={{
                backgroundColor: "rgba(203, 207, 184, 0.5)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(30, 50, 39, 0.15)",
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "rgba(62, 86, 70, 0.52)",
                color: "#CBCFB8",
              }}
            >
              <span>Cart</span>
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center py-2.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "#1E3227",
                color: "#CBCFB8",
              }}
            >
              Shop the Ring
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
