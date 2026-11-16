import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Bharath MedGuru Specialty Clinic & Diagnostic Care",
  description: "Privacy policy and patient medical data protection standards at Bharath MedGuru.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#CBCFB8] text-[#1E3227] py-16 px-4 sm:px-6 lg:px-8 selection:bg-[#1E3227] selection:text-[#CBCFB8]">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E3227] hover:text-[#15241c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Clinic Home</span>
        </Link>

        <div
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.30) 100%)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.70)",
            boxShadow: "0 20px 48px -6px rgba(30, 50, 39, 0.10)",
          }}
          className="rounded-[28px] p-8 sm:p-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3227]/10 text-[#1E3227] text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-[#9B8A3E]" />
            <span>Clinical Data Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227]">
            Patient Privacy Policy
          </h1>
          <p className="text-sm text-[#3F5447]">
            Last updated: November 16, 2026 • Compliant with Indian Digital Personal Data Protection Act (DPDPA) &amp; Clinical Establishments Act.
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.25) 100%)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.70)",
            boxShadow: "0 20px 48px -6px rgba(30, 50, 39, 0.10)",
          }}
          className="rounded-[28px] p-8 sm:p-12 space-y-8 text-sm sm:text-base leading-relaxed text-[#3F5447]"
        >
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3227]">
              1. Commitment to Patient Health Data Confidentiality
            </h2>
            <p>
              Bharath MedGuru Specialty Clinic &amp; Diagnostic Care (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) prioritizes the utmost security and confidentiality of patient electronic medical records (EMR), laboratory diagnostic reports, consultation history, and billing records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3227]">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Patient Demographic Information:</strong> Full name, age, gender, residential address, mobile phone number, and emergency contact.</li>
              <li><strong>Clinical Information:</strong> Medical history, current symptoms, clinical diagnoses, vital signs, and telemedicine notes.</li>
              <li><strong>Diagnostic Data:</strong> Automated hematology, biochemistry, digital radiology X-rays, and 2D echocardiograms.</li>
              <li><strong>Pharmacy Records:</strong> Prescribed medications, dosage instructions, and dispensing history.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3227]">
              3. Purpose of Clinical Data Processing
            </h2>
            <p>
              Your medical data is used exclusively to facilitate physician consultations, process laboratory diagnostics, dispense prescribed medications, and coordinate insurance/TPA cashless approvals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3227]">
              4. Contact Our Data Protection Desk
            </h2>
            <div className="p-4 rounded-xl bg-white/60 border border-[#1E3227]/10 text-xs sm:text-sm text-[#1E3227] space-y-1">
              <div><strong>Email:</strong> privacy@bharathmedguru.com</div>
              <div><strong>Clinic Helpline:</strong> +91 99470 21690</div>
              <div><strong>Registered Address:</strong> Medical College Rd / Bypass Junction, Kochi, Kerala – 682024</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
