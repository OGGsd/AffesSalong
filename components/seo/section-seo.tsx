"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"

interface SectionSEOProps {
  sectionId: string
  title: string
  description: string
  imageUrl?: string
  type?: string
  offers?: Array<{
    name: string
    description: string
    price?: number
    priceCurrency?: string
  }>
  employees?: Array<{
    name: string
    image: string
    jobTitle: string
  }>
}

export default function SectionSEO({
  sectionId,
  title,
  description,
  imageUrl = "/images/logo.png",
  type = "WebPage",
  offers = [],
  employees = [],
}: SectionSEOProps) {
  const pathname = usePathname()
  const baseUrl = "https://affessalong.axiestudio.se"
  const fullUrl = `${baseUrl}${pathname}#${sectionId}`

  // Create schema based on section type
  const schema: any = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": fullUrl,
    url: fullUrl,
    name: title,
    description: description,
    image: `${baseUrl}${imageUrl}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": baseUrl,
      name: "Affes Salong",
      url: baseUrl,
    },
  }

  // Add offers if provided
  if (offers.length > 0) {
    schema.offers = offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      ...(offer.price && { price: offer.price }),
      ...(offer.priceCurrency && { priceCurrency: offer.priceCurrency }),
    }))
  }

  // Add employees if provided
  if (employees.length > 0) {
    schema.employee = employees.map((employee) => ({
      "@type": "Person",
      name: employee.name,
      image: `${baseUrl}${employee.image}`,
      jobTitle: employee.jobTitle,
    }))
  }

  return (
    <Script
      id={`section-schema-${sectionId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
