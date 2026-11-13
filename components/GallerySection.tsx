"use client";

import React from "react";
import ArcCardCarousel, { ArcCardItem } from "@/components/ArcCardCarousel";
import { Sparkles } from "lucide-react";

const GALLERY_ITEMS: ArcCardItem[] = [
  {
    src: "https://framerusercontent.com/images/yCRt3JWrUCUUWjU7eSIahGzcys.jpg",
    title: "Mindful Meditation & Stillness",
    meta: "Retreat Circle • 90 mins Session",
    alt: "Mindful meditation session",
  },
  {
    src: "https://framerusercontent.com/images/Sc3B21P6V6DNn4QF6gkok1Wk4.jpg",
    title: "Himalayan Singing Bowls",
    meta: "Vibrational Sound • Studio Sanctuary",
    alt: "Himalayan singing bowls immersion",
  },
  {
    src: "https://framerusercontent.com/images/KOFYjpJSluBo7AfRE2dGghVTU2Q.jpg",
    title: "Somatic Tension Release",
    meta: "Myofascial Touch • Deep Rebalancing",
    alt: "Somatic tension release bodywork",
  },
  {
    src: "https://framerusercontent.com/images/ddTNmZbKLYRzPNpgDogmBjbEKcM.jpg",
    title: "Nature Grounding Immersion",
    meta: "Earthing Retreat • Forest Bathing",
    alt: "Nature grounding and earthing",
  },
  {
    src: "https://framerusercontent.com/images/M7SBXEfppMeQJQZLqBQ41fZa1Qk.jpg",
    title: "Holistic Herbal Lounge",
    meta: "Herbal Alchemy • Mindful Consultation",
    alt: "Holistic lounge and tea circle",
  },
  {
    src: "https://framerusercontent.com/images/1hU7z9C918JEaJ2dQgRQ4fYoz8.jpg",
    title: "Transformative Breathwork",
    meta: "Pranayama • Nervous System Reset",
    alt: "Breathwork immersion workshop",
  },
  {
    src: "https://framerusercontent.com/images/7dbfLsGUA6CZBOUpmyxUT7kroIY.jpg",
    title: "Botanical Plant Alchemy",
    meta: "Ayurvedic Oils • Organic Extracts",
    alt: "Botanical oils and natural remedies",
  },
  {
    src: "https://framerusercontent.com/images/wFcUakLojNor8oggBVBAYfeLsQ.jpg",
    title: "Chakra Alignment Retreat",
    meta: "Usui Reiki • Subtle Energy Flow",
    alt: "Chakra alignment energy healing",
  },
  {
    src: "https://framerusercontent.com/images/1XwFW5Yt8F3DlAYFljpjPBL9MJY.jpg",
    title: "Restorative Sound Harmony",
    meta: "Acoustic Resonance • Deep Calm",
    alt: "Restorative sound harmony session",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="relative bg-[#f9fbf8] pt-24 pb-8 overflow-hidden">
      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#163c3d]">
            Real People, Real Transformations
          </h2>
          <p className="text-base sm:text-lg text-[#526061] font-light leading-relaxed">
            Scroll down to roll through our arc wheel of workshops, one-on-one sessions, sound baths, and
            community retreats.
          </p>
        </div>
      </div>

      {/* Arc Card Carousel - GSAP ScrollTrigger Powered */}
      <ArcCardCarousel
        items={GALLERY_ITEMS}
        height="85svh"
        scrollPerCard={0.5}
        step={14}
        radius={22}
        caption={true}
        loop={true}
        ariaLabel="Visual gallery of holistic healing experiences"
      />
    </section>
  );
}
