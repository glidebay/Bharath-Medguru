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
    <section id="service" className="relative bg-[#CBCFB8] overflow-visible pt-0">
      {/* Arc Card Carousel - Continuous Connected Ring */}
      <ArcCardCarousel
        items={HEALTHCARE_SERVICES}
        ariaLabel="Visual tour of Bharath MedGuru clinic, pharmacy, diagnostic lab, and chain of pharmacies"
        onBookItem={onSelectExperience}
      />
    </section>
  );
}
