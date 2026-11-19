"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ArrowRight, Star, Building2, Truck, ShieldCheck, Pill, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SessionsSectionProps {
  onBookPractitioner: (practitionerName: string, serviceName: string) => void;
}

export default function SessionsSection({ onBookPractitioner }: SessionsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sessions = [
    {
      id: "card1",
      name: "Prescription Verification & Dispensing",
      specialty: "Licensed Pharmacist Supervision",
      format: "All Branch Locations",
      duration: "100% Genuine Sealed Stock",
      rating: "5.0",
      reviews: "1,200+",
      image:
        "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80",
      description:
        "Every doctor prescription is meticulously verified by our registered chief pharmacists for correct chemical dosage, potential contraindications, and patient safety before being dispensed from our temperature-controlled branch inventory.",
    },
    {
      id: "card2",
      name: "Doorstep Medicine Delivery on Enquiry",
      specialty: "Fast Stock Dispatch to Your Location",
      format: "Prompt Courier Delivery",
      duration: "Direct from Nearest Branch",
      rating: "4.9",
      reviews: "980+",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
      description:
        "Simply send your prescription or required medicine list via WhatsApp or website enquiry. Our pharmacy team coordinates with the nearest physical branch to safely package and deliver authentic medications directly to your home.",
    },
    {
      id: "card3",
      name: "Chronic Disease Medicine Refills",
      specialty: "Diabetes, Cardiac, BP & Thyroid Care",
      format: "Automated Monthly Schedule",
      duration: "Never Miss a Critical Dose",
      rating: "5.0",
      reviews: "850+",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      description:
        "Structured subscription refilling for long-term health maintenance. We maintain cold-chain storage for insulins and biologics, dispatching your recurring monthly medication package right before your current supply runs out.",
    },
    {
      id: "card4",
      name: "Surgicals, Monitoring Devices & Wellness",
      specialty: "Medical Equipment & Family Health",
      format: "In-Store & Delivery",
      duration: "Certified Healthcare Brands",
      rating: "4.9",
      reviews: "640+",
      image:
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
      description:
        "Extensive branch stock of digital blood pressure monitors, glucometers, nebulizers, orthopedic braces, wound care consumables, adult diapers, mother & baby healthcare essentials, and certified nutritional wellness supplements.",
    },
  ];

  // 3D Stacking Card Overlay Animation with GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          // Scale down the card underneath smoothly as the next card overlays it
          gsap.to(card, {
            scale: 0.95 - (cards.length - 1 - i) * 0.018,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 85%",
              end: "top 25%",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="session" className="py-12 sm:py-18 lg:py-28 bg-[#CBCFB8] relative overflow-hidden">
      {/* Ambient glass refraction glows isolated in an overflow-hidden backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-[550px] h-[400px] bg-white/35 rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-1/4 right-1/10 w-[550px] h-[400px] bg-[#9B8A3E]/20 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
            <Pill className="w-3.5 h-3.5 text-[#9B8A3E]" />
            <span>Pharmacy Care &amp; Branch Services</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227]">
            Expert Pharmacy Services, <br />
            <span className="font-normal text-[#1E3227]">Across Our Branch Network</span>
          </h2>
          <p className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed">
            Our registered pharmacists and branch locations ensure certified medicine dispensing, safety checks, chronic refill management, and fast doorstep delivery on enquiry.
          </p>
        </div>

        {/* 3D Stacking Cards Deck (Overlaying Frosted Sage Glass Cards) */}
        <div ref={containerRef} className="relative pb-12 sm:pb-16 lg:pb-24">
          {sessions.map((item, index) => {
            return (
              <div
                key={item.id}
                id={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{
                  position: "sticky",
                  top: `calc(76px + ${index * 14}px)`,
                  zIndex: index + 10,
                  marginBottom: index === sessions.length - 1 ? "32px" : "8vh",
                  transformOrigin: "top center",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.30) 100%)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255, 255, 255, 0.70)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                  borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                  boxShadow:
                    "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 20px 48px -6px rgba(30, 50, 39, 0.14), 0 4px 14px rgba(30, 50, 39, 0.06)",
                }}
                className="w-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 md:p-9 transition-shadow duration-300 overflow-hidden will-change-transform"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-14 items-center">
                  {/* Left Column: Pharmacy Service Photo */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[476/443] w-full rounded-[20px] overflow-hidden bg-[#CBCFB8]/40 shadow-inner">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Rating pill */}
                      <div className="absolute top-4 left-4 bg-[#1E3227]/90 backdrop-blur-xs text-[#CBCFB8] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating} ({item.reviews} satisfied customers)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Details & Enquiry */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Name */}
                      <h3 className="font-sans text-3xl sm:text-4xl font-semibold text-[#1E3227] tracking-tight mb-2">
                        {item.name}
                      </h3>

                      {/* Specialty divider pill */}
                      <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1E3227] bg-[#9B8A3E]/15 border border-[#9B8A3E]/25 px-3 py-1 rounded-md mb-4">
                        {item.specialty}
                      </div>

                      {/* Meta Pills (Format & Duration) */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#1E3227] mb-5">
                        <div className="flex items-center gap-1.5 bg-white/60 border border-[#1E3227]/12 px-3 py-1.5 rounded-full font-medium">
                          <Building2 className="w-3.5 h-3.5 text-[#1E3227]" />
                          <span>{item.format}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/60 border border-[#1E3227]/12 px-3 py-1.5 rounded-full font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1E3227]" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      {/* Rich Description */}
                      <p className="text-base text-[#3F5447] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-[#1E3227]/12 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-[#3F5447]">
                        Verified &amp; Temperature-Controlled Stock
                      </div>
                      <button
                        onClick={() => onBookPractitioner(item.name, item.specialty)}
                        className="inline-flex items-center gap-2 bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white py-3.5 px-7 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg cursor-pointer"
                      >
                        <span>Enquire for Stock / Delivery</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
