"use client"

import { usePathname } from "next/navigation"

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

  // This component is now handled by the Metadata API in layout.tsx
  // Keeping this for any additional client-side meta tag management if needed
  return null
}