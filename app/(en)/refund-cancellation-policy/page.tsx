import type { Metadata } from "next";
import PolicyPage from "../../components/PolicyPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  alternates: {
    canonical: "/refund-cancellation-policy",
    languages: {
      en: "/refund-cancellation-policy",
      te: "/te/refund-cancellation-policy",
      "x-default": "/refund-cancellation-policy",
    },
  },
};

export default function Page() {
  return <PolicyPage policyKey="refund-cancellation-policy" locale="en" />;
}
