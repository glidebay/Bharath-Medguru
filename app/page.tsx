"use client";

import React, { useState } from "react";
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
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPractitioner, setSelectedPractitioner] = useState("Dr. Maya Varen");
  const [selectedService, setSelectedService] = useState("Energy Healing");

  const handleOpenBooking = () => {
    setSelectedPractitioner("Dr. Maya Varen");
    setSelectedService("Holistic Discovery Consultation");
    setIsBookingOpen(true);
  };

  const handleBookPractitioner = (name: string, roleOrSpecialty: string) => {
    setSelectedPractitioner(name);
    setSelectedService(roleOrSpecialty);
    setIsBookingOpen(true);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#CBCFB8] text-[#1E3227] selection:bg-[#1E3227] selection:text-[#CBCFB8]">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Hero Section (#hero) */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* About Section (#about) */}
        <AboutSection onOpenBooking={handleOpenBooking} />

        {/* Services / Modalities 3D Spatial Corridor (#service) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 3-Step Path Section (#path) */}
        <PathSection onOpenBooking={handleOpenBooking} />

        {/* Personalized Sessions (#session) */}
        <SessionsSection onBookPractitioner={handleBookPractitioner} />

        {/* Call to Action Banner (#cta) */}
        <CtaSection onOpenBooking={handleOpenBooking} />

        {/* Real People Transformations Gallery (#gallery) */}
        <GallerySection onSelectExperience={handleSelectService} />

        {/* FAQ Accordion (#faq) */}
        <FaqSection />

        {/* Seeker Reviews & Testimonials Marquee (#testimonial) */}
        <TestimonialsSection />

        {/* Blog & Healing Insights (#blog) */}
        <BlogSection />

        {/* Contact & Inquiry Form (#contact) */}
        <ContactSection />

        {/* Footer & Legal (#footer) */}
        <FooterSection />

        {/* Interactive Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialPractitioner={selectedPractitioner}
          initialService={selectedService}
        />
      </main>
    </SmoothScroll>
  );
}
