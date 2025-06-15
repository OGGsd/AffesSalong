import Script from "next/script"

export default function ContactSectionSEO() {
  return (
    <Script
      id="contact-section-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://affessalong.axiestudio.se/#kontakt",
          url: "https://affessalong.axiestudio.se/#kontakt",
          name: "Kontakt & Öppettider - Affes Salong",
          description: "Kontakta oss för bokning eller frågor. Vi ser fram emot ditt besök hos Affes Salong.",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://affessalong.axiestudio.se",
            name: "Affes Salong",
            url: "https://affessalong.axiestudio.se",
          },
          mainEntity: {
            "@type": "HairSalon",
            name: "Affes Salong",
            image: "https://affessalong.axiestudio.se/images/logo.png",
            logo: "https://affessalong.axiestudio.se/images/logo.png",
            telephone: "036-123786",
            email: "affessalong@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Barnarpsgatan 31",
              addressLocality: "Jönköping",
              postalCode: "55316",
              addressCountry: "SE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 57.778883,
              longitude: 14.165513,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "10:00",
                closes: "14:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "00:00",
                closes: "00:00",
                validFrom: "2023-01-01",
                validThrough: "2030-12-31",
              },
            ],
          },
        }),
      }}
    />
  )
}
