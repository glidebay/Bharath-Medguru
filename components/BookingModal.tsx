"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Video, MapPin, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPractitioner?: string;
  initialService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialPractitioner = "Dr. Maya Varen",
  initialService = "Energy Healing",
}: BookingModalProps) {
  const [practitioner, setPractitioner] = useState(initialPractitioner);
  const [service, setService] = useState(initialService);
  const [format, setFormat] = useState("Virtual HD Zoom");
  const [date, setDate] = useState("2026-11-20");
  const [time, setTime] = useState("10:00 AM");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (initialPractitioner) setPractitioner(initialPractitioner);
    if (initialService) setService(initialService);
  }, [initialPractitioner, initialService]);

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.42) 100%)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.75)",
          borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
          borderLeft: "1.5px solid rgba(255, 255, 255, 0.90)",
          boxShadow:
            "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(30, 50, 39, 0.05), 0 24px 64px rgba(30, 50, 39, 0.20)",
        }}
        className="rounded-[28px] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#1E3227]/10 text-[#1E3227] hover:bg-[#1E3227] hover:text-[#CBCFB8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#1E3227] text-[#CBCFB8] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-sans text-2xl sm:text-3xl font-semibold text-[#1E3227]">
                Session Reserved!
              </h3>
              <p className="text-sm text-[#3F5447]">
                We have emailed your calendar invitation and preparation guidance.
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="bg-white/70 p-5 rounded-2xl border border-[#1E3227]/15 text-left text-xs text-[#1E3227] space-y-2">
              <div className="flex justify-between border-b border-[#1E3227]/10 pb-2">
                <span className="text-[#3F5447]">Practitioner:</span>
                <span className="font-semibold text-[#1E3227]">{practitioner}</span>
              </div>
              <div className="flex justify-between border-b border-[#1E3227]/10 pb-2">
                <span className="text-[#3F5447]">Modality:</span>
                <span className="font-semibold">{service}</span>
              </div>
              <div className="flex justify-between border-b border-[#1E3227]/10 pb-2">
                <span className="text-[#3F5447]">Format:</span>
                <span className="font-semibold">{format}</span>
              </div>
              <div className="flex justify-between border-b border-[#1E3227]/10 pb-2">
                <span className="text-[#3F5447]">Date &amp; Time:</span>
                <span className="font-semibold">{date} at {time}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#3F5447]">Seeker Name:</span>
                <span className="font-semibold">{fullName || "Honored Guest"}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-[#1E3227] text-[#CBCFB8] font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-[#15241c] hover:text-white transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-[11px] font-semibold uppercase tracking-wider mb-2 border border-[#1E3227]/15">
                <Sparkles className="w-3 h-3 text-[#9B8A3E]" />
                <span>Reserve Appointment</span>
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-[#1E3227]">
                Book Your Holistic Session
              </h2>
              <p className="text-xs text-[#3F5447] mt-1">
                Experience personalized healing. Complimentary 15-minute alignment included for first-time seekers.
              </p>
            </div>

            {/* Practitioner Select */}
            <div>
              <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                Select Practitioner
              </label>
              <select
                value={practitioner}
                onChange={(e) => setPractitioner(e.target.value)}
                className="w-full bg-white/80 px-3.5 py-2.5 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none focus:ring-2 focus:ring-[#1E3227]/30"
              >
                <option value="Dr. Maya Varen">Dr. Maya Varen (Life &amp; NLP Coaching)</option>
                <option value="Lena Hart">Lena Hart (Holistic Somatic Massage)</option>
                <option value="Aarav Desai">Aarav Desai (Ayurvedic Health &amp; Vitality)</option>
                <option value="Sofia Callen">Sofia Callen (Biofield Tuning &amp; Reiki)</option>
                <option value="Senior Intake Advisor">Senior Intake Advisor (Discovery Call)</option>
              </select>
            </div>

            {/* Format toggle */}
            <div>
              <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                Session Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat("Virtual HD Zoom")}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    format === "Virtual HD Zoom"
                      ? "bg-[#1E3227] text-[#CBCFB8] border-[#1E3227]"
                      : "bg-white/60 text-[#3F5447] border-[#1E3227]/15 hover:bg-white"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Virtual HD Zoom</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("In-Studio Sanctuary")}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    format === "In-Studio Sanctuary"
                      ? "bg-[#1E3227] text-[#CBCFB8] border-[#1E3227]"
                      : "bg-white/60 text-[#3F5447] border-[#1E3227]/15 hover:bg-white"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>In-Studio Sanctuary</span>
                </button>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/80 px-3.5 py-2.5 rounded-xl border border-[#1E3227]/15 text-xs text-[#1E3227] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1.5">
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white/80 px-3.5 py-2.5 rounded-xl border border-[#1E3227]/15 text-xs text-[#1E3227] focus:outline-none"
                >
                  <option value="09:00 AM">09:00 AM EST</option>
                  <option value="10:30 AM">10:30 AM EST</option>
                  <option value="01:00 PM">01:00 PM EST</option>
                  <option value="03:00 PM">03:00 PM EST</option>
                  <option value="05:30 PM">05:30 PM EST</option>
                </select>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/80 px-3.5 py-2.5 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/80 px-3.5 py-2.5 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E3227] uppercase tracking-wider mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/80 px-3.5 py-2.5 rounded-xl border border-[#1E3227]/15 text-sm text-[#1E3227] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white rounded-xl font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Confirm Appointment Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
