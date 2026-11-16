"use client";

import React, { useState } from "react";
import {
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  Microscope,
  CalendarCheck,
  Clock,
  X,
  Phone,
  Calendar,
  FileText,
  Activity,
  Sparkles,
} from "lucide-react";

interface BlogSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
}

interface LabCardData {
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
    iconType: "microscope" | "calendar" | "clock";
    title: string;
    subtitle: string;
  };
  sampleType: string;
  fastingGuidelines: string;
  turnaroundTime: string;
}

const LAB_INVESTIGATIONS_CARDS: LabCardData[] = [
  {
    id: "specialized-tests",
    badge: "SPECIALIZED TESTS",
    subTagline: "Diagnostic Screening • Infection Testing",
    title: "Infertility, Infection & Screening Tests",
    excerpt:
      "Targeted diagnostic screening covering hormonal fertility markers, viral and bacterial infectious serology, vital vitamins & minerals, and maternal fetal screening.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    alt: "Infertility, Infection and Screening Tests at Bharath MedGuru",
    checklist: [
      "Infertility Markers (FSH, LH, Estradiol, AMH)",
      "Infectious Diseases (HIV, Hepatitis, Dengue, etc.)",
      "Vitamins & Minerals (Ferritin, Vitamin D3, B12, etc.)",
      "Immuno Hematology (Blood Group, Coombs Test)",
      "Screening for Down's Syndrome (Double, Triple, Quadruple)",
    ],
    detailedSections: [
      {
        heading: "Infertility & Reproductive Hormones",
        description:
          "Quantitative evaluation of Anti-Müllerian Hormone (AMH), Follicle Stimulating Hormone (FSH), Luteinizing Hormone (LH), Estradiol, Progesterone, and Prolactin to assess ovarian reserve and endocrine reproductive health.",
      },
      {
        heading: "Infectious Disease Serology",
        description:
          "High-sensitivity automated chemiluminescence screening for HIV I & II, Hepatitis B surface antigen (HBsAg), Hepatitis C (HCV), Dengue NS1 antigen and antibodies (IgM/IgG), Typhoid, and Syphilis (VDRL).",
      },
      {
        heading: "Vitamins, Minerals & Hematology",
        description:
          "Serum Ferritin, Total Iron Binding Capacity, Vitamin D3 (25-OH), and Active Vitamin B12 paired with ABO/Rh Blood Grouping and direct/indirect Coombs testing for pre-surgical and chronic deficiency screening.",
      },
      {
        heading: "Maternal Fetal Screening",
        description:
          "Prenatal maternal biochemical risk screening including Double Marker (first trimester), Triple Marker, and Quadruple Marker (second trimester) for fetal aneuploidy and Down's syndrome risk calculation.",
      },
    ],
    footer: {
      iconType: "microscope",
      title: "Wide Range of Tests",
      subtitle: "For all age groups",
    },
    sampleType: "Venous Blood / Serum (EDTA / Plain)",
    fastingGuidelines: "8–10 hours fasting recommended for vitamin & mineral panels; non-fasting for infectious serology",
    turnaroundTime: "Same-day verified digital report dispatch (within 4 to 6 hours)",
  },
  {
    id: "essential-health-tests",
    badge: "ESSENTIAL HEALTH TESTS",
    subTagline: "Routine Check-ups • Organ Function • Hormone Tests",
    title: "Biochemistry, Organ Function & Hormone Tests",
    excerpt:
      "Core clinical biochemistry evaluating fasting glucose, lipid fractionations, liver enzymes (LFT), complete thyroid panels, and ionic electrolyte equilibria.",
    image: "/images/biochemistry-analyzer-hd.jpg",
    alt: "Biochemistry, Organ Function and Hormone Tests automated analyzer",
    checklist: [
      "Biochemistry (Blood Sugar, Urea, Creatinine, etc.)",
      "Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)",
      "Liver Function Test (Bilirubin, SGOT, SGPT, etc.)",
      "Thyroid Profile (T3, T4, Free T3, Free T4)",
      "Electrolytes (Sodium, Potassium, Chloride, etc.)",
    ],
    detailedSections: [
      {
        heading: "Comprehensive Blood Biochemistry",
        description:
          "Fasting Blood Sugar (FBS), Postprandial Blood Sugar (PPBS), Glucose Tolerance Test (GTT), Glucose Challenge Test (GCT), HbA1c (Glycated Hemoglobin), Blood Urea, Serum Creatinine, Uric Acid, Calcium, Phosphorous, Magnesium, CPK, CPK-MB, LDH, Amylase, Lipase, Ammonia, ADA, C-Peptide, and Fasting Insulin.",
      },
      {
        heading: "Lipid Profile & Heart Health",
        description:
          "Total Serum Cholesterol, High-Density Lipoprotein (HDL - 'good' cholesterol), Low-Density Lipoprotein (LDL - 'bad' cholesterol), Serum Triglycerides, and VLDL with Atherogenic Index calculation for cardiovascular assessment.",
      },
      {
        heading: "Liver Function Tests (LFT)",
        description:
          "Total Bilirubin, Direct & Indirect Bilirubin, SGOT (AST), SGPT (ALT), Alkaline Phosphatase, Gamma GT (GGT), and Total Protein with Albumin/Globulin ratio to evaluate hepatic cellular integrity and biliary clearance.",
      },
      {
        heading: "Thyroid & Electrolyte Profile",
        description:
          "Complete thyroid assessment including Free T3, Free T4, Total T3, Total T4, TSH, Anti-TPO Antibody, and Anti-Thyroglobulin, alongside Serum Electrolytes (Sodium, Potassium, Bicarbonate, and Chloride) for ionic cellular balance.",
      },
    ],
    footer: {
      iconType: "calendar",
      title: "Complete Health Assessment",
      subtitle: "Key screenings for early detection",
    },
    sampleType: "Serum / Fluoride Plasma / Whole Blood",
    fastingGuidelines: "10–12 hours overnight fasting mandatory for Lipid Profile & Fasting Blood Sugar (plain water permitted)",
    turnaroundTime: "Same-day verified report delivered within 3 to 4 hours",
  },
  {
    id: "advanced-special-tests",
    badge: "ADVANCED & SPECIAL TESTS",
    subTagline: "Specialized Diagnostics • Cancer Markers • Cardiac Tests",
    title: "Cardiac, Tumor Markers & Other Investigations",
    excerpt:
      "High-sensitivity cardiac troponin, oncology tumor screening, microbiological culture & sensitivity, clinical mycology, and real-time PCR molecular assays.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    alt: "Cardiac, Tumor Markers and Specialized Diagnostic Investigations",
    checklist: [
      "Cardiac Marker (Troponin I)",
      "Tumor Markers & Hormones (Beta hCG, PSA, AFP, CA 125)",
      "Culture & Sensitivity (Urine, Stool, Sputum, Blood, etc.)",
      "Stool, Mycology & Other Tests (R/E, Occult Blood, Fungal Culture)",
      "Molecular Diagnosis (HPV PCR, HCV PCR, TB PCR, etc.)",
    ],
    detailedSections: [
      {
        heading: "Emergency Cardiac Biomarkers",
        description:
          "High-Sensitivity Troponin I (hs-cTnI) testing for rapid, accurate clinical detection of acute myocardial infarction, ischemia, and cardiac muscle strain with rapid STAT processing.",
      },
      {
        heading: "Oncology Tumor Markers & Hormones",
        description:
          "Quantitative chemiluminescence assays for Beta hCG, Total PSA (Prostate-Specific Antigen), AFP (Alpha-Fetoprotein), CA 125 (Ovarian cancer marker), CA 19.9 (GI/Pancreatic marker), CEA (Carcinoembryonic Antigen), Parathyroid Hormone (PTH), and Serum Cortisol.",
      },
      {
        heading: "Microbiology, Culture & Sensitivity",
        description:
          "Aerobic and automated culture identification for Urine, Stool, Sputum, Blood, and Pus with automated Minimum Inhibitory Concentration (MIC) antibiotic sensitivity panels for targeted therapy.",
      },
      {
        heading: "Clinical Microscopy & Molecular PCR",
        description:
          "Routine and microscopic stool examination (R/E), Fecal Occult Blood Test (FOBT), fungal KOH mount, fungal mycology cultures, and real-time qualitative/quantitative PCR assays for HPV DNA, HCV RNA, and TB PCR.",
      },
    ],
    footer: {
      iconType: "clock",
      title: "Lab Timings",
      subtitle: "Mon - Sat: 7 am - 7 pm | Sun: 8 am - 12 pm",
    },
    sampleType: "Whole Blood, Serum, Sterile Mid-Stream Urine, Sputum, Swabs",
    fastingGuidelines: "No fasting required for cardiac markers, cultures, or routine tumor markers",
    turnaroundTime: "Emergency Troponin I within 45–60 min; PCR & Tumor Markers 24 hrs; Cultures 48–72 hrs",
  },
];

