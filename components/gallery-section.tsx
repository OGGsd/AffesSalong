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
    <section id="galleri" className="py-16 sm:py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Utforska Vår Värld av Skönhet och Stil
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Bläddra genom vårt galleri för att se exempel på vårt arbete och hitta inspiration till din nästa look.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.slice(0, visibleImages).map((image, index) => (
            <div 
              key={index} 
              className="aspect-3-4 w-full cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg hover:opacity-90 transition-opacity">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {visibleImages < images.length && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              onClick={loadMoreImages}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded font-medium transition-colors"
            >
              Visa Mer ({images.length - visibleImages} kvar)
            </button>
          </div>
        )}

        {/* Simple Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-1000 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 w-12 h-12 rounded-full flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
              aria-label="Stäng"
            >
              ×
            </button>
            <div className="relative max-h-full max-w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-screen max-w-screen object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}