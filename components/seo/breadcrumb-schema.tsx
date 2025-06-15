import Script from "next/script"

interface BreadcrumbSchemaProps {
  currentSection?: string
}

export default function BreadcrumbSchema({ currentSection }: BreadcrumbSchemaProps) {
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Hem",
      item: "https://affessalong.axiestudio.se",
    },
  ]

  if (currentSection) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: currentSection,
      item: `https://affessalong.axiestudio.se/#${currentSection.toLowerCase().replace(/\s+/g, "-")}`,
    })
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems,
        }),
      }}
    />
  )
}