export default function BlogSection({ onOpenBooking }: BlogSectionProps) {
  const [activeCard, setActiveCard] = useState<LabCardData | null>(null);

  const renderFooterIcon = (iconType: "microscope" | "calendar" | "clock") => {
    switch (iconType) {
      case "microscope":
        return <Microscope className="w-4 h-4 text-[#1E3227]" />;
      case "calendar":
        return <CalendarCheck className="w-4 h-4 text-[#1E3227]" />;
      case "clock":
        return <Clock className="w-4 h-4 text-[#1E3227]" />;
    }
  };

  return (
    <section id="blog" className="py-24 bg-[#CBCFB8] relative overflow-hidden">
      {/* Ambient glass refraction glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/10 w-[500px] h-[350px] bg-white/35 rounded-full blur-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/10 w-[500px] h-[350px] bg-[#9B8A3E]/15 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
            <FlaskConical className="w-3.5 h-3.5 text-[#1E3227]" />
            <span>LAB Test</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-[#1E3227] leading-[1.14]">
            Comprehensive Lab Test Services
          </h2>

          <p className="text-base sm:text-lg text-[#3F5447] font-normal leading-relaxed max-w-2xl mx-auto">
            A wide range of diagnostic tests for accurate results, early detection, and better health management.
          </p>
        </div>

        {/* 3-Card Grid (Maintaining the compact old card height & content length) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {LAB_INVESTIGATIONS_CARDS.map((card) => (
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

                {/* Content Area (Concise length matching the old card) */}
                <div className="p-6 sm:p-7">
                  {/* Sub-tagline */}
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#3F5447]/90 mb-2">
                    {card.subTagline}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-xl font-bold text-[#1E3227] leading-snug mb-3 group-hover:text-[#15241c] transition-colors line-clamp-2">
                    {card.title}
                  </h3>

                  {/* Excerpt - Standard compact length */}
                  <p className="text-xs sm:text-[13px] text-[#3F5447] font-light leading-relaxed line-clamp-3">
                    {card.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer with Icon and Arrow Button */}
              <div className="px-6 pb-6 pt-4 sm:px-7 sm:pb-7 border-t border-[#1E3227]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3227]/10 flex items-center justify-center flex-shrink-0">
                    {renderFooterIcon(card.footer.iconType)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1E3227] leading-tight">
                      {card.footer.title}
                    </div>
                    <div className="text-[11px] text-[#3F5447] leading-tight mt-0.5">
                      {card.footer.subtitle}
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#1E3227]/10 text-[#1E3227] group-hover:bg-[#1E3227] group-hover:text-[#CBCFB8] flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5 flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── EXPANSIVE DETAIL MODAL (Opens on click with the whole details like before) ── */}
      {activeCard && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveCard(null)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.60) 100%)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255, 255, 255, 0.85)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
              boxShadow:
                "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), 0 24px 60px rgba(30, 50, 39, 0.20)",
            }}
            className="rounded-[28px] max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-9 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#1E3227]/10 text-[#1E3227] hover:bg-[#1E3227] hover:text-[#CBCFB8] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Badge & Sub-tagline */}
              <div>
                <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-[#1E3227] text-white uppercase tracking-wider mb-2">
                  {activeCard.badge}
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#1E3227] leading-tight">
                  {activeCard.title}
                </h3>
                <p className="text-xs text-[#3F5447] font-medium uppercase tracking-wider mt-1">
                  {activeCard.subTagline}
                </p>
              </div>

              {/* Visual Banner */}
              <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#1E3227]/15">
                <img
                  src={activeCard.image}
                  alt={activeCard.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Complete Checklist from Image */}
              <div className="bg-white/70 p-5 rounded-2xl border border-[#1E3227]/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E3227] uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-[#9B8A3E]" />
                  <span>Key Investigations Included</span>
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

              {/* Detailed Breakdown of Investigations */}
              <div className="space-y-4 pt-1">
                <h4 className="font-sans text-base font-bold text-[#1E3227] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#9B8A3E]" />
                  <span>Comprehensive Clinical Scope</span>
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

              {/* Test Guidelines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/50 border border-[#1E3227]/10">
                  <span className="font-semibold text-[#1E3227] block mb-0.5">Sample Required:</span>
                  <span className="text-[#3F5447]">{activeCard.sampleType}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/50 border border-[#1E3227]/10">
                  <span className="font-semibold text-[#1E3227] block mb-0.5">Fasting Advice:</span>
                  <span className="text-[#3F5447]">{activeCard.fastingGuidelines}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/50 border border-[#1E3227]/10 sm:col-span-2">
                  <span className="font-semibold text-[#1E3227] block mb-0.5">Turnaround &amp; Delivery:</span>
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
                  <span>Book Consultation</span>
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
