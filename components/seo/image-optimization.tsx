"use client"

import { useEffect } from "react"

export default function ImageOptimization() {
  useEffect(() => {
    // Lazy load images that are not in the viewport
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]')
      images.forEach((img) => {
        img.setAttribute("loading", "lazy")
      })
    } else {
      // Fallback for browsers that don't support lazy loading
      // You could import a lazy loading library here
    }

    // Add image error handling
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.addEventListener("error", () => {
        img.style.display = "none"
        // Or replace with a fallback image
        // img.src = '/images/fallback.jpg'
      })
    })

    // Add WebP detection
    const supportsWebP = () => {
      const elem = document.createElement("canvas")
      if (elem.getContext && elem.getContext("2d")) {
        return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0
      }
      return false
    }

    if (supportsWebP()) {
      document.documentElement.classList.add("webp")
    } else {
      document.documentElement.classList.add("no-webp")
    }
  }, [])

  return null
}
