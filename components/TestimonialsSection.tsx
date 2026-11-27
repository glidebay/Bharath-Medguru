"use client";

import React from "react";
import { Star, MessageSquareHeart, User, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Ordering my parents' diabetic medications and insulins is effortless now. I just WhatsApp the prescription to Bharath MedGuru, and the sealed medicines arrive at our doorstep in Palakkad with proper temperature-regulated cooling packs.",
      name: "Mathew Varghese",
      role: "Palakkad • Monthly Refill Customer",
      rating: 5,
      modality: "Cold-Chain Delivery",
    },
    {
      quote:
        "Finding specialized cardiac drugs locally was always stressful until I reached out to Bharath MedGuru. Their licensed pharmacist verified branch inventory across Kerala and dispatched genuine sealed batches to Kochi the very same afternoon.",
      name: "Sujatha Warrier",
      role: "Kochi • Cardiac Care Caregiver",
      rating: 5,
      modality: "Prescription Care",
    },
    {
      quote:
        "I manage BP, cholesterol, and thyroid prescriptions for our whole family. Their automated monthly refill service ensures we never miss a dose. The pharmacy team verifies every batch before prompt dispatch.",
      name: "Dr. Radhakrishnan Nair",
      role: "Kozhikode • Regular Family Customer",
      rating: 5,
      modality: "Monthly Refills",
    },
    {
      quote:
        "During a late-evening emergency for pediatric antibiotic syrups, their branch team verified the prescription immediately and coordinated doorstep delivery. Having authenticated, tamper-proof medicine delivery in Thrissur is a blessing.",
      name: "Fathima Shihab",
      role: "Thrissur • Mother & Homemaker",
      rating: 5,
      modality: "Prompt Dispatch",
    },
    {
      quote:
        "What stands out about Bharath MedGuru is their strict adherence to 100% genuine pharmaceuticals. The pharmacist personally explained the dosage regimen and delivered post-surgery orthopedic recovery supplies right to our home.",
      name: "Anoop Menon",
      role: "Thiruvananthapuram • Post-Op Recovery",
      rating: 5,
      modality: "Genuine Medicines",
    },
  ];

  return (
    <section id="testimonial" className="py-12 sm:py-18 lg:py-28 bg-[#CBCFB8] relative overflow-hidden">
      {/* Ambient glass refraction glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-white/30 rounded-full blur-3xl opacity-80" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-[#9B8A3E]/15 rounded-full blur-3xl opacity-60" />

      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#9B8A3E]" />
            <span>Customer Voices</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227]">
            Trusted by Families Across India
          </h2>
          <p className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed">
            Real experiences from patients and caregivers across Kerala who rely on Bharath MedGuru for 100% genuine medicines, monthly refills, and prompt doorstep delivery.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Gliding Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fade gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#CBCFB8] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#CBCFB8] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 pb-6">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.18) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255, 255, 255, 0.65)",
                borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                boxShadow:
                  "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
              }}
              className="w-[380px] sm:w-[440px] rounded-[24px] p-8 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between flex-shrink-0"
            >
              <div>
                {/* Rating & Modality */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E3227] bg-[#9B8A3E]/15 px-3 py-1 rounded-full border border-[#9B8A3E]/20">
                    {item.modality}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-base text-[#3F5447] font-light leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author  */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#1E3227]/10">
                <div className="w-11 h-11 rounded-full bg-[#1E3227]/10 border border-[#1E3227]/15 flex items-center justify-center flex-shrink-0 text-[#1E3227] shadow-xs">
                  <User className="w-5 h-5 text-[#1E3227]/85" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-sans text-base font-semibold text-[#1E3227]">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9B8A3E]" />
                  </div>
                  <p className="text-xs text-[#3F5447]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
