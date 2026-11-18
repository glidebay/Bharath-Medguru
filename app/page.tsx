"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const router = useRouter();

  const handleOpenContact = () => {
    router.push("/contact");
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#CBCFB8] text-[#1E3227] selection:bg-[#1E3227] selection:text-[#CBCFB8]">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={handleOpenContact} />

        {/* Hero Section (#hero) */}
        <HeroSection onOpenBooking={handleOpenContact} />

        {/* About Section (#about) with Mission & Vision */}
        <AboutSection onOpenBooking={handleOpenContact} />

        {/* Pharmacy & Healthcare Services Carousel (#service) */}
        <GallerySection onSelectExperience={handleOpenContact} />

        {/* 3-Step Process for Medicine & Delivery (#path) */}
        <PathSection onOpenBooking={handleOpenContact} />

        {/* 3D Visual Gallery Corridor (#gallery) */}
        <ServicesSection onSelectService={handleOpenContact} />

        {/* Outpatient Doctors & Consultants (#session) */}
        <SessionsSection onBookPractitioner={handleOpenContact} />

        {/* Call to Action Banner (#cta) */}
        <CtaSection onOpenBooking={handleOpenContact} />

        {/* Comprehensive Lab Test Services (#blog) */}
        <BlogSection onOpenBooking={handleOpenContact} />

        {/* FAQ Accordion (#faq) */}
        <FaqSection />

        {/* Customer & Patient Reviews (#testimonial) */}
        <TestimonialsSection />

        {/* Footer & Legal (#footer) */}
        <FooterSection />
      </main>
    </SmoothScroll>
  );
}
