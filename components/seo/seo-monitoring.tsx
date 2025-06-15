"use client"

import { useEffect } from "react"

export default function SEOMonitoring() {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    // Track page views for analytics
    const trackPageView = () => {
      // This would normally send data to your analytics platform
      // Example: Google Analytics, Plausible, Fathom, etc.
      console.log("Page view tracked:", window.location.pathname)
    }

    // Track initial page load
    trackPageView()

    // Track navigation events (for SPA navigation)
    const handleRouteChange = () => {
      trackPageView()
    }

    // Listen for route changes in Next.js
    window.addEventListener("popstate", handleRouteChange)

    // Monitor for Core Web Vitals
    if (typeof PerformanceObserver === "function") {
      try {
        // Report Web Vitals to analytics
        const reportWebVital = ({ name, value }) => {
          // This would normally send data to your analytics platform
          console.log(`Web Vital: ${name}`, value)
        }

        // Create observers for each vital
        ;["largest-contentful-paint", "first-input", "layout-shift"].forEach((type) => {
          if (PerformanceObserver.supportedEntryTypes?.includes(type)) {
            new PerformanceObserver((entryList) => {
              entryList.getEntries().forEach((entry) => {
                // Process and report the entry
                const metric = {
                  name: type,
                  value: type === "layout-shift" ? entry.value : entry.startTime,
                }
                reportWebVital(metric)
              })
            }).observe({ type, buffered: true })
          }
        })
      } catch (e) {
        console.error("Error setting up performance monitoring:", e)
      }
    }

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return null
}
