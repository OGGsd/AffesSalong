import Script from "next/script"

export default function EventSchema() {
  // Example event - you can replace with actual events
  const event = {
    name: "Kundkväll på Affes Salong",
    startDate: "2025-06-15T18:00:00+02:00",
    endDate: "2025-06-15T21:00:00+02:00",
    location: {
      name: "Affes Salong",
      address: {
        streetAddress: "Barnarpsgatan 31",
        addressLocality: "Jönköping",
        postalCode: "55316",
        addressCountry: "SE",
      },
    },
    description:
      "Välkommen till en exklusiv kundkväll på Affes Salong med specialerbjudanden, styling-tips och förfriskningar.",
    offers: {
      price: "0",
      priceCurrency: "SEK",
      availability: "https://schema.org/LimitedAvailability",
      validFrom: "2025-05-15T00:00:00+02:00",
      url: "https://affessalong.axiestudio.se/events/kundkvall",
    },
    performer: {
      name: "Affes Salong Team",
      type: "Organization",
    },
    image: "https://affessalong.axiestudio.se/images/events/kundkvall.jpg",
    url: "https://affessalong.axiestudio.se/events/kundkvall",
  }

  return (
    <Script
      id="event-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          ...event,
        }),
      }}
    />
  )
}
