"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShoppingBag,
  UploadCloud,
  RefreshCw,
  Truck,
  CheckCircle2,
  ArrowRight,
  Send,
  Smartphone,
  ShieldCheck,
  Clock,
} from "lucide-react";

interface ComingSoonSectionProps {
  onOpenBooking?: () => void;
}

export default function ComingSoonSection({ onOpenBooking }: ComingSoonSectionProps) {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setNotified(true);
    }
  };

  const upcomingFeatures = [
    {
      icon: <ShoppingBag className="w-5 h-5 text-[#9B8A3E]" />,
      title: "50,000+ Medicine Catalog & Search",
      tag: "Online Pharmacy Platform",
      description:
        "Comprehensive online catalog of prescription drugs, OTC products, daily wellness supplements, and surgical essentials with real-time branch inventory availability.",
      status: "In Active Development",
    },
    {
      icon: <UploadCloud className="w-5 h-5 text-[#9B8A3E]" />,
      title: "Instant Prescription Upload & Cart",
      tag: "Digital Verification",
      description:
        "Snap a photo of your doctor’s prescription and upload it directly. Our licensed pharmacists verify the dosages and automatically build your checkout basket.",
      status: "Prototype Tested",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#9B8A3E]" />,
      title: "Smart Chronic Refill Subscriptions",
      tag: "Automated Deliveries",
      description:
        "Automate monthly medicine supplies for diabetes, hypertension, cardiology, and chronic conditions so your family never misses a vital dose.",
      status: "Configuring Subscriptions",
    },
    {
      icon: <Truck className="w-5 h-5 text-[#9B8A3E]" />,
      title: "Nearest Branch Express Dispatch",
      tag: "Hyperlocal Delivery",
      description:
        "Orders routed automatically to the closest Bharath MedGuru retail branch location for rapid same-day doorstep fulfillment with live GPS tracking.",
      status: "Logistics Integration",
    },
  ];

  return (
    <section id="coming-soon" className="py-28 bg-[#CBCFB8] relative overflow-hidden">
      {/* Ambient background glows for frosted glass aesthetics */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-[600px] h-[350px] bg-white/40 rounded-full blur-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[600px] h-[350px] bg-[#9B8A3E]/20 rounded-full blur-3xl opacity-70" />

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
            <Sparkles className="w-3.5 h-3.5 text-[#9B8A3E]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227] leading-tight">
            Coming Soon: Online E-Commerce Pharmacy <br />
            <span className="font-normal text-[#1E3227]">
              Fast, Reliable Medicine Ordering Delivered to Your Doorstep
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed">
            We are upgrading our retail pharmacy chain with a full-featured digital e-commerce web and mobile application. Soon, you will be able to order medicines with 1-click prescription upload, track orders in real-time, and enjoy automated monthly refills.
          </p>
        </div>

        {/* Feature Cards Grid (Frosted Glass) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {upcomingFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-[24px] flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 group"
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
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#1E3227] text-[#CBCFB8] flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] border border-[#1E3227]/10">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227] mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-[#3F5447] font-light leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1E3227]/10 flex items-center justify-between text-xs">
                <span className="text-[#3F5447]/80 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#9B8A3E]" />
                  Status
                </span>
                <span className="font-semibold text-[#9B8A3E] tracking-wide">
                  {feature.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pre-launch Notification & Direct Delivery Banner */}
        <div
          className="rounded-[30px] p-8 sm:p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(30, 50, 39, 0.96) 0%, rgba(21, 36, 28, 0.98) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 20px 45px rgba(30, 50, 39, 0.18)",
            color: "#CBCFB8",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider uppercase text-[#CBCFB8] border border-white/10">
                <Smartphone className="w-3.5 h-3.5 text-[#9B8A3E]" />
                <span>Need Medicines Right Now?</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                Don’t Wait for Launch — We Deliver on Enquiry Today!
              </h3>

              <p className="text-sm sm:text-base text-[#CBCFB8]/85 font-light leading-relaxed max-w-xl">
                While our digital store is in final stages of rollout, you can immediately send your prescription or medicine inquiry to our team. We dispatch 100% genuine stock from our nearest branch straight to your doorstep.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#CBCFB8] text-[#1E3227] hover:bg-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-[1.02]"
                >
                  <span>Enquire for Immediate Delivery</span>
                  <ArrowRight className="w-4 h-4 text-[#1E3227]" />
                </a>
                <span className="text-xs text-[#CBCFB8]/70">
                  Or WhatsApp prescription to +91 80788 81234
                </span>
              </div>
            </div>

            {/* Right: Notify Me Box */}
            <div className="lg:col-span-5 bg-white/10 p-6 sm:p-7 rounded-2xl border border-white/15 backdrop-blur-md">
              <h4 className="text-lg font-semibold text-white mb-1.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9B8A3E]" />
                <span>Get Notified on Launch</span>
              </h4>
              <p className="text-xs text-[#CBCFB8]/80 mb-4 leading-relaxed">
                Be the first to access our new web app, app discounts, and free first delivery vouchers.
              </p>

              {notified ? (
                <div className="p-4 rounded-xl bg-white/20 border border-white/20 text-white flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#9B8A3E] flex-shrink-0" />
                  <p className="text-xs font-medium">
                    Thank you! You are on our VIP launch list. We’ll notify you as soon as the online pharmacy goes live!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/90 text-[#1E3227] placeholder:text-[#1E3227]/50 px-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9B8A3E] transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#9B8A3E] hover:bg-[#b09e4a] text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <span>Notify Me at Launch</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
