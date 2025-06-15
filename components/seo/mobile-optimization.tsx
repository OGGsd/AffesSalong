"use client"

import { useEffect } from "react"

export default function MobileOptimization() {
  useEffect(() => {
    // Check if the device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      // Optimize touch targets
      const touchTargets = document.querySelectorAll('a, button, [role="button"]')
      touchTargets.forEach((target) => {
        const rect = target.getBoundingClientRect()
        if (rect.width < 48 || rect.height < 48) {
          // Log small touch targets for debugging
          console.log("Small touch target:", target)
        }
      })

      // Optimize viewport
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=5")
      }

      // Add touch feedback
      document.addEventListener("touchstart", () => {}, { passive: true })
    }
  }, [])

  return null
}
