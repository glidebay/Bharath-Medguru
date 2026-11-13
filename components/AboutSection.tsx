"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
      value: `${count1}+`,
      label: "Certified Healers Onboard",
      sub: "Vetted masters across diverse ancient and modern modalities",
      iconSrc: "https://framerusercontent.com/images/vEjvELum2Hd4q1ioUr7vShRtwQ.svg?width=40&height=40",
    },
    {
      value: `${count2}k+`,
      label: "Sessions Completed",
      sub: "Dedicated one-on-one virtual and in-person consultations",
      iconSrc: "https://framerusercontent.com/images/qlo1gQMw5AhnWhDiU8TQdHt1bo.svg?width=33&height=40",
    },
    {
      value: `${count3}%+`,
      label: "Lives Touched With Care",
      sub: "Reported positive emotional and physical transformations",
      iconSrc: "https://framerusercontent.com/images/qpUSChesQjguReQNwBsrk3k80u0.svg?width=40&height=40",
    },
  ];

  return (
    <section id="about" className="py-28 bg-[#ffffff] relative overflow-hidden">
      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split: Image + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual: Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[500px]">
              <div className="relative overflow-hidden rounded-[30px] border-8 border-[#f2f7f0] shadow-xl bg-[#e2eddf]/30 aspect-[588/564]">
                <img
                  src="https://framerusercontent.com/images/N6o6ZLH0yVENL5EJ2RfmAOBFDU.png?width=588&height=564"
                  alt="Holistic therapy and counseling"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Decorative badge overlay */}
              <div className="absolute -bottom-5 -right-5 bg-[#163c3d] text-[#e2eddf] p-5 rounded-2xl shadow-xl max-w-[210px] hidden sm:block border border-white/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-5 h-5 text-[#e2eddf]" />
                  <span className="font-semibold text-xs tracking-wider uppercase">Accredited</span>
                </div>
                <p className="text-xs text-[#e2eddf]/80 leading-snug">
                  100% verified certifications & background checks.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] text-xs font-semibold tracking-wide uppercase">
              Our Vision
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#163c3d] leading-tight">
              Creating a Safe Space for <br />
              <span className="italic font-normal text-[#1f2d2e]">Holistic Health</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#526061] font-light leading-relaxed">
              <p>
                With over a decade of experience, our commitment is to guide you through life's challenges.
                Embracing integrative wellness and virtual sessions, we have made mental health and energetic
                support easily accessible in today's digital age.
              </p>
              <p>
                Whether it's anxiety, emotional burnout, relationship harmony, or personal growth, our
                expertise is your pathway to a happier, healthier life.
              </p>
              <p className="text-sm font-normal text-[#163c3d] border-l-2 border-[#163c3d] pl-4 italic">
                “We believe everyone deserves access to trusted, compassionate holistic care. Our platform
                bridges seekers with certified practitioners dedicated to healing and transformation.”
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#163c3d] text-[#e2eddf] hover:bg-[#102d2e] px-7 py-3.5 rounded-full text-sm font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span>Learn Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Counter Div (data-framer-name="counter-div") */}
        <div className="mt-20 pt-14 border-t border-[#163c3d]/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#f9fbf8] p-8 rounded-[24px] border border-[#163c3d]/10 hover:border-[#163c3d]/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e2eddf] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                <img src={stat.iconSrc} alt="Stat icon" className="w-7 h-7 object-contain" />
              </div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-[#163c3d] tracking-tight">
                {stat.value}
              </div>
              <div className="text-base font-semibold text-[#1f2d2e] mt-2 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-[#526061] leading-relaxed">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
