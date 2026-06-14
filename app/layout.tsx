import type { Metadata } from "next";
import { Tajawal, IBM_Plex_Sans_Arabic, Space_Grotesk } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://alnasr-alkitchen.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "النصر | مطابخ وألمنيوم وديكور",
  description:
    "النصر لتصنيع المطابخ والألمنيوم والديكور - حي الجامعة، بغداد. أكثر من 12 سنة خبرة في تصميم وتنفيذ المطابخ العصرية وشبابيك الألمنيوم والواجهات الزجاجية.",
  openGraph: {
    title: "النصر | مطابخ وألمنيوم وديكور",
    description:
      "النصر لتصنيع المطابخ والألمنيوم والديكور - حي الجامعة، بغداد. أكثر من 12 سنة خبرة.",
    url: "https://alnasr-alkitchen.com",
    siteName: "النصر",
    locale: "ar_IQ",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 494,
        height: 505,
        alt: "النصر - مطابخ وألمنيوم وديكور",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "النصر | مطابخ وألمنيوم وديكور",
    description:
      "النصر لتصنيع المطابخ والألمنيوم والديكور - حي الجامعة، بغداد.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${ibmArabic.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <meta property="og:image" content="/logo.png" />
        <meta property="og:image:width" content="494" />
        <meta property="og:image:height" content="505" />
        <meta name="twitter:image" content="/logo.png" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
