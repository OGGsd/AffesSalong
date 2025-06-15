"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useSwipeable } from "react-swipeable"
import { useKeyPress } from "@/hooks/use-key-press"

interface ImageInfo {
  src: string
  alt: string
}

interface PremiumLightboxProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  allImages: ImageInfo[]
  currentIndex: number
}

export default function PremiumLightbox({
  isOpen,
  onClose,
  src,
  alt,
  allImages,
  currentIndex: initialIndex,
}: PremiumLightboxProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Reset state when the lightbox opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      setCurrentIndex(initialIndex)
      setZoomLevel(1)
      setPosition({ x: 0, y: 0 })
      document.body.style.overflow = "hidden"

      // Auto-hide controls after 3 seconds
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    } else {
      document.body.style.overflow = "auto"
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }

    return () => {
      document.body.style.overflow = "auto"
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isOpen, initialIndex])

  // Handle keyboard navigation
  useKeyPress("Escape", () => {
    if (isOpen) handleClose()
  })

  useKeyPress("ArrowLeft", () => {
    if (isOpen && allImages.length > 1) navigatePrev()
  })

  useKeyPress("ArrowRight", () => {
    if (isOpen && allImages.length > 1) navigateNext()
  })

  // Handle swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (allImages.length > 1) navigateNext()
    },
    onSwipedRight: () => {
      if (allImages.length > 1) navigatePrev()
    },
    onSwipedDown: () => {
      if (zoomLevel === 1) handleClose()
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
    } else {
      // Double click to zoom
      if (e.detail === 2) {
        handleZoomIn()
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }

    // Show controls on mouse move
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  if (!isOpen) return null

  const currentImage = allImages[currentIndex]

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      onMouseMove={handleMouseMove}
      {...swipeHandlers}
    >
      {/* Close button - only visible when controls are shown */}
      <AnimatePresence>
        {showControls && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              handleClose()
            }}
            aria-label="Stäng"
          >
            <X className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation buttons - only visible when controls are shown and there are multiple images */}
      <AnimatePresence>
        {showControls && allImages.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation()
                navigatePrev()
              }}
              aria-label="Föregående bild"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation()
                navigateNext()
              }}
              aria-label="Nästa bild"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Main image */}
      <div
        ref={imageRef}
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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

      {/* Image caption and counter - only visible when controls are shown */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-6 left-0 right-0 text-center text-white"
          >
            <div className="bg-black/50 backdrop-blur-sm inline-block rounded-full px-4 py-2">
              <p className="text-lg font-medium">{currentImage.alt}</p>
              {allImages.length > 1 && (
                <p className="text-sm text-gray-300">
                  {currentIndex + 1} / {allImages.length}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
