"use client"

import { useState, useEffect } from "react"

export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      // More comprehensive mobile detection
      const isMobileByWidth = window.innerWidth < 768
      const isMobileByAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

      // Consider a device mobile if it meets any of these criteria
      setIsMobile(isMobileByWidth || isMobileByAgent || isTouchDevice)
    }

    // Initial check
    checkMobile()

    // Add event listeners for resize and orientation change
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", checkMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  return isMobile
}
