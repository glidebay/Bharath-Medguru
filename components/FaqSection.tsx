"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is holistic wellness?",
      answer:
        "Holistic wellness is an integrative approach that cares for the mind, body, and spirit together. Rather than merely suppressing symptoms, it combines physical vitality, mental clarity, emotional balance, and spiritual growth into a complete, restorative healing experience.",
    },
    {
      question: "How do I book a session with a practitioner?",
      answer:
        "You can explore our verified practitioners on the platform, choose the specialty that aligns with your healing goals, and book directly online. You will receive an immediate confirmation with preparation tips and a secure link for virtual sessions or studio directions for in-person appointments.",
    },
    {
      question: "What types of services do you offer?",
      answer:
        "We offer an extensive selection of modalities including Usui Reiki & Biofield Energy Healing, Tibetan Singing Bowl Sound Therapy, Holistic & NLP Life Coaching, Somatic Myofascial Bodywork, and Mindful Breathwork & Pranayama.",
    },
    {
      question: "Are your practitioners certified or verified?",
      answer:
        "Yes, every practitioner on our platform undergoes rigorous credential verification, background validation, and standard-of-care assessment to ensure you receive compassionate, authentic, and professional guidance.",
    },
    {
      question: "Can I have sessions online or only in person?",
      answer:
        "We offer both formats. Modalities such as holistic counseling, life coaching, sound relaxation, and guided breathwork are seamlessly conducted worldwide via secure HD video. Somatic bodywork and tactile therapies are hosted at our tranquil in-person studio.",
    },
    {
      question: "How do I know which service is right for me?",
      answer:
        "If you are unsure where to begin, you can book our complimentary 15-minute discovery consultation. Our wellness advisor will listen to your current challenges and guide you to the practitioner and modality best aligned with your needs.",
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
            Explore some of the most common questions our community asks. If you still need help, feel free
            to contact us directly — we're here to support you.
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
              Our wellness counselors are available 6 days a week to guide you.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#1E3227] text-[#CBCFB8] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#15241c] hover:text-white transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat With Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}

