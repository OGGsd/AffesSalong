"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
}

export default function ImageLightbox({ isOpen, onClose, src, alt }: ImageLightboxProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <button
        className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        aria-label="Stäng"
      >
        <X className="h-6 w-6" />
      </button>
      <div
        className={`relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg transition-transform duration-300 ${
          isAnimating ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={1200}
          height={800}
          className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
          priority
        />
      </div>
    </div>
  )
}
