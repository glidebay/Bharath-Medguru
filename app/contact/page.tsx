"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowRight, Mail, Phone, Headphones, CheckCircle2, ShieldCheck, Clock, HeartPulse } from "lucide-react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { GeometryObject } from "topojson-specification";
import type { GeoPermissibleObjects } from "d3";
import worldAtlasData from "@/public/countries-110m.json";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

interface ContactLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    icon: Mail,
    label: "admin@bharathmedguru.com",
    href: "mailto:admin@bharathmedguru.com",
  },
  {
    icon: Phone,
    label: "+91 79940 66647",
    href: "tel:+917994066647",
  },
  {
    icon: Headphones,
    label: "+91 75590 33000 / 66000",
    href: "tel:+917559033000",
  },
];

interface GeoFeature {
  type: string;
  geometry: GeometryObject;
  properties: Record<string, unknown>;
}

// Pre-parse world data synchronously from local JSON
const initialWorldFeatures = ((feature(
  worldAtlasData as any,
  (worldAtlasData as any).objects.countries,
) as any).features || []) as GeoFeature[];

/**
 * Wireframe Globe with Spreading Ambient & Drop Shadows.
 * Renders the full 3D rotating spherical globe with ambient depth,
 * seated higher up with natural spacing below the contact details,
 * and accompanied by a spreading ground shadow.
 * GPU-accelerated Canvas with 0 React state updates for buttery 120 FPS smooth scrolling.
 */
