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
    let animId: number;
    let t = 0;

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
      width: 600 * 2,
      height: 600 * 2,
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
      markerElevation: 0, // Flush on the land map surface, not an overlay
      markers: branchLocations.map((loc) => ({
        location: loc,
        size: 0.03,
      })),
    });

    const animate = () => {
      phi += 0.0035;
      t += 0.06;

      // Dynamic blinking radar pulse on the land map markers
      const animatedMarkers = branchLocations.map((loc, idx) => {
        // Individual phase offset for subtle realistic blinking
        const blinkPhase = t + idx * 0.9;
        const currentSize = 0.016 + 0.024 * Math.pow(0.5 + 0.5 * Math.sin(blinkPhase), 2);
        return {
          location: loc,
          size: currentSize,
          color: [0.96, 0.45, 0.1] as [number, number, number],
        };
      });

      globe.update({
        phi,
        markers: animatedMarkers,
      });

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
    };
  }, []);

  return (
    <div className={`relative w-[340px] sm:w-[480px] lg:w-[600px] aspect-square mx-auto flex items-center justify-center ${className || ""}`}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}
