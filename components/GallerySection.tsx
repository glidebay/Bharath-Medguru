"use client";

import React from "react";
import ArcCardCarousel, { ArcCardItem } from "@/components/ArcCardCarousel";

interface GallerySectionProps {
  onSelectExperience?: (title: string) => void;
}

const HEALTHCARE_SERVICES: ArcCardItem[] = [
  {
    src: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1200&q=80",
    title: "Chain of Retail Pharmacies",
    meta: "Core Network • Multi-Branch Locations & 100% Genuine Medicines",
    description:
      "Our expanding chain of trusted retail pharmacies operates across different branch locations, stocking authenticated, licensed pharmaceuticals, chronic medications, surgical supplies, and wellness products under strict climate-controlled conditions.",
    alt: "Bharath MedGuru Chain of Retail Pharmacies across Different Locations",
  },
  {
    src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    title: "Medicine Delivery on Enquiry",
    meta: "Fast Doorstep Dispatch • WhatsApp / Call / Online Prescription Enquiry",
    description:
      "Simply enquire with your medicine list or prescription. Our pharmacists verify stock across our branch network, dispense genuine sealed medications, and promptly deliver directly to your home or office location.",
    alt: "Bharath MedGuru Medicine Stock Delivery to Your Location",
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    title: "Outpatient Clinic Consultations",
    meta: "Supportive Healthcare • Specialist Doctor Consultations",
    description:
      "In addition to our pharmacy chain, our connected medical clinical chambers offer expert doctor consultations in General Medicine, Cardiology, Orthopedics, and Pediatrics for accurate diagnosis and prescription guidance.",
    alt: "Bharath MedGuru Outpatient Doctor Consultations",
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    title: "Automated Diagnostic Laboratory",
    meta: "Supportive Diagnostics • Biochemistry, Pathology & Blood Screening",
    description:
      "Supporting our clinical ecosystem, our automated diagnostic lab performs hematology, biochemistry, routine blood profiles, and wellness investigations with accurate digital reports sent straight to your phone.",
    alt: "Bharath MedGuru Automated Diagnostic Laboratory",
  },
];

export default function GallerySection({ onSelectExperience }: GallerySectionProps) {
  return (
    <section id="service" className="relative bg-[#CBCFB8] overflow-visible pt-20 sm:pt-28">
      {/* Header: Clean & Simple, Matching PathSection */}
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
          Our Services
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227]">
          Pharmacy Chain &amp; <br />
          <span className="font-normal text-[#1E3227]">Healthcare Services</span>
        </h2>
        <p className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed max-w-xl mx-auto">
          Our core retail pharmacy chain brings genuine medicines and doorstep delivery on enquiry, with clinic and lab support when you need medical care.
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
