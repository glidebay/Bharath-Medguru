"use client";

import React from "react";
import { ArrowRight, PhoneCall } from "lucide-react";

interface CtaSectionProps {
  onOpenBooking: () => void;
}

export default function CtaSection({ onOpenBooking }: CtaSectionProps) {
  return (
    <section id="cta" className="py-20 bg-[#CBCFB8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-[#1E3227] text-white p-8 sm:p-12 md:p-16 shadow-xl border border-white/10">
          {/* Background image with blend mode */}
          <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
              alt="Bharath MedGuru Clinic and Healthcare Services"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Atmospheric gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3227] via-[#1E3227]/95 to-[#1E3227]/85 z-0 pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 max-w-3xl space-y-5">
            {/* Clean, Minimal Headline in Two Lines */}
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.2]">
              Need Medicine Stock Delivered? <br />
              <span className="font-normal text-[#CBCFB8]">Send Your Enquiry for Fast Doorstep Delivery</span>
            </h2>

            {/* Shortened, Minimal Description */}
            <p className="text-sm sm:text-base text-[#CBCFB8]/85 font-light leading-relaxed max-w-xl">
              Our expanding retail pharmacy chain provides 100% genuine medications, prescription fulfillment, and doorstep delivery directly to your location, with specialist doctor consultations and diagnostic lab support.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 bg-[#CBCFB8] text-[#1E3227] hover:bg-white hover:text-[#1E3227] px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span>Enquire for Medicine Delivery</span>
                <ArrowRight className="w-4 h-4 text-[#1E3227]" />
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#CBCFB8] px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium border border-white/20 transition-all duration-200"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Nearest Branch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
