"use client";

import React from "react";
import { ArrowRight, Pill } from "lucide-react";

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export default function AboutSection({ onOpenBooking }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 sm:py-28 bg-[#CBCFB8] relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-8 left-1/4 -translate-x-1/2 w-[600px] h-[350px] bg-white/45 rounded-full blur-3xl opacity-90" />
      <div className="pointer-events-none absolute bottom-8 right-1/4 translate-x-1/2 w-[600px] h-[350px] bg-[#9B8A3E]/25 rounded-full blur-3xl opacity-80" />

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Split: Image + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual: Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[500px]">
              <div className="relative overflow-hidden rounded-[28px] border-4 border-white/50 shadow-xl bg-white/20 aspect-[588/564]">
                <img
                  src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1200&q=80"
                  alt="Bharath MedGuru Pharmacy Chain and Medicine Dispensing"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Decorative badge overlay (crisp white frosted glass) */}
              <div
                className="absolute -bottom-5 -right-5 p-5 rounded-2xl shadow-xl max-w-[220px] hidden sm:block"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.28) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.75)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.95)",
                  boxShadow:
                    "inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 12px 30px rgba(30, 50, 39, 0.12)",
                  color: "#1E3227",
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Pill className="w-5 h-5 text-[#9B8A3E]" />
                  <span className="font-semibold text-xs tracking-wider uppercase text-[#1E3227]">
                    Pharmacy Chain
                  </span>
                </div>
                <p className="text-xs text-[#3F5447] leading-snug">
                  100% genuine medicines &amp; fast doorstep dispatch on enquiry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
              <span>About Bharath MedGuru</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227] leading-tight">
              An Established Chain of Pharmacies <br />
              <span className="font-normal text-[#1E3227]">
                Multi-Branch Care &amp; Doorstep Delivery
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#3F5447] font-light leading-relaxed">
              <p>
                Bharath MedGuru is primarily an expanding retail chain of modern community pharmacies with multiple branches situated across key locations. We are built on the foundational promise of delivering genuine, temperature-regulated, and certified medications to every family.
              </p>
              <p>
                Whenever you enquire with us through WhatsApp, phone, or online, our licensed pharmacy team confirms availability and delivers your complete medicine stock directly to your location. For holistic healthcare support, we also facilitate outpatient specialist doctor consultations and automated diagnostic laboratory checkups.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="/about"
                className="inline-flex items-center gap-2 bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white px-7 py-3.5 rounded-full text-sm font-medium shadow-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span>Explore More</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-white/70 hover:bg-white text-[#1E3227] border border-[#1E3227]/20 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                <span>Enquire for Medicine Delivery</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
