"use client";

import React, { useState } from "react";
import {
  Pill,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Clock,
  X,
  Phone,
  Calendar,
  FileText,
  Activity,
  Sparkles,
  Truck,
  Building2,
} from "lucide-react";

interface BlogSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
}

interface PharmacyCategoryCardData {
  id: string;
  badge: string;
  subTagline: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  checklist: string[];
  detailedSections: {
    heading: string;
    description: string;
  }[];
  footer: {
    iconType: "pill" | "calendar" | "clock";
    title: string;
    subtitle: string;
  };
  sampleType: string;
  fastingGuidelines: string;
  turnaroundTime: string;
}

const PHARMACY_CATEGORY_CARDS: PharmacyCategoryCardData[] = [
  {
    id: "prescription-medicines",
    badge: "PRESCRIPTION MEDICINES",
    subTagline: "Chronic Care • Specialized Formulations",
    title: "Prescription Drugs & Specialized Chronic Care",
    excerpt:
      "100% genuine medications for diabetes, cardiology, neurology, respiratory health, and chronic illness stored under strict temperature-controlled cold chains.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    alt: "Prescription Medicines and Chronic Disease Treatments at Bharath MedGuru",
    checklist: [
      "Diabetic Care (Insulins, Metformin, Gliptins)",
      "Cardiovascular & BP (Statins, ARBs, Beta Blockers)",
      "Neurology & Mental Health Formulations",
      "Respiratory & Asthma Inhalers / Rotacaps",
      "Critical Care Antibiotics & Antivirals",
    ],
    detailedSections: [
      {
        heading: "Diabetes & Endocrine Therapies",
        description:
          "Cold-chain insulin cartridges, prefilled pens, GLP-1 receptor agonists, DPP-4 inhibitors, and oral hypoglycemic agents sourced directly from certified global pharmaceutical manufacturers.",
      },
      {
        heading: "Cardiovascular & Blood Pressure Management",
        description:
          "Complete spectrum of anti-hypertensives, beta-blockers, ACE inhibitors, calcium channel blockers, lipid-lowering statins, and blood thinners with batch-tested verification.",
      },
      {
        heading: "Neurology, Respiratory & Chronic Health",
        description:
          "Certified anticonvulsants, anti-migraine therapies, metered-dose inhalers (MDI), respules, and long-acting bronchodilators for chronic pulmonary and nervous system care.",
      },
      {
        heading: "Critical Care & Antibiotic Formulations",
        description:
          "Full clinical dispensary of authentic oral and injectable antibiotics, antifungals, immunosuppressants, and post-operative medications dispensed under licensed pharmacist supervision.",
      },
    ],
    footer: {
      iconType: "pill",
      title: "10,000+ Formulations",
      subtitle: "Direct from Certified Makers",
    },
    sampleType: "Available across all branch locations & on enquiry",
    fastingGuidelines: "Strict 2°C–8°C cold chain and humidity-regulated storage",
    turnaroundTime: "Same-day doorstep delivery to your location upon enquiry",
  },
  {
    id: "essential-wellness-tests",
    badge: "DAILY WELLNESS & OTC",
    subTagline: "Vitamins • Nutrition • Preventive Health",
    title: "Vitamins, Supplements & Preventive Wellness",
    excerpt:
      "Certified dietary supplements, immunity boosters, ayurvedic preparations, and health nutrition products curated to support everyday health and family vitality.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    alt: "Wellness and Over the Counter Health Supplies at Bharath MedGuru",
    checklist: [
      "Multivitamins, Minerals & Antioxidant Complexes",
      "Bone & Joint Health (Calcium, Vitamin D3, Glucosamine)",
      "Herbal, Ayurvedic & Natural Wellness Formulations",
      "Protein Powders & Specialized Geriatric Nutrition",
      "Pediatric Growth Supplements & Drops",
    ],
    detailedSections: [
      {
        heading: "Vitamins & Micronutrient Essentials",
        description:
          "High-absorption Vitamin D3 (60k IU), active Methylcobalamin B12, Vitamin C, Zinc, and therapeutic multi-mineral formulations for sustained energy and immune resilience.",
      },
      {
        heading: "Bone, Joint & Musculoskeletal Vitality",
        description:
          "Clinically validated Calcium Carbonate / Citrate, Collagen peptides, Glucosamine, and chondroitin therapies to maintain joint mobility and bone density.",
      },
      {
        heading: "Ayurvedic & Natural Formulations",
        description:
          "Standardized herbal extracts, Chyawanprash, digestive wellness tonics, and natural immunity boosters compliant with verified health benchmarks.",
      },
      {
        heading: "Specialized Family & Geriatric Nutrition",
        description:
          "Diabetic-friendly nutritional shakes, high-protein supplements, pediatric electrolyte solutions, and balanced meal replacers for elderly patient recuperation.",
      },
    ],
    footer: {
      iconType: "calendar",
      title: "Daily Health & Immunity",
      subtitle: "Certified brands & formulations",
    },
    sampleType: "In-stock across all branch retail counters",
    fastingGuidelines: "Quality-tested, sealed packaging with clear usage guidelines",
    turnaroundTime: "Immediate counter purchase or fast doorstep delivery",
  },
  {
    id: "surgicals-devices",
    badge: "SURGICALS & MEDICAL DEVICES",
    subTagline: "Diagnostic Monitors • Mobility • Home Care",
    title: "Home Medical Devices & Surgical Supplies",
    excerpt:
      "Precision home health diagnostic instruments, surgical disposables, wound care dressing materials, and orthopedic aids for post-operative and home patient care.",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    alt: "Home Medical Devices and Surgical Supplies at Bharath MedGuru",
    checklist: [
      "Digital BP Monitors & Fingertip Pulse Oximeters",
      "Blood Glucose Monitors (Glucometers) & Test Strips",
      "Compressor Nebulizers & Respiratory Vaporizers",
      "Sterile Gauze, Bandages & Advanced Wound Care",
      "Orthopedic Belts, Lumbar Supports & Walking Aids",
    ],
    detailedSections: [
      {
        heading: "Vital Sign & Diagnostic Monitors",
        description:
          "Clinically validated digital blood pressure monitors, infrared non-contact thermometers, and fingertip pulse oximeters with manufacturer warranty for reliable home vital tracking.",
      },
      {
        heading: "Blood Glucose & Diabetes Monitoring",
        description:
          "High-accuracy glucometer starter kits, calibrated test strips, lancets, and lancing devices for painless daily blood sugar tracking.",
      },
      {
        heading: "Respiratory Home Care & Inhalation",
        description:
          "Heavy-duty compressor nebulizers, adult and pediatric masks, steam vaporizers, and spacer chambers for effective bronchodilator delivery.",
      },
      {
        heading: "Surgical Consumables & Orthopedic Support",
        description:
          "Sterile surgical dressings, micropore tapes, antiseptic solutions, lumbar sacral (LS) belts, knee braces, cervical collars, and mobility walking sticks.",
      },
    ],
    footer: {
      iconType: "clock",
      title: "Pharmacy Branch Hours",
      subtitle: "Mon - Sat: 8 am - 8 pm | Sun: 9 am - 5 pm",
    },
    sampleType: "Comprehensive inventory in all pharmacy branches",
    fastingGuidelines: "Sterile sealed units with full manufacturer warranty",
    turnaroundTime: "Dispatched to your location upon enquiry",
  },
];

