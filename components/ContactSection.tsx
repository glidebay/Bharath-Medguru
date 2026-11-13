"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Energy Healing",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const extractedFirst = formData.name.trim().split(" ")[0] || "Friend";
    setFirstName(extractedFirst);

    // Simulate swift confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "Energy Healing",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#CBCFB8] relative overflow-hidden">
      {/* Ambient glass refraction glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/10 w-[500px] h-[350px] bg-white/30 rounded-full blur-3xl opacity-75" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/10 w-[500px] h-[350px] bg-[#9B8A3E]/15 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold tracking-wide uppercase border border-[#1E3227]/15">
                <span>Get In Touch</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1E3227] leading-tight">
                We’re Here to Support <br />
                <span className="font-normal text-[#1E3227]">Your Healing Journey</span>
              </h2>
              <p className="text-base sm:text-lg text-[#3F5447] font-light leading-relaxed">
                Have questions about our modalities, need advice on choosing a practitioner, or just want to
                say hello? Reach out anytime. Our compassionate care team is eager to assist you.
              </p>
            </div>

            {/* Direct Cards (Frosted Glass) */}
            <div className="space-y-4 pt-2">
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.18) 100%)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255, 255, 255, 0.65)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                  borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                  boxShadow:
                    "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
                }}
                className="flex items-start gap-4 p-5 rounded-[20px] hover:scale-[1.01] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#CBCFB8]/60 text-[#1E3227] flex items-center justify-center flex-shrink-0 border border-[#1E3227]/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#9B8A3E] uppercase tracking-wider">
                    Direct Phone &amp; WhatsApp
                  </div>
                  <a
                    href="tel:+15552348900"
                    className="font-sans text-lg font-semibold text-[#1E3227] hover:underline"
                  >
                    +1 (555) 234-8900
                  </a>
                  <p className="text-xs text-[#3F5447] mt-0.5">Toll-free customer guidance</p>
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.18) 100%)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255, 255, 255, 0.65)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                  borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                  boxShadow:
                    "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
                }}
                className="flex items-start gap-4 p-5 rounded-[20px] hover:scale-[1.01] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#CBCFB8]/60 text-[#1E3227] flex items-center justify-center flex-shrink-0 border border-[#1E3227]/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#9B8A3E] uppercase tracking-wider">
                    Email Inquiries
                  </div>
                  <a
                    href="mailto:care@medguru.health"
                    className="font-sans text-lg font-semibold text-[#1E3227] hover:underline"
                  >
                    care@medguru.health
                  </a>
                  <p className="text-xs text-[#3F5447] mt-0.5">Quick responses within 24 hours</p>
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.18) 100%)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255, 255, 255, 0.65)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                  borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                  boxShadow:
                    "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
                }}
                className="flex items-start gap-4 p-5 rounded-[20px] hover:scale-[1.01] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#CBCFB8]/60 text-[#1E3227] flex items-center justify-center flex-shrink-0 border border-[#1E3227]/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#9B8A3E] uppercase tracking-wider">
                    Studio &amp; Retreat Center
                  </div>
                  <div className="font-sans text-base font-semibold text-[#1E3227]">
                    742 Evergreen Wellness Ave, Suite 300
                  </div>
                  <p className="text-xs text-[#3F5447] mt-0.5">Boulder, Colorado 80302, USA</p>
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.18) 100%)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255, 255, 255, 0.65)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
                  borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
                  boxShadow:
                    "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 14px 34px -4px rgba(30, 50, 39, 0.08), 0 3px 10px rgba(30, 50, 39, 0.04)",
                }}
                className="flex items-start gap-4 p-5 rounded-[20px]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#CBCFB8]/60 text-[#1E3227] flex items-center justify-center flex-shrink-0 border border-[#1E3227]/10">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#9B8A3E] uppercase tracking-wider">
                    Office Hours
                  </div>
                  <div className="text-sm font-semibold text-[#1E3227]">
                    Monday – Saturday: 8:00 AM – 7:00 PM EST
                  </div>
                  <p className="text-xs text-[#3F5447] mt-0.5">Sunday: By Special Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success Card */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.22) 100%)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.65)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
              borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
              boxShadow:
                "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 16px 40px -4px rgba(30, 50, 39, 0.09), 0 4px 12px rgba(30, 50, 39, 0.04)",
            }}
            className="lg:col-span-7 rounded-[28px] p-8 sm:p-10"
          >
            {submitted ? (
              <div className="py-12 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-[#1E3227] text-[#CBCFB8] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans text-3xl font-semibold text-[#1E3227]">
                    Thank you, {firstName}!
                  </h3>
                  <p className="text-base text-[#3F5447] max-w-md mx-auto leading-relaxed">
                    A member of our team will review your message and reply within one working day.
                  </p>
                </div>

                <div className="p-4 bg-white/70 rounded-2xl border border-[#1E3227]/10 max-w-sm mx-auto text-xs text-[#3F5447] text-left space-y-1">
                  <div>
                    <strong className="text-[#1E3227]">Selected Service:</strong> {formData.service}
                  </div>
                  <div>
                    <strong className="text-[#1E3227]">Email:</strong> {formData.email}
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-[#1E3227] text-[#CBCFB8] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#15241c] hover:text-white transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#1E3227]/10 pb-4 mb-2">
                  <h3 className="font-sans text-2xl font-semibold text-[#1E3227]">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-[#3F5447]">
                    Fill in your details and we will connect you directly with a dedicated wellness guide.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/80 px-4 py-3 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none focus:ring-2 focus:ring-[#1E3227]/30 focus:border-[#1E3227] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/80 px-4 py-3 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none focus:ring-2 focus:ring-[#1E3227]/30 focus:border-[#1E3227] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/80 px-4 py-3 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none focus:ring-2 focus:ring-[#1E3227]/30 focus:border-[#1E3227] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                    Modality / Interest *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white/80 px-4 py-3 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none focus:ring-2 focus:ring-[#1E3227]/30 focus:border-[#1E3227] transition-all"
                  >
                    <option value="Energy Healing">Energy Healing (Reiki &amp; Chakra)</option>
                    <option value="Sound Therapy">Sound Therapy (Bowls &amp; Gongs)</option>
                    <option value="Holistic Counseling">Holistic &amp; NLP Life Coaching</option>
                    <option value="Bodywork &amp; Massage">Somatic Bodywork &amp; Deep Massage</option>
                    <option value="Meditation &amp; Breathwork">Breathwork &amp; Guided Meditation</option>
                    <option value="General Discovery Call">15-Min Free Discovery Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                    Your Message / Health Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what challenges you're experiencing or what you are looking to achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/80 px-4 py-3 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none focus:ring-2 focus:ring-[#1E3227]/30 focus:border-[#1E3227] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white py-4 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
