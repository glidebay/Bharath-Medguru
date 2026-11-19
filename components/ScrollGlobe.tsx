"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Globe from "@/components/ui/globe";
import { cn } from "@/lib/utils";
import { ArrowRight, Building2, Truck, ShieldCheck, Heart } from "lucide-react";

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

interface GlobeSectionConfig {
  topPercent: number;
  leftPercent: number;
  scale: number;
}

const desktopGlobePositions: GlobeSectionConfig[] = [
  { topPercent: 0.50, leftPercent: 0.70, scale: 1.20 }, // Section 0: Heritage (right side)
  { topPercent: 0.25, leftPercent: 0.50, scale: 0.95 }, // Section 1: Mission (centered)
  { topPercent: 0.26, leftPercent: 0.70, scale: 1.20 }, // Section 2: Vision (right side)
  { topPercent: 0.50, leftPercent: 0.50, scale: 1.30 }, // Section 3: Future (centered)
];

const tabletGlobePositions: GlobeSectionConfig[] = [
  { topPercent: 0.50, leftPercent: 0.68, scale: 0.95 },
  { topPercent: 0.25, leftPercent: 0.50, scale: 0.85 },
  { topPercent: 0.25, leftPercent: 0.68, scale: 0.95 },
  { topPercent: 0.50, leftPercent: 0.50, scale: 1.05 },
];

const mobileGlobePositions: GlobeSectionConfig[] = [
  { topPercent: 0.50, leftPercent: 0.68, scale: 0.85 }, // Section 0: Heritage (right side)
  { topPercent: 0.22, leftPercent: 0.50, scale: 0.75 }, // Section 1: Mission (centered)
  { topPercent: 0.25, leftPercent: 0.68, scale: 0.85 }, // Section 2: Vision (right side)
  { topPercent: 0.50, leftPercent: 0.50, scale: 0.90 }, // Section 3: Future (centered)
];

// Calculate safe transform preventing the globe from breaking or clipping on any screen
function getSafeTransform(sectionIndex: number, width: number, height: number): string {
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const positions = isMobile
    ? mobileGlobePositions
    : isTablet
    ? tabletGlobePositions
    : desktopGlobePositions;

  const cfg = positions[sectionIndex] || positions[0];

  // Base rendered dimensions based on container breakpoints
  const baseDiameter = isMobile ? 340 * 0.75 : isTablet ? 480 * 0.90 : 600;
  const margin = isMobile ? 16 : isTablet ? 24 : 32;

  let scale = cfg.scale;
  const maxDiameter = width - margin * 2;
  let currentDiameter = baseDiameter * scale;
  if (currentDiameter > maxDiameter) {
    scale = maxDiameter / baseDiameter;
    currentDiameter = maxDiameter;
  }

  const radius = currentDiameter / 2;
  const targetX = width * cfg.leftPercent;
  const targetY = height * cfg.topPercent;

  // Clamping ensures the globe's left and right bounds stay 100% inside the viewport
  const safeX = Math.max(radius + margin, Math.min(width - radius - margin, targetX));
  const safeY = targetY;

  return `translate3d(${safeX}px, ${safeY}px, 0) translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1)`;
}

