"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Truck, Building2, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

interface GlassCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  unit: string;
  unitHighlight?: boolean;
}

function GlassCard({ icon, label, value, unit, unitHighlight }: GlassCardProps) {
  return (
    <div
      data-anim="card"
      className="w-[155px] sm:w-[165px] lg:w-[175px] min-h-[96px] sm:min-h-[104px] lg:min-h-[110px] p-3.5 sm:p-4 rounded-[20px] flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.38) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.85)",
        borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
        borderLeft: "1.5px solid rgba(255, 255, 255, 0.90)",
        boxShadow:
          "inset 0 1px 1px 0 rgba(255, 255, 255, 0.95), 0 16px 36px -4px rgba(30, 50, 39, 0.14), 0 4px 12px rgba(30, 50, 39, 0.08)",
      }}
    >
      {/* Label: Icon + Text */}
      <div className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.12em] uppercase text-[#1E3227]/70">
        <span className="text-[#1E3227]">{icon}</span>
        <span>{label}</span>
      </div>

      {/* Big Numeral / Value */}
      <div className="text-base sm:text-lg lg:text-[19px] font-normal text-[#1E3227] tracking-tight leading-tight my-0.5">
        {value}
      </div>

      {/* Unit / Rating */}
      <div
        className={`text-[8px] sm:text-[8.5px] font-semibold tracking-wider uppercase leading-tight ${
          unitHighlight ? "text-[#9B8A3E]" : "text-[#1E3227]/55"
        }`}
      >
        {unit}
      </div>
    </div>
  );
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const secRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sec = secRef.current;
    if (!sec) return;
    const anims: Animation[] = [];
    let done = false;

    const run = () => {
      if (done) return;
      // Smooth cubic bezier matching editorial iOS/Framer motion
      const ease = {
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "backwards" as FillMode,
      };
      let t = 60; // Timeline time cursor in milliseconds

      const push = (el: Element | null, dur: number, from: Keyframe) => {
        if (!el) return;
        anims.push(
          el.animate([from, { opacity: 1, transform: "none" }], {
            ...ease,
            duration: dur,
            delay: t,
          })
        );
      };

      // 1. Background image & ambient wash fade in (0ms)
      const bg = sec.querySelector("[data-anim=bg]");
      if (bg) {
        anims.push(
          bg.animate([{ opacity: 0 }, { opacity: 1 }], {
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
            duration: 850,
            delay: 0,
          })
        );
      }

      // 2. Tracking Dot blooms via circular clip-path (+90ms)
      const dot = sec.querySelector("[data-anim=dot]");
      if (dot) {
        anims.push(
          dot.animate(
            [
              { opacity: 0, transform: "scale(0)" },
              { opacity: 1, transform: "scale(1)" },
            ],
            {
              ...ease,
              duration: 350,
              delay: t,
            }
          )
        );
      }
      t += 90;

      // 3. Eyebrow slides in from the left (+115ms)
      push(sec.querySelector("[data-anim=eyebrow]"), 440, {
        opacity: 0,
        transform: "translateX(-14px)",
      });
      t += 115;

      // 4. Headline lines rise inside hidden masks (+120ms each)
      sec.querySelectorAll("[data-anim=h1line]").forEach((line) => {
        push(line, 700, { opacity: 0, transform: "translateY(100%)" });
        t += 120;
      });

      // 5. Paragraph & CTA button float up (+95ms)
      push(sec.querySelector("[data-anim=para]"), 540, {
        opacity: 0,
        transform: "translateY(20px)",
      });
      t += 95;

      push(sec.querySelector("[data-anim=cta]"), 540, {
        opacity: 0,
        transform: "translateY(20px)",
      });
      t += 95;

      // 6. The 3 Frosted Glass metric cards cascade up one by one (+100ms each)
      sec.querySelectorAll("[data-anim=card]").forEach((card) => {
        push(card, 580, { opacity: 0, transform: "translateY(32px)" });
        t += 100;
      });

      // Cleanup: Automatically cancels itself once done so styles don't conflict
      anims.at(-1)?.finished.then(() => {
        done = true;
        anims.forEach((a) => a.cancel());
      });
    };

    // Wait until fonts are loaded before starting to avoid layout shifts (FOUT)
    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      setTimeout(run, 150);
    }

    return () => {
      done = true;
      anims.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <section
      ref={secRef}
      id="hero"
      className="relative w-full min-h-[100dvh] bg-[#CBCFB8] overflow-hidden flex flex-col justify-center"
    >
      {/* ── LAYER 0: Ambient Reception Background (Full bleed, unified, focal shifted) ── */}
      <div
        data-anim="bg"
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Full unified base background color layer across 100% width */}
        <div className="absolute inset-0 bg-[#CBCFB8]" />

        {/* Full-bleed background image with right-shifted focal point (.hero-bg-focal) framing the desk logo */}
        <div
          className="hero-bg-focal absolute inset-0 bg-cover bg-no-repeat opacity-85 sm:opacity-90"
          style={{
            backgroundImage: "url('/hero-reception.png')",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0, 0, 0, 0.35) 18%, rgba(0, 0, 0, 0.85) 36%, black 52%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0, 0, 0, 0.35) 18%, rgba(0, 0, 0, 0.85) 36%, black 52%, black 100%)",
          }}
        />

        {/* Continuous full-width gradient wash keeping background layer 100% unified without separation */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#CBCFB8]/90 via-[#CBCFB8]/45 to-transparent" />

        {/* Right side shadow framing the metric cards with soft ambient depth */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-[45%] lg:w-[32%] xl:w-[28%] bg-gradient-to-l from-[#CBCFB8] via-[#CBCFB8]/70 to-transparent pointer-events-none" />

        {/* Gentle bottom boundary fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#CBCFB8] via-[#CBCFB8]/60 to-transparent" />
      </div>

      {/* ── LAYER 1: Main Responsive Content Layout ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto">
          {/* LEFT: Copy block with refined font sizes from reference image */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start space-y-5 sm:space-y-6 max-w-xl">
            {/* Eyebrow */}
            <div
              data-anim="eyebrow"
              className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#1E3227]"
            >
              <span
                data-anim="dot"
                className="w-1.5 h-1.5 bg-[#1E3227] inline-block"
              />
              <span>Expanding Pharmacies · Doorstep Delivery</span>
            </div>

            {/* Headline with Masked Rise: Refined font size & lighter weight */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-medium tracking-tight text-[#1E3227] leading-[1.08]">
              <span className="block overflow-hidden py-0.5">
                <span data-anim="h1line" className="block">
                  Quality Medicines.
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span
                  data-anim="h1line"
                  className="block font-normal text-[#1E3227]/90"
                >
                  Care You Can Trust.
                </span>
              </span>
            </h1>

            {/* Paragraph: Exactly matched length (~135 chars) and width to reference image (2 lines) */}
            <p
              data-anim="para"
              className="text-sm sm:text-[15px] text-[#3F5447] font-normal leading-relaxed max-w-[500px]"
            >
              Expanding pharmacy chain across branch locations with 100% genuine medicines — delivering prompt prescription care directly to your doorstep.
            </p>

            {/* CTA Button: Single pill button matching reference image */}
            <div data-anim="cta" className="pt-2">
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E3227] hover:bg-[#15241c] text-[#CBCFB8] hover:text-white font-medium text-sm shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <span>Enquire &amp; Order Medicines</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT: Frosted Glass Metric Cards with refined compact font scaling */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 items-stretch sm:items-center lg:items-end justify-center w-full">
            {/* Card 1: Pharmacy Chain */}
            <GlassCard
              icon={<Building2 className="w-3 h-3" />}
              label="PHARMACY CHAIN"
              value="Multi-Branch"
              unit="EXPANDING REGIONAL NETWORK"
              unitHighlight={true}
            />

            {/* Card 2: Doorstep Delivery */}
            <GlassCard
              icon={<Truck className="w-3 h-3" />}
              label="DOORSTEP DELIVERY"
              value="On Enquiry"
              unit="MEDICINE STOCK TO YOUR DOOR"
              unitHighlight={true}
            />

            {/* Card 3: 100% Genuine */}
            <GlassCard
              icon={<ShieldCheck className="w-3 h-3" />}
              label="ASSURED QUALITY"
              value="100% Genuine"
              unit="VERIFIED &amp; CERTIFIED STOCK"
              unitHighlight={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
