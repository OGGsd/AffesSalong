import Script from "next/script"

export default function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://affessalong.axiestudio.se/#organization",
          name: "Affes Salong",
          url: "https://affessalong.axiestudio.se",
          logo: {
            "@type": "ImageObject",
            url: "https://affessalong.axiestudio.se/images/logo.png",
            width: 192,
            height: 192,
          },
          image: [
            "https://affessalong.axiestudio.se/images/logo.png",
            "https://affessalong.axiestudio.se/og-image.jpg",
          ],
          sameAs: ["https://www.instagram.com/affessalong.jonkoping/", "https://www.tiktok.com/@affes.salong"],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "036-123786",
              contactType: "customer service",
              areaServed: "SE",
              availableLanguage: ["Swedish", "English"],
            },
          ],
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
            },
          ],
          founder: {
            "@type": "Person",
            name: "Affes Salong Grundare",
          },
          foundingDate: "1991",
          numberOfEmployees: {
            "@type": "QuantitativeValue",
            value: 4,
          },
          slogan: "Premium barber shop sedan 1991",
          description:
            "Affes Salong är en premium frisörsalong i Jönköping som erbjuder högkvalitativa klippningar, skäggtrimning och frisörtjänster sedan 1991.",
        }),
      }}
    />
  )
}
