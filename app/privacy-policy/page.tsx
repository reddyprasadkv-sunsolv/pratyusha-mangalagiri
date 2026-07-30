import type { Metadata } from "next";
import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = { title: "గోప్యతా విధానం" };

export default function Page() {
  return <PolicyPage policyKey="privacy-policy" />;
}
