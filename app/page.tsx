import type { Metadata } from "next";
import HomeExperience from "./components/HomeExperience";

export const metadata: Metadata = {
  title: "Pratyusha | మీ వ్యాపార ఎదుగుదలకు స్పష్టమైన దారి",
  description:
    "తెలుగు వ్యాపారాల కోసం బ్రాండ్ స్పష్టత, డిజిటల్ ప్రెజెన్స్ మరియు స్థిరమైన ఎదుగుదలకు ప్రీమియం కన్సల్టింగ్.",
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Pratyusha",
  description:
    "తెలుగు వ్యాపారాల కోసం బ్రాండ్ స్పష్టత, డిజిటల్ ప్రెజెన్స్ మరియు ఎదుగుదల కన్సల్టింగ్.",
  areaServed: "IN",
  availableLanguage: ["te", "en"],
  url: "https://pratyusha.example",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeExperience />
    </>
  );
}
