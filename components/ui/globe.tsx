"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface GlobeProps {
  className?: string;
}

export default function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let t = 0;
    
    // Accurate initial width detection based on viewport breakpoint
    const getInitialWidth = () => {
      if (canvasRef.current && canvasRef.current.offsetWidth > 0) {
        return canvasRef.current.offsetWidth;
      }
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) return 300;
        if (window.innerWidth < 1024) return 440;
      }
      return 600;
    };

    let width = getInitialWidth();

    const onResize = () => {
      if (canvasRef.current && canvasRef.current.offsetWidth > 0) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);

    // Accurate land map coordinates for Bharath MedGuru pharmacy branch locations
    const branchLocations: [number, number][] = [
      [10.8505, 76.2711], // Palakkad / Central Kerala HQ
      [9.9312, 76.2673],  // Kochi Branch
      [11.2588, 75.7804], // Kozhikode Branch
      [8.5241, 76.9366],  // Thiruvananthapuram Branch
      [11.0168, 76.9558], // Coimbatore Regional Hub
      [12.9716, 77.5946], // Bengaluru Hub
      [13.0827, 80.2707], // Chennai Hub
    ];

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 3.5,
      // #CBCFB8 sage base with #1E3227 forest green map dots
      baseColor: [0.796, 0.812, 0.722],
      markerColor: [0.96, 0.45, 0.1], // Crisp vibrant orange
      glowColor: [0.80, 0.82, 0.73],
      markers: branchLocations.map((loc) => ({
        location: loc,
        size: 0.03,
      })),
      onRender: (state) => {
        state.phi = phi;
        phi += 0.0035;
        t += 0.06;

        // Ensure width stays perfectly synchronized with canvas dimensions
        if (canvasRef.current && canvasRef.current.offsetWidth > 0) {
          const currentWidth = canvasRef.current.offsetWidth;
          if (currentWidth !== width) {
            width = currentWidth;
          }
        }
        state.width = width * 2;
        state.height = width * 2;

        state.markers = branchLocations.map((loc, idx) => {
          const blinkPhase = t + idx * 0.9;
          const currentSize = 0.016 + 0.024 * Math.pow(0.5 + 0.5 * Math.sin(blinkPhase), 2);
          return {
            location: loc,
            size: currentSize,
          };
        });
      },
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, []);

  return (
    <div className={`relative w-[300px] sm:w-[440px] lg:w-[600px] max-w-full aspect-square mx-auto flex items-center justify-center ${className || ""}`}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}