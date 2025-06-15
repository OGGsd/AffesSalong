"use client"

import { usePathname } from "next/navigation"
import Head from "next/head"

interface AdvancedMetaTagsProps {
  section?: string
  title?: string
  description?: string
  imageUrl?: string
}

export default function AdvancedMetaTags({
  section,
  title = "Affes Salong - Premium Frisörsalong i Jönköping sedan 1991",
  description = "Affes Salong erbjuder högkvalitativa klippningar, skäggtrimning och frisörtjänster i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31.",
  imageUrl = "/og-image.jpg",
}: AdvancedMetaTagsProps) {
  const pathname = usePathname()
  const baseUrl = "https://affessalong.axiestudio.se"
  const fullUrl = section ? `${baseUrl}${pathname}#${section}` : baseUrl
  const fullImageUrl = `${baseUrl}${imageUrl}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content="Affes Salong" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional SEO Tags */}
      <meta name="geo.region" content="SE-JO" />
      <meta name="geo.placename" content="Jönköping" />
      <meta name="geo.position" content="57.778883;14.165513" />
      <meta name="ICBM" content="57.778883, 14.165513" />

      {/* Mobile Specific */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Preconnect to Important Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Language Alternates */}
      <link rel="alternate" href={baseUrl} hrefLang="sv-se" />
      <link rel="alternate" href={baseUrl} hrefLang="x-default" />
    </Head>
  )
}
