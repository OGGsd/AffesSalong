import Script from "next/script"

export default function SpeakableSchema() {
  return (
    <Script
      id="speakable-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "h2", ".speakable"],
          },
          url: "https://affessalong.axiestudio.se",
        }),
      }}
    />
  )
}
