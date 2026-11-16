"use client";

import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PathSection from "@/components/PathSection";
import SessionsSection from "@/components/SessionsSection";
import CtaSection from "@/components/CtaSection";
import GallerySection from "@/components/GallerySection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
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

        {/* About Section (#about) */}
        <AboutSection onOpenBooking={scrollToContact} />

        {/* Services / Modalities 3D Spatial Corridor (#service) */}
        <ServicesSection onSelectService={scrollToContact} />

        {/* 3-Step Path Section (#path) */}
        <PathSection onOpenBooking={scrollToContact} />

        {/* Personalized Sessions (#session) */}
        <SessionsSection onBookPractitioner={scrollToContact} />

        {/* Call to Action Banner (#cta) */}
        <CtaSection onOpenBooking={scrollToContact} />

        {/* Real People Transformations Gallery (#gallery) */}
        <GallerySection onSelectExperience={scrollToContact} />

        {/* FAQ Accordion (#faq) */}
        <FaqSection />

        {/* Seeker Reviews & Testimonials Marquee (#testimonial) */}
        <TestimonialsSection />

        {/* Comprehensive Lab Test Services (#blog) */}
        <BlogSection onOpenBooking={scrollToContact} />

        {/* Contact & Inquiry Form (#contact) */}
        <ContactSection />

        {/* Footer & Legal (#footer) */}
        <FooterSection />
      </main>
    </SmoothScroll>
  );
}
