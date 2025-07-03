import './globals.css'

export const metadata = {
  title: 'Affes Salong - Premium Frisörsalong i Jönköping sedan 1991',
  description: 'Affes Salong erbjuder professionell herrklippning, skäggtrimning och styling i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31.',
  keywords: 'frisör, herrklippning, skägg, Jönköping, barber, styling, premium, salong',
  authors: [{ name: 'Affes Salong' }],
  creator: 'Affes Salong',
  publisher: 'Affes Salong',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://affessalong.axiestudio.se'),
  alternates: {
    canonical: '/',
    languages: {
      'sv-SE': '/',
    },
  },
  openGraph: {
    title: 'Affes Salong - Premium Frisörsalong i Jönköping',
    description: 'Premium frisörsalong sedan 1991. Boka herrklippning, skäggtrimning och styling online.',
    url: 'https://affessalong.axiestudio.se',
    siteName: 'Affes Salong',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Affes Salong - Premium Frisörsalong i Jönköping',
      },
    ],
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affes Salong - Premium Frisörsalong i Jönköping',
    description: 'Premium frisörsalong sedan 1991. Boka herrklippning, skäggtrimning och styling online.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Affes Salong" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Affes Salong" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#d97706" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#d97706" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />

        {/* Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d97706" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Splash Screens for iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2048-2732.jpg" sizes="2048x2732" />
        <link rel="apple-touch-startup-image" href="/apple-splash-1668-2224.jpg" sizes="1668x2224" />
        <link rel="apple-touch-startup-image" href="/apple-splash-1536-2048.jpg" sizes="1536x2048" />
        <link rel="apple-touch-startup-image" href="/apple-splash-1125-2436.jpg" sizes="1125x2436" />
        <link rel="apple-touch-startup-image" href="/apple-splash-1242-2208.jpg" sizes="1242x2208" />
        <link rel="apple-touch-startup-image" href="/apple-splash-750-1334.jpg" sizes="750x1334" />
        <link rel="apple-touch-startup-image" href="/apple-splash-640-1136.jpg" sizes="640x1136" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.bokadirekt.se" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.bokadirekt.se" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="dns-prefetch" href="//www.instagram.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": "Affes Salong",
              "description": "Premium frisörsalong i Jönköping sedan 1991. Specialiserad på herrklippning, skäggtrimning och styling.",
              "url": "https://affessalong.axiestudio.se",
              "telephone": "+46-36-123786",
              "email": "affessalong@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Barnarpsgatan 31",
                "addressLocality": "Jönköping",
                "postalCode": "55316",
                "addressCountry": "SE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 57.778883,
                "longitude": 14.165513
              },
              "openingHours": [
                "Mo-Fr 09:00-18:00",
                "Sa 10:00-14:00"
              ],
              "priceRange": "$$",
              "image": "https://affessalong.axiestudio.se/images/logo.png",
              "logo": "https://affessalong.axiestudio.se/images/logo.png",
              "sameAs": [
                "https://www.instagram.com/affessalong.jonkoping/",
                "https://www.bokadirekt.se/places/affessalong-10813"
              ],
              "foundingDate": "1991",
              "paymentAccepted": ["Cash", "Credit Card", "Swish"],
              "currenciesAccepted": "SEK",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Tjänster",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Herrklippning",
                      "description": "Professionell herrklippning"
                    },
                    "price": "420",
                    "priceCurrency": "SEK"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Klippning & Skäggtrimning",
                      "description": "Komplett styling med både hår och skägg"
                    },
                    "price": "550",
                    "priceCurrency": "SEK"
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}