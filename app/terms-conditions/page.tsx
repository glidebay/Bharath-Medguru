import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Bharath MedGuru Specialty Clinic & Diagnostic Care",
  description: "Terms and conditions of medical consultations, outpatient appointments, and diagnostic services at Bharath MedGuru.",
};

export default function TermsConditionsPage() {
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
            <FileText className="w-3.5 h-3.5 text-[#9B8A3E]" />
            <span>Clinical Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E3227]">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-[#3F5447]">
            Last updated: November 16, 2026 • Governing outpatient clinical care, telemedicine, diagnostics, and pharmacy fulfillment.
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
              1. General Clinical Provision
            </h2>
            <p>
              By accessing the services of Bharath MedGuru Specialty Clinic &amp; Diagnostic Care, booking an in-person OPD consultation, scheduling a telemedicine call, or purchasing prescription medications from our licensed pharmacy, you agree to comply with these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3227]">
              2. Medical Consultations &amp; Telemedicine
            </h2>
            <p>
              All consultations are performed by registered medical practitioners licensed under their respective State Medical Councils and the National Medical Commission (NMC). Telemedicine consultations are subject to Telemedicine Practice Guidelines issued by the Ministry of Health and Family Welfare (MoHFW), Government of India.
            </p>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-[#1E3227] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Emergency Notice:</strong> Telemedicine consultations are not a substitute for emergency hospitalization. If experiencing acute chest pain, severe breathlessness, or traumatic injury, immediately visit our emergency triage desk or call 108.
              </span>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3227]">
              3. Diagnostic Testing &amp; Specimen Collection
            </h2>
            <p>
              Diagnostic tests (hematology, biochemistry, radiography, echocardiography) are executed under strict NABL-benchmarked quality controls. Phlebotomists performing home sample collection follow international cold-chain and biohazard transport protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3227]">
              4. In-Clinic Pharmacy &amp; Prescriptions
            </h2>
            <p>
              Schedule H and X medications are strictly dispensed against valid prescriptions authored by registered medical practitioners. All medications are authentic, temperature-controlled, and sourced directly from licensed pharmaceutical distributors.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
