import type { Metadata } from "next";
import PolicyPage from "../../../components/PolicyPage";

export const metadata: Metadata = {
  title: "రిఫండ్ మరియు రద్దు విధానం",
  alternates: {
    canonical: "/te/refund-cancellation-policy",
    languages: {
      en: "/refund-cancellation-policy",
      te: "/te/refund-cancellation-policy",
      "x-default": "/refund-cancellation-policy",
    },
  },
  openGraph: { locale: "te_IN", alternateLocale: ["en_IN"] },
};

export default function Page() {
  return <PolicyPage policyKey="refund-cancellation-policy" locale="te" />;
}
