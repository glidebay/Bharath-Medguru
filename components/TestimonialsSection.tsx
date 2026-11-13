"use client";

import React from "react";
import { Star, MessageSquareHeart } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The energy healing session with Lena was absolutely life-changing. I felt lighter, clearer, and deeply seen. This platform helped me reconnect with myself in ways I never expected.",
      name: "Amelia Jones",
      role: "Marketing Consultant",
      rating: 5,
      image: "https://framerusercontent.com/images/lx4Rn0VnV8SjGTXOsrNK92R5W0k.jpg",
      modality: "Energy Healing",
    },
    {
      quote:
        "Working with Lena opened a door I didn’t even know was closed. Her presence was calming, and the energy work peeled layers I had been carrying for years. I walked away feeling empowered.",
      name: "Luna park",
      role: "Marketing Head",
      rating: 5,
      image: "https://framerusercontent.com/images/W35y2oAusnY8GfUNfuhPboYHtr8.jpg",
      modality: "Sound Therapy",
    },
    {
      quote:
        "Dr. Maya’s life coaching gave me the mental framework to dismantle 5 years of chronic imposter syndrome and burnout. Truly transformational guidance.",
      name: "Marcus Vance",
      role: "Tech Founder",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      modality: "Life Coaching",
    },
    {
      quote:
        "The Himalayan bowl sound bath alleviated my chronic sleep struggles within two sessions. MedGuru is truly an oasis of calm in a chaotic world.",
      name: "Dr. Sarah Chen",
      role: "Holistic Practitioner",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      modality: "Sound Bath",
    },
    {
      quote:
        "Aarav’s Ayurvedic guidance completely reset my digestive fire and chronic fatigue. Ancient wisdom delivered with compassionate modern clarity.",
      name: "Priya Sharma",
      role: "Author & Advocate",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      modality: "Ayurveda",
    },
  ];

  return (
    <section id="testimonial" className="py-28 bg-[#e2eddf] relative overflow-hidden">
      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 text-[#163c3d] text-xs font-semibold tracking-wide uppercase border border-[#163c3d]/10">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Seeker Voices</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#163c3d]">
            What are they talking about?
          </h2>
          <p className="text-base sm:text-lg text-[#1f2d2e]/80 font-light leading-relaxed">
            Hear from clients who’ve found healing, clarity, and balance through our holistic offerings.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Gliding Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fade gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#e2eddf] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#e2eddf] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 pb-6">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="w-[380px] sm:w-[440px] bg-white rounded-[26px] p-8 border border-[#163c3d]/10 hover:border-[#163c3d]/30 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between flex-shrink-0"
            >
              <div>
                {/* Rating & Modality */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#163c3d] bg-[#f2f7f0] px-3 py-1 rounded-full border border-[#163c3d]/10">
                    {item.modality}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-base text-[#1f2d2e] font-light leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#163c3d]/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#163c3d]/20"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#163c3d]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#526061]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