export default function BlogSection({ onOpenBooking }: BlogSectionProps) {
  const [activeCard, setActiveCard] = useState<PharmacyCategoryCardData | null>(null);

  const renderFooterIcon = (iconType: "pill" | "calendar" | "clock") => {
    switch (iconType) {
      case "pill":
        return <Pill className="w-4 h-4 text-[#1E3227]" />;
      case "calendar":
        return <CalendarCheck className="w-4 h-4 text-[#1E3227]" />;
      case "clock":
        return <Clock className="w-4 h-4 text-[#1E3227]" />;
    }
  };

  return (
    <section id="blog" className="py-12 sm:py-18 lg:py-24 bg-[#CBCFB8] relative overflow-hidden">
      {/* Ambient glass refraction glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/10 w-[500px] h-[350px] bg-white/35 rounded-full blur-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/10 w-[500px] h-[350px] bg-[#9B8A3E]/15 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
            <Pill className="w-3.5 h-3.5 text-[#9B8A3E]" />
            <span>Pharmacy Categories</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-[#1E3227] leading-[1.14]">
            Comprehensive Pharmacy &amp; Healthcare Supplies
          </h2>

          <p className="text-base sm:text-lg text-[#3F5447] font-normal leading-relaxed max-w-2xl mx-auto">
            A wide range of genuine prescription medicines, chronic disease formulations, wellness supplements, and surgical essentials available across our pharmacy branches and for delivery.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PHARMACY_CATEGORY_CARDS.map((card) => (
            <article
              key={card.id}
              onClick={() => setActiveCard(card)}
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.22) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255, 255, 255, 0.70)",
                borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                boxShadow:
                  "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
              }}
              className="rounded-[24px] overflow-hidden flex flex-col justify-between hover:scale-[1.015] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#CBCFB8]/40">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-3.5 left-3.5 bg-[#1E3227] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                    {card.badge}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7 space-y-3.5">
                  <div className="text-[11px] font-semibold tracking-wider uppercase text-[#9B8A3E]">
                    {card.subTagline}
                  </div>

                  <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227] leading-tight group-hover:text-[#15241c] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-[#3F5447] font-light leading-relaxed line-clamp-3">
                    {card.excerpt}
                  </p>

                  {/* Top 3 Checklist Preview */}
                  <div className="pt-2 space-y-2 border-t border-[#1E3227]/10">
                    {card.checklist.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#1E3227] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3227] flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {card.checklist.length > 3 && (
                      <div className="text-[11px] text-[#9B8A3E] font-semibold pt-1">
                        +{card.checklist.length - 3} more product lines included
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer with Meta + View Arrow */}
              <div className="p-6 sm:p-7 pt-0">
                <div className="pt-4 border-t border-[#1E3227]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/60 border border-[#1E3227]/10 flex items-center justify-center flex-shrink-0">
                      {renderFooterIcon(card.footer.iconType)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1E3227]">
                        {card.footer.title}
                      </div>
                      <div className="text-[10px] text-[#3F5447]">
                        {card.footer.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#1E3227] text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#15241c] transition-all flex-shrink-0 shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail Slideover / Modal for Pharmacy Category */}
      {activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-white/60"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 246, 240, 0.98) 100%)",
              backdropFilter: "blur(32px)",
              color: "#1E3227",
            }}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1E3227] flex items-center justify-center border border-[#1E3227]/15 shadow-sm transition-all cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-[11px] font-semibold tracking-wider uppercase">
                <Sparkles className="w-3 h-3 text-[#9B8A3E]" />
                <span>{activeCard.badge}</span>
              </div>
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#1E3227] leading-snug">
                {activeCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#9B8A3E] font-semibold uppercase tracking-wider">
                {activeCard.subTagline}
              </p>
            </div>

            {/* Modal Body */}
            <div className="space-y-5">
              {/* Image banner */}
              <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden bg-black/5 shadow-inner">
                <img
                  src={activeCard.image}
                  alt={activeCard.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Complete Checklist */}
              <div className="bg-white/70 p-5 rounded-2xl border border-[#1E3227]/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E3227] uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-[#9B8A3E]" />
                  <span>Key Formulations &amp; Supplies Included</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeCard.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-[#1E3227]">
                      <CheckCircle2 className="w-4 h-4 text-[#1E3227] fill-[#1E3227]/15 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4 pt-1">
                <h4 className="font-sans text-base font-bold text-[#1E3227] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#9B8A3E]" />
                  <span>Category &amp; Therapeutic Scope</span>
                </h4>
                <div className="space-y-3">
                  {activeCard.detailedSections.map((sec, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/45 border border-[#1E3227]/10">
                      <div className="text-xs font-bold text-[#1E3227] mb-1">
                        {sec.heading}
                      </div>
                      <p className="text-xs text-[#3F5447] font-light leading-relaxed">
                        {sec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guidelines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/50 border border-[#1E3227]/10">
                  <span className="font-semibold text-[#1E3227] block mb-0.5">Availability:</span>
                  <span className="text-[#3F5447]">{activeCard.sampleType}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/50 border border-[#1E3227]/10">
                  <span className="font-semibold text-[#1E3227] block mb-0.5">Storage &amp; Handling:</span>
                  <span className="text-[#3F5447]">{activeCard.fastingGuidelines}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/50 border border-[#1E3227]/10 sm:col-span-2">
                  <span className="font-semibold text-[#1E3227] block mb-0.5">Delivery &amp; Refill:</span>
                  <span className="text-[#3F5447]">{activeCard.turnaroundTime}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setActiveCard(null);
                    onOpenBooking?.(activeCard.title);
                  }}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Enquire / Order Stock</span>
                </button>

                <a
                  href="tel:+917994066647"
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white/90 hover:bg-white text-[#1E3227] text-xs font-semibold uppercase tracking-wider border border-[#1E3227]/15 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9B8A3E]" />
                  <span>Call +91 79940 66647</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
