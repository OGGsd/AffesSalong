"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import PremiumLightbox from "./premium-lightbox"

interface GalleryImageProps {
  src: string
  alt: string
  allImages?: { src: string; alt: string }[]
  currentIndex?: number
}

export default function GalleryImage({ src, alt, allImages = [], currentIndex = 0 }: GalleryImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-lg cursor-pointer transform-gpu"
        variants={imageVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        whileHover="hover"
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* Loading placeholder */}
        {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />}

        <div className={`h-full w-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            className="object-cover rounded-lg"
            onLoad={() => setIsLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={currentIndex < 4} // Prioritize loading first 4 images
          />
        </div>

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-lg" />
      </motion.div>

      <PremiumLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={src}
        alt={alt}
        allImages={allImages.length > 0 ? allImages : [{ src, alt }]}
        currentIndex={currentIndex}
      />
    </>
  )
}
