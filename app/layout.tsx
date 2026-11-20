import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1E3227",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bharathmedguru.com"),
  title: {
    default: "BharathMedguru",
    template: "%s | BharathMedguru",
  },
  description:
    "BharathMedguru is an expanding retail chain of modern community pharmacies delivering 100% genuine medicines directly to your location on enquiry, supported by doctor consultations and diagnostics.",
  applicationName: "BharathMedguru",
  authors: [{ name: "BharathMedguru" }],
  generator: "Next.js",
  keywords: [
    "BharathMedguru",
    "bharathmedguru",
    "bharath medguru",
    "Bharath MedGuru",
    "Bharath Med Guru",
    "bharathmedguru.com",
    "BharathMedguru pharmacy",
    "pharmacy chain",
    "retail pharmacy",
    "medicine delivery",
    "doorstep medicine delivery",
    "online pharmacy",
    "genuine medicines",
    "prescription medicine delivery",
    "Kerala pharmacy chain",
    "South India pharmacy",
    "authentic medications",
    "doctor consultations",
    "diagnostic lab tests",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bharathmedguru.com",
    siteName: "BharathMedguru",
    title: "BharathMedguru",
    description:
      "BharathMedguru is an expanding retail chain of modern community pharmacies delivering 100% genuine medicines directly to your location on enquiry.",
    images: [
      {
        url: "/hero-reception.png",
        width: 1200,
        height: 630,
        alt: "BharathMedguru — Trusted Pharmacy Chain & Doorstep Medicine Delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BharathMedguru",
    description:
      "BharathMedguru is an expanding retail chain of modern community pharmacies delivering 100% genuine medicines directly to your location on enquiry.",
    images: ["/hero-reception.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google9fda58aa5c8e5c9a",
  },
};

// JSON-LD structured data for Google Knowledge Graph & ranking top for BharathMedguru
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://bharathmedguru.com/#website",
      "url": "https://bharathmedguru.com",
      "name": "BharathMedguru",
      "alternateName": [
        "Bharath MedGuru",
        "bharathmedguru",
        "Bharath Med Guru",
        "BharathMedguru Pharmacy"
      ],
      "description":
        "BharathMedguru is an expanding retail chain of modern community pharmacies delivering 100% genuine medicines directly to your location on enquiry.",
      "inLanguage": "en-US"
    },
    {
      "@type": "Pharmacy",
      "@id": "https://bharathmedguru.com/#organization",
      "name": "BharathMedguru",
      "alternateName": [
        "Bharath MedGuru",
        "bharathmedguru",
        "Bharath Med Guru"
      ],
      "url": "https://bharathmedguru.com",
      "logo": "https://bharathmedguru.com/logo.png",
      "image": "https://bharathmedguru.com/hero-reception.png",
      "description":
        "BharathMedguru is an expanding retail chain of modern community pharmacies delivering 100% genuine medicines directly to your location on enquiry.",
      "telephone": "+91-79940-66647",
      "email": "admin@bharathmedguru.com",
      "priceRange": "$$",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, Debit Card, UPI",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans bg-[#CBCFB8] text-[#1E3227] antialiased selection:bg-[#1E3227] selection:text-[#CBCFB8]">
        {children}
      </body>
    </html>
  );
}
