import type { Metadata } from "next";
import PolicyPage from "../../../components/PolicyPage";

export const metadata: Metadata = {
  title: "నిబంధనలు మరియు షరతులు",
  alternates: {
    canonical: "/te/terms-and-conditions",
    languages: {
      en: "/terms-and-conditions",
      te: "/te/terms-and-conditions",
      "x-default": "/terms-and-conditions",
    },
  },
  openGraph: { locale: "te_IN", alternateLocale: ["en_IN"] },
};

export default function Page() {
  return <PolicyPage policyKey="terms-and-conditions" locale="te" />;
}
