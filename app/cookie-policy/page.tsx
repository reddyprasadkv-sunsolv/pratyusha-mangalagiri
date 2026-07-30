import type { Metadata } from "next";
import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = { title: "కుకీ విధానం" };

export default function Page() {
  return <PolicyPage policyKey="cookie-policy" />;
}
