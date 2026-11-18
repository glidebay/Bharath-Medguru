"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#1E3227] text-[#CBCFB8] pt-20 pb-12 relative overflow-hidden">
      {/* Background soft ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="#hero" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Bharath MedGuru"
                className="h-11 sm:h-13 w-auto object-contain"
                style={{
                  filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45))",
                }}
              />
            </Link>

            <p className="text-sm text-[#CBCFB8]/75 font-light leading-relaxed max-w-sm">
              A premier chain of retail pharmacies delivering 100% genuine medicines to your location upon enquiry across multiple branches, backed by integrated clinical consultations and diagnostic care.
            </p>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CBCFB8] hover:text-[#1E3227] text-[#CBCFB8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CBCFB8] hover:text-[#1E3227] text-[#CBCFB8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CBCFB8] hover:text-[#1E3227] text-[#CBCFB8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#CBCFB8] hover:text-[#1E3227] text-[#CBCFB8] flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105"
                aria-label="YouTube"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-base font-semibold text-[#CBCFB8] tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBCFB8]/75">
              <li>
                <a href="/#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us (Mission &amp; Vision)
                </a>
              </li>
              <li>
                <a href="/#service" className="hover:text-white transition-colors">
                  Pharmacy Chain &amp; Services
                </a>
              </li>
              <li>
                <a href="/online-store" className="hover:text-white transition-colors">
                  Online Store (Coming Soon)
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Delivery Enquiry
                </a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-white transition-colors">
                  Visual Gallery
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus Areas */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-base font-semibold text-[#CBCFB8] tracking-wide">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBCFB8]/75">
              <li>
                <a href="/#service" className="hover:text-white transition-colors">
                  Home Delivery
                </a>
              </li>
              <li>
                <a href="/#service" className="hover:text-white transition-colors">
                  Online Order Facility
                </a>
              </li>
              <li>
                <a href="/#blog" className="hover:text-white transition-colors">
                  Medicine Categories
                </a>
              </li>
              <li>
                <a href="/#session" className="hover:text-white transition-colors">
                  Pharmacy Care &amp; Refills
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Clinic Desk */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans text-base font-semibold text-[#CBCFB8] tracking-wide">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#CBCFB8]/75">
              <p className="font-medium text-white">Door No: 23/589, 2, A&amp;P Centre</p>
              <p>Kunnathurmedu, North Stadium Bypass Road,<br />Palakkad 678 001, Kerala</p>
              <p className="pt-2">
                <a href="mailto:admin@bharathmedguru.com" className="text-white font-medium hover:underline">
                  admin@bharathmedguru.com
                </a>
              </p>
              <div className="flex flex-col gap-0.5 pt-1">
                <a href="tel:+917994066647" className="text-white font-semibold text-sm hover:underline">
                  +91 79940 66647
                </a>
                <p className="text-[11px] text-[#CBCFB8]/60">
                  Lab: +91 75590 33000 / 66000
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 text-[11px] text-[#CBCFB8]/80 space-y-0.5">
                <p><span className="text-white font-medium">Facility:</span> 7:00 AM – 8:00 PM</p>
                <p><span className="text-white font-medium">Lab:</span> 7:00 AM – 7:00 PM</p>
                <p><span className="text-white font-medium">Pharmacy:</span> 8:00 AM – 8:00 PM</p>
                <p><span className="text-white font-medium">Doctor Consultations:</span> By Appointment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBCFB8]/65">
          <div>
            © 2026 Bharath MedGuru. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
