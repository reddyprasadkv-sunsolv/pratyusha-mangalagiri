import type { Metadata } from "next";
import PolicyPage from "../../../components/PolicyPage";

export const metadata: Metadata = {
  title: "నిరాకరణ ప్రకటన",
  alternates: {
    canonical: "/te/disclaimer",
    languages: {
      en: "/disclaimer",
      te: "/te/disclaimer",
      "x-default": "/disclaimer",
    },
  },
  openGraph: { locale: "te_IN", alternateLocale: ["en_IN"] },
};

export default function Page() {
  return <PolicyPage policyKey="disclaimer" locale="te" />;
}
