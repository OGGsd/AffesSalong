import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import Header from "@/components/header"
import CanonicalURL from "@/components/seo/canonical-url"
import AdvancedMetaTags from "@/components/seo/advanced-meta-tags"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Affes Salong - Premium Frisörsalong i Jönköping sedan 1991",
  description:
    "Affes Salong erbjuder professionell herrklippning, skäggtrimning och styling i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31.",
  keywords: "frisör, herrfrisör, skäggtrimning, Jönköping, herrklippning, barberare, rakning, styling",
  authors: [{ name: "Affes Salong" }],
  creator: "Affes Salong",
  publisher: "Affes Salong",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://affessalong.axiestudio.se",
  },
  openGraph: {
    title: "Affes Salong - Premium Frisörsalong i Jönköping",
    description:
      "Professionell herrklippning, skäggtrimning och styling i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31.",
    url: "https://affessalong.axiestudio.se",
    siteName: "Affes Salong",
    images: [
      {
        url: "https://affessalong.axiestudio.se/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Affes Salong - Premium Frisörsalong i Jönköping",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Affes Salong - Premium Frisörsalong i Jönköping",
    description:
      "Professionell herrklippning, skäggtrimning och styling i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31.",
    images: ["https://affessalong.axiestudio.se/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "beauty",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <CanonicalURL />
        <AdvancedMetaTags />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Script src="/js/app.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
