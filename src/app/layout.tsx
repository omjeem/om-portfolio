import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteConfig } from "@/lib/data";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import JsonLd from "@/components/SEO/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Get site configuration for metadata
const siteConfig = getSiteConfig();

// Enhanced metadata with additional SEO elements
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title.split('|')[0].trim()}`
  },
  description: siteConfig.description,
  keywords: ["Full Stack Developer", "React Developer", "Next.js Developer", "Om Jee Mishra", "Web Developer", "JavaScript Developer", "TypeScript Developer", "Portfolio", "Frontend Developer", "Backend Developer"],
  authors: [{ name: "Om Jee Mishra", url: "https://github.com/omjeem" }],
  creator: "Om Jee Mishra",
  publisher: "Om Jee Mishra",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://omjeemishra.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.title.split('|')[0].trim(),
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/data/om-mishra.jpg",
        width: 1200,
        height: 630,
        alt: "Om Jee Mishra - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@om_jee_mishra",
    images: ["/data/om-mishra.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/favicons/safari-pinned-tab.svg" }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "verify-later",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd type="Person" />
        <JsonLd type="WebSite" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
