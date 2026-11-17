"use client";

import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import PathSection from "@/components/PathSection";
import ServicesSection from "@/components/ServicesSection";
import SessionsSection from "@/components/SessionsSection";
import CtaSection from "@/components/CtaSection";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(element, { offset: -30, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#CBCFB8] text-[#1E3227] selection:bg-[#1E3227] selection:text-[#CBCFB8]">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={scrollToContact} />

        {/* Hero Section (#hero) */}
        <HeroSection onOpenBooking={scrollToContact} />

        {/* About Section (#about) with Mission & Vision */}
        <AboutSection onOpenBooking={scrollToContact} />

        {/* Pharmacy & Healthcare Services Carousel (#service) */}
        <GallerySection onSelectExperience={scrollToContact} />

        {/* 3-Step Process for Medicine & Delivery (#path) */}
        <PathSection onOpenBooking={scrollToContact} />

        {/* 3D Visual Gallery Corridor (#gallery) */}
        <ServicesSection onSelectService={scrollToContact} />

        {/* Outpatient Doctors & Consultants (#session) */}
        <SessionsSection onBookPractitioner={scrollToContact} />

        {/* Call to Action Banner (#cta) */}
        <CtaSection onOpenBooking={scrollToContact} />

        {/* Comprehensive Lab Test Services (#blog) */}
        <BlogSection onOpenBooking={scrollToContact} />

        {/* FAQ Accordion (#faq) */}
        <FaqSection />

        {/* Customer & Patient Reviews (#testimonial) */}
        <TestimonialsSection />

        {/* Contact & Medicine Delivery Inquiry Form (#contact) */}
        <ContactSection />

        {/* Footer & Legal (#footer) */}
        <FooterSection />
      </main>
    </SmoothScroll>
  );
}
