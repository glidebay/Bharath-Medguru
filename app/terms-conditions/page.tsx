"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertCircle, CheckCircle2, Phone, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BookingModal from "@/components/BookingModal";

export default function TermsConditionsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#CBCFB8] text-[#1E3227] flex flex-col selection:bg-[#1E3227] selection:text-[#CBCFB8]">
      {/* Navigation Bar */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back to Home Link */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E3227] hover:text-[#15241c] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Clinic Home</span>
            </Link>
          </div>

          {/* Page Hero Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.30) 100%)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.75)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
              borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
              boxShadow: "0 20px 48px -6px rgba(30, 50, 39, 0.08)",
            }}
            className="rounded-[28px] p-8 sm:p-12 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold uppercase tracking-wider border border-[#1E3227]/15">
              <FileText className="w-3.5 h-3.5 text-[#9B8A3E]" />
              <span>Clinical Terms of Service</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227] leading-tight">
              Terms &amp; Conditions
            </h1>

            <p className="text-sm text-[#3F5447] font-light leading-relaxed">
              Last updated: November 2026 • Governing outpatient medical consultations, diagnostic laboratory investigations, and pharmacy fulfillment across Bharath MedGuru facilities.
            </p>
          </div>

          {/* Terms Document Body */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.22) 100%)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.70)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.95)",
              borderLeft: "1.5px solid rgba(255, 255, 255, 0.85)",
              boxShadow: "0 20px 48px -6px rgba(30, 50, 39, 0.08)",
            }}
            className="rounded-[28px] p-8 sm:p-12 space-y-8 text-sm sm:text-base leading-relaxed text-[#3F5447]"
          >
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                1. General Provisions &amp; Acceptance
              </h2>
              <p>
                By accessing the medical facilities, scheduling clinical consultations, booking diagnostic testing, or purchasing medications from Bharath MedGuru Specialty Clinic &amp; Diagnostic Care (&quot;Bharath MedGuru&quot;, &quot;we&quot;, &quot;us&quot;), you acknowledge and agree to comply with these Terms and Conditions. These terms are established to ensure patient safety, clinical efficacy, and legal compliance under Indian medical regulations.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                2. Medical Consultations &amp; Professional Standards
              </h2>
              <p>
                All medical consultations—including General Medicine, Cardiology, Orthopedics, Neurology, Gastroenterology, and Pediatrics—are rendered by qualified doctors registered with the National Medical Commission (NMC) and respective State Medical Councils.
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3227] flex-shrink-0 mt-1" />
                  <span><strong>Appointment Flow:</strong> Doctor consultations are conducted by dedicated time slots to minimize clinic waiting times. In case of unexpected medical emergencies or attending physician commitments, patients will be accommodated at the earliest available slot.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3227] flex-shrink-0 mt-1" />
                  <span><strong>Virtual Telemedicine Consultations:</strong> When conducting video or telephone review sessions, patients must provide complete and truthful medical histories. Telemedicine is governed by the Telemedicine Practice Guidelines issued by the Ministry of Health and Family Welfare (MoHFW), Government of India.</span>
                </li>
              </ul>

              {/* Emergency Alert Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm text-[#1E3227] flex items-start gap-3 mt-3">
                <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900 block mb-0.5">Emergency Care Notice:</strong>
                  Our outpatient clinic and telemedicine review services are not an alternative to immediate trauma or emergency hospitalization. If experiencing symptoms of acute heart attack (crushing chest pain), severe breathing distress, acute stroke symptoms, or severe trauma, immediately contact emergency response (call 108) or report to the nearest 24/7 hospital emergency triage.
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                3. Diagnostic Laboratory Services &amp; Digital Reports
              </h2>
              <p>
                Our automated diagnostic laboratory operates under strict NABL benchmark quality control parameters.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Sample Collection:</strong> Patients undergoing blood, urine, or swab collections (at our clinic or via home phlebotomy) must follow standard fasting instructions (e.g., 10–12 hours for lipid profiles and fasting blood glucose).</li>
                <li><strong>Digital Reports:</strong> Verified digital reports are dispatched via secure digital channels (SMS, WhatsApp, or email) upon clinical pathologist validation.</li>
                <li><strong>Clinical Interpretation:</strong> Diagnostic laboratory reports represent objective biochemical findings that must be clinically evaluated by your consulting physician in conjunction with physical examination and symptoms.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                4. Licensed Pharmacy Dispensary &amp; Doorstep Delivery
              </h2>
              <p>
                Our 24/7 in-clinic pharmacy and expanding chain of community retail pharmacies dispense strictly genuine, licensed, and temperature-monitored pharmaceutical formulations:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Prescription Requirement:</strong> Schedule H, H1, and X medicines cannot be dispensed without a valid, legible prescription authored by a registered medical practitioner.</li>
                <li><strong>Doorstep Delivery:</strong> Prescriptions uploaded digitally via our website or WhatsApp are verified by our licensed pharmacists prior to dispatch. Delivery timeframes across Palakkad and Kerala are subject to road conditions and order verification.</li>
                <li><strong>Storage Integrity:</strong> Temperature-sensitive biologicals, insulin, and pediatric suspensions are maintained in validated cold-chain transport.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                5. Operating Hours &amp; Facility Schedules
              </h2>
              <p>
                Bharath MedGuru facilities adhere to the following operational schedules:
              </p>
              <div className="p-4 rounded-xl bg-white/60 border border-[#1E3227]/10 text-xs sm:text-sm space-y-1.5 text-[#1E3227]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#9B8A3E]" />
                  <span><strong>General Facility:</strong> 7:00 AM – 8:00 PM</span>
                </div>
                <div className="pl-6 text-xs text-[#3F5447] space-y-1">
                  <p>• <strong>Diagnostic Laboratory:</strong> 7:00 AM – 7:00 PM</p>
                  <p>• <strong>Pharmacy:</strong> 8:00 AM – 8:00 PM</p>
                  <p>• <strong>Doctor Consultations:</strong> By Appointment (Based on Doctor Availability)</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                6. Appointment Rescheduling &amp; Cancellations
              </h2>
              <p>
                We understand that schedules change. To respect clinical resources and assist fellow patients, we request at least 2 hours of advance notice for consultation rescheduling or cancellations by contacting our clinic desk at <strong>+91 80788 81234</strong> / <strong>+91 98948 39640</strong>.
              </p>
            </section>

            {/* Section 7 - Official Contact */}
            <section className="space-y-4 pt-4 border-t border-[#1E3227]/10">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                7. Clinic Desk &amp; Patient Grievance Contact
              </h2>
              <p className="text-xs sm:text-sm text-[#3F5447]">
                For any clarifications, billing inquiries, or clinical service questions:
              </p>

              <div className="p-5 rounded-2xl bg-white/70 border border-[#1E3227]/10 space-y-3 text-xs sm:text-sm text-[#1E3227]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9B8A3E] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Clinic Address:</strong> Door No: 23/589, 2, A&amp;P Centre, Kunnathurmedu, North Stadium Bypass Road, Palakkad 678 001, Kerala
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#9B8A3E] flex-shrink-0" />
                  <div>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:admin@bharathmedguru.com" className="underline font-medium hover:text-[#15241c]">
                      admin@bharathmedguru.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#9B8A3E] flex-shrink-0" />
                  <div>
                    <strong>Direct Helpline &amp; WhatsApp:</strong>{" "}
                    <a href="tel:+918078881234" className="underline font-semibold hover:text-[#15241c]">
                      +91 80788 81234
                    </a>{" "}
                    <span className="text-[#3F5447] text-xs">
                      /{" "}
                      <a href="tel:+919894839640" className="underline hover:text-[#15241c]">
                        +91 98948 39640
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <FooterSection />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPractitioner="Dr. Roshna"
        initialService="Doctor Consultation"
      />
    </div>
  );
}
