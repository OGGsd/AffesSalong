"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import GalleryImage from "@/components/gallery-image"
import { ChevronUp, Camera, ChevronDown } from "lucide-react"
import { useInView } from "framer-motion"
import { useDeviceDetection } from "./responsive-utils"

interface IGalleryImage {
  src: string
  alt: string
}

interface GallerySectionProps {
  images: IGalleryImage[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  const deviceType = useDeviceDetection()
  const [isLoading, setIsLoading] = useState(true)

  // Adjust initial visible images based on device type
  const getInitialVisibleCount = () => {
    if (deviceType === "mobile") return 4
    if (deviceType === "tablet") return 6
    return 8
  }

  const [visibleImages, setVisibleImages] = useState<number>(getInitialVisibleCount())
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showLoadMoreAnimation, setShowLoadMoreAnimation] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isLoadMoreVisible = useInView(loadMoreRef, { once: false })

  // Update visible images count when device type changes
  useEffect(() => {
    setVisibleImages(getInitialVisibleCount())
  }, [deviceType])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const scrollPosition = window.scrollY + 100

      setShowScrollTop(scrollPosition > sectionTop + 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load more images with animation
  const loadMoreImages = () => {
    setShowLoadMoreAnimation(true)

    // Delay the actual loading to allow for animation
    setTimeout(() => {
      // Show more images based on device type
      const increment = deviceType === "mobile" ? 4 : deviceType === "tablet" ? 6 : 8
      const newVisibleCount = Math.min(visibleImages + increment, images.length)
      setVisibleImages(newVisibleCount)
      setShowLoadMoreAnimation(false)
    }, 600)
  }

  // Scroll to top of gallery section
  const scrollToTop = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Check if all images are loaded
  const allImagesLoaded = visibleImages >= images.length
  const remainingImages = images.length - visibleImages

  // Get grid columns based on device type
  const getGridColumns = () => {
    if (deviceType === "mobile") return "grid-cols-1 sm:grid-cols-2"
    if (deviceType === "tablet") return "grid-cols-2 md:grid-cols-3"
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section id="galleri" className="py-16 sm:py-20 px-4 md:px-6 lg:px-8 bg-white overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        <motion.div initial="hidden" animate="visible" variants={headerVariants} className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-3">
            <div className="bg-amber-500 p-3 rounded-full">
              <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Utforska Vår Värld av Skönhet och Stil
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Bläddra genom vårt galleri för att se exempel på vårt arbete och hitta inspiration till din nästa look.
          </p>
        </motion.div>

        {/* Gallery with Loading State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Skeleton Loading UI
            <div className={`grid ${getGridColumns()} gap-4`}>
              {Array.from({ length: getInitialVisibleCount() }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg overflow-hidden animate-pulse aspect-[3/4] w-full"
                ></div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className={`grid ${getGridColumns()} gap-4`}
            >
              {/* Initial images */}
              {images.slice(0, visibleImages).map((image, index) => (
                <div key={index} className="aspect-[3/4] w-full">
                  <GalleryImage src={image.src} alt={image.alt} allImages={images} currentIndex={index} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Visa mer" Button */}
        {!isLoading && !allImagesLoaded && (
          <div className="mt-8 sm:mt-12 flex justify-center" ref={loadMoreRef}>
            <Button
              onClick={loadMoreImages}
              className="bg-amber-600 hover:bg-amber-700 px-6 sm:px-10 py-3 sm:py-6 text-base sm:text-lg font-medium shadow-lg relative overflow-hidden"
              disabled={showLoadMoreAnimation}
            >
              {showLoadMoreAnimation ? (
                <span className="flex items-center">
                  <span className="mr-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Laddar...
                </span>
              ) : (
                <span className="flex items-center">
                  Visa Mer
                  <ChevronDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="ml-2 bg-amber-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full">
                    {remainingImages}
                  </span>
                </span>
              )}
            </Button>
          </div>
        )}

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 bg-amber-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-amber-700 z-40"
              onClick={scrollToTop}
              aria-label="Scrolla till toppen"
            >
              <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
