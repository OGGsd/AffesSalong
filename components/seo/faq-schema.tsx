import Script from "next/script"

export default function FAQSchema() {
  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Behöver jag boka tid i förväg hos Affes Salong?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ja, vi rekommenderar att du bokar tid i förväg för att säkerställa att vi kan ta emot dig. Du kan enkelt boka online via vår hemsida eller ringa oss på 036-123786.",
              },
            },
            {
              "@type": "Question",
              name: "Vilka tjänster erbjuder Affes Salong?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Vi erbjuder ett brett utbud av tjänster inklusive herrklippning, skäggtrimning, skäggrakning, barnklippning, och specialerbjudanden för studenter. Se vår tjänstesida för fullständig information och priser.",
              },
            },
            {
              "@type": "Question",
              name: "Var ligger Affes Salong i Jönköping?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Affes Salong ligger på Barnarpsgatan 31, 55316, Jönköping. Vi är centralt belägna och lätta att hitta.",
              },
            },
            {
              "@type": "Question",
              name: "Vilka är öppettiderna för Affes Salong?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Vi har öppet måndag till fredag 09:00-18:00 och lördagar 10:00-14:00. Söndagar har vi stängt.",
              },
            },
            {
              "@type": "Question",
              name: "Erbjuder Affes Salong studentrabatt?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ja, vi erbjuder specialpriser för studenter på flera av våra tjänster, inklusive klippning och skäggtrimning. Ta med giltig studentlegitimation för att få rabatten.",
              },
            },
          ],
        }),
      }}
    />
  )
}
