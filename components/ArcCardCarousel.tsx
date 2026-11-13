"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ArcCardItem = {
  src: string;
  alt?: string;
  title: string;
  meta?: string;
  description?: string;
};

export type ArcCardCarouselProps = {
  items: ArcCardItem[];
  scrollPerCard?: number;
  step?: number;
  ariaLabel?: string;
  className?: string;
  onBookItem?: (title: string) => void;
};

/** Compute ring size: repeat items so the wheel forms an endless, connected circular ring */
export function ringSize(len: number): number {
  return len > 0 ? Math.ceil(18 / len) * len : 0;
}

/** Distance of card `i` from position `pos`, wrapped symmetrically around the connected circle */
export function offsetOf(i: number, pos: number, n: number): number {
  if (n <= 0) return 0;
  const d = (((i - pos) % n) + n) % n;
  return d >= n / 2 ? d - n : d;
}

/** Wrap position to the 0..(count-1) items index */
export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0;
  return ((Math.round(i) % n) + n) % n;
}

export default function ArcCardCarousel({
  items,
  scrollPerCard = 0.5,
  step = 18.5, // 18.5° spacing so images are beautifully separated along the circular rim
  ariaLabel = "Photo carousel",
  className = "",
  onBookItem,
}: ArcCardCarouselProps) {
  const count = items.length;
  // Ring of cards: continuous circular buffer so you NEVER see an empty end
  const n = useMemo(() => ringSize(count), [count]);
  const ringCards = useMemo(
    () => Array.from({ length: n }, (_, i) => ({ ...items[i % count], originalIndex: i % count })),
    [items, n, count]
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const capRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef({ v: 0 });
  const stRef = useRef<ScrollTrigger | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stageDimensions, setStageDimensions] = useState({
    w: 1440,
    h: 900,
    isMobile: false,
  });

  // Circular wheel geometry
  const getGeometry = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    if (isMobile) {
      const cardW = Math.min(280, w * 0.78);
      const cardH = cardW / 1.45;
      const radius = Math.min(h * 0.55, 380);
      const equatorX = w * 0.5;
      const hubX = equatorX - radius;
      const hubY = Math.max(cardH / 2 + 60, h * 0.30);
      return { cardW, cardH, radius, hubX, hubY, isMobile };
    } else {
      const cardW = Math.min(420, Math.max(300, w * 0.25));
      const cardH = cardW / 1.48;
      const radius = Math.min(800, Math.max(600, h * 0.75));

      // Move equator inward from left edge for clean breathing room
      const equatorX = Math.max(320, w * 0.25);
      const hubX = equatorX - radius;
      const hubY = h * 0.5;

      return { cardW, cardH, radius, hubX, hubY, isMobile };
    }
  }, []);

  // Compute placement along the circular arc
  const getCardPlacement = useCallback(
    (d: number, g: ReturnType<typeof getGeometry>) => {
      const deg = -d * step;
      const rad = (deg * Math.PI) / 180;
      const x = g.hubX + g.radius * Math.cos(rad);
      const y = g.hubY + g.radius * Math.sin(rad);
      return { x, y, rot: deg };
    },
    [step]
  );

  // Position caption directly beside the flat equator card with generous breathing space
  const positionCaption = useCallback(() => {
    const cap = capRef.current;
    const el = stageRef.current;
    if (!cap || !el) return;
    const g = getGeometry(el.clientWidth, el.clientHeight);

    if (g.isMobile) {
      cap.style.left = "20px";
      cap.style.right = "20px";
      cap.style.top = "auto";
      cap.style.bottom = "24px";
      cap.style.transform = "none";
      cap.style.maxWidth = "calc(100% - 40px)";
    } else {
      // Shifted comfortably to the right side with generous breathing room
      const equatorRightEdge = g.hubX + g.radius + g.cardW / 2;
      const leftPos = Math.max(equatorRightEdge + 48, el.clientWidth * 0.44);
      cap.style.left = `${leftPos.toFixed(1)}px`;
      cap.style.right = "auto";
      cap.style.top = `${g.hubY.toFixed(1)}px`;
      cap.style.bottom = "auto";
      cap.style.transform = "translateY(-50%)";
      cap.style.maxWidth = `calc(100% - ${leftPos.toFixed(1)}px - 40px)`;
    }
  }, [getGeometry]);

  // Update card DOM transforms across the connected circular ring
  const renderCards = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    const g = getGeometry(el.clientWidth, el.clientHeight);
    const p = posRef.current.v;

    for (let i = 0; i < n; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;

      // Distance from wheel position wrapped around the connected circular ring
      const d = offsetOf(i, p, n);
      const c = getCardPlacement(d, g);
      const dist = Math.abs(d);

      // Only render cards that are on or near the visible arc
      if (dist > 7) {
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        continue;
      }

      card.style.pointerEvents = "auto";
      const scale = Math.max(0.74, 1 - dist * 0.055);
      const opacity = Math.max(0.3, 1 - dist * 0.16);
      const zIndex = Math.round(100 - dist * 10);

      card.style.transform = `translate3d(${(c.x - g.cardW / 2).toFixed(
        2
      )}px, ${(c.y - g.cardH / 2).toFixed(2)}px, 0) rotate(${c.rot.toFixed(
        3
      )}deg) scale(${scale.toFixed(3)})`;

      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = String(zIndex);
      card.style.width = `${g.cardW}px`;
      card.style.height = `${g.cardH}px`;
    }

    // Active item index 0..(count - 1)
    const activeItem = wrapIndex(p, count);
    setCurrentIndex((prev) => (prev === activeItem ? prev : activeItem));
  }, [n, count, getGeometry, getCardPlacement]);

  // Window resize observer
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setStageDimensions({
        w: el.clientWidth,
        h: el.clientHeight,
        isMobile: el.clientWidth < 768,
      });
      positionCaption();
      renderCards();
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [positionCaption, renderCards]);

  // Scrub through the count of contents (0 to count - 1), then smoothly release to next section
  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return;

    // As user scrolls through the section, pos progresses through the contents (0 to count - 1).
    // Once the contents are completed, the section unpins and naturally continues to the next section.
    const tween = gsap.to(posRef.current, {
      v: count - 1,
      ease: "none",
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: () => {
          renderCards();
        },
      },
    });

    stRef.current = tween.scrollTrigger ?? null;
    renderCards();
    positionCaption();

    // Re-calibrate ScrollTrigger so the start position is exact and always begins at item 1 (01 / 09)
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      renderCards();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      tween.kill();
      stRef.current = null;
    };
  }, [count, renderCards, positionCaption]);

  // Caption fade transition when current content index updates
  useEffect(() => {
    const cap = capRef.current;
    if (!cap) return;

    const elements = cap.querySelectorAll(".acc-title, .acc-num, .acc-meta, .acc-action");
    gsap.fromTo(
      elements,
      { y: 8, opacity: 0.3 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.03 }
    );
  }, [currentIndex]);

  // Smooth scroll to bring any item flat
  const bringFlat = (originalItemIndex: number) => {
    const st = stRef.current;
    if (!st) return;
    const clamped = Math.max(0, Math.min(count - 1, originalItemIndex));
    const targetScroll = st.start + (clamped / (count - 1)) * (st.end - st.start);

    if (typeof window !== "undefined" && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScroll, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const currentItem = items[currentIndex] || items[0];
  // Track height calibrated so completing the 9 contents flows directly into the next section
  const totalTrackHeight = `${(1 + (count - 1) * scrollPerCard) * 100}vh`;

  return (
    <div
      ref={trackRef}
      className={`relative select-none bg-[#CBCFB8] ${className}`}
      style={{ height: totalTrackHeight }}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Sticky Fullscreen Stage Container */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#CBCFB8]"
      >
        {/* Connected Circular Ring of Cards - Never Shows an Empty End */}
        {ringCards.map((it, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => bringFlat(it.originalIndex)}
            role="button"
            tabIndex={0}
            aria-label={`${it.title} - Item ${it.originalIndex + 1} of ${count}`}
            className="absolute top-0 left-0 overflow-hidden will-change-transform cursor-pointer rounded-[20px] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18),0_4px_14px_-2px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_50px_-6px_rgba(0,0,0,0.26)] group"
          >
            <img
              src={it.src}
              alt={it.alt ?? it.title}
              draggable={false}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
            />
          </div>
        ))}

        {/* Clean, Spacious Typography Caption beside Flat Card */}
        <div
          ref={capRef}
          className="absolute z-40 max-w-[580px] pointer-events-auto"
        >
          {/* Number Counter (01 / 09) */}
          <p className="acc-num font-mono text-xs md:text-sm tracking-[0.22em] text-[#9B8A3E] mb-3 font-semibold uppercase">
            {String(currentIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>

          {/* Editorial Serif Headline */}
          <h3 className="acc-title font-sans text-3xl sm:text-5xl lg:text-[62px] font-normal text-[#1E3227] tracking-tight leading-[1.05] mb-4">
            {currentItem.title}
          </h3>

          {/* Meta Subtitle */}
          {currentItem.meta && (
            <p className="acc-meta text-sm sm:text-base text-[#3F5447] font-light tracking-wide mb-7">
              {currentItem.meta}
            </p>
          )}

          {/* Minimalist Explore Action */}
          <button
            onClick={() => onBookItem?.(currentItem.title)}
            className="acc-action group inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#1E3227] hover:text-[#15241c] transition-colors cursor-pointer"
          >
            <span className="border-b border-[#1E3227]/30 pb-0.5 group-hover:border-[#1E3227] transition-colors">
              Explore experience
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>


      </div>
    </div>
  );
}
