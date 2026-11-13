"use client";

import React, { useState } from "react";
import { ArrowUpRight, Clock, BookOpen, X } from "lucide-react";

export default function BlogSection() {
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  const articles = [
    {
      id: "chakra-techniques",
      title: "5 Energy Healing Techniques to Rebalance Your Chakras",
      excerpt:
        "Unlock the secrets of your body’s subtle energy system with these powerful chakra-balancing practices used by holistic healers around the world.",
      category: "Energy Healing",
      author: "Sofia Callen",
      authorRole: "Reiki Master & Energy Healer",
      readTime: "5 min read",
      date: "Nov 10, 2026",
      image: "https://framerusercontent.com/images/aarfBVywLAN5Eq5YKVwCEONkaI.jpg",
      content: `Our physical bodies are sustained by an intricate network of subtle energy meridians and vortexes known as chakras. When emotional stress, trauma, or overwork accumulates, these energetic centres can become sluggish or hyperactive. 

In this guide, we explore five foundational practices:
1. Daily Grounding (Earthing) to stabilize the Root Chakra (Muladhara).
2. Sacral Water Immersion and fluid hip movement for the Sacral Chakra (Svadhisthana).
3. Breath of Fire (Kapalabhati) to reignite Solar Plexus confidence (Manipura).
4. Loving-Kindness (Metta) meditation to open the Heart Chakra (Anahata).
5. Vocal Toning with high-frequency vowels to clear the Throat Chakra (Vishuddha).

Integrating these micro-practices for just 10 minutes each morning revitalizes your natural vitality and emotional clarity.`,
    },
    {
      id: "sound-baths-nervous-system",
      title: "How Sound Baths Can Calm the Autonomic Nervous System",
      excerpt:
        "Discover how calibrated sonic frequencies stimulate the restorative vagus nerve, lower cortisol, and invite profound brainwave relaxation.",
      category: "Mindfulness & Sound",
      author: "Lena Hart",
      authorRole: "Sound Frequency Specialist",
      readTime: "6 min read",
      date: "Nov 04, 2026",
      image: "https://framerusercontent.com/images/CPxMN4M7oVR32cxiuPW6ZyBqZk4.jpg",
      content: `Modern sensory overload keeps our sympathetic nervous system in perpetual low-grade emergency mode. Sound therapy utilizes the ancient science of acoustic resonance to gently guide overstimulated brain states from agitated Beta waves (14-30 Hz) into relaxed Alpha (8-14 Hz) and restorative Theta (4-8 Hz) states.

When pure quartz crystal bowls and low-frequency gongs are struck, their resonant vibrations penetrate deep into muscular tissue and bone density, prompting somatic release of stored tension and activating parasympathetic rest-and-digest recovery.`,
    },
    {
      id: "beginners-guide-ayurveda",
      title: "A Beginner’s Guide to Ayurveda for Everyday Balance",
      excerpt:
        "Understand your unique Vata, Pitta, or Kapha constitution and learn practical herbal remedies for seasonal digestive harmony.",
      category: "Ayurveda & Nutrition",
      author: "Aarav Desai",
      authorRole: "Ayurvedic Health Physician",
      readTime: "7 min read",
      date: "Oct 28, 2026",
      image: "https://framerusercontent.com/images/3Y2Dt689F5ZJob56LwquzJmgulo.jpg",
      content: `Ayurveda, the 5,000-year-old sister science of Yoga, views wellness as the harmonious balance between five universal elements: Space, Air, Fire, Water, and Earth. In our human physiology, these express as the three primary bio-energies or Doshas:

- Vata (Air + Space): Governs movement, creativity, and the nervous system.
- Pitta (Fire + Water): Governs metabolic digestion, intellect, and transformation.
- Kapha (Earth + Water): Governs physical structure, immunity, and lubrication.

Learn how aligning your daily routine (Dinacharya), choosing warm seasonal foods, and drinking herbal teas restores balance before illness manifests.`,
    },
    {
      id: "power-of-breathwork",
      title: "The Power of Breathwork: Release Stagnant Stress in Minutes",
      excerpt:
        "Science-backed pranayama sequences to dissolve mental brain fog, alleviate anxiety, and energize your cellular oxygenation.",
      category: "Breathwork & Prana",
      author: "Dr. Maya Varen",
      authorRole: "Life Coach & Somatic Guide",
      readTime: "4 min read",
      date: "Oct 20, 2026",
      image: "https://framerusercontent.com/images/MO9bOC3FtuWjp7iibrsNqp7oZQY.jpg",
      content: `The breath is the only autonomic bodily function that we can consciously control at will. By modulating the ratio of inhalation, retention, and exhalation, you can directly influence your heart rate variability (HRV) and emotional state within minutes.

Try the 4-7-8 soothing technique: inhale quietly through the nose for 4 seconds, hold gently for 7 seconds, and exhale completely with a soft whoosh for 8 seconds. Repeating this 4 times down-regulates anxiety and centers mental clarity.`,
    },
  ];

  return (
    <section id="blog" className="py-24 bg-[#f9fbf8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] text-xs font-semibold tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Wellness Journal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#163c3d]">
            Explore Our Latest Insights & <br />
            <span className="italic font-normal text-[#1f2d2e]">Healing Journeys</span>
          </h2>
          <p className="text-base sm:text-lg text-[#526061] font-light leading-relaxed">
            Dive into expert tips, personal stories, and educational resources designed to nurture your
            body, mind, and spirit one mindful post at a time.
          </p>
        </div>

        {/* 4 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white rounded-[24px] border border-[#163c3d]/10 hover:border-[#163c3d]/30 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e2eddf]/30">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#163c3d]/85 text-[#e2eddf] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#526061] mb-2.5">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#163c3d] group-hover:text-[#102d2e] transition-colors mb-2.5 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#526061] font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More */}
              <div className="px-6 pb-6 pt-3 border-t border-[#163c3d]/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-[#1f2d2e]">{article.author}</div>
                  <div className="text-[10px] text-[#526061]">{article.authorRole}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#f2f7f0] text-[#163c3d] group-hover:bg-[#163c3d] group-hover:text-[#e2eddf] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f2f7f0] text-[#163c3d] hover:bg-[#163c3d] hover:text-[#e2eddf] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] inline-block">
                {activeArticle.category}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#163c3d]">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-[#526061] pb-4 border-b border-[#163c3d]/10">
                <span>By {activeArticle.author} ({activeArticle.authorRole})</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden my-4">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-sm sm:text-base text-[#1f2d2e] font-light leading-relaxed whitespace-pre-line space-y-4 pt-2">
                {activeArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

