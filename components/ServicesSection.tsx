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
import { Sparkles, ArrowRight, Compass } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const MODALITY_CARDS_DATA = [
  {
    src: "https://framerusercontent.com/images/aarfBVywLAN5Eq5YKVwCEONkaI.jpg",
    title: "Energy Healing",
    subtitle: "Reiki & Chakra Balance",
  },
  {
    src: "https://framerusercontent.com/images/CPxMN4M7oVR32cxiuPW6ZyBqZk4.jpg",
    title: "Sound Therapy",
    subtitle: "Bowls & Gong Vibrations",
  },
  {
    src: "https://framerusercontent.com/images/N6o6ZLH0yVENL5EJ2RfmAOBFDU.png?width=588&height=564",
    title: "Holistic Counseling",
    subtitle: "Mind & Life Clarity",
  },
  {
    src: "https://framerusercontent.com/images/KOFYjpJSluBo7AfRE2dGghVTU2Q.jpg",
    title: "Bodywork & Massage",
    subtitle: "Somatic Tension Release",
  },
  {
    src: "https://framerusercontent.com/images/1hU7z9C918JEaJ2dQgRQ4fYoz8.jpg",
    title: "Breathwork",
    subtitle: "Pranayama & Calm",
  },
  {
    src: "https://framerusercontent.com/images/3Y2Dt689F5ZJob56LwquzJmgulo.jpg",
    title: "Ayurvedic Health",
    subtitle: "Dosha & Vitality",
  },
  {
    src: "https://framerusercontent.com/images/ddTNmZbKLYRzPNpgDogmBjbEKcM.jpg",
    title: "Nature Grounding",
    subtitle: "Earthing & Balance",
  },
  {
    src: "https://framerusercontent.com/images/wFcUakLojNor8oggBVBAYfeLsQ.jpg",
    title: "Biofield Tuning",
    subtitle: "Frequency Alignment",
  },
  {
    src: "https://framerusercontent.com/images/yCRt3JWrUCUUWjU7eSIahGzcys.jpg",
    title: "Meditation",
    subtitle: "Stillness & Peace",
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

const TUNNEL_CARDS: TunnelCardData[] = MODALITY_CARDS_DATA.map((item, i) => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  const radiusFactorX = 0.28 + (i % 3) * 0.08;
  const radiusFactorY = 0.26 + (i % 2) * 0.09;

  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX,
    radiusFactorY,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
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
    ? Math.max(140, Math.min(190, stage.width * 0.4))
    : Math.max(200, Math.min(280, stage.width * 0.18));

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
      <div className="group relative h-full w-full overflow-hidden rounded-[24px] bg-[#163c3d] shadow-2xl border border-[#e2eddf]/30 transition-all duration-300 hover:scale-105 hover:border-white">
        <img
          src={card.item.src}
          alt={card.item.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Card Overlay with Clean Simple Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#163c3d] via-[#163c3d]/40 to-transparent flex flex-col justify-end p-5">
          <span className="text-[11px] uppercase tracking-wider text-[#e2eddf]/90 font-medium mb-1 drop-shadow-sm">
            {card.item.subtitle}
          </span>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-base sm:text-lg font-serif font-semibold text-white drop-shadow-md">
              {card.item.title}
            </h4>
            <div className="w-7 h-7 rounded-full bg-[#e2eddf] text-[#163c3d] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
  const titleOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.1]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <section
      id="service"
      ref={containerRef}
      className="relative h-[280vh] bg-[#163c3d] text-[#e2eddf]"
    >
      {/* Sticky Fullscreen 3D Viewport driven by Global Page Scroll */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden select-none flex items-center justify-center border-y border-[#e2eddf]/15"
        style={{
          perspective: stage.isMobile ? "900px" : "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background Grid & Subtle Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2eddf_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,237,223,0.12)_0%,transparent_70%)]" />

        {/* Concentric Guide Rings */}
        <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-[#e2eddf]/20" />
        <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-[#e2eddf]/15" />

        {/* Central Anchor Typography - Clean & Simple */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-xl"
        >

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] text-[#e2eddf]">
            Explore Modalities <br />
            <span className="italic font-normal text-white">for Every Journey</span>
          </h2>



          {/* Quick Filter Modality Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6 pointer-events-auto">
            {MODALITY_CARDS_DATA.slice(0, 5).map((m, idx) => (
              <button
                key={idx}
                onClick={() => onSelectService(m.title)}
                className="text-xs bg-white/10 hover:bg-white text-[#e2eddf] hover:text-[#163c3d] px-3.5 py-1 rounded-full transition-colors font-medium border border-white/10 cursor-pointer"
              >
                {m.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Scroll Prompt Indicator */}
        <motion.div
          style={{ opacity: promptOpacity }}
          className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#e2eddf]/80"
        >
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#e2eddf]" />
            <span>Scroll to Explore</span>
          </div>
          <div className="h-6 w-px bg-gradient-to-b from-[#e2eddf] to-transparent animate-pulse" />
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
