import Script from "next/script"

export default function EnhancedLocalBusinessSchema() {
  return (
    <Script
      id="enhanced-local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          "@id": "https://affessalong.axiestudio.se/#business",
          name: "Affes Salong",
          alternateName: "Affes Frisörsalong",
          description:
            "Affes Salong är en premium frisörsalong i Jönköping som erbjuder högkvalitativa klippningar, skäggtrimning och frisörtjänster sedan 1991.",
          url: "https://affessalong.axiestudio.se",
          logo: "https://affessalong.axiestudio.se/images/logo.png",
          image: [
            "https://affessalong.axiestudio.se/images/logo.png",
            "https://affessalong.axiestudio.se/og-image.jpg",
          ],
          telephone: "036-123786",
          email: "affessalong@gmail.com",
          foundingDate: "1991",
          founder: {
            "@type": "Person",
            name: "Affes Salong Grundare",
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "Barnarpsgatan 31",
            addressLocality: "Jönköping",
            postalCode: "55316",
            addressCountry: "SE",
            addressRegion: "Jönköping",
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
          priceRange: "$$",
          paymentAccepted: "Cash, Credit Card, Swish",
          currenciesAccepted: "SEK",
          areaServed: {
            "@type": "City",
            name: "Jönköping",
          },
          sameAs: ["https://www.instagram.com/affessalong.jonkoping/", "https://www.tiktok.com/@affes.salong"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Frisörtjänster",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Klippning & Skäggtrimning",
                  description: "Komplett styling med både hår och skägg för ett perfekt utseende.",
                },
                price: "550",
                priceCurrency: "SEK",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Klippning, Herr",
                  description: "Professionell herrklippning anpassad efter dina önskemål.",
                },
                price: "420",
                priceCurrency: "SEK",
              },
            ],
          },
          review: [
            {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
              },
              author: {
                "@type": "Person",
                name: "Johan Andersson",
              },
              datePublished: "2024-03-15",
              reviewBody: "Bästa frisören i Jönköping! Alltid nöjd med resultatet och servicen är fantastisk.",
            },
            {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
              },
              author: {
                "@type": "Person",
                name: "Erik Johansson",
              },
              datePublished: "2024-02-20",
              reviewBody: "Professionell service och fantastiskt resultat. Rekommenderar starkt!",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "127",
            bestRating: "5",
            worstRating: "1",
          },
        }),
      }}
    />
  )
}
