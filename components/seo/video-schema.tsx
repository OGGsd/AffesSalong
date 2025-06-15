import Script from "next/script"

export default function VideoSchema() {
  // Example video - you can replace with actual video
  const video = {
    name: "Styling Tips från Affes Salong",
    description: "Lär dig hur du stylar ditt hår som en professionell frisör med dessa enkla tips.",
    thumbnailUrl: "https://affessalong.axiestudio.se/images/videos/styling-tips-thumbnail.jpg",
    uploadDate: "2025-04-15T08:00:00+02:00",
    duration: "PT4M35S", // ISO 8601 format: 4 minutes, 35 seconds
    contentUrl: "https://affessalong.axiestudio.se/videos/styling-tips.mp4",
    embedUrl: "https://www.youtube.com/embed/example",
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "WatchAction" },
      userInteractionCount: 2347,
    },
    regionsAllowed: "SE",
  }

  return (
    <Script
      id="video-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          ...video,
        }),
      }}
    />
  )
}
