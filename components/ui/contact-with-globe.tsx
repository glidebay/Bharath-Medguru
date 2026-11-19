"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Phone, Headphones, CheckCircle2 } from "lucide-react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { GeometryObject } from "topojson-specification";
import type { GeoPermissibleObjects } from "d3";
import worldAtlasData from "@/public/countries-110m.json";

export interface ContactLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const DEFAULT_CONTACT_LINKS: ContactLink[] = [
  {
    icon: Mail,
    label: "admin@bharathmedguru.com",
    href: "mailto:admin@bharathmedguru.com",
  },
  {
    icon: Phone,
    label: "+91 80788 81234",
    href: "tel:+918078881234",
  },
  {
    icon: Headphones,
    label: "+91 98948 39640",
    href: "tel:+919894839640",
  },
];

interface GeoFeature {
  type: string;
  geometry: GeometryObject;
  properties: Record<string, unknown>;
}

const initialWorldFeatures = ((feature(
  worldAtlasData as any,
  (worldAtlasData as any).objects.countries,
) as any).features || []) as GeoFeature[];

export function GlobeWireframe({
  width = 460,
  className = "aspect-square w-full max-w-[460px]",
  strokeColor = "#1E3227",
  strokeWidth = 0.9,
  graticuleColor = "rgba(30, 50, 39, 0.16)",
  sphereOutlineColor = "#1E3227",
  sphereOutlineWidth = 1.2,
  countryFillColor = "rgba(255, 255, 255, 0.45)",
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
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const graticule = d3.geoGraticule()();
    const sphere = { type: "Sphere" } as GeoPermissibleObjects;
    const baseScale = size * 0.45;

    const projection = d3
      .geoOrthographic()
      .scale(baseScale)
      .translate([size / 2, size / 2])
      .clipAngle(90)
      .precision(0.2);

    const path = d3.geoPath(projection, ctx);

    const render = () => {
      rotation = (rotation + autoRotateSpeed) % 360;
      projection.rotate([rotation, -10, 0]);

      ctx.clearRect(0, 0, size, size);

      // 1. Graticule
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = graticuleColor;
      ctx.lineWidth = 0.65;
      ctx.stroke();

      // 2. Continents
      ctx.beginPath();
      for (let i = 0; i < initialWorldFeatures.length; i++) {
        path(initialWorldFeatures[i] as unknown as GeoPermissibleObjects);
      }
      ctx.fillStyle = countryFillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();

      // 3. Sphere Outer Rim
      ctx.beginPath();
      path(sphere);
      ctx.strokeStyle = sphereOutlineColor;
      ctx.lineWidth = sphereOutlineWidth;
      ctx.stroke();

      // 4. Seamless soft bottom fade via destination-out
      ctx.globalCompositeOperation = "destination-out";
      const grad = ctx.createLinearGradient(0, size * 0.68, 0, size);
      grad.addColorStop(0, "rgba(0, 0, 0, 0)");
      grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, size * 0.68, size, size * 0.32);
      ctx.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [width, strokeColor, strokeWidth, graticuleColor, sphereOutlineColor, sphereOutlineWidth, countryFillColor, autoRotateSpeed]);

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: width, height: "auto", aspectRatio: "1 / 1" }}
        className="pointer-events-none"
      />
    </div>
  );
}

export default function ContactWithGlobe({
  title = "We Deliver Medicines Directly to Your Location",
  description = "Send us your prescription or required medicine list. Our licensed pharmacists check stock across our branch network and deliver authentic medications right to your address.",
  contactLinks = DEFAULT_CONTACT_LINKS,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  contactLinks?: ContactLink[];
}) {
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
        `https://wa.me/918078881234?text=${encodeURIComponent(formattedText)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } catch (err) {
      console.error("Popup blocker prevented opening WhatsApp:", err);
    }

    setSubmitted(true);
  };

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24 bg-[#CBCFB8]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wider uppercase border border-[#1E3227]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9B8A3E]" />
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227] leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                Get in touch
              </h3>
              <p className="text-sm text-[#3F5447] font-light leading-relaxed max-w-md">
                Reach out via any channel below. Certified pharmacists verify dosages and coordinate prompt doorstep dispatch.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {contactLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-3 w-fit text-sm text-[#3F5447] hover:text-[#1E3227] transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/70 border border-[#1E3227]/15 group-hover:bg-[#1E3227] group-hover:text-[#CBCFB8] flex items-center justify-center shrink-0 transition-all duration-200 shadow-xs">
                    <Icon className="w-4 h-4 text-[#1E3227] group-hover:text-[#CBCFB8] transition-colors duration-200" />
                  </div>
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>

            <div className="relative w-full mt-2 select-none flex items-start justify-center pointer-events-none">
              <GlobeWireframe
                width={460}
                className="w-full aspect-square max-w-[460px] pointer-events-none"
                autoRotateSpeed={0.4}
                strokeColor="#1E3227"
                strokeWidth={0.85}
                graticuleColor="rgba(30, 50, 39, 0.16)"
                sphereOutlineColor="#1E3227"
                sphereOutlineWidth={1.2}
                countryFillColor="rgba(255, 255, 255, 0.45)"
              />
            </div>
          </div>

          <div
            className="p-7 sm:p-9 rounded-[28px] flex flex-col gap-6"
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
                      placeholder="+91 80788 81234"
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
          </div>
        </div>
      </div>
    </section>
  );
}