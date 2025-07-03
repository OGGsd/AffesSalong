import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import Header from "@/components/header"
import AnalyticsProvider from "@/components/analytics-provider"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Affes Salong - Premium Frisörsalong i Jönköping sedan 1991",
    template: "%s | Affes Salong"
  },
  description:
    "Affes Salong erbjuder professionell herrklippning, skäggtrimning och styling i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31.",
  keywords: [
    "frisör", 
    "herrfrisör", 
    "skäggtrimning", 
    "Jönköping", 
    "herrklippning", 
    "barberare", 
    "rakning", 
    "styling"
  ],
  authors: [{ name: "Affes Salong" }],
  creator: "Affes Salong",
  publisher: "Affes Salong",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://affessalong.axiestudio.se'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Affes Salong - Premium Frisörsalong i Jönköping",
    description:
      "Professionell herrklippning, skäggtrimning och styling i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31.",
    url: "https://affessalong.axiestudio.se",
    siteName: "Affes Salong",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
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
  generator: 'Next.js',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
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
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.bokadirekt.se" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="/images/hero-background.jpeg" 
          as="image" 
          type="image/jpeg"
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        
        {/* Analytics Scripts */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        
        {/* PWA and Analytics Provider */}
        <AnalyticsProvider />
        
        {/* Non-critical scripts */}
        <Script src="/js/app.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}