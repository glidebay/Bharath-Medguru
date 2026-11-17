"use client";

import React, { useEffect, useRef, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import {
  Sparkles,
  ShoppingBag,
  UploadCloud,
  RefreshCw,
  Truck,
  Clock,
  ArrowRight,
  Send,
  Smartphone,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function OnlineStorePage() {
  const [notified, setNotified] = useState(false);
  const [email, setEmail] = useState("");
  const handRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gaugeArcRef = useRef<SVGPathElement>(null);
  const ringArcRef = useRef<SVGCircleElement>(null);
  const gaugeCountRef = useRef<HTMLSpanElement>(null);
  const ringCountRef = useRef<HTMLSpanElement>(null);

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  useEffect(() => {
    // 1. Heading splitting into word spans for sections that use it
    const splitElements = document.querySelectorAll<HTMLElement>("[data-split]");
    splitElements.forEach((el) => {
      let i = 0;
      const walk = (node: Node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            (n.textContent || "").split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(" "));
                return;
              }
              const w = document.createElement("span");
              w.className = "w";
              const s = document.createElement("span");
              s.textContent = part;
              s.style.setProperty("--i", String(i++));
              w.appendChild(s);
              frag.appendChild(w);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && (n as HTMLElement).tagName !== "BR") {
            walk(n);
          }
        });
      };
      walk(el);
    });

    // 2. Count-up animation
    const countUp = (el: HTMLElement) => {
      const end = +(el.dataset.count || 0);
      const t0 = performance.now();
      const dur = 2000;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // 3. Scroll reveal observer
    const targets = document.querySelectorAll<HTMLElement>(".rv, [data-split]");
    const reveal = (el: HTMLElement) => {
      if (el.classList.contains("in")) return;
      el.classList.add("in");
      el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
      if (el.id === "gauge-card" && gaugeArcRef.current) {
        gaugeArcRef.current.style.strokeDashoffset = String(252 * (1 - 0.98));
      }
      if (el.id === "match-card" && ringArcRef.current) {
        ringArcRef.current.style.strokeDashoffset = String(163.4 * (1 - 0.98));
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => io.observe(el));

    const sweep = () => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.94 && r.bottom > 0) reveal(el);
      });
    };
    requestAnimationFrame(() => requestAnimationFrame(sweep));

    // 4. Parallax scroll listener for hand image
    const handleScroll = () => {
      if (handRef.current && stageRef.current) {
        const r = stageRef.current.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
        handRef.current.style.transform = `translate3d(0, ${(-p * 10).toFixed(2)}%, 0)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setNotified(true);
  };

  return (
    <SmoothScroll>
      <div className="velia-page">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={scrollToContact} />

        {/* ================= SECTION 1: HERO ================= */}
        <section className="hero" id="product">
          <div className="wrap">
            <div className="hero-head">
              <br />

              {/* Robust, non-clipping Top Heading */}
              <h1 className="hero-title rv in" style={{ "--base": "150ms" } as React.CSSProperties}>
                Coming Soon: Online E-Commerce Pharmacy
                <span className="hero-subtitle">
                  Fast, Reliable Medicine Ordering Delivered to Your Doorstep
                </span>
              </h1>

              {/* Lead Paragraph */}
              <p className="hero-sub rv in" style={{ "--base": "300ms" } as React.CSSProperties}>
                We are upgrading our retail pharmacy chain with a full-featured digital e-commerce web and mobile application. Soon, you will be able to order medicines with 1-click prescription upload, track orders in real-time, and enjoy automated monthly refills.
              </p>
            </div>

            {/* Hero Banner Card */}
            <div className="hero-card rv rv-scale" style={{ "--base": "450ms" } as React.CSSProperties}>
              <img
                className="media hero-img"
                id="hero-banner"
                src="/coming-soon-hero.jpg"
                alt="Stay Tuned Coming Soon - Bharath MedGuru Online Pharmacy"
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: BENTO (4 CORE UPCOMING FEATURES) ================= */}
        <section className="s-bento" id="features">
          <div className="wrap">
            <div className="bento-shell">
              <div className="sec-head">
                <span className="eyebrow rv">Upcoming Digital Capabilities</span>
                <h2 className="h2 split" data-split>
                  Full-Scale Omnichannel Pharmacy<br /><span className="lt">Connected to Every Branch</span>
                </h2>
                <p className="lead rv" style={{ "--d": 3 } as React.CSSProperties}>
                  Explore the 4 core pillars being integrated into our digital e-commerce web and mobile application, bringing neighborhood branch care and instant doorstep delivery directly to your home.
                </p>
              </div>

              <div className="bento">
                {/* FEATURE 1: 50,000+ MEDICINE CATALOG (BIG CARD) */}
                <div className="card c-big rv" style={{ "--d": 1 } as React.CSSProperties}>
                  <img
                    className="big-bg"
                    src="/online-better-health.jpg"
                    alt="50,000+ Medicine Catalog & Online Store"
                  />
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 text-[10px] font-semibold tracking-wider uppercase text-white border border-white/30 mb-3 backdrop-blur-md">
                      <ShoppingBag className="w-3.5 h-3.5 text-white" />
                      <span className="text-white">Online Pharmacy Platform</span>
                    </div>
                    <h3 className="text-white">
                      50,000+ Medicine<br />
                      <span className="text-white" style={{ opacity: 1 }}>Catalog &amp; Online Store</span>
                    </h3>
                    <p className="desc text-white" style={{ opacity: 1, color: "#ffffff" }}>
                      Comprehensive online catalog of genuine prescription medications, OTC wellness formulas, daily vitamins, and surgical essentials with real-time branch inventory availability.
                    </p>
                  </div>
                  <div>
                    <div className="status-pill mb-4 text-white border-white/30 bg-black/45">
                      <Clock className="w-3.5 h-3.5 text-white" />
                      <span className="text-white">Status: <strong className="text-white font-semibold">In Active Development</strong></span>
                    </div>
                    <div className="avatars text-white">
                      <div className="avatar-stack">
                        <img src="/customer-1.jpg" alt="Verified customer" />
                        <img src="/customer-2.jpg" alt="Verified customer" />
                        <img src="/customer-3.jpg" alt="Verified customer" />
                      </div>
                      <span className="text-white font-normal">Serving 25,000+ patients across South India</span>
                    </div>
                    <a className="btn-white" href="https://wa.me/917994066647" target="_blank" rel="noopener noreferrer">
                      Enquire on WhatsApp Today
                    </a>
                  </div>
                </div>

                {/* FEATURE 2: INSTANT PRESCRIPTION UPLOAD & CART */}
                <div className="card c-pad rv" style={{ "--d": 2 } as React.CSSProperties}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1E3227] text-white flex items-center justify-center shadow-xs">
                      <UploadCloud className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227]">
                      1-Click Ordering
                    </span>
                  </div>
                  <div className="insight">
                    <img src="/online-capsule-jar.jpg" alt="Instant Prescription Upload & Cart" />
                    <div className="chip">
                      <div className="dot-live"></div>
                      <span>Pharmacist Verified</span>
                    </div>
                  </div>
                  <div className="txt">
                    <h4>Instant Prescription Upload &amp; Cart</h4>
                    <p>Snap a photo of your doctor’s prescription and upload it in seconds. Our licensed pharmacists verify the dosages and automatically build your checkout shopping basket.</p>
                    <div className="status-row">
                      <span>Verification:</span>
                      <strong>Licensed Pharmacists</strong>
                    </div>
                  </div>
                </div>

                {/* FEATURE 3: SMART CHRONIC REFILL SUBSCRIPTIONS */}
                <div className="card c-pad rv" id="gauge-card" style={{ "--d": 3 } as React.CSSProperties}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1E3227] text-white flex items-center justify-center shadow-xs">
                      <RefreshCw className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227]">
                      Automated Deliveries
                    </span>
                  </div>
                  <div className="gauge">
                    <svg viewBox="0 0 180 100" style={{ width: 180, height: 110, overflow: "visible" }}>
                      <defs>
                        <linearGradient id="gg-react" x1="0" x2="1">
                          <stop offset="0%" stopColor="#9B8A3E" />
                          <stop offset="100%" stopColor="#1E3227" />
                        </linearGradient>
                      </defs>
                      <path d="M10 95 A80 80 0 0 1 170 95" stroke="rgba(30,50,39,.1)" strokeWidth="12" strokeLinecap="round" fill="none" />
                      <path
                        ref={gaugeArcRef}
                        id="g-arc"
                        d="M10 95 A80 80 0 0 1 170 95"
                        stroke="url(#gg-react)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="252"
                        strokeDashoffset="252"
                        style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(.22,1,.36,1)" }}
                      />
                    </svg>
                    <div className="val"><span ref={gaugeCountRef} data-count="98">0</span>%</div>
                    <div className="ends">
                      <span>Adherence Goal</span>
                      <span>Never Miss a Dose</span>
                    </div>
                  </div>
                  <div className="txt">
                    <h4>Smart Chronic Refill Subscriptions</h4>
                    <p>Automate monthly medicine supplies for diabetes, hypertension, cardiac care, and chronic conditions so your family receives refills reliably before doses run out.</p>
                    <div className="status-row">
                      <span>Status:</span>
                      <strong>Configuring Subscriptions</strong>
                    </div>
                  </div>
                </div>

                {/* FEATURE 4: NEAREST BRANCH EXPRESS DISPATCH */}
                <div className="card c-pad rv" style={{ "--d": 4 } as React.CSSProperties}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1E3227] text-white flex items-center justify-center shadow-xs">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227]">
                      Hyperlocal Delivery
                    </span>
                  </div>
                  <div className="rows">
                    <div className="row" style={{ "--i": 0 } as React.CSSProperties}>
                      <img src="/online-bottle-spill.jpg" alt="Branch Routing" />
                      <div>
                        <b>Branch Inventory Sync</b>
                        <em>Closest retail store assigned</em>
                      </div>
                      <div className="ok">
                        <svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" strokeWidth="2" strokeLinecap="round" /></svg>
                      </div>
                    </div>
                    <div className="row" style={{ "--i": 1 } as React.CSSProperties}>
                      <img src="/online-capsule-jar.jpg" alt="Cold-Chain" />
                      <div>
                        <b>Cold-Chain Packed</b>
                        <em>Strict temperature assurance</em>
                      </div>
                      <div className="ok">
                        <svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" strokeWidth="2" strokeLinecap="round" /></svg>
                      </div>
                    </div>
                    <div className="row" style={{ "--i": 2 } as React.CSSProperties}>
                      <img src="/online-better-health.jpg" alt="Live Tracking" />
                      <div>
                        <b>GPS Live Tracking</b>
                        <em>Same-day rapid doorstep dispatch</em>
                      </div>
                      <div className="ok">
                        <svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" strokeWidth="2" strokeLinecap="round" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="txt">
                    <h4>Nearest Branch Express Dispatch</h4>
                    <p>Orders routed automatically to the closest Bharath MedGuru retail branch location for rapid same-day doorstep fulfillment with live GPS tracking.</p>
                    <div className="status-row">
                      <span>Logistics:</span>
                      <strong>Hyperlocal Dispatch Network</strong>
                    </div>
                  </div>
                </div>

                {/* CARD 5: 100% GENUINE AUTHENTIC MEDICINES & ESSENTIALS */}
                <div className="card c-pad rv" style={{ "--d": 5 } as React.CSSProperties}>
                  <div className="insight">
                    <img src="/online-bottle-spill.jpg" alt="100% Genuine Authentic Medicines" />
                    <div className="chip">
                      <div className="dot-live"></div>
                      <span>100% Authentic Stock</span>
                    </div>
                  </div>
                  <div className="txt">
                    <h4>100% Genuine Medications &amp; Wellness</h4>
                    <p>Direct sourcing from certified manufacturers ensures zero counterfeits, strict expiration controls, and sealed tamper-proof packaging for every item in your cart.</p>
                    <div className="status-row">
                      <span>Quality Assurance:</span>
                      <strong>Regulated Pharmacy Stock</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: IMMEDIATE ORDERING / PRE-LAUNCH ENQUIRY ================= */}
        <section className="s-prod" id="stage-section">
          <div className="wrap">
            <div className="prod-shell">
              <div className="sec-head">
                <span className="eyebrow rv">Need Medicines Right Now?</span>
                <h2 className="h2 split" data-split>
                  Don’t Wait for Launch —<br /><span className="lt">We Deliver on Enquiry Today!</span>
                </h2>
                <p className="lead rv" style={{ "--d": 3 } as React.CSSProperties}>
                  While our digital store is in the final stages of rollout, you can immediately send your prescription or medicine inquiry to our team. We dispatch 100% genuine stock from our nearest branch straight to your doorstep.
                </p>
              </div>

              {/* Contained Stage Grid */}
              <div className="stage" id="stage" ref={stageRef}>
                {/* LEFT COLUMN */}
                <div className="col">
                  {/* Card A */}
                  <div className="g-card rv" style={{ "--d": 1 } as React.CSSProperties}>
                    <div className="lbl">50,000+ Available stock</div>
                    <div className="thumbs">
                      <img src="/stock-green-radiance.jpg" alt="Bharath MedGuru Prescription & Wellness" />
                      <img src="/stock-cart-medicines.jpg" alt="Online Medicine Shopping Cart" />
                      <img src="/stock-bottle-spill.jpg" alt="Genuine Sealed Pharmaceuticals" />
                    </div>
                    <div className="g-foot">
                      <span>Ready for immediate doorstep dispatch</span>
                      <div className="circle-arrow">
                        <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Card B */}
                  <div className="g-card build rv" style={{ "--d": 2 } as React.CSSProperties}>
                    <div className="lbl">Immediate Verification</div>
                    <h5 style={{ marginTop: 4 }}>Licensed Pharmacist Review</h5>
                    <ul>
                      <li>
                        <span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                          Therapy Check
                        </span>
                        <span>Chronic &amp; Acute Care</span>
                      </li>
                      <li>
                        <span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                          Storage Protocol
                        </span>
                        <span>Cold-Chain Regulated</span>
                      </li>
                      <li>
                        <span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                          Verification
                        </span>
                        <span>100% Genuine Sealed Stock</span>
                      </li>
                    </ul>
                    <div className="bar">
                      <div className="t"><b></b></div>
                      <span>Express branch dispatch active…</span>
                    </div>
                  </div>
                </div>

                {/* CENTRE HAND IMAGE - Properly contained without breaking into footer */}
                <div className="hand rv" style={{ "--d": 2 } as React.CSSProperties}>
                  <img
                    id="hand-img"
                    ref={handRef}
                    src="/online-better-health.jpg"
                    alt="Authentic medicine verified and held toward light - Better Health, Daily"
                  />
                </div>

                {/* RIGHT COLUMN */}
                <div className="col">
                  {/* Card A */}
                  <div className="g-card rv" style={{ "--d": 3 } as React.CSSProperties}>
                    <div className="lbl">Direct branch order</div>
                    <div className="hero-vis">
                      <img src="/online-rx-delivery-mobile.jpg" alt="Direct branch order via WhatsApp & mobile" />
                      <div>
                        <h5>WhatsApp Enquiry</h5>
                        <em>Instant Rx Dispatch</em>
                        <ul className="checks">
                          <li>Instant pharmacist review</li>
                          <li>Cold-chain verified</li>
                          <li>Doorstep delivery</li>
                        </ul>
                      </div>
                    </div>
                    <a className="view" href="https://wa.me/917994066647" target="_blank" rel="noopener noreferrer">
                      WhatsApp +91 79940 66647 <span>→</span>
                    </a>
                  </div>

                  {/* Card B */}
                  <div className="g-card rv" id="match-card" style={{ "--d": 4 } as React.CSSProperties}>
                    <div className="lbl">Quality assurance</div>
                    <h5 style={{ marginTop: 8 }}>100% Certified Authenticity</h5>
                    <em style={{ display: "block", marginTop: 2 }}>Direct Manufacturer Sourcing</em>
                    <div className="match-row">
                      <div className="ring">
                        <svg viewBox="0 0 62 62">
                          <circle cx="31" cy="31" r="26" fill="none" stroke="rgba(30,50,39,.1)" strokeWidth="6" />
                          <circle
                            ref={ringArcRef}
                            id="ring-arc"
                            cx="31"
                            cy="31"
                            r="26"
                            fill="none"
                            stroke="#9B8A3E"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="163.4"
                            strokeDashoffset="163.4"
                            style={{ transition: "stroke-dashoffset 2s cubic-bezier(.22,1,.36,1) .3s" }}
                          />
                        </svg>
                        <span className="ring-label"><b ref={ringCountRef} data-count="98" style={{ fontWeight: 600 }}>0</b>%</span>
                      </div>
                      <img src="/online-capsule-jar.jpg" alt="Pure formulation" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Enquiry Bar */}
              <div className="mt-10 p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1E3227] text-[#CBCFB8] flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-5 h-5 text-[#9B8A3E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1E3227]">Need Urgent Medicine Delivery Today?</h4>
                    <p className="text-xs text-[#3F5447]">Send your prescription via WhatsApp or enquiry form for same-day delivery.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="#contact"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3227] text-[#CBCFB8] hover:bg-[#2b4436] text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9B8A3E]" />
                  </a>
                  <a
                    href="https://wa.me/917994066647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1E3227] hover:bg-white/80 border border-[#1E3227]/20 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: CTA BANNER ================= */}
        <section className="s-foot pb-16" id="start">
          <div className="wrap">
            <div className="cta rv rv-scale">
              <img
                className="media kb"
                src="/cta-get-notified-bg.jpg"
                alt="Healthcare & Medicine Order Setup"
                style={{ zIndex: -2 }}
              />

              <h2 className="split" data-split>Get Notified<br />on Launch</h2>
              <p className="rv" style={{ "--d": 2 } as React.CSSProperties}>
                Be the first to access our new web app, exclusive early-access discounts, and free first delivery vouchers.
              </p>

              {notified ? (
                <div className="p-4 rounded-2xl bg-white/90 text-[#1E3227] flex items-center gap-3 border border-white max-w-md mx-auto shadow-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#9B8A3E] flex-shrink-0" />
                  <p className="text-xs font-medium text-left">
                    Thank you! You are on our VIP launch list. We’ll notify you as soon as the online pharmacy goes live!
                  </p>
                </div>
              ) : (
                <form className="sub rv" style={{ "--d": 3 } as React.CSSProperties} onSubmit={handleNotifySubmit}>
                  <input
                    type="email"
                    required
                    aria-label="Email address"
                    placeholder="Enter your email to get notified"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="btn-dark" type="submit">
                    Notify Me at Launch
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= FULL-WIDTH FOOTER ================= */}
        {/* Rendered full-bleed outside of any wrapper, identical to the homepage */}
        <FooterSection />

        {/* Global Page Styles */}
        <style jsx global>{`
          .velia-page {
            background: #CBCFB8;
            color: #1E3227;
            font-family: "Inter Tight", "Inter", system-ui, -apple-system, sans-serif;
            overflow-x: hidden;
            width: 100%;
          }

          .velia-page .wrap {
            width: 100%;
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 24px;
          }
          @media (max-width: 640px) {
            .velia-page .wrap { padding: 0 16px; }
          }

          /* Reveal animations */
          .velia-page .rv {
            transition: opacity 1.1s cubic-bezier(.22,1,.36,1), transform 1.1s cubic-bezier(.22,1,.36,1), filter 1.1s cubic-bezier(.22,1,.36,1);
            transition-delay: calc(var(--d,0) * 90ms + var(--base,0ms));
          }
          .velia-page .rv.in { opacity: 1; transform: none; filter: none; }

          .velia-page .split .w {
            display: inline-block;
            overflow: hidden;
            vertical-align: top;
            padding: 0 .02em .12em;
            margin: 0 -.02em -.12em;
          }
          .velia-page .split .w > span { display: inline-block; will-change: transform; }

          .velia-page .h2 {
            font-weight: 500;
            font-size: clamp(32px, 4.2vw, 56px);
            line-height: 1.08;
            letter-spacing: -.035em;
            margin-top: 16px;
            color: #1E3227;
          }
          .velia-page .h2 .lt { color: #53685b; font-weight: 300; }
          .velia-page .cta h2 {
            font-weight: 500;
            font-size: clamp(48px, 7vw, 104px);
            line-height: .92;
            letter-spacing: -.045em;
            color: #1E3227;
          }

          .velia-page .media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

          .velia-page .ai-t { display: grid; }
          .velia-page .ai-t > span { grid-area: 1/1; }
          .velia-page .ai-t .ghost { visibility: hidden; }

          .velia-page .btn-dark {
            background: #1E3227;
            color: #CBCFB8;
            border-radius: 999px;
            padding: 11px 26px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: .05em;
            font-weight: 500;
            border: 0;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            isolation: isolate;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s cubic-bezier(.22,1,.36,1), color .3s;
          }
          .velia-page .btn-dark::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.24) 50%, transparent 70%);
            transform: translateX(-120%);
            z-index: -1;
            transition: transform .9s cubic-bezier(.22,1,.36,1);
          }
          .velia-page .btn-dark:hover::before { transform: translateX(120%); }
          .velia-page .btn-dark:hover {
            transform: translateY(-2px);
            color: #fff;
            box-shadow: 0 12px 28px -12px rgba(30,50,39,.6);
          }

          /* HERO */
          .velia-page .hero { padding-top: 110px; }
          .velia-page .hero-head { text-align: center; padding: 0 16px; max-width: 1080px; margin: 0 auto; }
          
          .velia-page .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 16px;
            border-radius: 999px;
            background: rgba(30, 50, 39, 0.08);
            border: 1px solid rgba(30, 50, 39, 0.12);
            color: #1E3227;
            font-size: 11.5px;
            font-weight: 600;
            letter-spacing: .06em;
            text-transform: uppercase;
            margin-bottom: 16px;
          }

          .velia-page .hero-title {
            font-weight: 600;
            font-size: clamp(34px, 4.6vw, 62px);
            line-height: 1.1;
            letter-spacing: -.035em;
            color: #1E3227;
            margin-bottom: 14px;
          }
          .velia-page .hero-subtitle {
            display: block;
            font-weight: 400;
            font-size: clamp(22px, 2.7vw, 36px);
            color: #3F5447;
            letter-spacing: -.02em;
            margin-top: 6px;
          }

          .velia-page .hero-sub {
            font-size: clamp(14.5px, 1.35vw, 17.5px);
            line-height: 1.6;
            color: #3F5447;
            max-width: 820px;
            margin: 0 auto;
            font-weight: 300;
          }

          .velia-page .hero-card {
            position: relative;
            margin-top: 36px;
            border-radius: 34px;
            overflow: hidden;
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: 680px;
            background: transparent;
            box-shadow: 0 40px 80px -50px rgba(30,50,39,.35);
          }
          .velia-page .hero-card img,
          .velia-page .hero-card video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          /* BENTO */
          .velia-page .s-bento { padding-top: 100px; }
          .velia-page .bento-shell {
            position: relative;
            border-radius: 34px;
            overflow: hidden;
            padding: 72px 40px 40px;
            isolation: isolate;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(203, 207, 184, 0.75) 100%);
            border: 1.5px solid rgba(255, 255, 255, 0.85);
            box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 20px 50px -20px rgba(30, 50, 39, 0.18);
          }
          .velia-page .bento-shell::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            background: linear-gradient(180deg, rgba(203, 207, 184, 0.75) 0%, rgba(203, 207, 184, 0.25) 40%, rgba(203, 207, 184, 0.45) 100%);
          }
          .velia-page .sec-head { text-align: center; }
          .velia-page .eyebrow {
            display: inline-block;
            font-size: 10.5px;
            text-transform: uppercase;
            letter-spacing: .14em;
            background: rgba(255, 255, 255, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.9);
            padding: 6px 14px;
            border-radius: 999px;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #3F5447;
            font-weight: 600;
          }
          .velia-page .lead {
            max-width: 580px;
            margin: 16px auto 0;
            font-size: 14.5px;
            color: #3F5447;
            line-height: 1.55;
          }

          .velia-page .bento {
            margin-top: 48px;
            display: grid;
            grid-template-columns: 1.25fr 1fr 1fr;
            gap: 16px;
          }
          .velia-page .card {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.68);
            backdrop-filter: blur(22px) saturate(130%);
            -webkit-backdrop-filter: blur(22px) saturate(130%);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 20px 40px -30px rgba(30,50,39,.35);
            transition: transform .7s cubic-bezier(.22,1,.36,1), box-shadow .7s cubic-bezier(.22,1,.36,1);
          }
          .velia-page .card:hover {
            transform: translateY(-6px);
            box-shadow: 0 30px 60px -30px rgba(30,50,39,.45);
          }
          .velia-page .card h4 { font-size: 16px; font-weight: 600; color: #1E3227; }
          .velia-page .card p { font-size: 12.5px; line-height: 1.5; color: #3F5447; margin-top: 6px; }
          .velia-page .c-pad { padding: 18px; display: flex; flex-direction: column; min-height: 290px; }
          .velia-page .txt { padding: 12px 6px 4px; }

          .velia-page .status-row {
            margin-top: 12px;
            padding-top: 8px;
            border-top: 1px solid rgba(30, 50, 39, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11px;
          }
          .velia-page .status-row span { color: #53685b; }
          .velia-page .status-row strong { color: #9B8A3E; font-weight: 600; }

          .velia-page .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 11.5px;
            color: #CBCFB8;
            backdrop-filter: blur(8px);
          }

          .velia-page .card.c-big {
            grid-row: span 2;
            min-height: 560px;
            padding: 28px;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: transparent;
            border-color: rgba(255,255,255,.35);
          }
          .velia-page .card.c-big img.big-bg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -2;
            transition: transform 1.6s cubic-bezier(.22,1,.36,1);
          }
          .velia-page .card.c-big:hover img.big-bg { transform: scale(1.05); }
          .velia-page .card.c-big::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            background: linear-gradient(180deg, rgba(30,50,39,.78) 0%, rgba(30,50,39,.32) 28%, rgba(30,50,39,0) 45%, rgba(30,50,39,.25) 60%, rgba(20,35,26,.85) 100%);
          }
          .velia-page .card.c-big h3 {
            font-size: clamp(28px, 2.6vw, 38px);
            font-weight: 500;
            line-height: 1.05;
            letter-spacing: -.035em;
            color: #ffffff;
            text-shadow: 0 2px 10px rgba(0,0,0,0.35);
          }
          .velia-page .card.c-big h3 span {
            color: #ffffff;
            opacity: 1;
          }
          .velia-page .card.c-big .desc {
            font-size: 13px;
            color: #ffffff;
            opacity: 1;
            max-width: 320px;
            margin-top: 12px;
            line-height: 1.5;
            text-shadow: 0 1px 6px rgba(0,0,0,0.3);
          }

          .velia-page .avatars {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 11.5px;
            opacity: .9;
            margin-bottom: 16px;
          }
          .velia-page .avatar-stack { display: flex; }
          .velia-page .avatar-stack img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,.8);
            margin-left: -7px;
            object-fit: cover;
          }
          .velia-page .avatar-stack img:first-child { margin-left: 0; }

          .velia-page .btn-white {
            background: #fff;
            color: #1E3227;
            border-radius: 999px;
            padding: 10px 22px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .05em;
            font-weight: 600;
            display: inline-block;
            transition: transform .3s cubic-bezier(.22,1,.36,1), background .3s;
          }
          .velia-page .btn-white:hover {
            transform: translateY(-2px);
            background: #f5f2eb;
          }

          .velia-page .collage {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            border-radius: 14px;
            overflow: hidden;
            height: 140px;
          }
          .velia-page .collage img { width: 100%; height: 100%; object-fit: cover; }

          .velia-page .gauge {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 6px;
          }
          .velia-page .gauge .val {
            position: absolute;
            top: 50px;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -.03em;
            color: #1E3227;
          }
          .velia-page .gauge .ends {
            display: flex;
            justify-content: space-between;
            width: 170px;
            font-size: 10.5px;
            color: #53685b;
            margin-top: -6px;
          }

          .velia-page .rows { display: flex; flex-direction: column; gap: 7px; }
          .velia-page .row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 7px 10px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.9);
          }
          .velia-page .row img { width: 28px; height: 28px; border-radius: 6px; object-fit: cover; }
          .velia-page .row b { font-size: 11.5px; font-weight: 600; display: block; color: #1E3227; }
          .velia-page .row em { font-size: 10.5px; font-style: normal; color: #53685b; display: block; }
          .velia-page .row .ok {
            margin-left: auto;
            width: 17px;
            height: 17px;
            border-radius: 50%;
            background: #1E3227;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .velia-page .row .ok svg { width: 9px; height: 9px; stroke: #CBCFB8; fill: none; }

          .velia-page .insight {
            position: relative;
            border-radius: 14px;
            overflow: hidden;
            height: 140px;
          }
          .velia-page .insight img { width: 100%; height: 100%; object-fit: cover; }
          .velia-page .chip {
            position: absolute;
            left: 10px;
            bottom: 10px;
            background: rgba(30, 50, 39, 0.75);
            backdrop-filter: blur(8px);
            color: #CBCFB8;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 10.5px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .velia-page .dot-live {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #9B8A3E;
            box-shadow: 0 0 6px #9B8A3E;
          }

          /* STAGE & PRODUCTION */
          .velia-page .s-prod {
            padding-top: 100px;
            padding-bottom: 20px;
          }
          .velia-page .prod-shell {
            position: relative;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(203, 207, 184, 0.6) 100%);
            border: 1px solid rgba(255, 255, 255, 0.75);
            border-radius: 34px;
            padding: 72px 32px 48px;
            overflow: hidden;
          }
          .velia-page .stage {
            margin-top: 48px;
            display: grid;
            grid-template-columns: 1fr 1.15fr 1fr;
            gap: 20px;
            align-items: stretch;
          }
          .velia-page .col { display: flex; flex-direction: column; gap: 16px; justify-content: space-between; }
          .velia-page .g-card {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            padding: 16px;
            box-shadow: 0 10px 30px -20px rgba(30, 50, 39, 0.3);
          }
          .velia-page .lbl {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: #53685b;
            font-weight: 600;
          }
          .velia-page .thumbs {
            display: flex;
            gap: 6px;
            margin: 10px 0 12px;
          }
          .velia-page .thumbs img {
            width: 32%;
            height: 64px;
            border-radius: 8px;
            object-fit: cover;
          }
          .velia-page .g-foot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11.5px;
            color: #3F5447;
          }
          .velia-page .circle-arrow {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #1E3227;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .velia-page .circle-arrow svg { width: 11px; height: 11px; stroke: #CBCFB8; fill: none; }

          .velia-page .build h5 { font-size: 13.5px; font-weight: 600; color: #1E3227; }
          .velia-page .build ul {
            list-style: none;
            margin: 10px 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .velia-page .build li {
            display: flex;
            justify-content: space-between;
            font-size: 11.5px;
            padding: 4px 0;
            border-bottom: 1px solid rgba(30, 50, 39, 0.08);
          }
          .velia-page .build li span:first-child {
            color: #53685b;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .velia-page .build li span:last-child { font-weight: 500; color: #1E3227; }
          .velia-page .bar {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 10.5px;
            color: #53685b;
          }
          .velia-page .bar .t {
            flex: 1;
            height: 5px;
            border-radius: 99px;
            background: rgba(30, 50, 39, 0.12);
            overflow: hidden;
          }
          .velia-page .bar .t b {
            display: block;
            height: 100%;
            background: linear-gradient(90deg, #9B8A3E 0%, #1E3227 100%);
            width: 78%;
            transition: width 2.4s cubic-bezier(.22,1,.36,1) .5s;
          }

          /* HAND IMAGE CONTAINER - Contained and masked */
          .velia-page .hand {
            position: relative;
            align-self: center;
            height: clamp(380px, 42vw, 560px);
            width: 100%;
            border-radius: 24px;
            overflow: hidden;
            mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
            -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
          }
          .velia-page .hand img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 115%;
            object-fit: cover;
            will-change: transform;
          }

          .velia-page .hero-vis {
            display: flex;
            gap: 12px;
            margin-top: 10px;
          }
          .velia-page .hero-vis img {
            width: 80px;
            height: 98px;
            border-radius: 12px;
            flex: none;
            object-fit: cover;
          }
          .velia-page .checks {
            list-style: none;
            margin-top: 6px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 11px;
            color: #3F5447;
          }
          .velia-page .checks li {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .velia-page .checks li::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #9B8A3E;
            flex-shrink: 0;
          }
          .velia-page .view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(30,50,39,.12);
            margin-top: 12px;
            padding-top: 10px;
            font-size: 12px;
            font-weight: 600;
            color: #1E3227;
            cursor: pointer;
          }
          .velia-page .view span { transition: transform .3s cubic-bezier(.22,1,.36,1); }
          .velia-page .view:hover span { transform: translateX(4px); }

          .velia-page .match-row {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-top: 10px;
          }
          .velia-page .ring {
            position: relative;
            width: 58px;
            height: 58px;
            flex: none;
          }
          .velia-page .ring svg {
            transform: rotate(-90deg);
            width: 100%;
            height: 100%;
          }
          .velia-page .ring .ring-label {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12.5px;
            white-space: nowrap;
            color: #1E3227;
          }
          .velia-page .match-row img {
            width: 54px;
            height: 54px;
            border-radius: 10px;
            object-fit: cover;
            margin-left: auto;
          }

          /* CTA SECTION */
          .velia-page .s-foot {
            padding-top: 80px;
            padding-bottom: 60px;
          }
          .velia-page .cta {
            position: relative;
            border-radius: 34px;
            overflow: hidden;
            padding: 80px 40px;
            min-height: 480px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            isolation: isolate;
            background: #b2b69f;
            box-shadow: 0 40px 80px -40px rgba(30,50,39,.4);
          }
          .velia-page .cta::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            background: radial-gradient(circle at center, rgba(255, 255, 255, 0.78) 0%, rgba(203, 207, 184, 0.7) 55%, rgba(203, 207, 184, 0.88) 100%);
          }
          .velia-page .cta p {
            max-width: 480px;
            margin: 18px auto 0;
            font-size: 15px;
            color: #3F5447;
            line-height: 1.5;
          }
          .velia-page .sub {
            margin-top: 32px;
            display: flex;
            gap: 6px;
            width: min(440px, 100%);
            background: rgba(255, 255, 255, 0.88);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.95);
            border-radius: 999px;
            padding: 6px 6px 6px 20px;
            box-shadow: 0 10px 25px -10px rgba(30,50,39,.2);
            transition: box-shadow .3s;
          }
          .velia-page .sub:focus-within {
            box-shadow: 0 0 0 4px rgba(30, 50, 39, 0.12);
          }
          .velia-page .sub input {
            flex: 1;
            min-width: 0;
            border: 0;
            background: transparent;
            outline: 0;
            font-size: 13.5px;
            color: #1E3227;
          }
          .velia-page .sub input::placeholder { color: #53685b; }

          @media (max-width: 1100px) {
            .velia-page .bento { grid-template-columns: 1fr 1fr; }
            .velia-page .card.c-big {
              grid-row: auto;
              grid-column: span 2;
              min-height: 480px;
            }
            .velia-page .stage { grid-template-columns: 1fr 1fr; }
            .velia-page .hand {
              grid-column: span 2;
              order: -1;
              height: 460px;
              max-width: 460px;
              margin: 0 auto;
            }
          }

          @media (max-width: 640px) {
            .velia-page .hero { padding-top: 90px; }
            .velia-page .hero-title { font-size: 30px; }
            .velia-page .hero-subtitle { font-size: 20px; }
            .velia-page .hero-card {
              border-radius: 20px;
              margin-top: 24px;
            }
            .velia-page .s-bento, .velia-page .s-prod, .velia-page .s-foot { padding-top: 60px; }
            .velia-page .bento-shell, .velia-page .prod-shell {
              padding: 44px 16px 28px;
              border-radius: 24px;
            }
            .velia-page .bento { grid-template-columns: 1fr; }
            .velia-page .card.c-big {
              grid-column: auto;
              min-height: 420px;
              padding: 20px;
            }
            .velia-page .stage { grid-template-columns: 1fr; }
            .velia-page .hand { grid-column: auto; height: 360px; }
            .velia-page .cta {
              padding: 36px 18px;
              min-height: 420px;
              border-radius: 24px;
            }
            .velia-page .sub {
              flex-direction: column;
              border-radius: 18px;
              padding: 10px 12px;
            }
            .velia-page .btn-dark { width: 100%; padding: 12px; }
          }
        `}</style>
      </div>
    </SmoothScroll>
  );
}
