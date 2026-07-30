import type { MetadataRoute } from "next";
import { siteUrl } from "./i18n";

const legalPaths = [
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-cancellation-policy",
  "/disclaimer",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...legalPaths];

  return paths.flatMap((path) => {
    const englishUrl = `${siteUrl}${path}`;
    const teluguUrl = `${siteUrl}/te${path}`;
    const shared = {
      lastModified: new Date(),
      changeFrequency: (path === "" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: path === "" ? 1 : 0.4,
      alternates: {
        languages: {
          en: englishUrl,
          te: teluguUrl,
          "x-default": englishUrl,
        },
      },
    };

    return [
      { url: englishUrl, ...shared },
      { url: teluguUrl, ...shared },
    ];
  });
}
