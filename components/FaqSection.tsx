"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is Bharath MedGuru primarily a pharmacy chain?",
      answer:
        "Yes, Bharath MedGuru is primarily an established and rapidly expanding chain of retail community pharmacies with multiple branch locations situated across various regions. Our primary operation is ensuring reliable access to 100% genuine medications, chronic illness therapies, pediatric formulations, surgical items, and wellness essentials.",
    },
    {
      question: "How does your medicine delivery on enquiry work?",
      answer:
        "If you enquire with us via WhatsApp (+91 79940 66647), phone, or through our website form, our licensed pharmacists immediately review your medicine list or prescription. We verify branch stock availability and dispatch genuine sealed medications directly to your home or office address promptly.",
    },
    {
      question: "Are you launching an online e-commerce pharmacy web app?",
      answer:
        "Yes! We are actively upgrading our pharmacy chain to include a full e-commerce web and mobile platform, inspired by leading online pharmacy systems like Apollo Pharmacy. This will enable instant medicine search, 1-click prescription upload, automated monthly refill subscriptions, and real-time live order tracking from your nearest branch.",
    },
    {
      question: "Do you also provide clinic and diagnostic lab services?",
      answer:
        "Yes. While retail pharmacy and doorstep medicine distribution form our core business, we also offer supportive healthcare services including outpatient specialist doctor consultations (General Medicine, Cardiology, Pediatrics, Orthopedics) and an automated diagnostic laboratory for routine blood tests and health screenings.",
    },
    {
      question: "Are all medications 100% genuine and authentic?",
      answer:
        "Absolutely. All pharmaceuticals across all our pharmacy branch locations are 100% genuine and sourced directly from certified, licensed manufacturers. We adhere to rigorous temperature-controlled cold-chain storage to guarantee the safety, potency, and integrity of every medicine dispensed.",
    },
    {
      question: "Can I set up scheduled monthly refills for chronic medications?",
      answer:
        "Yes! We regularly provide scheduled monthly refills for patients with chronic medical conditions such as diabetes, hypertension, and heart care. Just share your prescription with our pharmacy team, and we ensure your stock is delivered to your doorstep every month before you run out.",
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

