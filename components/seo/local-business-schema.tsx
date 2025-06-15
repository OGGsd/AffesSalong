import Script from "next/script"

interface LocalBusinessSchemaProps {
  name: string
  description: string
  image: string
  logo: string
  telephone: string
  address: {
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  url: string
  sameAs: string[]
  openingHours: {
    days: string[]
    opens: string
    closes: string
  }[]
  priceRange: string
}

export default function LocalBusinessSchema({
  name,
  description,
  image,
  logo,
  telephone,
  address,
  geo,
  url,
  sameAs,
  openingHours,
  priceRange,
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name,
    description,
    image,
    logo,
    "@id": url,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...geo,
    },
    openingHoursSpecification: openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs,
    priceRange,
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
