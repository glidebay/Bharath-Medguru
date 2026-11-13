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
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2eddf] text-[#163c3d] text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#163c3d] leading-tight">
                We’re Here to Support <br />
                <span className="italic font-normal text-[#1f2d2e]">Your Healing Journey</span>
              </h2>
              <p className="text-base sm:text-lg text-[#526061] font-light leading-relaxed">
                Have questions about our modalities, need advice on choosing a practitioner, or just want to
                say hello? Reach out anytime. Our compassionate care team is eager to assist you.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f9fbf8] border border-[#163c3d]/10 hover:border-[#163c3d]/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#e2eddf] text-[#163c3d] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#526061] uppercase tracking-wider">
                    Direct Phone & WhatsApp
                  </div>
                  <a
                    href="tel:+15552348900"
                    className="font-serif text-lg font-semibold text-[#163c3d] hover:underline"
                  >
                    +1 (555) 234-8900
                  </a>
                  <p className="text-xs text-[#526061] mt-0.5">Toll-free customer guidance</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f9fbf8] border border-[#163c3d]/10 hover:border-[#163c3d]/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#e2eddf] text-[#163c3d] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#526061] uppercase tracking-wider">
                    Email Inquiries
                  </div>
                  <a
                    href="mailto:care@medguru.health"
                    className="font-serif text-lg font-semibold text-[#163c3d] hover:underline"
                  >
                    care@medguru.health
                  </a>
                  <p className="text-xs text-[#526061] mt-0.5">Quick responses within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f9fbf8] border border-[#163c3d]/10 hover:border-[#163c3d]/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#e2eddf] text-[#163c3d] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#526061] uppercase tracking-wider">
                    Studio & Retreat Center
                  </div>
                  <div className="font-serif text-base font-semibold text-[#163c3d]">
                    742 Evergreen Wellness Ave, Suite 300
                  </div>
                  <p className="text-xs text-[#526061] mt-0.5">Boulder, Colorado 80302, USA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f9fbf8] border border-[#163c3d]/10">
                <div className="w-11 h-11 rounded-xl bg-[#e2eddf] text-[#163c3d] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#526061] uppercase tracking-wider">
                    Office Hours
                  </div>
                  <div className="text-sm font-semibold text-[#163c3d]">
                    Monday – Saturday: 8:00 AM – 7:00 PM EST
                  </div>
                  <p className="text-xs text-[#526061] mt-0.5">Sunday: By Special Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success Card */}
          <div className="lg:col-span-7 bg-[#f9fbf8] rounded-[30px] p-8 sm:p-10 border border-[#163c3d]/15 shadow-sm">
            {submitted ? (
              <div className="py-12 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-[#163c3d] text-[#e2eddf] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-semibold text-[#163c3d]">
                    Thank you, {firstName}!
                  </h3>
                  <p className="text-base text-[#526061] max-w-md mx-auto leading-relaxed">
                    A member of our team will review your message and reply within one working day.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#163c3d]/10 max-w-sm mx-auto text-xs text-[#526061] text-left space-y-1">
                  <div>
                    <strong className="text-[#163c3d]">Selected Service:</strong> {formData.service}
                  </div>
                  <div>
                    <strong className="text-[#163c3d]">Email:</strong> {formData.email}
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-[#163c3d] text-[#e2eddf] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#102d2e] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#163c3d]/10 pb-4 mb-2">
                  <h3 className="font-serif text-2xl font-semibold text-[#163c3d]">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-[#526061]">
                    Fill in your details and we will connect you directly with a dedicated wellness guide.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#163c3d] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-[#163c3d]/15 text-sm text-[#1f2d2e] focus:outline-none focus:ring-2 focus:ring-[#163c3d]/30 focus:border-[#163c3d] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#163c3d] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white px-4 py-3 rounded-xl border border-[#163c3d]/15 text-sm text-[#1f2d2e] focus:outline-none focus:ring-2 focus:ring-[#163c3d]/30 focus:border-[#163c3d] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#163c3d] uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white px-4 py-3 rounded-xl border border-[#163c3d]/15 text-sm text-[#1f2d2e] focus:outline-none focus:ring-2 focus:ring-[#163c3d]/30 focus:border-[#163c3d] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#163c3d] uppercase tracking-wider mb-1.5">
                    Modality / Interest *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-[#163c3d]/15 text-sm text-[#1f2d2e] focus:outline-none focus:ring-2 focus:ring-[#163c3d]/30 focus:border-[#163c3d] transition-all"
                  >
                    <option value="Energy Healing">Energy Healing (Reiki & Chakra)</option>
                    <option value="Sound Therapy">Sound Therapy (Bowls & Gongs)</option>
                    <option value="Holistic Counseling">Holistic & NLP Life Coaching</option>
                    <option value="Bodywork & Massage">Somatic Bodywork & Deep Massage</option>
                    <option value="Meditation & Breathwork">Breathwork & Guided Meditation</option>
                    <option value="General Discovery Call">15-Min Free Discovery Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#163c3d] uppercase tracking-wider mb-1.5">
                    Your Message / Health Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what challenges you're experiencing or what you are looking to achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-[#163c3d]/15 text-sm text-[#1f2d2e] focus:outline-none focus:ring-2 focus:ring-[#163c3d]/30 focus:border-[#163c3d] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#163c3d] text-[#e2eddf] hover:bg-[#102d2e] py-4 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
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

