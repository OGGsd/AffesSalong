"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const loadMoreImages = () => {
    setVisibleImages(prev => Math.min(prev + 8, images.length))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        damping: 20
      }
    }
  }

  return (
    <section id="galleri" className="py-20 md:py-28 px-6 md:px-8 lg:px-12 bg-white" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Utforska Vår Värld av Skönhet och Stil
          </motion.h2>
          <motion.div 
            className="w-24 h-1.5 bg-amber-600 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Bläddra genom vårt galleri för att se exempel på vårt arbete och hitta inspiration till din nästa look.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {images.slice(0, visibleImages).map((image, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="aspect-3-4 w-full cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <motion.div 
                className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
                }}
                transition={{ duration: 0.4, type: "spring", damping: 15 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {visibleImages < images.length && (
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.button
              onClick={loadMoreImages}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px -5px rgba(217, 119, 6, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Visa Mer ({images.length - visibleImages} kvar)
            </motion.button>
          </motion.div>
        )}

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-6 right-6 text-white text-3xl bg-black/50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-colors z-10"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              <motion.div 
                className="relative max-h-full max-w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-screen max-w-screen object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}