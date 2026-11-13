"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Arc Card Carousel — photo cards hung on the rim of a wheel whose hub sits
 * off the left edge, so only a gentle arc of them shows. The card on the
 * wheel's equator lies flat; every card above it tips back and every card
 * below tips forward, each one turned to face the hub.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ArcCardItem = {
  src: string;
  alt?: string;
  title?: string;
  meta?: string;
};

export type ArcCardCarouselProps = {
  items: ArcCardItem[];
  height?: string;
  scrollPerCard?: number;
  step?: number;
  radius?: number;
  caption?: boolean;
  loop?: boolean;
  onIndexChange?: (index: number) => void;
  ariaLabel?: string;
  className?: string;
};

export function offsetOf(i: number, pos: number, n: number): number {
  if (n <= 0) return 0;
  const d = (((i - pos) % n) + n) % n;
  return d >= n / 2 ? d - n : d;
}

export function ringSize(len: number): number {
  return len > 0 ? Math.ceil(10 / len) * len : 0;
}

export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0;
  return ((Math.round(i) % n) + n) % n;
}

export function geometry(w: number, h: number) {
  const u = Math.min(h, w / 0.47);
  const cardW = 0.3 * u;
  return {
    cardW,
    cardH: cardW / 1.65,
    radius: 0.71 * u,
    hubX: 0.284 * u - 0.71 * u,
    hubY: 0.475 * h,
  };
}

export function place(
  d: number,
  stepDeg: number,
  g: { radius: number; hubX: number; hubY: number }
) {
  const deg = -d * stepDeg;
  const a = (deg * Math.PI) / 180;
  return {
    x: g.hubX + g.radius * Math.cos(a),
    y: g.hubY + g.radius * Math.sin(a),
    rot: deg,
  };
}

export function spans(count: number, loop: boolean): number {
  return Math.max(0, loop ? count : count - 1);
}

export function positionAt(progress: number, laps: number, steps: number): number {
  return (progress + laps) * steps;
}

export function scrollFor(
  i: number,
  steps: number,
  start: number,
  end: number
): number {
  return steps > 0 ? start + (i / steps) * (end - start) : start;
}

const CSS =
  ".acc-track{position:relative;background:#f9fbf8;--color-background:#f9fbf8;--color-foreground:#163c3d;--color-muted-foreground:#526061;--color-primary:#163c3d;--color-border:#e2eddf}" +
  ".acc-stage{position:sticky;top:0;overflow:hidden}" +
  ".acc-card{position:absolute;left:0;top:0;overflow:hidden;will-change:transform;cursor:pointer;" +
  "box-shadow:0 4px 12px rgba(22,60,61,.12),0 16px 36px -10px rgba(22,60,61,.3);background:#ffffff;border:1px solid #e2eddf}" +
  ".acc-card>img{display:block;width:100%;height:100%;max-width:none;object-fit:cover;pointer-events:none}" +
  ".acc-card:focus-visible{outline:2px solid #163c3d;outline-offset:3px}" +
  ".acc-cap{position:absolute;right:6vw;transform:translateY(-50%);color:#163c3d;pointer-events:none;max-width:min(440px,42vw)}" +
  ".acc-num{font-size:13px;letter-spacing:.08em;font-variant-numeric:tabular-nums;color:#526061;margin:0 0 16px;font-weight:600}" +
  ".acc-title{margin:0;font-size:clamp(28px,4.5vw,72px);line-height:1.02;letter-spacing:-.035em;font-weight:600;font-family:var(--font-lora),Georgia,serif;color:#163c3d}" +
  ".acc-meta{margin:16px 0 0;font-size:15px;color:#526061;font-weight:400;line-height:1.4}" +
  ".acc-cap[data-narrow]{left:0 !important;right:0;top:auto !important;bottom:0;transform:none;padding:56px 20px 24px;max-width:none;" +
  "background:linear-gradient(to top,#f9fbf8 calc(100% - 56px),transparent)}" +
  ".acc-cap[data-narrow] .acc-num{margin-bottom:8px}" +
  ".acc-cap[data-narrow] .acc-title{font-size:28px}" +
  ".acc-cap[data-narrow] .acc-meta{margin-top:8px;font-size:13px}" +
  ".acc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}";

