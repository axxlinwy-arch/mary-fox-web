import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Playfair_Display } from "next/font/google";
import { EuphoriaHeader } from "@/components/euphoria/header";
import { EuphoriaFooter } from "@/components/euphoria/footer";
import { SiteShell } from "@/components/euphoria/site-shell";
import { SITE, ASSETS } from "@/constants/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "тату",
    "татуировка",
    "EUPHORIA",
    "Mary Fox",
    "тату студия",
    "Минск",
    "cover up",
    "обучение тату",
  ],
  authors: [{ name: SITE.founder }],
  creator: SITE.shortName,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.shortName,
    images: [
      {
        url: ASSETS.logoEuphoria,
        width: 512,
        height: 512,
        alt: SITE.shortName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [ASSETS.logoEuphoria],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: ASSETS.logoEuphoria,
    apple: ASSETS.logoEuphoria,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${bebas.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground touch-manipulation">
        <SiteShell>
          <EuphoriaHeader />
          <main>{children}</main>
          <EuphoriaFooter />
        </SiteShell>
      </body>
    </html>
  );
}
