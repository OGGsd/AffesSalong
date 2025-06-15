import Script from "next/script"

interface Service {
  id: string
  name: string
  price: number
  duration: string
  bookingLink: string
  category: string[]
  description?: string
  popular?: boolean
}

interface ServicesSectionSEOProps {
  services: Service[]
}

export default function ServicesSectionSEO({ services }: ServicesSectionSEOProps) {
  return (
    <Script
      id="services-section-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://affessalong.axiestudio.se/#tjanster",
          url: "https://affessalong.axiestudio.se/#tjanster",
          name: "Våra Tjänster - Affes Salong",
          description: "Vi erbjuder ett brett utbud av professionella tjänster för att möta dina behov.",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://affessalong.axiestudio.se",
            name: "Affes Salong",
            url: "https://affessalong.axiestudio.se",
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.name,
                description: service.description || `${service.name} hos Affes Salong`,
                offers: {
                  "@type": "Offer",
                  price: service.price,
                  priceCurrency: "SEK",
                  url: service.bookingLink,
                },
                provider: {
                  "@type": "HairSalon",
                  name: "Affes Salong",
                },
              },
            })),
          },
        }),
      }}
    />
  )
}
