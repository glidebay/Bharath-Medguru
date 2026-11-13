"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#service" },
    { name: "Sessions", href: "#session" },
    { name: "Practitioners", href: "#team" },
    { name: "blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#163c3d]/90 backdrop-blur-md shadow-md border-b border-[#e2eddf]/10 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#e2eddf] flex items-center justify-center text-[#163c3d] shadow-sm group-hover:scale-105 transition-transform duration-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[#163c3d]"
              >
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2Z" />
                <path d="M12 6v12" />
                <path d="M7 10c2.5 0 5-2 5-2s2.5 2 5 2" />
                <path d="M7 14c2.5 0 5 2 5 2s2.5-2 5-2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#e2eddf]">
                MedGuru
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#e2eddf]/70 font-medium -mt-1">
                Holistic Care
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#ffffff]/10 backdrop-blur-md px-5 py-2 rounded-full border border-[#e2eddf]/15 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#e2eddf] hover:text-white hover:bg-white/15 px-3.5 py-1.5 rounded-full transition-all duration-200 capitalize"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#e2eddf] text-[#163c3d] hover:bg-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <span>Book a session</span>
              <ArrowRight className="w-4 h-4 text-[#163c3d]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#e2eddf] text-[#163c3d] px-3.5 py-1.5 rounded-full text-xs font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#e2eddf] hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#163c3d] border-b border-[#e2eddf]/15 px-6 pt-3 pb-6 space-y-2.5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#e2eddf] hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg transition-colors capitalize"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#e2eddf] text-[#163c3d] py-3 rounded-full text-sm font-semibold shadow-md"
            >
              <span>Book a session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
