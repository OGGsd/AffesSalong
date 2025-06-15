import Script from "next/script"

export default function ProductSchema() {
  // Example products - you can replace with actual products
  const products = [
    {
      name: "American Crew Forming Cream",
      description: "Medium hold med naturlig glans för alla hårtyper.",
      image: "https://affessalong.axiestudio.se/images/products/american-crew-forming-cream.jpg",
      sku: "AC-FC-85",
      brand: {
        name: "American Crew",
      },
      offers: {
        price: "249",
        priceCurrency: "SEK",
        availability: "https://schema.org/InStock",
        url: "https://affessalong.axiestudio.se/products/american-crew-forming-cream",
      },
      aggregateRating: {
        ratingValue: "4.8",
        reviewCount: "24",
      },
    },
    {
      name: "TIGI Bed Head Manipulator",
      description: "Texturgivande stylingpasta för kreativa frisyrer.",
      image: "https://affessalong.axiestudio.se/images/products/tigi-bed-head-manipulator.jpg",
      sku: "TIGI-BHM-57",
      brand: {
        name: "TIGI",
      },
      offers: {
        price: "199",
        priceCurrency: "SEK",
        availability: "https://schema.org/InStock",
        url: "https://affessalong.axiestudio.se/products/tigi-bed-head-manipulator",
      },
      aggregateRating: {
        ratingValue: "4.6",
        reviewCount: "18",
      },
    },
  ]

  return (
    <>
      {products.map((product, index) => (
        <Script
          key={index}
          id={`product-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              ...product,
            }),
          }}
        />
      ))}
    </>
  )
}
