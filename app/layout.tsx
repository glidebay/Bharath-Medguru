import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bharath MedGuru — Integrated Healthcare & Wellness Collective",
  description:
    "Integrated clinical care, specialist consultations, and holistic healing unified with trusted medicine.",
  keywords: [
    "Bharath MedGuru",
    "healthcare",
    "pharmacy",
    "holistic health",
    "wellness",
    "sound therapy",
    "energy healing",
    "mindfulness",
    "ayurveda",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#CBCFB8] text-[#1E3227] antialiased selection:bg-[#1E3227] selection:text-[#CBCFB8]">
        {children}
      </body>
    </html>
  );
}
