import type { Metadata } from "next";
import PolicyPage from "../../components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pratyusha handles personal information and enquiries.",
  alternates: {
    canonical: "/privacy-policy",
    languages: {
      en: "/privacy-policy",
      te: "/te/privacy-policy",
      "x-default": "/privacy-policy",
    },
  },
};

export default function Page() {
  return <PolicyPage policyKey="privacy-policy" locale="en" />;
}
