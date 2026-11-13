"use client";

import React from "react";
import ArcCardCarousel, { ArcCardItem } from "@/components/ArcCardCarousel";

interface GallerySectionProps {
  onSelectExperience?: (title: string) => void;
}

const GALLERY_ITEMS: ArcCardItem[] = [
  {
    src: "https://framerusercontent.com/images/yCRt3JWrUCUUWjU7eSIahGzcys.jpg",
    title: "Mindful Meditation & Stillness",
    meta: "Retreat Circle • 90 mins Guided Session",
    alt: "Mindful meditation session",
  },
  {
    src: "https://framerusercontent.com/images/Sc3B21P6V6DNn4QF6gkok1Wk4.jpg",
    title: "Himalayan Singing Bowls",
    meta: "Vibrational Sound • Studio Sanctuary Immersion",
    alt: "Himalayan singing bowls immersion",
  },
  {
    src: "https://framerusercontent.com/images/KOFYjpJSluBo7AfRE2dGghVTU2Q.jpg",
    title: "Somatic Tension Release",
    meta: "Myofascial Touch • Somatic Trauma Unwinding",
    alt: "Somatic tension release bodywork",
  },
  {
    src: "https://framerusercontent.com/images/ddTNmZbKLYRzPNpgDogmBjbEKcM.jpg",
    title: "Nature Grounding Immersion",
    meta: "Earthing Retreat • Forest Bathing Sanctuary",
    alt: "Nature grounding and earthing",
  },
  {
    src: "https://framerusercontent.com/images/M7SBXEfppMeQJQZLqBQ41fZa1Qk.jpg",
    title: "Holistic Herbal Lounge",
    meta: "Herbal Botanical Alchemy • Mindful Consultation",
    alt: "Holistic lounge and tea circle",
  },
  {
    src: "https://framerusercontent.com/images/1hU7z9C918JEaJ2dQgRQ4fYoz8.jpg",
    title: "Transformative Breathwork",
    meta: "Pranayama • Autonomic Nervous System Reset",
    alt: "Breathwork immersion workshop",
  },
  {
    src: "https://framerusercontent.com/images/7dbfLsGUA6CZBOUpmyxUT7kroIY.jpg",
    title: "Botanical Plant Alchemy",
    meta: "Ayurvedic Herbal Oils • Organic Plant Therapy",
    alt: "Botanical oils and natural remedies",
  },
  {
    src: "https://framerusercontent.com/images/wFcUakLojNor8oggBVBAYfeLsQ.jpg",
    title: "Chakra Alignment Retreat",
    meta: "Usui Reiki Master • Subtle Biofield Harmony",
    alt: "Chakra alignment energy healing",
  },
  {
    src: "https://framerusercontent.com/images/1XwFW5Yt8F3DlAYFljpjPBL9MJY.jpg",
    title: "Restorative Sound Harmony",
    meta: "Harmonic Acoustic Resonance • Deep Cellular Calm",
    alt: "Restorative sound harmony session",
  },
];

export default function GallerySection({ onSelectExperience }: GallerySectionProps) {
  return (
    <section id="gallery" className="relative bg-[#CBCFB8] overflow-visible">
      {/* Arc Card Carousel - Continuous Connected Ring */}
      <ArcCardCarousel
        items={GALLERY_ITEMS}
        ariaLabel="Visual gallery of holistic healing experiences"
        onBookItem={onSelectExperience}
      />
    </section>
  );
}