export default function ArcCardCarousel({
  items,
  height = "100svh",
  scrollPerCard = 0.6,
  step = 14,
  radius = 20,
  caption = true,
  loop = true,
  onIndexChange,
  ariaLabel = "Photo carousel",
  className = "",
}: ArcCardCarouselProps) {
  const count = items.length;
  const n = ringSize(count);
  const cards = React.useMemo(
    () => Array.from({ length: n }, (_, i) => items[i % count]),
    [items, n, count]
  );
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const capRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const pos = React.useRef({ v: 0 });
  const st = React.useRef<ScrollTrigger | null>(null);
  const geo = React.useRef(geometry(1, 1));
  const [index, setIndex] = React.useState(0);
  const [narrow, setNarrow] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const onIndexRef = React.useRef(onIndexChange);
  onIndexRef.current = onIndexChange;
  const showCaption = caption && items.some((it) => it.title);

  const placeCaption = React.useCallback(() => {
    const cap = capRef.current;
    const el = stageRef.current;
    if (!cap || !el) return;
    const g = geo.current;
    cap.style.top = g.hubY + "px";
    cap.style.left =
      g.hubX +
      g.radius +
      g.cardW / 2 +
      Math.max(24, 0.06 * el.clientHeight) +
      "px";
  }, []);

  const render = React.useCallback(() => {
    const g = geo.current;
    const p = pos.current.v;
    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const d = offsetOf(i, p, n);
      const c = place(d, step, g);
      el.style.transform =
        "translate3d(" +
        (c.x - g.cardW / 2).toFixed(2) +
        "px," +
        (c.y - g.cardH / 2).toFixed(2) +
        "px,0) rotate(" +
        c.rot.toFixed(3) +
        "deg)";
      el.style.zIndex = String(Math.round((n - d) * 10));
    }
    const now = wrapIndex(p, count);
    setIndex((prev) => (prev === now ? prev : now));
  }, [n, count, step]);

  React.useEffect(() => {
    onIndexRef.current?.(index);
  }, [index]);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const g = geometry(el.clientWidth, el.clientHeight);
      geo.current = g;
      for (const c of cardRefs.current) {
        if (!c) continue;
        c.style.width = g.cardW + "px";
        c.style.height = g.cardH + "px";
      }
      placeCaption();
      setNarrow(el.clientWidth < 0.9 * el.clientHeight || el.clientWidth < 640);
      render();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [render, placeCaption]);

  React.useLayoutEffect(placeCaption, [showCaption, placeCaption]);

  const steps = spans(count, loop);
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return;
    let laps = 0;
    let target = 0;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      snap: reduced
        ? undefined
        : {
            snapTo: 1 / steps,
            duration: { min: 0.5, max: 1.4 },
            delay: 0.12,
            ease: "power2.inOut",
          },
      onUpdate: (self) => {
        if (loop && self.progress >= 1 && self.direction > 0) {
          laps += 1;
          self.scroll(self.start + 1);
          return;
        }
        target = positionAt(self.progress, laps, steps);
      },
    });

    const onWheel = (e: WheelEvent) => {
      if (!loop || e.deltaY >= 0 || trigger.scroll() > trigger.start + 1) return;
      const r = track.getBoundingClientRect();
      if (r.top > 1 || r.bottom < window.innerHeight - 1) return;
      laps -= 1;
      trigger.scroll(trigger.end - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    target = positionAt(trigger.progress, 0, steps);
    pos.current.v = target;

    const tick = (_t: number, dt: number) => {
      const p = pos.current.v;
      const next = reduced ? target : p + (target - p) * (1 - Math.exp(-dt / 110));
      if (Math.abs(next - p) < 1e-4 && next === target) return;
      pos.current.v = Math.abs(target - next) < 1e-4 ? target : next;
      render();
    };

    gsap.ticker.add(tick);
    st.current = trigger;
    render();

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("wheel", onWheel);
      trigger.kill();
      st.current = null;
    };
  }, [count, steps, loop, reduced, render]);

  React.useEffect(() => {
    const cap = capRef.current;
    if (!cap || reduced) return;
    const tw = gsap.fromTo(
      cap.querySelectorAll(".acc-num,.acc-title,.acc-meta"),
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.05 }
    );
    return () => void tw.kill();
  }, [index, reduced]);

  const bringFlat = (i: number) => {
    const s = st.current;
    if (!s) return;
    window.scrollTo({
      top: scrollFor(i % count, steps, s.start, s.end),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const current = items[index];

  return (
    <div
      ref={trackRef}
      className={"acc-track " + className}
      style={{
        height: "calc(" + height + " * " + (1 + steps * scrollPerCard) + ")",
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <style>{CSS}</style>
      <div ref={stageRef} className="acc-stage" style={{ height }}>
        {cards.map((it, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="acc-card"
            style={{ borderRadius: radius }}
            role="button"
            tabIndex={i < count ? 0 : -1}
            aria-roledescription="slide"
            aria-label={
              (it.title ?? it.alt ?? "Card") +
              ", " +
              ((i % count) + 1) +
              " of " +
              count
            }
            onClick={() => bringFlat(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                bringFlat(i);
              }
            }}
          >
            <img
              src={it.src}
              alt={it.alt ?? ""}
              draggable={false}
              decoding="async"
            />
          </div>
        ))}

        {showCaption && current && (
          <div
            ref={capRef}
            className="acc-cap"
            data-narrow={narrow ? "" : undefined}
            style={{ zIndex: n * 20 }}
          >
            <p className="acc-num">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </p>
            {current.title && <h3 className="acc-title">{current.title}</h3>}
            {current.meta && <p className="acc-meta">{current.meta}</p>}
          </div>
        )}

        <p className="acc-sr" aria-live="polite">
          {count
            ? "Card " +
              (index + 1) +
              " of " +
              count +
              (current?.title ? ": " + current.title : "")
            : ""}
        </p>
      </div>
    </div>
  );
}
