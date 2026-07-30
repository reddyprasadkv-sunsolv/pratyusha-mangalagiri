import type { Metadata } from "next";
import PolicyPage from "../components/PolicyPage";

export const metadata: Metadata = { title: "నిబంధనలు మరియు షరతులు" };

export default function Page() {
  return <PolicyPage policyKey="terms-and-conditions" />;
}
