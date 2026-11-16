"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What healthcare services does Bharath MedGuru offer?",
      answer:
        "Bharath MedGuru provides a comprehensive, integrated healthcare ecosystem designed for families across Kerala. Our services encompass four interconnected pillars: Multi-Specialty Outpatient (OPD) Clinics with specialist doctor consultations, an NABL-benchmark Automated Diagnostic Laboratory, a 24/7 In-Clinic Pharmacy, and an expanding network of retail community pharmacies offering doorstep delivery.",
    },
    {
      question: "How do I schedule an appointment with your specialist doctors?",
      answer:
        "Booking a consultation is quick and convenient. You can book online directly through our website by selecting your specialty and doctor, or call our clinic reception desk. We provide dedicated appointment slots across General Medicine, Cardiology, Neurology, Gastroenterology, Orthopedics, and Pediatrics with minimal wait times.",
    },
    {
      question: "What diagnostic tests and lab facilities are available on-site?",
      answer:
        "Our advanced diagnostic laboratory features automated 5-part hematology and clinical biochemistry analyzers, high-resolution digital radiography (X-Ray), and 2D Doppler echocardiograms. We conduct routine blood screenings, comprehensive master health checkups, and specialized clinical investigations with rapid, verified same-day digital reports sent straight to your phone.",
    },
    {
      question: "Is the in-clinic pharmacy open 24/7, and are medications authentic?",
      answer:
        "Yes, our in-clinic pharmacy is open 24 hours a day, 7 days a week for both routine prescriptions and emergency medical needs. All medications are 100% genuine and sourced directly from certified manufacturers, stored in strict temperature-controlled refrigeration to ensure the potency of critical drugs, pediatric formulations, and specialized treatments.",
    },
    {
      question: "How does your retail pharmacy chain and doorstep delivery work?",
      answer:
        "Our retail pharmacy network extends across Kerala and South India. You can submit your doctor's prescription digitally or via WhatsApp to have genuine medications delivered directly to your doorstep. We also offer automated monthly refills for chronic prescriptions—including diabetes, cardiac, and hypertension medications—so you never run out.",
    },
    {
      question: "Can I consult doctors online, or are appointments only in-person?",
      answer:
        "We offer both flexible options. You can visit our modern healthcare clinic for comprehensive in-person evaluations, diagnostics, and physical checkups, or book secure virtual HD consultations for follow-ups, routine reviews, prescription renewals, and second opinions from the comfort of your home.",
    },
    {
      question: "Are all doctors and healthcare specialists certified?",
      answer:
        "Yes. Every medical practitioner and specialist at Bharath MedGuru possesses verified board certifications, high-level clinical credentials, and extensive hospital experience. Our healthcare team follows strict clinical protocols to ensure compassionate, evidence-based, and patient-centered care for your entire family.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#CBCFB8] relative overflow-hidden">
      {/* Ambient glass refraction glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/10 w-[450px] h-[350px] bg-white/30 rounded-full blur-3xl opacity-75" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/10 w-[450px] h-[350px] bg-[#9B8A3E]/15 rounded-full blur-3xl opacity-60" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
            <HelpCircle className="w-3.5 h-3.5 text-[#9B8A3E]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1E3227]">
            We Have Answers
          </h2>
          <p className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed max-w-2xl mx-auto">
            Explore common questions about our multi-specialty clinic, automated diagnostic lab, 24/7 in-clinic pharmacy, and doorstep medicine delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  background: isOpen
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.25) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.16) 100%)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255, 255, 255, 0.65)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                  borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                  boxShadow: isOpen
                    ? "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)"
                    : "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), 0 8px 24px -4px rgba(30, 50, 39, 0.05)",
                }}
                className="rounded-[22px] transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-lg sm:text-xl font-medium text-[#1E3227]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isOpen
                        ? "bg-[#1E3227] text-[#CBCFB8] rotate-180"
                        : "bg-[#CBCFB8]/80 text-[#1E3227]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#3F5447] font-light leading-relaxed border-t border-[#1E3227]/10 pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div
          className="mt-12 text-center p-6 sm:p-8 rounded-[24px] flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.20) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.65)",
            borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
            borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
          }}
        >
          <div className="text-left">
            <h4 className="font-sans text-lg font-semibold text-[#1E3227]">
              Still have questions on your mind?
            </h4>
            <p className="text-xs text-[#3F5447]">
              Our clinic desk and patient care counselors are available to assist you.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#1E3227] text-[#CBCFB8] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#15241c] hover:text-white transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact Clinic Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}

