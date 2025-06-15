import Script from "next/script"

export default function ArticleSchema() {
  // Example article - you can replace with actual article
  const article = {
    headline: "5 Tips för att Hålla Skägget i Toppform",
    image: "https://affessalong.axiestudio.se/images/blog/beard-care-tips.jpg",
    datePublished: "2025-03-10T09:00:00+01:00",
    dateModified: "2025-03-15T14:30:00+01:00",
    author: {
      "@type": "Person",
      name: "Fady",
      url: "https://affessalong.axiestudio.se/team#fady",
    },
    publisher: {
      "@type": "Organization",
      name: "Affes Salong",
      logo: {
        "@type": "ImageObject",
        url: "https://affessalong.axiestudio.se/images/logo.png",
      },
    },
    description:
      "Lär dig hur du tar hand om ditt skägg med dessa 5 enkla tips från professionella barberare på Affes Salong.",
    mainEntityOfPage: "https://affessalong.axiestudio.se/blog/5-tips-for-att-halla-skagget-i-toppform",
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          ...article,
        }),
      }}
    />
  )
}
