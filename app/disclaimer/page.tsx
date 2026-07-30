import type { Metadata } from "next";
import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = { title: "నిరాకరణ ప్రకటన" };

export default function Page() {
  return <PolicyPage policyKey="disclaimer" />;
}
