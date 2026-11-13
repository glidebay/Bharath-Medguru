"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Star, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative bg-[#163c3d] text-[#e2eddf] overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
    >
      {/* Ambient background glow & radial highlights */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#e2eddf]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* 1st col: Content */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#e2eddf] text-xs font-semibold tracking-wide uppercase border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#e2eddf]" />
              <span>A Safe Space for Mind, Body & Soul</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold tracking-[-0.04em] text-[#e2eddf] leading-[1.15]">
              Healing Happens <br />
              <span className="italic font-normal text-white">When You’re Seen</span> <br />
              as Whole
            </h1>

            {/* Paragraph Subtext */}
            <p className="text-base sm:text-lg text-[#e2eddf]/90 font-light leading-relaxed max-w-xl">
              Begin your journey toward balance and healing with professionals who care. Explore holistic
              practices tailored to your needs—mind, body, and soul.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 bg-[#e2eddf] text-[#163c3d] hover:bg-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span>Book a session</span>
                <ArrowRight className="w-4 h-4 text-[#163c3d]" />
              </button>

              <a
                href="#service"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#e2eddf] px-6 py-3.5 rounded-full text-sm font-medium border border-white/20 transition-all duration-200"
              >
                <span>Explore Modalities</span>
              </a>
            </div>

            {/* Features Row */}
            <div className="pt-6 flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-[#e2eddf]/90 border-t border-[#e2eddf]/15">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e2eddf]" />
                <span className="font-medium">Genuine care</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-medium">Highly rated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e2eddf]" />
                <span className="font-medium">Proven expertise</span>
              </div>
            </div>
          </div>

          {/* 2nd col: Arch Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[500px]">
              {/* Distinctive Arch Frame */}
              <div className="relative overflow-hidden rounded-t-[260px] rounded-b-[30px] border-4 border-[#e2eddf]/30 bg-[#1f2d2e] shadow-2xl aspect-[526/535]">
                <img
                  src="https://framerusercontent.com/images/dgEzQPXuFtUEcQDYz7RCfHpXwDI.png?width=526&height=535"
                  alt="Holistic healing and wellness guide"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Bottom subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#163c3d]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Social Proof Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-[#163c3d]/10 flex items-center gap-3.5 text-[#163c3d] animate-float">
                <div className="flex -space-x-2">
                  <img
                    src="https://framerusercontent.com/images/lx4Rn0VnV8SjGTXOsrNK92R5W0k.jpg"
                    alt="Seeker"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                  />
                  <img
                    src="https://framerusercontent.com/images/W35y2oAusnY8GfUNfuhPboYHtr8.jpg"
                    alt="Seeker"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                  />
                  <div className="w-9 h-9 rounded-full bg-[#163c3d] text-[#e2eddf] font-semibold text-xs flex items-center justify-center border-2 border-white">
                    10k+
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#163c3d]">10,000+ Journeys</div>
                  <div className="text-[11px] text-[#526061]">Supported with Care</div>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-3 -right-2 bg-[#e2eddf] text-[#163c3d] px-4 py-2 rounded-full shadow-xl text-xs font-bold flex items-center gap-1.5 border border-white">
                <Sparkles className="w-3.5 h-3.5 text-[#163c3d]" />
                <span>Verified Collective</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
