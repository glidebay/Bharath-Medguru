"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Users, Activity, HeartHandshake } from "lucide-react";

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
        setCount1(Math.min(50, Math.floor((50 / steps) * step)));
        setCount2(Math.min(10, Math.floor((10 / steps) * step)));
        setCount3(Math.min(98, Math.floor((98 / steps) * step)));

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
      icon: <Users className="w-4 h-4 flex-shrink-0 text-[#1E3227]" />,
      label: "HEALERS ONBOARD",
      value: `${count1}+`,
      sub: "VETTED MASTERS",
      desc: "Across ancient & modern modalities",
      gold: true,
    },
    {
      icon: <Activity className="w-4 h-4 flex-shrink-0 text-[#1E3227]" />,
      label: "SESSIONS COMPLETED",
      value: `${count2}k+`,
      sub: "GLOBAL NETWORK",
      desc: "One-on-one virtual & studio care",
      gold: true,
    },
    {
      icon: <HeartHandshake className="w-4 h-4 flex-shrink-0 text-[#1E3227]" />,
      label: "LIVES TOUCHED",
      value: `${count3}%+`,
      sub: "WELLBEING TRANSFORMATION",
      desc: "Reported positive emotional reset",
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
                  src="https://framerusercontent.com/images/N6o6ZLH0yVENL5EJ2RfmAOBFDU.png?width=588&height=564"
                  alt="Holistic therapy and counseling"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Decorative badge overlay (crisp white frosted glass) */}
              <div
                className="absolute -bottom-5 -right-5 p-5 rounded-2xl shadow-xl max-w-[210px] hidden sm:block"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.28) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.75)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.95)",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 12px 30px rgba(30, 50, 39, 0.12)",
                  color: "#1E3227",
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-5 h-5 text-[#9B8A3E]" />
                  <span className="font-semibold text-xs tracking-wider uppercase text-[#1E3227]">
                    Accredited
                  </span>
                </div>
                <p className="text-xs text-[#3F5447] leading-snug">
                  100% verified certifications &amp; background checks.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
              Our Vision
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227] leading-tight">
              Creating a Safe Space for <br />
              <span className="font-normal text-[#1E3227]">Holistic Health</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#3F5447] font-light leading-relaxed">
              <p>
                With over a decade of experience, our commitment is to guide you through life's challenges.
                Embracing integrative wellness and virtual sessions, we have made mental health and energetic
                support easily accessible in today's digital age.
              </p>
              <p>
                Whether it's anxiety, emotional burnout, relationship harmony, or personal growth, our
                expertise is your pathway to a happier, healthier life.
              </p>
              <p className="text-sm font-normal text-[#1E3227] border-l-2 border-[#1E3227] pl-4">
                “We believe everyone deserves access to trusted, compassionate holistic care. Our platform
                bridges seekers with certified practitioners dedicated to healing and transformation.”
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white px-7 py-3.5 rounded-full text-sm font-medium shadow-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span>Learn Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Counter Div — TRUE Frosted Glass Metric Cards (HRV Style) */}
        <div className="mt-20 pt-14 border-t border-[#1E3227]/15 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
