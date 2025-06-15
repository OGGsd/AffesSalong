import Script from "next/script"

interface GalleryImage {
  src: string
  alt: string
}

interface GallerySectionSEOProps {
  images: GalleryImage[]
}

export default function GallerySectionSEO({ images }: GallerySectionSEOProps) {
  return (
    <Script
      id="gallery-section-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://affessalong.axiestudio.se/#galleri",
          url: "https://affessalong.axiestudio.se/#galleri",
          name: "Galleri - Affes Salong",
          description:
            "Bläddra genom vårt galleri för att se exempel på vårt arbete och hitta inspiration till din nästa look.",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://affessalong.axiestudio.se",
            name: "Affes Salong",
            url: "https://affessalong.axiestudio.se",
          },
          mainEntity: {
            "@type": "ImageGallery",
            image: images.map((image) => ({
              "@type": "ImageObject",
              contentUrl: `https://affessalong.axiestudio.se${image.src}`,
              name: image.alt,
              description: image.alt,
              representativeOfPage: false,
            })),
          },
        }),
      }}
    />
  )
}
