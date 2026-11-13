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
              Integrated clinical care, specialist consultations, and holistic healing unified with trusted medicine.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9B8A3E] mb-2.5">
                Join Our Insights Newsletter
              </div>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border border-white/15 text-xs px-4 py-2.5 rounded-full text-[#CBCFB8] placeholder-[#CBCFB8]/50 focus:outline-none focus:ring-1 focus:ring-[#CBCFB8] flex-1"
                />
                <button
                  type="button"
                  className="bg-[#CBCFB8] text-[#1E3227] text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-white transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-base font-semibold text-[#CBCFB8] tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBCFB8]/75">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#session" className="hover:text-white transition-colors">
                  Activity &amp; Sessions
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Visual Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  Health Insights
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
                <a href="#service" className="hover:text-white transition-colors">
                  Sleep &amp; Circadian
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Heart Rate Variability
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Active Caloric Burn
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Recovery &amp; Strain
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Somatic Reset
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Continuous 24/7 Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Studio */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans text-base font-semibold text-[#CBCFB8] tracking-wide">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#CBCFB8]/75">
              <p>742 Evergreen Wellness Ave, Suite 300</p>
              <p>Boulder, CO 80302, USA</p>
              <p className="pt-2 text-white font-medium">care@medguru.health</p>
              <p className="text-white font-medium">+1 (555) 234-8900</p>
            </div>

            {/* Social Icons */}
            <div className="pt-3 flex items-center gap-3">
              {["Facebook", "Instagram", "LinkedIn", "YouTube"].map((network) => (
                <a
                  key={network}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#1E3227] flex items-center justify-center text-xs transition-colors"
                  aria-label={network}
                >
                  {network[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBCFB8]/65">
          <div>
            © 2026 Bharath MedGuru. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Preferences
            </a>
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
