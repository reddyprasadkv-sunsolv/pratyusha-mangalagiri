import type { Metadata } from "next";
import HomeExperience from "../../components/HomeExperience";
import { siteUrl } from "../../i18n";

export const metadata: Metadata = {
  title: "Pratyusha | మీ వ్యాపార ఎదుగుదలకు స్పష్టమైన దారి",
  description:
    "తెలుగు వ్యాపారాల కోసం బ్రాండ్ స్పష్టత, డిజిటల్ ప్రెజెన్స్ మరియు స్థిరమైన ఎదుగుదలకు ప్రీమియం కన్సల్టింగ్.",
  alternates: {
    canonical: "/te",
    languages: {
      en: "/",
      te: "/te",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "te_IN",
    alternateLocale: ["en_IN"],
    title: "Pratyusha — మీ ఎదుగుదలకు స్పష్టమైన దారి",
    description:
      "మీ ఆలోచనకు సరైన రూపం. మీ వ్యాపారానికి స్థిరమైన ఎదుగుదల.",
    url: "/te",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Pratyusha",
  description:
    "తెలుగు వ్యాపారాల కోసం బ్రాండ్ స్పష్టత, డిజిటల్ ప్రెజెన్స్ మరియు ఎదుగుదల కన్సల్టింగ్.",
  areaServed: "IN",
  availableLanguage: ["Telugu", "English"],
  url: `${siteUrl}/te`,
};

export default function TeluguHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeExperience locale="te" />
    </>
  );
}
