"use client";

import React from "react";
import { Sparkles, Calendar } from "lucide-react";

interface TeamSectionProps {
  onBookPractitioner: (name: string, role: string) => void;
}

export default function TeamSection({ onBookPractitioner }: TeamSectionProps) {
  const members = [
    {
      name: "Dr. Maya Varen",
      role: "Life & NLP Transformation Guide",
      experience: "12+ Yrs Experience",
      image: "https://framerusercontent.com/images/qvKeGHHrYFfC66e9wyyeA7VvoA8.png",
      bio: "Guiding clients across four continents to unhook from unconscious limitations and step into self-actualized purpose.",
      specialties: ["NLP Coaching", "Emotional Resilience", "Mindset Shift"],
    },
    {
      name: "Lena Hart",
      role: "Somatic Bodywork & Massage Specialist",
      experience: "10+ Yrs Experience",
      image: "https://framerusercontent.com/images/1ZdI5zS2t8LSeJBHSBEFZe5IG4.png?width=324&height=405",
      bio: "Master bodyworker specializing in craniosacral therapy and somatic trauma unwind through mindful therapeutic touch.",
      specialties: ["Myofascial Release", "Somatic Healing", "Acupressure"],
    },
    {
      name: "Aarav Desai",
      role: "Ayurvedic Physician & Health Coach",
      experience: "14+ Yrs Experience",
      image: "https://framerusercontent.com/images/kMhq2VtRc5KWJdMTfAWNR5VOlU.png?width=324&height=405",
      bio: "Rooted in classical Ayurveda and modern clinical nutrition to restore metabolic balance, gut vitality, and sleep cycles.",
      specialties: ["Panchakarma", "Dosha Balance", "Integrative Nutrition"],
    },
    {
      name: "Sofia Callen",
      role: "Master Reiki & Biofield Tuning Guide",
      experience: "9+ Yrs Experience",
      image: "https://framerusercontent.com/images/INHIg8sJ2AL0ad6MJMjBksYpEw.png?width=324&height=405",
      bio: "Sound practitioner calibrating bio-frequencies with weighted forks and Usui Reiki to harmonize electromagnetic flow.",
      specialties: ["Sound Tuning", "Reiki Energy", "Chakra Restoration"],
    },
  ];

  return (
    <section id="team" className="py-24 bg-[#f9fbf8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] text-xs font-semibold tracking-wide uppercase">
            Our Care Collective
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#163c3d]">
            Meet the Soul Circle
          </h2>
          <p className="text-base sm:text-lg text-[#526061] font-light leading-relaxed">
            Our team includes wellness veterans, accredited healers, and certified somatic coaches — all
            united by a shared purpose of compassionate care.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="bg-white rounded-[24px] border border-[#163c3d]/10 hover:border-[#163c3d]/35 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Portrait Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e2eddf]/40">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Experience Badge */}
                <div className="absolute top-3 left-3 bg-[#163c3d]/85 backdrop-blur-xs text-[#e2eddf] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  {member.experience}
                </div>

                {/* Hover overlay with button */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#163c3d]/90 via-[#163c3d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <button
                    onClick={() => onBookPractitioner(member.name, member.role)}
                    className="w-full py-2.5 px-4 bg-[#e2eddf] text-[#163c3d] font-semibold text-xs uppercase tracking-wider rounded-full shadow-md hover:bg-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Session</span>
                  </button>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans text-xl font-semibold text-[#163c3d] mb-1">
                    {member.name}
                  </h3>
                  <div className="text-xs font-medium text-[#526061] mb-3">
                    {member.role}
                  </div>
                  <p className="text-xs text-[#526061] font-light leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                {/* Specialties Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#163c3d]/10">
                  {member.specialties.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[#f2f7f0] text-[#163c3d] px-2 py-0.5 rounded-md font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

