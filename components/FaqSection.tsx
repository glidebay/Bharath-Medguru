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
    <section id="faq" className="py-24 bg-[#f9fbf8] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] text-xs font-semibold tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#163c3d]">
            We Have Answers
          </h2>
          <p className="text-base sm:text-lg text-[#526061] font-light leading-relaxed max-w-2xl mx-auto">
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
                className={`rounded-[20px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#163c3d]/30 shadow-md"
                    : "bg-white/70 border-[#163c3d]/10 hover:border-[#163c3d]/25 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#163c3d]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isOpen
                        ? "bg-[#163c3d] text-[#e2eddf] rotate-180"
                        : "bg-[#e2eddf] text-[#163c3d]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#526061] font-light leading-relaxed border-t border-[#163c3d]/10 pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 bg-[#e2eddf]/60 rounded-2xl border border-[#163c3d]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg font-semibold text-[#163c3d]">
              Still have questions on your mind?
            </h4>
            <p className="text-xs text-[#526061]">
              Our wellness counselors are available 6 days a week to guide you.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#163c3d] text-[#e2eddf] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#102d2e] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat With Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}

