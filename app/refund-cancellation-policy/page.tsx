import type { Metadata } from "next";
import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = { title: "రిఫండ్ మరియు రద్దు విధానం" };

export default function Page() {
  return <PolicyPage policyKey="refund-cancellation-policy" />;
}
