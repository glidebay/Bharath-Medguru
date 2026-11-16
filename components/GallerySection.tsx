"use client";

import React from "react";
import ArcCardCarousel, { ArcCardItem } from "@/components/ArcCardCarousel";

interface GallerySectionProps {
  onSelectExperience?: (title: string) => void;
}

const HEALTHCARE_SERVICES: ArcCardItem[] = [
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    title: "Multi-Specialty Medical Clinic",
    meta: "Specialist OPD • General Medicine, Orthopedics, Cardiology, Pediatrics",
    description:
      "Expert outpatient clinical consultations led by our senior Kerala specialists Dr. Roshna K. Nair, Dr. Harikrishnan Nambiar, Dr. Anoop Kurian, and Dr. Parvathy Warrier. Seamless appointment flow with zero wait times and comprehensive patient care.",
    alt: "Bharath MedGuru Multi-Specialty Medical Clinic",
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    title: "Automated Diagnostic Laboratory",
    meta: "NABL Benchmark • Automated Pathology, 2D Echo & Digital X-Ray",
    description:
      "High-precision diagnostic testing equipped with automated 5-part hematology and clinical biochemistry analyzers, high-resolution digital radiography, 2D Doppler echocardiograms, and rapid verified same-day digital reports.",
    alt: "Bharath MedGuru Automated Diagnostic Laboratory",
  },
  {
    src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    title: "24/7 In-Clinic Pharmacy",
    meta: "Licensed Pharmacy • 100% Genuine Temperature-Controlled Formulations",
    description:
      "Round-the-clock licensed pharmacy dispensary ensuring immediate access to authentic medications, specialized chronic disease treatments, pediatric formulations, and surgical consumables directly on clinic premises.",
    alt: "Bharath MedGuru 24/7 In-Clinic Pharmacy",
  },
  {
    src: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1200&q=80",
    title: "Chain of Retail Pharmacies",
    meta: "Retail Network • Doorstep Delivery & Stores across Kerala",
    description:
      "Our expanding trusted chain of retail community pharmacies serving families across Kerala and South India. Reliable prescription fulfillment, scheduled chronic medicine refills, authentic pharmaceutical distribution, and prompt home delivery.",
    alt: "Bharath MedGuru Chain of Retail Pharmacies",
  },
];

export default function GallerySection({ onSelectExperience }: GallerySectionProps) {
  return (
    <section id="service" className="relative bg-[#CBCFB8] overflow-visible pt-20 sm:pt-28">
      {/* Header: Clean & Simple, Matching PathSection */}
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
          Healthcare Services
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227]">
          Comprehensive Healthcare <br />
          <span className="font-normal text-[#1E3227]">Services</span>
        </h2>
        <p className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed max-w-xl mx-auto">
          Quality healthcare made simple — from expert doctor consultations and lab diagnostics to 24/7 pharmacy care.
        </p>
      </div>

      {/* Arc Card Carousel - Continuous Connected Ring */}
      <ArcCardCarousel
        items={HEALTHCARE_SERVICES}
        ariaLabel="Visual tour of Bharath MedGuru clinic, pharmacy, diagnostic lab, and chain of pharmacies"
        onBookItem={onSelectExperience}
      />
    </section>
  );
}
