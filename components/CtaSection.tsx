"use client";

import React from "react";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";

interface CtaSectionProps {
  onOpenBooking: () => void;
}

export default function CtaSection({ onOpenBooking }: CtaSectionProps) {
  return (
    <section id="cta" className="py-20 bg-[#CBCFB8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-[#1E3227] text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-white/10">
          {/* Background image with blend mode */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <img
              src="https://framerusercontent.com/images/fe9ArTLfEAInMWMZe3EEZ5HmmxM.jpg?width=636&height=432"
              alt="Serene holistic wellness sanctuary"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Atmospheric gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3227] via-[#1E3227]/95 to-[#1E3227]/80 z-0 pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#CBCFB8] text-xs font-semibold tracking-wide uppercase border border-white/15">
              <span>Begin Your Healing Journey</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.18]">
              Take the First Step <br />
              <span className="font-normal text-[#CBCFB8]">Toward True Wholeness</span>
            </h2>

            <p className="text-base sm:text-lg text-[#CBCFB8]/85 font-light leading-relaxed">
              Ready to feel lighter, clearer, and deeply aligned? Start your transformation with our verified
              holistic practitioners today. Connect online or visit our serene studio.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 bg-[#CBCFB8] text-[#1E3227] hover:bg-white hover:text-[#1E3227] px-8 py-4 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 text-[#1E3227]" />
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#CBCFB8] px-6 py-4 rounded-full text-sm font-medium border border-white/20 transition-all duration-200"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Care Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