function GlobeWireframe({
  width = 420,
  className = "w-full max-w-[380px]",
  strokeColor = "#1E3227",
  strokeWidth = 0.85,
  graticuleColor = "rgba(30, 50, 39, 0.16)",
  sphereOutlineColor = "#1E3227",
  sphereOutlineWidth = 1.25,
  countryFillColor = "rgba(255, 255, 255, 0.35)",
  autoRotateSpeed = 0.4,
}: {
  width?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  graticuleColor?: string;
  sphereOutlineColor?: string;
  sphereOutlineWidth?: number;
  countryFillColor?: string;
  autoRotateSpeed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = -20;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const size = width;
    const height = size; // Full spherical globe
    canvas.width = size * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const graticule = d3.geoGraticule()();
    const sphere = { type: "Sphere" } as GeoPermissibleObjects;
    const baseScale = size * 0.44;

    // Centered orthographic projection
    const projection = d3
      .geoOrthographic()
      .scale(baseScale)
      .translate([size / 2, size / 2])
      .clipAngle(90)
      .precision(0.2);

    const path = d3.geoPath(projection, ctx);

    const render = () => {
      rotation = (rotation + autoRotateSpeed) % 360;
      projection.rotate([rotation, -18, 0]);

      ctx.clearRect(0, 0, size, height);

      // 1. Soft spherical lighting & depth gradient
      const grad = ctx.createRadialGradient(
        size * 0.38,
        size * 0.34,
        size * 0.05,
        size * 0.5,
        size * 0.5,
        baseScale,
      );
      grad.addColorStop(0, "rgba(255, 255, 255, 0.52)");
      grad.addColorStop(0.55, "rgba(255, 255, 255, 0.14)");
      grad.addColorStop(0.9, "rgba(30, 50, 39, 0.06)");
      grad.addColorStop(1, "rgba(30, 50, 39, 0.16)");

      ctx.beginPath();
      path(sphere);
      ctx.fillStyle = grad;
      ctx.fill();

      // 2. Graticule Grid Lines
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = graticuleColor;
      ctx.lineWidth = 0.65;
      ctx.stroke();

      // 3. Continents & Countries
      ctx.beginPath();
      for (let i = 0; i < initialWorldFeatures.length; i++) {
        path(initialWorldFeatures[i] as unknown as GeoPermissibleObjects);
      }
      ctx.fillStyle = countryFillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();

      // 4. Outer Sphere Arc
      ctx.beginPath();
      path(sphere);
      ctx.strokeStyle = sphereOutlineColor;
      ctx.lineWidth = sphereOutlineWidth;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [width, strokeColor, strokeWidth, graticuleColor, sphereOutlineColor, sphereOutlineWidth, countryFillColor, autoRotateSpeed]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Ambient spreading aura behind the globe */}
      <div
        className="absolute inset-0 m-auto w-[82%] h-[82%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(30, 50, 39, 0.12) 55%, transparent 75%)",
          filter: "blur(24px)",
        }}
      />

      {/* Globe Canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: width, height: "auto", aspectRatio: "1 / 1" }}
        className="relative z-10 pointer-events-none block"
      />

      {/* Ground spreading shadow beneath the globe */}
      <div
        className="w-[78%] h-7 sm:h-9 -mt-4 sm:-mt-5 rounded-[100%] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30, 50, 39, 0.32) 0%, rgba(30, 50, 39, 0.13) 45%, rgba(30, 50, 39, 0.03) 65%, transparent 80%)",
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Medicine Delivery on Enquiry (Prescription)",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const formattedText =
      `*New Inquiry - Bharath MedGuru Pharmacy*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone Number:* ${formData.phone || "Not provided"}\n` +
      `*Email:* ${formData.email || "Not provided"}\n` +
      `*Service Required:* ${formData.service}\n` +
      `*Prescription / Location / Details:* ${formData.message}`;

    try {
      window.open(
        `https://wa.me/917994066647?text=${encodeURIComponent(formattedText)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } catch (err) {
      console.error("Popup blocker prevented opening WhatsApp:", err);
    }

    setSubmitted(true);
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#CBCFB8] text-[#1E3227] selection:bg-[#1E3227] selection:text-[#CBCFB8]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Contact Page Hero Section */}
        <section className="relative w-full overflow-hidden pt-44 sm:pt-52 lg:pt-56 pb-20 sm:pb-32">
          {/* Ambient background glows for signature frosted glass aesthetics */}
          <div className="pointer-events-none absolute top-16 left-1/4 w-[600px] h-[350px] bg-white/40 rounded-full blur-3xl opacity-80" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 w-[600px] h-[350px] bg-[#9B8A3E]/20 rounded-full blur-3xl opacity-70" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4 mb-14 sm:mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
                className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1E3227] leading-tight"
              >
                We Deliver Medicines <br />
                <span className="font-normal text-[#1E3227]">Directly to Your Location</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
                className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed max-w-2xl"
              >
                Send us your prescription or required medicine list. Our licensed pharmacists check stock across our branch network and deliver authentic medications right to your address.
              </motion.p>
            </div>

            {/* Two-column layout with natural alignment and compact spacing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto items-start">
              {/* Left Column: Direct Info Cards & Spreading Shadow Wireframe Globe */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
                className="flex flex-col items-center lg:items-start w-full"
              >
                <div className="space-y-6 w-full">
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                      Get in touch
                    </h2>
                    <p className="text-sm text-[#3F5447] font-light leading-relaxed max-w-md">
                      Reach out via any channel below. Certified pharmacists verify dosages and coordinate prompt doorstep dispatch.
                    </p>
                  </div>

                  {/* Contact Links */}
                  <div className="flex flex-col gap-3">
                    {CONTACT_LINKS.map(({ icon: Icon, label, href }, i) => (
                      <motion.a
                        key={label}
                        href={href}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + i * 0.1,
                          ease: smoothEase,
                        }}
                        className="group flex items-center gap-3 w-fit text-sm text-[#3F5447] hover:text-[#1E3227] transition-colors duration-200"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/70 border border-[#1E3227]/15 group-hover:bg-[#1E3227] group-hover:text-[#CBCFB8] flex items-center justify-center shrink-0 transition-all duration-200 shadow-xs group-hover:scale-105">
                          <Icon className="w-4 h-4 text-[#1E3227] group-hover:text-[#CBCFB8] transition-colors duration-200" />
                        </div>
                        <span className="font-medium">{label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Globe positioned comfortably below mobile numbers with spreading shadow */}
                <div className="w-full mt-7 sm:mt-8 select-none flex flex-col items-center justify-center pointer-events-none">
                  <GlobeWireframe
                    width={420}
                    className="w-full max-w-[350px] sm:max-w-[390px] pointer-events-none"
                    autoRotateSpeed={0.35}
                    strokeColor="#1E3227"
                    strokeWidth={0.85}
                    graticuleColor="rgba(30, 50, 39, 0.16)"
                    sphereOutlineColor="#1E3227"
                    sphereOutlineWidth={1.25}
                    countryFillColor="rgba(255, 255, 255, 0.35)"
                  />
                </div>
              </motion.div>

              {/* Right Column: Inquiry & Order Form (Signature Frosted Glass) */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.35, ease: smoothEase }}
                className="p-7 sm:p-9 rounded-[28px] flex flex-col justify-between gap-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.35) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                  borderLeft: "1.5px solid rgba(255, 255, 255, 0.9)",
                  boxShadow:
                    "inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 16px 36px rgba(30, 50, 39, 0.08)",
                }}
              >
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227] mb-1">
                    Send an Enquiry or Order
                  </h3>
                  <p className="text-sm text-[#3F5447] font-light">
                    Fill in your details and our pharmacy coordinator will contact you promptly.
                  </p>
                </div>

                {/* Dotted separator */}
                <div className="relative w-full h-4 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-repeat text-[#1E3227]/25"
                    style={{
                      backgroundImage: "radial-gradient(circle, currentColor 0.8px, transparent 0.8px)",
                      backgroundSize: "6px 100%",
                      maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    }}
                  />
                </div>

                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#1E3227]/10 text-[#1E3227] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-[#9B8A3E]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans text-xl font-semibold text-[#1E3227]">
                        Enquiry Sent Successfully!
                      </h4>
                      <p className="text-xs text-[#3F5447] max-w-xs mx-auto leading-relaxed">
                        Thank you, {formData.name}. Our pharmacy dispensing team has received your inquiry and will connect with you right away.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          service: "Medicine Delivery on Enquiry (Prescription)",
                          message: "",
                        });
                      }}
                      className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-semibold tracking-wider uppercase text-[#1E3227]/75">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ananya Suresh"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/80 border border-[#1E3227]/15 rounded-xl px-4 py-2.5 text-sm text-[#1E3227] placeholder:text-[#1E3227]/40 outline-none focus:bg-white focus:border-[#1E3227] focus:ring-2 focus:ring-[#9B8A3E]/20 transition-all duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-semibold tracking-wider uppercase text-[#1E3227]/75">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 79940 66647"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/80 border border-[#1E3227]/15 rounded-xl px-4 py-2.5 text-sm text-[#1E3227] placeholder:text-[#1E3227]/40 outline-none focus:bg-white focus:border-[#1E3227] focus:ring-2 focus:ring-[#9B8A3E]/20 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-semibold tracking-wider uppercase text-[#1E3227]/75">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/80 border border-[#1E3227]/15 rounded-xl px-4 py-2.5 text-sm text-[#1E3227] placeholder:text-[#1E3227]/40 outline-none focus:bg-white focus:border-[#1E3227] focus:ring-2 focus:ring-[#9B8A3E]/20 transition-all duration-200"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-semibold tracking-wider uppercase text-[#1E3227]/75">
                        Service Required
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white/80 border border-[#1E3227]/15 rounded-xl px-4 py-2.5 text-sm text-[#1E3227] outline-none focus:bg-white focus:border-[#1E3227] focus:ring-2 focus:ring-[#9B8A3E]/20 transition-all duration-200"
                      >
                        <option value="Medicine Delivery on Enquiry (Prescription)">Medicine Delivery on Enquiry (Prescription)</option>
                        <option value="Doctor Consultation (General / Specialist)">Doctor Consultation (General / Specialist)</option>
                        <option value="Diagnostic Lab Test at Home / Branch">Diagnostic Lab Test at Home / Branch</option>
                        <option value="Chronic Condition Medicine Refill">Chronic Condition Medicine Refill</option>
                        <option value="General Healthcare Inquiry">General Healthcare Inquiry</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-semibold tracking-wider uppercase text-[#1E3227]/75">
                        Prescription / Medicine Names / Delivery Location *
                      </label>
                      <textarea
                        required
                        placeholder="Please specify medicine names, dosages, delivery address, or any prescription details..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/80 border border-[#1E3227]/15 rounded-xl px-4 py-3 text-sm text-[#1E3227] placeholder:text-[#1E3227]/40 outline-none focus:bg-white focus:border-[#1E3227] focus:ring-2 focus:ring-[#9B8A3E]/20 resize-none transition-all duration-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-fit inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer mt-1"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Supporting Trust Pillars */}
        <section className="py-16 border-t border-[#1E3227]/10 bg-white/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E3227] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base text-[#1E3227] mb-1">
                    100% Genuine Medicines
                  </h3>
                  <p className="text-xs text-[#3F5447] leading-relaxed">
                    Sourced directly from accredited pharmaceutical manufacturers under strict temperature controls.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E3227] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base text-[#1E3227] mb-1">
                    Prompt Doorstep Dispatch
                  </h3>
                  <p className="text-xs text-[#3F5447] leading-relaxed">
                    Orders verified by qualified pharmacists and dispatched promptly from your nearest community branch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E3227] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <HeartPulse className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base text-[#1E3227] mb-1">
                    Integrated Healthcare
                  </h3>
                  <p className="text-xs text-[#3F5447] leading-relaxed">
                    Doctor consultations, chronic dose refills, and home diagnostic lab tests coordinated in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <FooterSection />
      </main>
    </SmoothScroll>
  );
}