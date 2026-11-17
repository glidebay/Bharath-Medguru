"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Globe from "@/components/ui/globe";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Building2, Truck, ShieldCheck, Heart } from "lucide-react";

// Reusable ScrollGlobe component customized for Bharath MedGuru brand theme
export interface ScrollGlobeSection {
  id: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  align?: "left" | "center" | "right";
  features?: { title: string; description: string }[];
  actions?: { label: string; variant: "primary" | "secondary"; onClick?: () => void; href?: string }[];
}

export interface ScrollGlobeProps {
  sections: ScrollGlobeSection[];
  globeConfig?: {
    positions: {
      top: string;
      left: string;
      scale: number;
    }[];
  };
  className?: string;
}

const defaultGlobeConfig = {
  positions: [
    { top: "50%", left: "75%", scale: 1.3 }, // Hero/Welcome: Right side
    { top: "25%", left: "50%", scale: 0.95 }, // Mission: Centered top
    { top: "20%", left: "85%", scale: 1.6 }, // Vision: Right side
    { top: "50%", left: "50%", scale: 1.4 }, // Future: Center backdrop
  ],
};

// Parse percentage string to number
const parsePercent = (str: string): number => parseFloat(str.replace("%", ""));

export default function ScrollGlobe({
  sections,
  globeConfig = defaultGlobeConfig,
  className,
}: ScrollGlobeProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [globeTransform, setGlobeTransform] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Pre-calculate positions for performance
  const calculatedPositions = useMemo(() => {
    return globeConfig.positions.map((pos) => ({
      top: parsePercent(pos.top),
      left: parsePercent(pos.left),
      scale: pos.scale,
    }));
  }, [globeConfig.positions]);

  // Direct scroll tracking
  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

    setScrollProgress(progress);

    // Section detection
    const viewportCenter = window.innerHeight / 2;
    let newActiveSection = 0;
    let minDistance = Infinity;

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          newActiveSection = index;
        }
      }
    });

    const currentPos = calculatedPositions[newActiveSection] || calculatedPositions[0];
    const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`;

    setGlobeTransform(transform);
    setActiveSection(newActiveSection);
  }, [calculatedPositions]);

  // Scroll handler with RAF
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId.current = requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [updateScrollPosition]);

  // Initial globe position
  useEffect(() => {
    const initialPos = calculatedPositions[0];
    if (initialPos) {
      const initialTransform = `translate3d(${initialPos.left}vw, ${initialPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${initialPos.scale}, ${initialPos.scale}, 1)`;
      setGlobeTransform(initialTransform);
    }
  }, [calculatedPositions]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-screen overflow-x-hidden min-h-screen bg-[#CBCFB8] text-[#1E3227]",
        className
      )}
    >
      {/* Top Progress Bar styled in Bharath MedGuru Forest Green & Gold */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#1E3227]/15 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#1E3227] via-[#9B8A3E] to-[#1E3227] will-change-transform shadow-xs"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left center",
            transition: "transform 0.15s ease-out",
          }}
        />
      </div>

      {/* Enhanced Navigation Dots with Labels */}
      <div className="hidden sm:flex fixed right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40">
        <div className="space-y-4 lg:space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="relative group flex items-center justify-end">
              {/* Floating Section Label */}
              <div
                className={cn(
                  "nav-label absolute right-7 sm:right-9 top-1/2 -translate-y-1/2",
                  "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap",
                  "bg-[#1E3227] text-[#CBCFB8] border border-white/20 shadow-xl z-50 pointer-events-none transition-all duration-300",
                  activeSection === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9B8A3E] animate-pulse" />
                  <span>{section.badge || `Section ${index + 1}`}</span>
                </div>
              </div>

              {/* Dot Button */}
              <button
                onClick={() => {
                  sectionRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className={cn(
                  "relative w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125 cursor-pointer",
                  activeSection === index
                    ? "bg-[#1E3227] border-[#1E3227] shadow-lg scale-110"
                    : "bg-transparent border-[#1E3227]/40 hover:border-[#1E3227] hover:bg-[#1E3227]/20"
                )}
                aria-label={`Go to ${section.badge || `section ${index + 1}`}`}
              />
            </div>
          ))}
        </div>

        {/* Vertical line indicator */}
        <div className="absolute right-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#1E3227]/20 to-transparent -z-10" />
      </div>

      {/* Interactive 3D Globe with Responsive Positioning */}
      <div
        className="fixed z-10 pointer-events-none will-change-transform transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transform: globeTransform,
          filter: `opacity(${activeSection === 3 ? 0.35 : 0.88})`,
        }}
      >
        <div className="scale-75 sm:scale-90 lg:scale-100 drop-shadow-2xl">
          <Globe />
        </div>
      </div>

      {/* Dynamic Sections Content */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className={cn(
            "relative min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 z-20 py-20 sm:py-24 lg:py-28",
            "w-full max-w-full overflow-hidden",
            section.align === "center" && "items-center text-center",
            section.align === "right" && "items-end text-right",
            section.align !== "center" && section.align !== "right" && "items-start text-left"
          )}
        >
          <div
            className={cn(
              "w-full max-w-xl sm:max-w-2xl lg:max-w-3xl will-change-transform transition-all duration-700",
              "opacity-100 translate-y-0"
            )}
          >
            {/* Badge */}
            {section.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15 mb-4 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#9B8A3E]" />
                <span>{section.badge}</span>
              </div>
            )}

            {/* Title / Subtitle */}
            <h1
              className={cn(
                "font-semibold mb-6 sm:mb-8 leading-[1.12] tracking-tight text-[#1E3227]",
                index === 0
                  ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              )}
            >
              {section.subtitle ? (
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-[#1E3227]">{section.title}</div>
                  <div className="text-[#3F5447] font-normal text-[0.6em] sm:text-[0.65em] tracking-normal">
                    {section.subtitle}
                  </div>
                </div>
              ) : (
                <div className="text-[#1E3227]">{section.title}</div>
              )}
            </h1>

            {/* Description */}
            <div
              className={cn(
                "text-[#3F5447] leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl font-light",
                section.align === "center" ? "max-w-full mx-auto text-center" : "max-w-full"
              )}
            >
              <p className="mb-3 sm:mb-4">{section.description}</p>
              {index === 0 && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#3F5447]/80 mt-4 sm:mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9B8A3E] animate-pulse" />
                    <span>Regional Pharmacy Branch Network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#1E3227] animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <span>Scroll to Explore Mission &amp; Vision</span>
                  </div>
                </div>
              )}
            </div>

            {/* Features Grid - Frosted Glass Cards */}
            {section.features && (
              <div className="grid gap-4 mb-8 sm:mb-10">
                {section.features.map((feature, featureIndex) => (
                  <div
                    key={feature.title}
                    className="p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.30) 100%)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: "1px solid rgba(255, 255, 255, 0.75)",
                      borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 10px 25px -4px rgba(30, 50, 39, 0.08)",
                      animationDelay: `${featureIndex * 0.1}s`,
                    }}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-2 h-2 rounded-full bg-[#9B8A3E] mt-2 flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-[#1E3227] text-base sm:text-lg">
                          {feature.title}
                        </h3>
                        <p className="text-[#3F5447] leading-relaxed text-sm sm:text-base font-light">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions Buttons */}
            {section.actions && (
              <div
                className={cn(
                  "flex flex-col sm:flex-row flex-wrap gap-3.5",
                  section.align === "center" && "justify-center",
                  section.align === "right" && "justify-end",
                  (!section.align || section.align === "left") && "justify-start"
                )}
              >
                {section.actions.map((action, actionIndex) => {
                  if (action.href) {
                    return (
                      <a
                        key={action.label}
                        href={action.href}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base cursor-pointer",
                          action.variant === "primary"
                            ? "bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white shadow-md"
                            : "border border-[#1E3227]/25 bg-white/60 backdrop-blur-md text-[#1E3227] hover:bg-white"
                        )}
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    );
                  }
                  return (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base cursor-pointer",
                        action.variant === "primary"
                          ? "bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white shadow-md"
                          : "border border-[#1E3227]/25 bg-white/60 backdrop-blur-md text-[#1E3227] hover:bg-white"
                      )}
                    >
                      <span>{action.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
