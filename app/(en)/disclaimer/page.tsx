import type { Metadata } from "next";
import PolicyPage from "../../components/PolicyPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  alternates: {
    canonical: "/disclaimer",
    languages: {
      en: "/disclaimer",
      te: "/te/disclaimer",
      "x-default": "/disclaimer",
    },
  },
};

export default function Page() {
  return <PolicyPage policyKey="disclaimer" locale="en" />;
}
