import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pratyusha.example";
  return [
    "",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-cancellation-policy",
    "/disclaimer",
    "/cookie-policy",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.4,
  }));
}
