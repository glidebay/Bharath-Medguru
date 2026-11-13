"use client";

import React, { useState } from "react";
import { ArrowRight, Moon, Flame, Activity, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

interface GlassCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  unit: string;
  gold?: boolean;
}

function GlassCard({ icon, label, value, unit, gold }: GlassCardProps) {
  return (
    <div
      className="w-full sm:w-[210px] lg:w-[224px] p-4 sm:p-5 rounded-2xl flex flex-col justify-between gap-2.5 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.28) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255, 255, 255, 0.75)",
        borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
        borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
        boxShadow:
          "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.10), 0 3px 10px rgba(30, 50, 39, 0.04)",
      }}
    >
      {/* Label: Icon + Text */}
      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-[#1E3227]/80">
        <span className="text-[#1E3227]">{icon}</span>
        <span>{label}</span>
      </div>

      {/* Big Numeral */}
      <div className="text-3xl sm:text-4xl lg:text-[44px] font-light text-[#1E3227] tracking-tight leading-none">
        {value}
      </div>

      {/* Unit / Rating */}
      <div
        className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase ${
          gold ? "text-[#9B8A3E]" : "text-[#1E3227]/60"
        }`}
      >
        {unit}
      </div>
    </div>
  );
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] bg-[#CBCFB8] overflow-hidden flex flex-col justify-center"
    >
      {/* ── LAYER 0: Ambient Reception Background ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        {/* Soft background blurred wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-60 scale-105"
          style={{ backgroundImage: "url('/hero-reception.png')" }}
        />

        {/* Hero clinic reception center focal */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: "url('/hero-reception.png')",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 95%)",
          }}
        />

        {/* Sage atmospheric wash */}
        <div className="absolute inset-0 bg-[#CBCFB8]/40" />

        {/* Subtle decorative glass circle arc */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/30 pointer-events-none" />

        {/* Left & Right Legibility Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#CBCFB8] via-[#CBCFB8]/80 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#CBCFB8] via-transparent to-[#CBCFB8]/60" />
      </div>

      {/* ── LAYER 1: Main Responsive Content Layout ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto">
          {/* LEFT: Copy block */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start space-y-6 sm:space-y-8 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/40 border border-white/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1E3227] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#1E3227]">
                Tracking 24/7 · Clinical Diagnostics
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[76px] font-medium tracking-tight text-[#1E3227] leading-[1.06]">
              Know Your Body. <br />
              <span className="font-normal text-[#1E3227]/90">Move With It.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-[#2C3E33] font-normal leading-relaxed max-w-xl">
              Sleep, recovery, stress, heart rate and activity — tracked continuously and turned into clinical insights you can actually use.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1E3227] hover:bg-[#15241c] text-[#CBCFB8] hover:text-white font-medium text-sm sm:text-base shadow-lg transition-all duration-300 cursor-pointer"
              >
                <span>Explore More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/30 hover:bg-white/50 text-[#1E3227] font-medium text-sm sm:text-base border border-white/50 transition-colors"
              >
                <span>How It Works</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Frosted Glass Metric Cards */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-5 items-stretch sm:items-center lg:items-end justify-center w-full">
            {/* Card 1: Sleep */}
            <GlassCard
              icon={<Moon className="w-4 h-4" />}
              label="SLEEP"
              value={
                <span>
                  7<span className="text-xl sm:text-2xl mr-1 ml-0.5">H</span>
                  42<span className="text-xl sm:text-2xl ml-0.5">M</span>
                </span>
              }
              unit="OPTIMAL RECOVERY"
              gold={true}
            />

            {/* Card 2: Calories */}
            <GlassCard
              icon={<Flame className="w-4 h-4" />}
              label="CALORIES"
              value="1,642"
              unit="ACTIVE KCAL"
              gold={true}
            />

            {/* Card 3: HRV */}
            <GlassCard
              icon={<Activity className="w-4 h-4" />}
              label="HEART RATE"
              value="68"
              unit="RESTING BPM"
              gold={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
