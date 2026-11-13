"use client";

import React, { useEffect, useRef, useState } from "react";
import { Clock, Video, ArrowRight, Star, Sparkles } from "lucide-react";

interface SessionsSectionProps {
  onBookPractitioner: (practitionerName: string, serviceName: string) => void;
}

export default function SessionsSection({ onBookPractitioner }: SessionsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sessions = [
    {
      id: "card1",
      name: "Dr. Maya Varen",
      specialty: "Specialized in Life Coaching",
      format: "In-person/online",
      duration: "90 minutes",
      rating: "5.0",
      reviews: "128",
      image:
        "https://framerusercontent.com/images/5uKjhPMJVcFmUVuASA2n1GkX1C8.png?width=476&height=443",
      description:
        "Personalised Life & NLP Coaching sessions in Sydney or online to help you overcome limiting beliefs, boost confidence, gain clarity, and create lasting change.",
      badge: "Get 15-Minutes Complimentary Zoom or Skype session with",
      topOffset: "top-[100px]",
      zIndex: 10,
    },
    {
      id: "card2",
      name: "Lena Hart",
      specialty: "Specialized in Holistic Massage",
      format: "In-person/online",
      duration: "90 minutes",
      rating: "4.9",
      reviews: "94",
      image:
        "https://framerusercontent.com/images/zU2tDQNiN0iH1kbIecTRuwC0Ao.png?width=476&height=443",
      description:
        "Therapeutic somatic bodywork designed to calm the nervous system, release deeply held musculoskeletal tension, and restore posture and emotional equilibrium.",
      badge: "Get 15-Minutes Complimentary Zoom or Skype session with",
      topOffset: "top-[130px]",
      zIndex: 20,
    },
    {
      id: "card3",
      name: "Aarav Desai",
      specialty: "Specialized in Holistic Health Coaching",
      format: "In-person/online",
      duration: "90 minutes",
      rating: "5.0",
      reviews: "115",
      image:
        "https://framerusercontent.com/images/YKsdox7sQ4exnAqCAE8LhEZloss.png?width=476&height=443",
      description:
        "Integrative wellness blending ancient Ayurvedic dosha balance with personalized nutrition, sleep hygiene, and holistic lifestyle routines for lifelong vitality.",
      badge: "Get 15-Minutes Complimentary Zoom or Skype session with",
      topOffset: "top-[160px]",
      zIndex: 30,
    },
    {
      id: "card4",
      name: "Sofia Callen",
      specialty: "Specialized in Biofield Tuning",
      format: "In-person/online",
      duration: "90 minutes",
      rating: "4.9",
      reviews: "142",
      image:
        "https://framerusercontent.com/images/OjEwt2OUY8IX43OAfPOY7rfMw.png?width=476&height=443",
      description:
        "Vibrational sound frequency balancing and subtle energetic clearing that clears stagnant emotional blockages and re-aligns your subtle biofield.",
      badge: "Get 15-Minutes Complimentary Zoom or Skype session with",
      topOffset: "top-[190px]",
      zIndex: 40,
    },
  ];

  return (
    <section id="session" className="py-28 bg-[#f9fbf8] relative">
      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] text-xs font-semibold tracking-wide uppercase">
            Personalized Sessions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#163c3d]">
            Personalized Sessions, <br />
            <span className="italic font-normal text-[#1f2d2e]">In-Person or Online</span>
          </h2>
          <p className="text-base sm:text-lg text-[#526061] font-light leading-relaxed">
            Choose from a range of healing sessions that match your energy, goals, and needs.
          </p>
        </div>

        {/* 3D Stacking Cards Deck (Framer Stacking Scroll Effect) */}
        <div ref={containerRef} className="relative space-y-12 pb-24">
          {sessions.map((item, index) => {
            return (
              <div
                key={item.id}
                id={item.id}
                style={{
                  zIndex: item.zIndex,
                }}
                className={`sticky ${item.topOffset} w-full bg-white rounded-[30px] border border-[#e2eddf] shadow-xl p-6 sm:p-10 md:p-12 transition-all duration-300 overflow-hidden`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Left Column: Practitioner Photo */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[476/443] w-full rounded-[20px] overflow-hidden bg-[#e2eddf]/30 shadow-inner">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Rating pill */}
                      <div className="absolute top-4 left-4 bg-[#163c3d]/90 backdrop-blur-xs text-[#e2eddf] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating} ({item.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Details & Booking */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Discovery Promo Header */}
                      <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#163c3d] bg-[#f2f7f0] border border-[#163c3d]/10 px-3.5 py-1.5 rounded-full mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[#163c3d]" />
                        <span>{item.badge}</span>
                      </div>

                      {/* Name */}
                      <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#163c3d] tracking-tight mb-2">
                        {item.name}
                      </h3>

                      {/* Specialty divider pill */}
                      <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#163c3d] bg-[#e2eddf] px-3 py-1 rounded-md mb-4">
                        {item.specialty}
                      </div>

                      {/* Meta Pills (Format & Duration) */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#1f2d2e] mb-5">
                        <div className="flex items-center gap-1.5 bg-[#f9fbf8] border border-[#163c3d]/15 px-3 py-1.5 rounded-full font-medium">
                          <Video className="w-3.5 h-3.5 text-[#163c3d]" />
                          <span>{item.format}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#f9fbf8] border border-[#163c3d]/15 px-3 py-1.5 rounded-full font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#163c3d]" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      {/* Rich Description */}
                      <p className="text-base text-[#526061] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-[#163c3d]/10 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-[#526061]">
                        Free 15-min discovery call included
                      </div>
                      <button
                        onClick={() => onBookPractitioner(item.name, item.specialty)}
                        className="inline-flex items-center gap-2 bg-[#163c3d] text-[#e2eddf] hover:bg-[#102d2e] py-3.5 px-7 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg cursor-pointer"
                      >
                        <span>get appointment now</span>
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
