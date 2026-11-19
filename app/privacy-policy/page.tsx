"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BookingModal from "@/components/BookingModal";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-3.5 h-3.5 text-[#9B8A3E]" />
              <span>Patient Privacy &amp; Data Security</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227] leading-tight">
              Patient Privacy Policy
            </h1>

            <p className="text-sm text-[#3F5447] font-light leading-relaxed">
              Last updated: November 2026 • Governing medical records, diagnostic test results, pharmacy delivery data, and patient confidentiality across Bharath MedGuru clinical facilities in Kerala.
            </p>
          </div>

          {/* Policy Document Body */}
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
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#9B8A3E]" />
                <span>1. Commitment to Health Data Confidentiality</span>
              </h2>
              <p>
                Bharath MedGuru Specialty Clinic, Automated Diagnostic Laboratory &amp; Retail Pharmacy Network (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) holds patient medical confidentiality as our highest duty of care. This Privacy Policy details how we collect, process, safeguard, and disclose patient health information in compliance with the Digital Personal Data Protection Act (DPDPA), the Clinical Establishments Act, and National Medical Commission ethical guidelines.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                2. Information We Collect
              </h2>
              <p>
                To provide safe, accurate medical care, diagnostic investigations, and prescription fulfillment, we collect the following categories of information:
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3227] flex-shrink-0 mt-1" />
                  <span><strong>Patient Demographics:</strong> Full name, age, gender, contact phone number, email address, and residential address (for doorstep pharmacy delivery and home blood sample collection).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3227] flex-shrink-0 mt-1" />
                  <span><strong>Clinical Consultation Records:</strong> Medical history, ongoing symptoms, vital signs, physical examination records, and physician consultation notes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3227] flex-shrink-0 mt-1" />
                  <span><strong>Diagnostic Laboratory Results:</strong> Automated 5-part hematology, clinical biochemistry (blood sugar, HbA1c, LFT, lipid, renal profiles), thyroid panels, cardiac markers, digital radiography X-rays, and 2D Doppler echocardiograms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3227] flex-shrink-0 mt-1" />
                  <span><strong>Pharmacy &amp; Prescription Records:</strong> Valid doctor prescriptions, prescribed dosage intervals, medication dispensing records, and chronic refill histories.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                3. Purpose of Clinical Data Processing
              </h2>
              <p>
                Patient data collected by Bharath MedGuru is utilized solely for clinical and healthcare delivery purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Facilitating outpatient (OPD) specialist doctor consultations and treatment continuity.</li>
                <li>Executing high-precision diagnostic laboratory testing and delivering verified same-day digital reports via secure SMS, WhatsApp, or email.</li>
                <li>Fulfilling genuine prescription medications and managing prompt doorstep deliveries across Kerala.</li>
                <li>Administering scheduled chronic medication refill programs (diabetes, hypertension, cardiac care).</li>
                <li>Ensuring adherence to clinical governance and regulatory statutory reporting requirements.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                4. Data Security, Access Control &amp; Retention
              </h2>
              <p>
                All digital diagnostic reports, electronic medical records (EMR), and billing records are stored in secure, encrypted health data environments. Access is restricted strictly to attending medical practitioners, certified laboratory biochemists, and licensed pharmacists on an authorized need-to-know basis. Physical specimens and biohazardous materials are processed and disposed of under strict biomedical waste management protocols.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                5. Third-Party Disclosures
              </h2>
              <p>
                We do not sell, rent, or commercialize patient personal or medical records to external marketing entities or third parties under any circumstance. Information is disclosed only when:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Explicitly authorized by the patient for second-opinion consultations or hospital referrals.</li>
                <li>Mandated by public health statutory requirements or orders from lawful government authorities.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                6. Patient Rights
              </h2>
              <p>
                You retain the right to review, request copies of, or request factual corrections to your electronic health records and diagnostic laboratory reports. You may also update your communication preferences for pharmacy refill reminders and clinic notices.
              </p>
            </section>

            {/* Section 7 - Official Contact */}
            <section className="space-y-4 pt-4 border-t border-[#1E3227]/10">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#1E3227]">
                7. Privacy Officer &amp; Contact Desk
              </h2>
              <p className="text-xs sm:text-sm text-[#3F5447]">
                For any inquiries regarding this Privacy Policy or your clinical records, please contact our administrative desk:
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
