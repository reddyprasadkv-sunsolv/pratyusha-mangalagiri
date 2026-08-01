import type { Metadata } from "next";
import PolicyPage from "../../components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: {
    canonical: "/terms-and-conditions",
    languages: {
      en: "/terms-and-conditions",
      te: "/te/terms-and-conditions",
      "x-default": "/terms-and-conditions",
    },
  },
};

export default function Page() {
  return <PolicyPage policyKey="terms-and-conditions" locale="en" />;
}
