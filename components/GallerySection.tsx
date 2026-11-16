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
    <section id="gallery" className="relative bg-[#CBCFB8] overflow-visible">
      {/* Arc Card Carousel - Continuous Connected Ring */}
      <ArcCardCarousel
        items={HEALTHCARE_SERVICES}
        ariaLabel="Visual tour of Bharath MedGuru clinic, pharmacy, diagnostic lab, and chain of pharmacies"
        onBookItem={onSelectExperience}
      />
    </section>
  );
}
