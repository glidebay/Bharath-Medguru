"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Heart, Mail } from "lucide-react";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#163c3d] text-white pt-20 pb-12 relative overflow-hidden">
      {/* Background soft ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="#hero" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#e2eddf] flex items-center justify-center text-[#163c3d] shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
              <span className="font-serif text-2xl font-semibold tracking-tight text-white">
                MedGuru
              </span>
            </Link>

            <p className="text-sm text-[#e2eddf]/80 font-light leading-relaxed max-w-sm">
              At MedGuru, one of our main priorities is the holistic wellness, energetic restoration, and
              privacy of our seekers. Connecting conscious seekers with certified holistic practitioners
              worldwide.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#e2eddf] mb-2.5">
                Join Our Mindful Newsletter
              </div>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border border-white/20 text-xs px-4 py-2.5 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#e2eddf] flex-1"
                />
                <button
                  type="button"
                  className="bg-[#e2eddf] text-[#163c3d] text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-white transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e2eddf]/80">
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
                  Modalities
                </a>
              </li>
              <li>
                <a href="#session" className="hover:text-white transition-colors">
                  Personal Sessions
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Soul Circle
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
                  Insights & Journal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Modalities */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Modalities
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e2eddf]/80">
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Energy Healing (Reiki)
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Sound Therapy
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Holistic NLP Coaching
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Somatic Bodywork
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Breathwork & Pranayama
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-white transition-colors">
                  Ayurvedic Lifestyle
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#e2eddf]/80">
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
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#163c3d] flex items-center justify-center text-xs transition-colors"
                  aria-label={network}
                >
                  {network[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e2eddf]/70">
          <div>
            © 2026 MedGuru Collective. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
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

