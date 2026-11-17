"use client";

import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ScrollGlobe, { ScrollGlobeSection } from "@/components/ScrollGlobe";

export default function AboutPage() {
  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  const aboutSections: ScrollGlobeSection[] = [
    {
      id: "heritage",
      badge: "About Bharath MedGuru",
      title: "An Expanding Chain of Pharmacies",
      subtitle: "Multi-Branch Network & Doorstep Delivery",
      description:
        "Bharath MedGuru was founded with a dedicated commitment to community health: ensuring every family has reliable access to 100% genuine medications, chronic care formulations, and essential health supplies. Across our expanding retail pharmacy branches, we unite verified pharmaceutical quality with personal care and prompt delivery directly to your location on enquiry.",
      align: "left",
      actions: [
        { label: "Enquire for Medicine Delivery", variant: "primary", href: "/#contact" },
        { label: "View Our Services", variant: "secondary", href: "/#service" },
      ],
    },
    {
      id: "mission",
      badge: "Our Mission",
      title: "Accessible, Authentic Healthcare for Every Household",
      description:
        "Our mission is to eliminate barriers to genuine medicine access through our expanding network of community pharmacy branches and reliable on-enquiry doorstep delivery. We stand firmly for uncompromising authenticity, ethical dispensing, and empathetic patient care.",
      align: "center",
      features: [
        {
          title: "100% Genuine Certified Pharmaceuticals",
          description:
            "Every formulation is sourced directly from licensed, accredited manufacturers under temperature-controlled cold-chain management.",
        },
        {
          title: "Enquiry-Based Doorstep Delivery",
          description:
            "Simply send us your prescription via WhatsApp or online enquiry. Our pharmacy team coordinates fast, secure dispatch directly to your address.",
        },
        {
          title: "Dedicated Neighborhood Community Branches",
          description:
            "Strategically situated retail stores staffed with qualified pharmacists ready to provide dosage guidance and health support.",
        },
      ],
    },
    {
      id: "vision",
      badge: "Our Vision",
      title: "The Most Trusted Pharmacy & Digital Health Network",
      description:
        "We envision a seamlessly connected healthcare network where physical branch excellence meets next-generation digital accessibility. By evolving our physical pharmacy chain into an integrated omnichannel platform, we empower individuals and families across South India to live healthier, happier lives.",
      align: "left",
      features: [
        {
          title: "Expanding Physical Branch Network",
          description:
            "Continuously opening retail pharmacy branches across towns, cities, and suburban centers to bring authentic medicines closer to homes.",
        },
        {
          title: "Next-Gen E-Commerce (Coming Soon)",
          description:
            "Developing our dedicated digital e-commerce web and mobile application with 1-click prescription upload, automated refills, and real-time order tracking.",
        },
        {
          title: "Supportive Clinical & Diagnostic Integration",
          description:
            "Integrated outpatient specialist doctor consultations and automated diagnostic laboratory testing to support complete patient well-being.",
        },
      ],
    },
    {
      id: "future",
      badge: "Future Horizon",
      title: "Healthcare at Your Fingertips",
      subtitle: "Full E-Commerce Web & Mobile App Rolling Out",
      description:
        "While our full digital store is actively in development, you never have to wait for medicine delivery. Inquire with our nearest pharmacy branch today for immediate doorstep fulfillment, and be among the first to experience our forthcoming digital e-commerce platform.",
      align: "center",
      actions: [
        { label: "Order Medicines / Inquire Now", variant: "primary", href: "/#contact" },
        { label: "Return to Home", variant: "secondary", href: "/" },
      ],
    },
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#CBCFB8] text-[#1E3227] selection:bg-[#1E3227] selection:text-[#CBCFB8]">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={scrollToContact} />

        {/* ScrollGlobe 3D Interactive Screen */}
        <div className="pt-20 sm:pt-24">
          <ScrollGlobe sections={aboutSections} />
        </div>

        {/* Footer */}
        <FooterSection />
      </main>
    </SmoothScroll>
  );
}