export default function ScrollGlobe({
  sections,
  className,
}: ScrollGlobeProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [globeTransform, setGlobeTransform] = useState(() => {
    if (typeof window !== "undefined") {
      return getSafeTransform(0, window.innerWidth, window.innerHeight);
    }
    return "translate3d(70vw, 50vh, 0) translate3d(-50%, -50%, 0) scale3d(1.2, 1.2, 1)";
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Direct scroll & viewport tracking
  const updateScrollPosition = useCallback(() => {
    if (typeof window === "undefined") return;

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

    const transform = getSafeTransform(
      newActiveSection,
      window.innerWidth,
      window.innerHeight
    );

    setGlobeTransform(transform);
    setActiveSection(newActiveSection);
  }, []);

  // Window resize handler to maintain exact unbroken positioning
  useEffect(() => {
    const handleResize = () => {
      updateScrollPosition();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    updateScrollPosition();
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollPosition]);

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

    // Synchronize directly with Lenis smooth scroll if available
    const lenis = typeof window !== "undefined" ? (window as any).__lenis : null;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    }

    updateScrollPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [updateScrollPosition]);

  // Smooth scroll to a target section using Lenis or native smooth fallback
  const scrollToSection = useCallback((index: number) => {
    const target = sectionRefs.current[index];
    if (!target) return;

    const lenis = typeof window !== "undefined" ? (window as any).__lenis : null;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
      });
    } else {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-screen overflow-x-hidden min-h-screen bg-[#CBCFB8] text-[#1E3227]",
        className
      )}
    >
      {/* Enhanced Navigation Dots with Labels */}
      <div className="hidden sm:flex fixed right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40">
        <div className="space-y-4 lg:space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="relative group flex items-center justify-end">
              {/* Floating Section Label */}
              <div
                className={cn(
                  "nav-label absolute right-7 sm:right-9 top-1/2 -translate-y-1/2",
                  "px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap",
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
                onClick={() => scrollToSection(index)}
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
          id={section.id}
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
              "w-full max-w-xl sm:max-w-2xl will-change-transform transition-all duration-700",
              "opacity-100 translate-y-0"
            )}
          >
            {/* Badge */}
            {section.badge && (
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-[11px] font-semibold tracking-wider uppercase border border-[#1E3227]/15 mb-3 backdrop-blur-md">
                <span>{section.badge}</span>
              </div>
            )}

            {/* Title / Subtitle */}
            <h1
              className={cn(
                "font-semibold mb-4 sm:mb-6 leading-[1.18] tracking-tight text-[#1E3227]",
                index === 0
                  ? "text-2xl sm:text-3xl md:text-4xl lg:text-[42px]"
                  : "text-xl sm:text-2xl md:text-3xl lg:text-[34px]"
              )}
            >
              {section.subtitle ? (
                <div className="space-y-1">
                  <div className="text-[#1E3227]">{section.title}</div>
                  <div className="text-[#3F5447] font-normal text-[0.55em] sm:text-[0.6em] tracking-normal mt-1">
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
                "text-[#3F5447] leading-relaxed mb-6 sm:mb-8 text-sm sm:text-[15px] lg:text-base font-normal",
                section.align === "center" ? "max-w-full mx-auto text-center" : "max-w-full"
              )}
            >
              <p className="mb-2.5 sm:mb-3">{section.description}</p>
              {index === 0 && (
                <div className="flex flex-wrap items-center gap-3.5 text-[11px] sm:text-xs text-[#3F5447]/80 mt-3 sm:mt-5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9B8A3E] animate-pulse" />
                    <span>Regional Pharmacy Branch Network</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection(1)}
                    className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#1E3227] animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <span>Scroll to Explore Mission &amp; Vision</span>
                    <ArrowRight className="w-3 h-3 text-[#1E3227] ml-0.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Features Grid - Frosted Glass Cards */}
            {section.features && (
              <div className="grid gap-3 sm:gap-3.5 mb-6 sm:mb-8">
                {section.features.map((feature, featureIndex) => (
                  <div
                    key={feature.title}
                    className="p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5"
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
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9B8A3E] mt-2 flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-[#1E3227] text-sm sm:text-[15px]">
                          {feature.title}
                        </h3>
                        <p className="text-[#3F5447] leading-relaxed text-xs sm:text-[13px] font-normal">
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
                  "flex flex-col sm:flex-row flex-wrap gap-3",
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
                          "inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm cursor-pointer",
                          action.variant === "primary"
                            ? "bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white shadow-md"
                            : "border border-[#1E3227]/25 bg-white/60 backdrop-blur-md text-[#1E3227] hover:bg-white"
                        )}
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    );
                  }
                  return (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm cursor-pointer",
                        action.variant === "primary"
                          ? "bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white shadow-md"
                          : "border border-[#1E3227]/25 bg-white/60 backdrop-blur-md text-[#1E3227] hover:bg-white"
                      )}
                    >
                      <span>{action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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