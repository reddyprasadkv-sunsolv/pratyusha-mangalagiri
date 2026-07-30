import type { Metadata } from "next";
import PolicyPage from "../../components/PolicyPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  alternates: {
    canonical: "/cookie-policy",
    languages: {
      en: "/cookie-policy",
      te: "/te/cookie-policy",
      "x-default": "/cookie-policy",
    },
  },
};

export default function Page() {
  return <PolicyPage policyKey="cookie-policy" locale="en" />;
}
