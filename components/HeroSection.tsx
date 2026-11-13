"use client";

/**
 * HeroSection — Halora-spec hero adapted for MedGuru / Bharath MedGuru
 *
 * Scale system:  --s = max(0.55, min(100vw/2048, 100vh/1152))
 * Every spatial measurement is N * var(--s) * 1px  →  use s(N).
 * The floor 0.55 keeps copy readable at small sizes.
 *
 * Layout: full-bleed BG (video crossfade) → copy (left, v-centred) → 3 glass cards (right, v-centred)
 * Motion: Web Animations API, staggered, backwards-fill, self-cancelling once done.
 * Reduced motion: no entrance, no video.
 */

import React, {
  CSSProperties,
  useEffect,
  useRef,
} from "react";
import {
  ArrowRight,
  Moon,
  Flame,
  Activity,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns a CSS calc() string scaling reference-pixel N to the --s variable. */
const s = (n: number) => `calc(var(--s, 0.7) * ${n}px)` as string;

/** Clamp a scaled value with explicit min/max in px. */
const sc = (min: number, ref: number, max: number) =>
  `clamp(${min}px, calc(var(--s, 0.7) * ${ref}px), ${max}px)` as string;

// Allow CSS custom properties in inline style objects
interface HeroVars extends CSSProperties {
  "--s"?: string | number;
}

// ─── Glass Card ─────────────────────────────────────────────────────────────

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  unit: string;
  gold?: boolean;
}

function GlassCard({ icon, label, value, unit, gold }: CardProps) {
  return (
    <div
      data-anim="card"
      style={{
        width: sc(158, 222, 230),
        minHeight: sc(110, 150, 158),
        padding: `${sc(12, 18, 20)} ${sc(14, 22, 24)}`,
        // True Frosted Glass Sheen with Specular Bevel
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.22) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255, 255, 255, 0.65)",
        borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
        borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
        borderRadius: sc(14, 20, 22),
        boxShadow:
          "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
        display: "flex",
        flexDirection: "column",
        gap: sc(2, 5, 6),
      }}
    >
      {/* Label — icon + text */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: sc(4, 5, 6),
          fontSize: sc(8, 10, 11),
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#1E3227",
          opacity: 0.75,
        }}
      >
        {icon}
        {label}
      </div>

      {/* Big numeral — light Inter */}
      <div
        style={{
          fontSize: sc(28, 50, 54),
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "#1E3227",
        }}
      >
        {value}
      </div>

      {/* Sub-label — olive gold for accent items */}
      <div
        style={{
          fontSize: sc(8, 10, 11),
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: gold ? "#9B8A3E" : "#3F5447",
        }}
      >
        {unit}
      </div>
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

interface HeroSectionProps {
  onOpenBooking?: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const secRef = useRef<HTMLElement>(null);
  const vaRef = useRef<HTMLVideoElement>(null);
  const vbRef = useRef<HTMLVideoElement>(null);

  // ── 1. Compute --s on mount and resize ──────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (!secRef.current) return;
      const scale = Math.max(
        0.55,
        Math.min(window.innerWidth / 2048, window.innerHeight / 1152)
      );
      secRef.current.style.setProperty("--s", String(scale));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── 2. Crossfading seamless video loop ──────────────────────────────────
  useEffect(() => {
    const a = vaRef.current;
    const b = vbRef.current;
    if (!a || !b) return;

    // Reduced motion → skip video entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Previous ambient video loop
    const SRC =
      "https://assets.mixkit.co/videos/preview/mixkit-pharmacist-checking-medicines-in-a-pharmacy-41484-large.mp4";
    const FADE = 1.0; // seconds crossfade

    a.src = SRC;
    b.src = SRC;
    a.style.opacity = "0";
    b.style.opacity = "0";

    // Track which video is currently "on-air"
    let onAir: HTMLVideoElement = a;
    let waiting: HTMLVideoElement = b;
    let swapping = false;

    const swap = () => {
      if (swapping) return;
      swapping = true;

      // Fade waiting video in and start playing from beginning
      waiting.currentTime = 0;
      waiting.play().catch(() => { });
      waiting.style.transition = `opacity ${FADE}s ease`;
      waiting.style.opacity = "1";

      // After FADE seconds, fade the on-air video out
      setTimeout(() => {
        onAir.style.transition = `opacity ${FADE}s ease`;
        onAir.style.opacity = "0";

        // After another FADE seconds, fully swap references
        setTimeout(() => {
          onAir.pause();
          [onAir, waiting] = [waiting, onAir];
          swapping = false;
        }, FADE * 1000);
      }, FADE * 1000);
    };

    // Fire swap when on-air video is FADE seconds from its end
    const tick = () => {
      if (
        onAir.duration &&
        onAir.currentTime >= onAir.duration - FADE - 0.05
      ) {
        swap();
      }
    };

    // Fade-in first frame once ready (0.8 s)
    a.addEventListener(
      "canplay",
      () => {
        a.style.transition = "opacity 0.8s ease";
        a.style.opacity = "1";
        a.play().catch(() => { });
      },
      { once: true }
    );

    a.addEventListener("timeupdate", tick);
    b.addEventListener("timeupdate", tick);

    return () => {
      a.removeEventListener("timeupdate", tick);
      b.removeEventListener("timeupdate", tick);
    };
  }, []);

