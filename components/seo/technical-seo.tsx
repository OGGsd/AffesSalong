import Head from "next/head"

export default function TechnicalSEO() {
  return (
    <Head>
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/images/hero-background.jpeg" as="image" />

      {/* DNS prefetch */}
      <link rel="dns-prefetch" href="https://www.bokadirekt.se" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Preconnect */}
      <link rel="preconnect" href="https://www.bokadirekt.se" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />

      {/* Resource hints */}
      <link rel="prefetch" href="/om-oss" />
      <link rel="prefetch" href="/tjanster" />

      {/* Mobile optimization */}
      <meta name="theme-color" content="#f59e0b" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Security headers */}
      <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.google-analytics.com;"
      />
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      <meta http-equiv="X-Frame-Options" content="DENY" />
      <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
      <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(self)" />
    </Head>
  )
}
