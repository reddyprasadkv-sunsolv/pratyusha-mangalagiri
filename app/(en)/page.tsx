import type { Metadata } from "next";
import HomeExperience from "../components/HomeExperience";
import { siteUrl } from "../i18n";

export const metadata: Metadata = {
  title: "Pratyusha | Clear Direction for Meaningful Business Growth",
  description:
    "Premium bilingual brand clarity, digital presence, and growth strategy for Indian businesses.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      te: "/te",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "en_IN",
    alternateLocale: ["te_IN"],
    title: "Pratyusha — Clarity, Presence, and Growth",
    description:
      "Give your idea a clear expression and your business room to grow.",
    url: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Pratyusha",
  description:
    "Bilingual brand clarity, digital presence, and business growth consulting.",
  areaServed: "IN",
  availableLanguage: ["English", "Telugu"],
  url: siteUrl,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeExperience locale="en" />
    </>
  );
}
