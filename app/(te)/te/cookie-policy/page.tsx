import type { Metadata } from "next";
import PolicyPage from "../../../components/PolicyPage";

export const metadata: Metadata = {
  title: "కుకీ విధానం",
  alternates: {
    canonical: "/te/cookie-policy",
    languages: {
      en: "/cookie-policy",
      te: "/te/cookie-policy",
      "x-default": "/cookie-policy",
    },
  },
  openGraph: { locale: "te_IN", alternateLocale: ["en_IN"] },
};

export default function Page() {
  return <PolicyPage policyKey="cookie-policy" locale="te" />;
}
