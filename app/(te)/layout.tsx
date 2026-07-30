import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://pratyusha-telugu-growth.reddyprasadkv.chatgpt.site",
  ),
  title: {
    default: "Pratyusha | తెలుగు బిజినెస్ గ్రోత్",
    template: "%s | Pratyusha",
  },
  description:
    "తెలుగు వ్యాపారాల కోసం ప్రీమియం బ్రాండ్ మరియు గ్రోత్ కన్సల్టింగ్.",
  keywords: [
    "Telugu business consulting",
    "తెలుగు వ్యాపారం",
    "బ్రాండ్ వ్యూహం",
    "డిజిటల్ ప్రెజెన్స్",
  ],
  openGraph: {
    type: "website",
    locale: "te_IN",
    alternateLocale: ["en_IN"],
    title: "Pratyusha — మీ ఎదుగుదలకు స్పష్టమైన దారి",
    description:
      "మీ ఆలోచనకు సరైన రూపం. మీ వ్యాపారానికి స్థిరమైన ఎదుగుదల.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 800,
        alt: "Pratyusha — తెలుగు బిజినెస్ గ్రోత్ కన్సల్టెన్సీ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratyusha — మీ ఎదుగుదలకు స్పష్టమైన దారి",
    description:
      "మీ ఆలోచనకు సరైన రూపం. మీ వ్యాపారానికి స్థిరమైన ఎదుగుదల.",
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

export default function TeluguRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="te">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=Noto+Serif+Telugu:wght@600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-locale="te">{children}</body>
    </html>
  );
}
