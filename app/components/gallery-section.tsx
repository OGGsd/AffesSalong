"use client"

import { useState } from "react"

interface GalleryImage {
  src: string
  alt: string
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [visibleImages, setVisibleImages] = useState(8)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const loadMoreImages = () => {
    setVisibleImages(prev => Math.min(prev + 8, images.length))
  }

  return (
    <section id="galleri" className="py-16 sm:py-20 px-4 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Utforska Vår Värld av Skönhet och Stil
          </h2>
          <div className="amber-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Bläddra genom vårt galleri för att se exempel på vårt arbete och hitta inspiration till din nästa look.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.slice(0, visibleImages).map((image, index) => (
            <div 
              key={index} 
              className="aspect-4-3 cursor-pointer overflow-hidden rounded-lg hover:opacity-90"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {visibleImages < images.length && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMoreImages}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded font-medium"
            >
              Visa Mer ({images.length - visibleImages} kvar)
            </button>
          </div>
        )}

        {/* Simple Lightbox */}
        {selectedImage && (
          <div 
            className="lightbox"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
            />
          </div>
        )}
      </div>
    </section>
  )
}