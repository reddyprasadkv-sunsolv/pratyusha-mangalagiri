import type { Metadata } from "next";
import PolicyPage from "../../../components/PolicyPage";

export const metadata: Metadata = {
  title: "గోప్యతా విధానం",
  description: "వ్యక్తిగత సమాచారం మరియు విచారణలను Pratyusha ఎలా నిర్వహిస్తుంది.",
  alternates: {
    canonical: "/te/privacy-policy",
    languages: {
      en: "/privacy-policy",
      te: "/te/privacy-policy",
      "x-default": "/privacy-policy",
    },
  },
  openGraph: { locale: "te_IN", alternateLocale: ["en_IN"] },
};

export default function Page() {
  return <PolicyPage policyKey="privacy-policy" locale="te" />;
}
