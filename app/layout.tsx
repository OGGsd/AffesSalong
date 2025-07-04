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
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="57x57" href="/Favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/Favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/Favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/Favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/Favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/Favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/Favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/Favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/apple-icon-180x180.png" />
        <link rel="apple-touch-icon" href="/Favicon/apple-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/Favicon/apple-icon-precomposed.png" />

        {/* Standard Favicons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/Favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/Favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/Favicon/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/Favicon/android-icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="72x72" href="/Favicon/android-icon-72x72.png" />
        <link rel="icon" type="image/png" sizes="36x36" href="/Favicon/android-icon-36x36.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/Favicon/android-icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/Favicon/ms-icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="150x150" href="/Favicon/ms-icon-150x150.png" />
        <link rel="icon" type="image/png" sizes="310x310" href="/Favicon/ms-icon-310x310.png" />
        <link rel="shortcut icon" href="/Favicon/favicon.ico" />

        {/* Manifest and browserconfig */}
        <link rel="manifest" href="/manifest.json" />

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