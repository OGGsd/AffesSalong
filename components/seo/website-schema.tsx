import Script from "next/script"

export default function WebsiteSchema() {
  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://affessalong.axiestudio.se/#website",
          url: "https://affessalong.axiestudio.se",
          name: "Affes Salong",
          description: "Premium frisörsalong i Jönköping sedan 1991",
          publisher: {
            "@type": "Organization",
            name: "Affes Salong",
            logo: {
              "@type": "ImageObject",
              url: "https://affessalong.axiestudio.se/images/logo.png",
              width: 192,
              height: 192,
            },
          },
          potentialAction: [
            {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://affessalong.axiestudio.se/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          ],
          inLanguage: "sv-SE",
        }),
      }}
    />
  )
}
