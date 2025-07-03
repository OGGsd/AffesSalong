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
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.bokadirekt.se" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.bokadirekt.se" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="dns-prefetch" href="//www.instagram.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}