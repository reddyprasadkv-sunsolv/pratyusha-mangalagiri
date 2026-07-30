import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pratyusha.example"),
  title: {
    default: "Pratyusha | Telugu Business Growth",
    template: "%s | Pratyusha",
  },
  description:
    "తెలుగు వ్యాపారాల కోసం ప్రీమియం బ్రాండ్ మరియు గ్రోత్ కన్సల్టింగ్.",
  keywords: [
    "Telugu business consulting",
    "brand strategy",
    "digital presence",
    "తెలుగు వ్యాపారం",
    "బ్రాండ్ వ్యూహం",
  ],
  openGraph: {
    type: "website",
    locale: "te_IN",
    title: "Pratyusha — మీ ఎదుగుదలకు స్పష్టమైన దారి",
    description:
      "మీ ఆలోచనకు సరైన రూపం. మీ వ్యాపారానికి స్థిరమైన ఎదుగుదల.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 800,
        alt: "Pratyusha — premium Telugu business growth consultancy",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=Noto+Serif+Telugu:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
