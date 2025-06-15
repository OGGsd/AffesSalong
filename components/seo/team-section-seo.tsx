import Script from "next/script"

export default function TeamSectionSEO() {
  return (
    <Script
      id="team-section-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://affessalong.axiestudio.se/#team",
          url: "https://affessalong.axiestudio.se/#team",
          name: "Vårt Professionella Team - Affes Salong",
          description: "Möt våra erfarna stylister som är dedikerade till att ge dig den perfekta looken.",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://affessalong.axiestudio.se",
            name: "Affes Salong",
            url: "https://affessalong.axiestudio.se",
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Person",
                  name: "Fady",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DB7553E4-8856-4C76-B3CC-700B3119C505-6325-0000043A697266E8.jpg-zAsnSlcoN5BPNAHFd4Um7QOtWGB09r.jpeg",
                  jobTitle: "Frisör",
                  worksFor: {
                    "@type": "HairSalon",
                    name: "Affes Salong",
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Person",
                  name: "Adnan",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/437A1D0F-5B16-47DC-9A33-079B830D638D-6325-0000043AAF1B22A7.jpg-3wJRhhKA2o05kDjduqLnPIrHLcsLAk.jpeg",
                  jobTitle: "Frisör",
                  worksFor: {
                    "@type": "HairSalon",
                    name: "Affes Salong",
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Person",
                  name: "Elias",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/56AF9B72-FFE2-4361-8168-DAE94D01EBC0-6325-0000043A2FFCC298.jpg-rqUW0laGtLG08cgdRpMn4HnWbeeC7S.jpeg",
                  jobTitle: "Frisör",
                  worksFor: {
                    "@type": "HairSalon",
                    name: "Affes Salong",
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Person",
                  name: "Behnam",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B154D117-9D24-42F2-A40F-37B19348B863-6325-0000043AE528FFFB.jpg-dIdkQbSVCwplqpGiazB6Iy7fY2E5KO.jpeg",
                  jobTitle: "Frisör",
                  worksFor: {
                    "@type": "HairSalon",
                    name: "Affes Salong",
                  },
                },
              },
            ],
          },
        }),
      }}
    />
  )
}
