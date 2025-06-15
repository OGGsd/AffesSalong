"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2, Maximize2, Minimize2 } from "lucide-react"
import { useSwipeable } from "react-swipeable"
import { useKeyPress } from "@/hooks/use-key-press"

interface ImageInfo {
  src: string
  alt: string
}

interface AdvancedImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  allImages: ImageInfo[]
  currentIndex: number
}

export default function AdvancedImageLightbox({
  isOpen,
  onClose,
  src,
  alt,
  allImages,
  currentIndex: initialIndex,
}: AdvancedImageLightboxProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const lightboxRef = useRef<HTMLDivElement>(null)

  // Reset state when the lightbox opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      setCurrentIndex(initialIndex)
      setZoomLevel(1)
      setPosition({ x: 0, y: 0 })
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, initialIndex])

  // Handle keyboard navigation
  useKeyPress("Escape", () => {
    if (isOpen) handleClose()
  })

  useKeyPress("ArrowLeft", () => {
    if (isOpen && !isDragging && zoomLevel === 1) navigatePrev()
  })

  useKeyPress("ArrowRight", () => {
    if (isOpen && !isDragging && zoomLevel === 1) navigateNext()
  })

  useKeyPress("+", () => {
    if (isOpen) handleZoomIn()
  })

  useKeyPress("-", () => {
    if (isOpen) handleZoomOut()
  })

  // Handle swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (zoomLevel === 1) navigateNext()
    },
    onSwipedRight: () => {
      if (zoomLevel === 1) navigatePrev()
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const navigateNext = () => {
    if (allImages.length <= 1) return
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
    resetZoom()
  }

  const navigatePrev = () => {
    if (allImages.length <= 1) return
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
    resetZoom()
  }

  const toggleFullscreen = () => {
    if (!lightboxRef.current) return

    if (!isFullscreen) {
      if (lightboxRef.current.requestFullscreen) {
        lightboxRef.current.requestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      setIsFullscreen(false)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1)
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return newZoom
    })
  }

  const resetZoom = () => {
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleShare = () => {
    const currentImage = allImages[currentIndex]

    if (navigator.share) {
      navigator.share({
        title: "Affes Salong",
        text: `Kolla in denna frisyr från Affes Salong: ${currentImage.alt}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Länk kopierad till urklipp!")
    }
  }

  const handleDownload = () => {
    const currentImage = allImages[currentIndex]

    // Create a temporary link element
    const link = document.createElement("a")
    link.href = currentImage.src
    link.download = `affes-salong-${currentImage.alt.toLowerCase().replace(/\s+/g, "-")}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen) return null

  const currentImage = allImages[currentIndex]

  return (
    <div
      ref={lightboxRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      {...swipeHandlers}
    >
      {/* Top toolbar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-white">
          <h3 className="text-lg font-medium">{currentImage.alt}</h3>
          {allImages.length > 1 && (
            <p className="text-sm text-gray-300">
              {currentIndex + 1} / {allImages.length}
            </p>
          )}
        </div>
        <button
          className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          aria-label="Stäng"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation buttons */}
      {allImages.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              navigatePrev()
            }}
            aria-label="Föregående bild"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              navigateNext()
            }}
            aria-label="Nästa bild"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Bottom toolbar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center z-10 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex space-x-2">
          <button
            className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              handleZoomIn()
            }}
            aria-label="Zooma in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              handleZoomOut()
            }}
            aria-label="Zooma ut"
            disabled={zoomLevel === 1}
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              handleShare()
            }}
            aria-label="Dela bild"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              handleDownload()
            }}
            aria-label="Ladda ner bild"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              toggleFullscreen()
            }}
            aria-label={isFullscreen ? "Avsluta helskärm" : "Visa i helskärm"}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Main image */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${isAnimating ? "scale-100" : "scale-95"} transition-transform duration-300`}
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            }}
          >
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className="h-auto max-h-[80vh] w-auto max-w-[80vw] object-contain rounded-lg"
              priority
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
