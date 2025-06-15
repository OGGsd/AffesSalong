import Script from "next/script"

export default function AboutSectionSEO() {
  return (
    <Script
      id="about-section-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://affessalong.axiestudio.se/#om-oss",
          url: "https://affessalong.axiestudio.se/#om-oss",
          name: "Om Affes Salong - Premium Frisörsalong sedan 1991",
          description:
            "Affes Salong grundades 1991 och har sedan dess varit ett föredöme för högkvalitativa behandlingar och personlig service. Vi tror på att skapa en unik och avslappnad atmosfär där våra kunder kan njuta av en lyxupplevelse.",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://affessalong.axiestudio.se",
            name: "Affes Salong",
            url: "https://affessalong.axiestudio.se",
          },
          mainEntity: {
            "@type": "LocalBusiness",
            "@id": "https://affessalong.axiestudio.se/#business",
            name: "Affes Salong",
            image: "https://affessalong.axiestudio.se/images/logo.png",
            logo: "https://affessalong.axiestudio.se/images/logo.png",
            description:
              "Premium barber shop sedan 1991. Vi erbjuder högkvalitativa behandlingar och personlig service.",
            priceRange: "$$",
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
            sameAs: ["https://www.instagram.com/affessalong.jonkoping/", "https://www.tiktok.com/@affes.salong"],
          },
        }),
      }}
    />
  )
}
