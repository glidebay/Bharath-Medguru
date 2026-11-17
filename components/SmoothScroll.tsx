"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Make lenis globally available for smooth programmatic jumps
    (window as any).__lenis = lenis;

    // 2. Synchronize ScrollTrigger with Lenis scroll events
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 3. Drive Lenis updates via GSAP ticker for frame-perfect lock
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial mount/DOM layout settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    // 4. Smooth anchor link navigation for both `#hash` and `pathname#hash`
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      let targetId = "";
      if (href.startsWith("#") && href.length > 1) {
        targetId = href.substring(1);
      } else if (typeof window !== "undefined" && href.startsWith(window.location.pathname + "#")) {
        targetId = href.split("#")[1];
      }

      if (targetId) {
        const el = document.getElementById(targetId) || document.querySelector(`#${targetId}`);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // 5. Scroll to hash target on initial load if present in URL
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          lenis.scrollTo(targetEl as HTMLElement, { offset: -20, duration: 1.2 });
        }
      }, 350);
    }

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
