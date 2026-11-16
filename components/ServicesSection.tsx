"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const SERVICES_CARDS_DATA = [
  {
    src: "/images/services/service-doctor-chamber.jpg",
    title: "General Medicine & Diabetology",
    subtitle: "Specialist OPD & Chronic Care",
  },
  {
    src: "/images/services/service-clinic-exterior.jpg",
    title: "Automated Diagnostic Lab",
    subtitle: "Biochemistry, Pathology & Blood Tests",
  },
  {
    src: "/images/services/service-pharmacy-counter.jpg",
    title: "24/7 In-Clinic Pharmacy",
    subtitle: "Licensed Authentic Formulations",
  },
  {
    src: "/images/services/service-exam-room.jpg",
    title: "Cardiology & Heart Care",
    subtitle: "ECG, 2D Echo & Specialist Review",
  },
  {
    src: "/images/services/service-reception-lounge.jpg",
    title: "Clinical Reception & Wellness",
    subtitle: "Zero Wait Times & Priority Triage",
  },
  {
    src: "/images/services/service-doctor-chamber.jpg",
    title: "Orthopedics & Joint Health",
    subtitle: "Musculoskeletal & Bone Care",
  },
  {
    src: "/images/services/service-exam-room.jpg",
    title: "Pediatrics & Child Wellness",
    subtitle: "Comprehensive Child Healthcare",
  },
  {
    src: "/images/services/service-pharmacy-counter.jpg",
    title: "Chain of Retail Pharmacies",
    subtitle: "Kerala Network & Doorstep Delivery",
  },
  {
    src: "/images/services/service-clinic-exterior.jpg",
    title: "Executive Health Packages",
    subtitle: "Full Body Diagnostic Profiles",
  },
];

interface TunnelCardData {
  item: { src: string; title: string; subtitle: string };
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = SERVICES_CARDS_DATA.map((item, i) => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  const radiusFactorX = 0.18 + (i % 3) * 0.05;
  const radiusFactorY = 0.16 + (i % 2) * 0.05;

  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX,
    radiusFactorY,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (2 + (i % 4) * 2),
    index: i,
  };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
  onSelectService: (serviceName: string) => void;
}

function TunnelCard({
  card,
  progress,
  pointer,
  total,
  stage,
  onSelectService,
}: TunnelCardProps) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(160, Math.min(220, stage.width * 0.44))
    : Math.max(220, Math.min(300, stage.width * 0.2));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currZ, px, py]: (number | string)[]) => {
      const numZ = typeof currZ === "number" ? currZ : 0;
      const numX = typeof px === "number" ? px : 0;
      const numY = typeof py === "number" ? py : 0;
      const offsetX = baseX - numX * panStrength;
      const offsetY = baseY - numY * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${numZ}px) rotateZ(${card.rotationZ}deg)`;
    }
  );

  return (
    <motion.div
      style={{
        width: cardWidth,
        transform,
        opacity,
        zIndex: card.index + 1,
      }}
      onClick={() => onSelectService(card.item.title)}
      className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-[24px] bg-[#1E3227] shadow-2xl border border-[#CBCFB8]/30 transition-all duration-300 hover:scale-105 hover:border-white">
        {/* Real Clinic Photo */}
        <img
          src={card.item.src}
          alt={card.item.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Top Badge: Sequential Service Number */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-[10px] font-mono tracking-widest uppercase pointer-events-none">
          Service {String(card.index + 1).padStart(2, "0")}
        </div>

        {/* Card Overlay with Title and Subtitle */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3227] via-[#1E3227]/55 to-transparent flex flex-col justify-end p-4 sm:p-5">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9B8A3E] font-medium mb-1 drop-shadow-sm">
            {card.item.subtitle}
          </span>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm sm:text-base lg:text-lg font-sans font-semibold text-white drop-shadow-md leading-snug">
              {card.item.title}
            </h4>
            <div className="w-7 h-7 rounded-full bg-[#CBCFB8] text-[#1E3227] flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Global scroll driven by natural page scrolling through the section container height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.0001,
  });

  const pointer = useCameraParallax(!reduce);

  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 1.25]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.15]);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative h-[280vh] bg-[#1E3227] text-[#CBCFB8]"
    >
      {/* Sticky Fullscreen 3D Viewport driven by Global Page Scroll */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden select-none flex items-center justify-center border-y border-[#CBCFB8]/15"
        style={{
          perspective: stage.isMobile ? "900px" : "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background Grid & Subtle Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#CBCFB8_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,207,184,0.12)_0%,transparent_70%)]" />

        {/* Concentric Guide Rings */}
        <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-[#CBCFB8]/20" />
        <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-[#CBCFB8]/15" />

        {/* Central Anchor Typography - Explore Our Gallery */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#CBCFB8] text-[11px] font-semibold tracking-wider uppercase mb-3 border border-white/15 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9B8A3E]" />
            Visual Tour
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] text-[#CBCFB8]">
            Explore Our <br />
            <span className="font-normal text-white">Gallery</span>
          </h2>
        </motion.div>

        {/* 3D Z-Space Corridor Cards */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {TUNNEL_CARDS.map((card, i) => (
            <TunnelCard
              key={i}
              card={card}
              progress={smoothProgress}
              pointer={pointer}
              total={TUNNEL_CARDS.length}
              stage={stage}
              onSelectService={onSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
