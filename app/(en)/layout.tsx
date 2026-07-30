import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://pratyusha-telugu-growth.reddyprasadkv.chatgpt.site",
  ),
  title: {
    default: "Pratyusha | Bilingual Business Growth",
    template: "%s | Pratyusha",
  },
  description:
    "Premium bilingual brand clarity, digital presence, and growth strategy.",
  keywords: [
    "Telugu business consulting",
    "brand strategy",
    "digital presence",
    "Indian business growth",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["te_IN"],
    title: "Pratyusha — Clarity, Presence, and Growth",
    description:
      "Give your idea a clear expression and your business room to grow.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 800,
        alt: "Pratyusha — premium bilingual business growth consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratyusha — Clarity, Presence, and Growth",
    description:
      "Give your idea a clear expression and your business room to grow.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4b2238",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=Noto+Serif+Telugu:wght@600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-locale="en">{children}</body>
    </html>
  );
}