  // ── 3. Staggered entrance — Web Animations API ───────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sec = secRef.current;
    if (!sec) return;

    const anims: Animation[] = [];
    let done = false;

    const run = () => {
      if (done) return;

      const ease = { easing: "cubic-bezier(0.22,1,0.36,1)", fill: "backwards" as FillMode };
      const q = (sel: string) => sec.querySelector(sel);
      const qa = (sel: string) => Array.from(sec.querySelectorAll(sel));

      let t = 60; // global timeline cursor (ms)

      const push = (el: Element | null, dur: number, from: Keyframe) => {
        if (!el) return;
        anims.push(
          el.animate([from, { opacity: 1, transform: "none" }], {
            ...ease,
            duration: dur,
            delay: t,
          })
        );
      };

      // Dot — circular clip-path reveal
      const dot = q("[data-anim=dot]");
      if (dot) {
        anims.push(
          dot.animate(
            [
              { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
              { opacity: 1, clipPath: "circle(60% at 50% 50%)" },
            ],
            { ...ease, duration: 400, delay: t }
          )
        );
        t += 90;
      }

      // Eyebrow label slides in from left
      push(q("[data-anim=eyebrow]"), 420, {
        opacity: 0,
        transform: "translateX(-10px)",
      });
      t += 115;

      // Each h1 line rises inside its overflow:hidden mask
      qa("[data-anim=h1line]").forEach((line) => {
        push(line, 700, { opacity: 0, transform: "translateY(36px)" });
        t += 120;
      });

      // Paragraph & CTA settle in
      push(q("[data-anim=para]"), 540, { opacity: 0, transform: "translateY(16px)" });
      t += 95;
      push(q("[data-anim=cta]"), 480, { opacity: 0, transform: "translateY(12px)" });
      t += 80;

      // Cards rise one after another
      qa("[data-anim=card]").forEach((card) => {
        push(card, 560, { opacity: 0, transform: "translateY(28px)" });
        t += 100;
      });

      // Self-cancel after all animations finish (restores authored styles)
      anims.at(-1)?.finished.then(() => {
        done = true;
        anims.forEach((a) => a.cancel());
      });
    };

    // Start only once fonts are loaded (matches Halora spec)
    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      setTimeout(run, 150);
    }

