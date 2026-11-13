"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface PathSectionProps {
  onOpenBooking: () => void;
}

export default function PathSection({ onOpenBooking }: PathSectionProps) {
  const steps = [
    {
      step: "01",
      title: "Explore Our Holistic Space",
      description:
        "Browse a wide range of healing modalities and certified practitioners—from energy work to emotional counseling—all in one place.",
      image:
        "https://framerusercontent.com/images/679tInF0XPNSXngXGtZkQWznfPs.png?width=464&height=330",
      reversed: false,
    },
    {
      step: "02",
      title: "Choose the Right Practitioner",
      description:
        "View detailed profiles, read testimonials, and connect with a healer who resonates with your journey and needs.",
      image:
        "https://framerusercontent.com/images/aCqdBiZcEPK1pOkSLlwQgcYNE.png?width=464&height=330",
      reversed: true,
    },
    {
      step: "03",
      title: "Book a Session That Fits You",
      description:
        "Easily schedule your session—online or in-person. Feel empowered, supported, and guided toward better well-being.",
      image:
        "https://framerusercontent.com/images/IwBKwYFuoz1J3GZT94nyRs6HOjM.png?width=464&height=330",
      reversed: false,
    },
  ];

  return (
    <section id="path" className="py-28 bg-white relative overflow-hidden">
      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] text-xs font-semibold tracking-wide uppercase">
            Simple 3-Step Journey
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#163c3d]">
            A Simple Path to Healing <br />
            <span className="italic font-normal text-[#1f2d2e]">Starts Here</span>
          </h2>
          <p className="text-base sm:text-lg text-[#526061] font-light leading-relaxed">
            No stress. No confusion. Whether you're new to holistic wellness or a returning seeker, our 3-step
            flow ensures your journey is smooth, safe, and supportive.
          </p>
        </div>

        {/* 3 Alternating Steps */}
        <div className="space-y-20 lg:space-y-28">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`flex flex-col ${
                item.reversed ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-10 lg:gap-20`}
            >
              {/* Image Frame */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-[464px] aspect-[464/330] rounded-[30px] overflow-hidden bg-[#e2eddf]/30 shadow-lg border border-[#163c3d]/10 group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content with Number and Vertical Decorative Bar */}
              <div className="w-full lg:w-1/2 flex items-start gap-6 sm:gap-8">
                {/* Number & Vertical Accent Line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-[#163c3d] leading-none mb-3">
                    {item.step}
                  </div>
                  <div className="w-[2px] h-24 bg-gradient-to-b from-[#163c3d] via-[#163c3d]/40 to-transparent rounded-full" />
                </div>

                {/* Text Content */}
                <div className="space-y-4 pt-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#163c3d] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-[#526061] font-light leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#163c3d] hover:text-[#102d2e] uppercase tracking-wider group cursor-pointer"
                    >
                      <span>Get started with Step {item.step}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
