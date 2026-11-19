"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

  // Mobile state: active slide index
  const [mobileIndex, setMobileIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Desktop ring of cards: continuous circular buffer so you NEVER see an empty end
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

  // Circular wheel geometry for widescreen desktop (>= 1024px)
  const getGeometry = useCallback((w: number, h: number) => {
    const viewW = w > 0 ? w : (typeof window !== "undefined" ? window.innerWidth : 1440);
    const viewH = h > 0 ? h : (typeof window !== "undefined" ? window.innerHeight : 900);
    const cardW = Math.min(420, Math.max(300, viewW * 0.25));
    const cardH = cardW / 1.48;
    const radius = Math.min(800, Math.max(600, viewH * 0.75));

    // Move equator inward from left edge for clean breathing room
    const equatorX = Math.max(320, viewW * 0.25);
    const hubX = equatorX - radius;
    const hubY = viewH * 0.5;

    return { cardW, cardH, radius, hubX, hubY };
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
    if (!cap) return;
    const w = el?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1440);
    const h = el?.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 900);
    const g = getGeometry(w, h);

    // Shifted comfortably to the right side with generous breathing room
    const equatorRightEdge = g.hubX + g.radius + g.cardW / 2;
    const leftPos = Math.max(equatorRightEdge + 48, w * 0.44);
    cap.style.left = `${leftPos.toFixed(1)}px`;
    cap.style.right = "auto";
    cap.style.top = `${g.hubY.toFixed(1)}px`;
    cap.style.bottom = "auto";
    cap.style.transform = "translateY(-50%)";
    cap.style.maxWidth = `calc(100% - ${leftPos.toFixed(1)}px - 40px)`;
  }, [getGeometry]);

  // Update card DOM transforms across the connected circular ring
  const renderCards = useCallback(() => {
    const el = stageRef.current;
    const w = el?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1440);
    const h = el?.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 900);
    const g = getGeometry(w, h);
    const p = posRef.current.v;

    for (let i = 0; i < n; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;

      // Distance from wheel position wrapped around the connected circular ring
      const d = offsetOf(i, p, n);
      const c = getCardPlacement(d, g);
      const dist = Math.abs(d);

      // Only render cards that are on or near the visible front arc
      if (dist > 2.5) {
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        continue;
      }

      card.style.pointerEvents = "auto";
      const scale = Math.max(0.74, 1 - dist * 0.055);
      const baseOpacity = dist <= 1 ? 1 - dist * 0.12 : Math.max(0, 0.88 * (1 - (dist - 1) / 1.5));

      // Dissolve smoothly before touching top/bottom boundaries so cards never get clipped abruptly
      const cardTop = c.y - g.cardH / 2;
      const cardBottom = c.y + g.cardH / 2;
      let edgeFade = 1;
      if (cardTop < 75) {
        edgeFade = Math.max(0, cardTop / 75);
      } else if (cardBottom > h - 75) {
        edgeFade = Math.max(0, (h - cardBottom) / 75);
      }
      const finalOpacity = Math.max(0, baseOpacity * edgeFade);

      const zIndex = Math.round(100 - dist * 10);

      card.style.transform = `translate3d(${(c.x - g.cardW / 2).toFixed(
        2
      )}px, ${(c.y - g.cardH / 2).toFixed(2)}px, 0) rotate(${c.rot.toFixed(
        3
      )}deg) scale(${scale.toFixed(3)})`;

      card.style.opacity = finalOpacity.toFixed(3);
      card.style.zIndex = String(zIndex);
      card.style.width = `${g.cardW}px`;
      card.style.height = `${g.cardH}px`;
    }

    // Active item index 0..(count - 1)
    const activeItem = wrapIndex(p, count);
    setCurrentIndex((prev) => (prev === activeItem ? prev : activeItem));
  }, [n, count, getGeometry, getCardPlacement]);

  // Synchronous layout effect before paint to immediately position cards and caption
  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      positionCaption();
      renderCards();
    }
  }, [positionCaption, renderCards]);

  // Window resize observer
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        positionCaption();
        renderCards();
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [positionCaption, renderCards]);

  // Scrub smoothly through the count of contents (0 to count - 1) using gsap.matchMedia for desktop
  useEffect(() => {
    if (count < 2) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;

      const totalSteps = count - 1;
      let target = 0;

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          target = self.progress * totalSteps;
        },
        onRefresh: (self) => {
          // Immediately recalibrate to current scroll position on refresh
          target = self.progress * totalSteps;
          posRef.current.v = target;
          renderCards();
          positionCaption();
        },
      });

      stRef.current = trigger;

      // Sync position immediately upon mounting/restoring scroll position
      target = trigger.progress * totalSteps;
      posRef.current.v = target;
      renderCards();
      positionCaption();

      // Smooth ticker interpolation for frame-perfect, jank-free scrubbing
      const tick = (_t: number, dt: number) => {
        const p = posRef.current.v;
        const next = p + (target - p) * (1 - Math.exp(-dt / 85));
        if (Math.abs(next - p) < 1e-4 && next === target) return;
        posRef.current.v = Math.abs(target - next) < 1e-4 ? target : next;
        renderCards();
      };

      gsap.ticker.add(tick);

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        renderCards();
        positionCaption();
      }, 150);

      return () => {
        clearTimeout(refreshTimer);
        gsap.ticker.remove(tick);
        trigger.kill();
        stRef.current = null;
      };
    });

    return () => {
      mm.revert();
    };
  }, [count, renderCards, positionCaption]);

  // Caption fade transition on desktop when current content index updates
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

  // Smooth scroll to bring any item flat on desktop
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

  // Touch gesture handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only swipe if mostly horizontal and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        // Swipe left -> next
        setMobileIndex((prev) => (prev + 1) % count);
      } else {
        // Swipe right -> prev
        setMobileIndex((prev) => (prev - 1 + count) % count);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentItem = items[currentIndex] || items[0];
  const totalTrackHeight = `${(1 + (count - 1) * scrollPerCard) * 100}vh`;

  // Pre-calculated default geometry for SSR & pre-hydration stability on desktop
  const initG = useMemo(() => getGeometry(1440, 900), [getGeometry]);
  const initCapLeft = useMemo(() => {
    const eqRight = initG.hubX + initG.radius + initG.cardW / 2;
    return Math.max(eqRight + 48, 1440 * 0.44);
  }, [initG]);

  const mobileCurrent = items[mobileIndex] || items[0];

  return (
    <>
      {/* =========================================================================
          1. MOBILE & TABLET RESPONSIVE CAROUSEL (< 1024px / lg:hidden)
          Clean touch-friendly slider: upright cards, no clipping, no scroll trap
         ========================================================================= */}
      <div className={`block lg:hidden select-none bg-[#CBCFB8] py-10 sm:py-14 px-4 sm:px-6 ${className}`}>
        <div className="max-w-lg mx-auto">
          {/* Eyebrow & Number Badge */}
          <div className="flex items-center justify-between mb-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3227]/8 text-[#1E3227] text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B8A3E]" />
              Healthcare Services
            </div>
            <p className="font-mono text-xs tracking-widest text-[#9B8A3E] font-semibold uppercase">
              SERVICES
            </p>
          </div>

          {/* Quick-Select Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none -mx-1 px-1">
            {items.map((it, idx) => {
              const label =
                idx === 0
                  ? "Clinic"
                  : idx === 1
                  ? "Diagnostics"
                  : idx === 2
                  ? "24/7 Pharmacy"
                  : "Retail Chain";
              const isActive = mobileIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMobileIndex(idx)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#1E3227] text-[#CBCFB8] shadow-sm font-semibold"
                      : "bg-[#1E3227]/8 text-[#1E3227]/80 hover:bg-[#1E3227]/15"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Mobile Card Slider */}
          <div
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[22px] overflow-hidden shadow-[0_16px_36px_-10px_rgba(30,50,39,0.22)] bg-[#1E3227]/10 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sliding Track */}
            <div
              className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {items.map((it, idx) => (
                <div
                  key={idx}
                  className="w-full h-full flex-shrink-0 relative select-none cursor-pointer"
                  onClick={() => onBookItem?.(it.title)}
                >
                  <img
                    src={it.src}
                    alt={it.alt ?? it.title}
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Top-left pill badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-medium tracking-wider uppercase pointer-events-none">
                    Service {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>

            {/* Left & Right Chevron Controls */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileIndex((prev) => (prev - 1 + count) % count);
                }}
                aria-label="Previous service"
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-90 shadow-md cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileIndex((prev) => (prev + 1) % count);
                }}
                aria-label="Next service"
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-90 shadow-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Dots Indicator */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 pointer-events-none">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === mobileIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mt-5 transition-all duration-300">
            {/* Meta */}
            {mobileCurrent.meta && (
              <p className="text-xs sm:text-sm font-semibold text-[#9B8A3E] tracking-wide uppercase mb-1.5">
                {mobileCurrent.meta}
              </p>
            )}

            {/* Title */}
            <h3 className="font-sans text-2xl sm:text-3xl font-medium text-[#1E3227] tracking-tight leading-tight mb-2.5">
              {mobileCurrent.title}
            </h3>

            {/* Description */}
            {mobileCurrent.description && (
              <p className="text-xs sm:text-sm text-[#3F5447] font-light leading-relaxed mb-5">
                {mobileCurrent.description}
              </p>
            )}

            {/* Call to Action Button */}
            <div className="pt-1 pb-2">
              <button
                type="button"
                onClick={() => onBookItem?.(mobileCurrent.title)}
                className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#1E3227] hover:text-[#15241c] transition-colors cursor-pointer py-1"
              >
                <span className="border-b border-[#1E3227]/40 pb-0.5 group-hover:border-[#1E3227] transition-colors font-semibold">
                  EXPLORE SERVICE
                </span>
                <div className="w-7 h-7 rounded-full bg-[#1E3227] text-[#CBCFB8] flex items-center justify-center group-hover:bg-[#15241c] transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP 3D ARC CARD CAROUSEL (>= 1024px / hidden lg:block)
          Connected Circular Ring with GSAP ScrollTrigger
         ========================================================================= */}
      <div
        ref={trackRef}
        className={`hidden lg:block relative select-none bg-[#CBCFB8] ${className}`}
        style={{ height: totalTrackHeight }}
        role="region"
        aria-label={ariaLabel}
      >
        {/* Stage Container */}
        <div
          ref={stageRef}
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#CBCFB8]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          {/* Circular Ring */}
          {ringCards.map((it, i) => {
            const d0 = offsetOf(i, 0, n);
            const c0 = getCardPlacement(d0, initG);
            const dist0 = Math.abs(d0);
            const scale0 = Math.max(0.74, 1 - dist0 * 0.055);
            const baseOp0 = dist0 > 2.5 ? 0 : (dist0 <= 1 ? 1 - dist0 * 0.12 : Math.max(0, 0.88 * (1 - (dist0 - 1) / 1.5)));
            const top0 = c0.y - initG.cardH / 2;
            const btm0 = c0.y + initG.cardH / 2;
            const stageH0 = initG.hubY * 2;
            let ef0 = 1;
            if (top0 < 75) ef0 = Math.max(0, top0 / 75);
            else if (btm0 > stageH0 - 75) ef0 = Math.max(0, (stageH0 - btm0) / 75);
            const opacity0 = Math.max(0, baseOp0 * ef0);
            const zIndex0 = Math.round(100 - dist0 * 10);

            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onClick={() => bringFlat(it.originalIndex)}
                role="button"
                tabIndex={0}
                aria-label={`${it.title} - Item ${it.originalIndex + 1} of ${count}`}
                style={{
                  width: `${initG.cardW}px`,
                  height: `${initG.cardH}px`,
                  transform: `translate3d(${(c0.x - initG.cardW / 2).toFixed(2)}px, ${(c0.y - initG.cardH / 2).toFixed(2)}px, 0) rotate(${c0.rot.toFixed(3)}deg) scale(${scale0.toFixed(3)})`,
                  opacity: opacity0,
                  zIndex: zIndex0,
                  pointerEvents: dist0 > 7 ? "none" : "auto",
                }}
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
            );
          })}

          {/* Caption */}
          <div
            ref={capRef}
            style={{
              left: `${initCapLeft.toFixed(1)}px`,
              top: `${initG.hubY.toFixed(1)}px`,
              transform: "translateY(-50%)",
              maxWidth: `calc(100% - ${initCapLeft.toFixed(1)}px - 40px)`,
            }}
            className="absolute z-40 max-w-[580px] pointer-events-auto"
          >
            {/* Eyebrow */}
            <p className="acc-num font-mono text-xs md:text-sm tracking-[0.22em] text-[#9B8A3E] mb-3 font-semibold uppercase">
              SERVICES
            </p>

            {/* Headline */}
            <h3 className="acc-title font-sans text-3xl sm:text-5xl lg:text-[62px] font-normal text-[#1E3227] tracking-tight leading-[1.05] mb-4">
              {currentItem.title}
            </h3>

            {/* Meta Subtitle */}
            {currentItem.meta && (
              <p className="acc-meta text-sm sm:text-base text-[#3F5447] font-light tracking-wide mb-3">
                {currentItem.meta}
              </p>
            )}

            {/* Service Description */}
            {currentItem.description && (
              <p className="acc-desc text-xs sm:text-sm md:text-base text-[#3F5447]/90 font-light leading-relaxed mb-6 max-w-lg">
                {currentItem.description}
              </p>
            )}

            {/* Minimalist Explore Action */}
            <button
              onClick={() => onBookItem?.(currentItem.title)}
              className="acc-action group inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#1E3227] hover:text-[#15241c] transition-colors cursor-pointer"
            >
              <span className="border-b border-[#1E3227]/30 pb-0.5 group-hover:border-[#1E3227] transition-colors font-semibold">
                EXPLORE SERVICE
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