    return () => {
      done = true;
      anims.forEach((a) => a.cancel());
    };
  }, []);

  // Icon size helper using the scale system
  const iconSz = (n = 11) => ({
    width: s(n),
    height: s(n),
    flexShrink: 0 as const,
    strokeWidth: 1.5,
  });

  return (
    <section
      id="hero"
      ref={secRef}
      style={
        {
          position: "relative",
          width: "100%",
          height: "100dvh",
          minHeight: "600px",
          backgroundColor: "#CBCFB8",
          overflow: "hidden",
          // Seed value — JS overrides on mount
          "--s": "0.7",
        } as HeroVars
      }
    >
      {/* ══════════════════════════════════════════════════════════════════
          LAYER 0 — Full-bleed background
          Photo fitted to viewport height, anchored bottom.
          Video overlay with identical box + crossfade.
         ══════════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        {/* Ambient blurred backdrop layer (smooth bleed across edges) */}
        <div
          style={{
            position: "absolute",
            inset: "-24px",
            backgroundImage: "url('/hero-reception.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            filter: "blur(32px)",
            opacity: 0.8,
            transform: "scale(1.05)",
          }}
        />

        {/* Modern Bharath Medguru Clinic Reception — zoomed out to show full reception space */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero-reception.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            transform: "scale(0.90)",
            transformOrigin: "center center",
            maskImage:
              "radial-gradient(ellipse 82% 80% at 50% 50%, black 50%, transparent 96%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 82% 80% at 50% 50%, black 50%, transparent 96%)",
          }}
        />

        {/* Peripheral all-side frosted blur vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            maskImage:
              "radial-gradient(ellipse 66% 66% at 50% 50%, transparent 38%, black 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 66% 66% at 50% 50%, transparent 38%, black 82%)",
            pointerEvents: "none",
          }}
        />

        {/* Soft atmospheric sage wash — ties the image to #CBCFB8 palette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(203,207,184,0.20)",
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />

        {/* LEFT edge gradient — copy legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(203,207,184,0.94) 0%, rgba(203,207,184,0.72) 22%, rgba(203,207,184,0.18) 45%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* RIGHT edge gradient — cards legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to left, rgba(203,207,184,0.74) 0%, rgba(203,207,184,0.25) 25%, transparent 45%)",
            pointerEvents: "none",
          }}
        />

        {/* TOP gradient — Navbar bleed */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(203,207,184,0.65) 0%, transparent 18%)",
            pointerEvents: "none",
          }}
        />

        {/* BOTTOM gradient — smooth blend into next section */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(203,207,184,0.85) 0%, transparent 14%)",
            pointerEvents: "none",
          }}
        />

        {/* Olive-leaf shadow radial (decorative, upper-right) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 48% 58% at 80% 28%, rgba(30,50,39,0.14) 0%, transparent 60%)",
          }}
        />

        {/* Thin glass circle arc — sits behind the hand, matches Halora */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            // Offset left so the arc centres behind the central visual area
            transform: "translate(-38%, -50%)",
            width: "clamp(300px, 54vmin, 720px)",
            height: "clamp(300px, 54vmin, 720px)",
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.32)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 1 — LEFT: Copy — vertically centred, left edge
         ══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          top: "50%",
          // Left margin scales with viewport but clamps to [32px, 110px]
          left: "clamp(32px, 6.8vw, 110px)",
          transform: "translateY(-48%)",
          display: "flex",
          flexDirection: "column",
          gap: sc(12, 18, 22),
          // Max-width in reference pixels, with a sensible floor/ceiling
          maxWidth: sc(320, 560, 600),
        }}
      >
        {/* Eyebrow — dot + label */}
        <div style={{ display: "flex", alignItems: "center", gap: sc(6, 8, 10) }}>
          {/* Dot — clip-path animated in entrance */}
          <span
            data-anim="dot"
            style={{
              display: "inline-block",
              width: sc(6, 8, 9),
              height: sc(6, 8, 9),
              borderRadius: "50%",
              backgroundColor: "#1E3227",
              flexShrink: 0,
            }}
          />
          <span
            data-anim="eyebrow"
            style={{
              fontSize: sc(12, 15, 16),
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#2C3E33",
            }}
          >
            Tracking 24/7
          </span>
        </div>

        {/* Headline — two lines inside overflow:hidden masks */}
        <h1
          style={{
            margin: 0,
            fontSize: sc(38, 78, 84),
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: "#1E3227",
          }}
        >
          <span
            data-anim="h1line"
            style={{ display: "block", overflow: "hidden", fontWeight: 500 }}
          >
            Know Your Body.
          </span>
          <span
            data-anim="h1line"
            style={{
              display: "block",
              overflow: "hidden",
              fontWeight: 500,
            }}
          >
            Move With It.
          </span>
        </h1>

        {/* Paragraph */}
        <p
          data-anim="para"
          style={{
            margin: 0,
            fontSize: "clamp(14px, calc(var(--s, 0.7) * 18px), 19px)",
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 450,
            lineHeight: 1.62,
            color: "#2C3E33",
            maxWidth: sc(320, 480, 520),
          }}
        >
          Sleep, recovery, stress, heart rate and activity — tracked continuously and turned into insights you can actually use.
        </p>

        {/* CTA row — single dark pill "Explore the Ring" */}
        <div
          data-anim="cta"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: sc(6, 8, 10),
          }}
        >
          <button
            onClick={onOpenBooking}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#15241c";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#1E3227";
            }}
            style={{
              height: sc(44, 54, 58),
              padding: `0 ${sc(26, 36, 40)}`,
              backgroundColor: "#1E3227",
              color: "#CBCFB8",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              fontSize: "clamp(14px, calc(var(--s, 0.7) * 16px), 17px)",
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.01em",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.18s ease",
              whiteSpace: "nowrap",
            }}
          >
            Explore More
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 2 — RIGHT: Three frosted glass metric cards
          Halora spec: 222×160s cards, 20s radius, sage translucent fill
         ══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          top: "50%",
          right: "clamp(24px, 4vw, 76px)",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: sc(8, 12, 14),
        }}
      >
        {/* Card 1 — SLEEP: 7h 42m / GOOD */}
        <GlassCard
          icon={<Moon {...iconSz(11)} />}
          label="SLEEP"
          value={
            <>
              7<span style={{ fontSize: sc(14, 22, 24), marginLeft: "1px", marginRight: "6px" }}>H</span>
              42<span style={{ fontSize: sc(14, 22, 24), marginLeft: "1px" }}>M</span>
            </>
          }
          unit="GOOD"
          gold={true}
        />

        {/* Card 2 — CALORIES: 1642 / KCAL */}
        <GlassCard
          icon={<Flame {...iconSz(11)} />}
          label="CALORIES"
          value="1642"
          unit="KCAL"
          gold={true}
        />

        {/* Card 3 — HRV: 68 / MS */}
        <GlassCard
          icon={<Activity {...iconSz(11)} />}
          label="HRV"
          value="68"
          unit="MS"
          gold={false}
        />
      </div>
    </section>
  );
}
