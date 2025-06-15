"use client"

import { useEffect } from "react"

export default function PerformanceOptimization() {
  useEffect(() => {
    // Only run in browser environment with safe feature detection
    if (typeof window === "undefined") return

    // Safely measure Core Web Vitals
    if (typeof PerformanceObserver === "function") {
      try {
        // Largest Contentful Paint
        if (PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")) {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            if (entries.length > 0) {
              const lastEntry = entries[entries.length - 1]
              // Send to analytics or log
              console.log("LCP:", lastEntry.startTime)
            }
          })
          lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })
        }

        // First Input Delay
        if (PerformanceObserver.supportedEntryTypes?.includes("first-input")) {
          const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            if (entries.length > 0) {
              const firstEntry = entries[0]
              // Send to analytics or log
              console.log("FID:", firstEntry.processingStart - firstEntry.startTime)
            }
          })
          fidObserver.observe({ type: "first-input", buffered: true })
        }

        // Cumulative Layout Shift
        if (PerformanceObserver.supportedEntryTypes?.includes("layout-shift")) {
          let clsValue = 0
          const clsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
              }
            }
            // Send to analytics or log
            console.log("CLS:", clsValue)
          })
          clsObserver.observe({ type: "layout-shift", buffered: true })
        }
      } catch (error) {
        // Silently handle errors
        console.error("Performance measurement error:", error)
      }
    }

    // Safely load non-critical resources
    if (typeof requestIdleCallback === "function") {
      try {
        requestIdleCallback(() => {
          // Example: Load analytics or other non-critical scripts
          // This is just a placeholder - implement as needed
          console.log("Loading non-critical resources during idle time")
        })
      } catch (error) {
        // Silently handle errors
        console.error("requestIdleCallback error:", error)
      }
    }

    // No cleanup needed for observers as they're scoped to this effect
  }, [])

  return null
}
