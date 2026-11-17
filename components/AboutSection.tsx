"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Truck,
  HeartHandshake,
  Compass,
  Eye,
  Pill,
} from "lucide-react";

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export default function AboutSection({ onOpenBooking }: AboutSectionProps) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Smooth counting up animation
      const duration = 1500;
      const steps = 40;
      const interval = duration / steps;
      let step = 0;

      const counterInterval = setInterval(() => {
        step++;
        setCount1(Math.min(15, Math.floor((15 / steps) * step)));
        setCount2(Math.min(50, Math.floor((50 / steps) * step)));
        setCount3(Math.min(100, Math.floor((100 / steps) * step)));

        if (step >= steps) {
          clearInterval(counterInterval);
        }
      }, interval);

      return () => clearInterval(counterInterval);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: <Building2 className="w-4 h-4 flex-shrink-0 text-[#1E3227]" />,
      label: "PHARMACY BRANCHES",
      value: `${count1}+`,
      sub: "MULTI-LOCATION STORES",
      desc: "Strategically located for convenient neighbourhood access.",
      gold: true,
    },
    {
      icon: <Truck className="w-4 h-4 flex-shrink-0 text-[#1E3227]" />,
      label: "DOORSTEP DELIVERIES",
      value: `${count2}k+`,
      sub: "DELIVERED ON ENQUIRY",
      desc: "Prompt prescription medicine delivery to your location.",
      gold: true,
    },
    {
      icon: <ShieldCheck className="w-4 h-4 flex-shrink-0 text-[#1E3227]" />,
      label: "AUTHENTIC MEDICINES",
      value: `${count3}%`,
      sub: "LICENSED & VERIFIED",
      desc: "100% genuine pharmaceutical stock directly from certified makers.",
      gold: false,
    },
  ];

  return (
    <section id="about" className="py-28 bg-[#CBCFB8] relative overflow-hidden">
      {/* Soft ambient light spots behind cards for authentic glass refraction */}
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
                <span>Explore Mission, Vision &amp; Story</span>
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

        {/* ── Mission & Vision Showcase ── */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div
            className="p-8 rounded-[24px] relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.28) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.75)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
              borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
              boxShadow:
                "inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 12px 30px rgba(30, 50, 39, 0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1E3227] text-[#CBCFB8] flex items-center justify-center flex-shrink-0 shadow-xs">
                <Compass className="w-5 h-5 text-[#CBCFB8]" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-[11px] font-semibold tracking-wider uppercase">
                Our Mission
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1E3227] mb-3 leading-snug">
              Accessible, Authentic Medicines for Every Neighborhood
            </h3>
            <p className="text-sm sm:text-base text-[#3F5447] font-light leading-relaxed">
              To guarantee that safe, verified, and affordable medications are always within reach. Through our expanding chain of retail pharmacy branches and dedicated enquiry-based doorstep delivery, we remove geographical barriers to healthcare and ensure uninterrupted chronic and emergency medicine supplies for every household.
            </p>
          </div>

          {/* Vision Card */}
          <div
            className="p-8 rounded-[24px] relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.28) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.75)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
              borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
              boxShadow:
                "inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 12px 30px rgba(30, 50, 39, 0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#9B8A3E] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B8A3E]/15 text-[#9B8A3E] text-[11px] font-semibold tracking-wider uppercase">
                Our Vision
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1E3227] mb-3 leading-snug">
              The Most Trusted Community Pharmacy &amp; Digital Health Network
            </h3>
            <p className="text-sm sm:text-base text-[#3F5447] font-light leading-relaxed">
              To be the benchmark for omnichannel pharmacy care by evolving our physical branch network into a full-scale e-commerce web and mobile platform (akin to Apollo Pharmacy). We envision seamless one-click ordering, real-time prescription tracking, and integrated clinic-lab care, empowering communities to lead healthier lives.
            </p>
          </div>
        </div>

        {/* Counter Div — TRUE Frosted Glass Metric Cards (HRV Style) */}
        <div className="mt-16 pt-12 border-t border-[#1E3227]/15 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-7 rounded-[22px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group flex flex-col justify-between min-h-[170px]"
              style={{
                // True frosted glass gradient + bevel highlight
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.18) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255, 255, 255, 0.65)",
                borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                boxShadow:
                  "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
              }}
            >
              {/* Header: Line Icon + Uppercase Tracked Label */}
              <div className="flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.14em] uppercase text-[#1E3227]/80">
                {stat.icon}
                <span>{stat.label}</span>
              </div>

              {/* Numeral: Light geometric display numeral (Lora light serif) */}
              <div className="font-sans font-light text-4xl sm:text-5xl text-[#1E3227] tracking-tight leading-none my-3">
                {stat.value}
              </div>

              {/* Bottom: Uppercase tracked accent + subtle description */}
              <div className="space-y-0.5">
                <div
                  className="text-[10px] font-sans font-semibold tracking-[0.14em] uppercase"
                  style={{ color: stat.gold ? "#9B8A3E" : "#1E3227" }}
                >
                  {stat.sub}
                </div>
                <div className="text-[11px] text-[#3F5447]/85 font-light leading-snug">
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
