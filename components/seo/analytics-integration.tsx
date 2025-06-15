"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function AnalyticsIntegration() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Example: Google Analytics 4 page view tracking
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-XXXXXXXXXX", {
        page_path: url,
      })
    }

    // Example: Track Core Web Vitals
    if ("web-vitals" in window) {
      import("web-vitals").then(({ getCLS, getFID, getLCP }) => {
        getCLS((metric) => {
          console.log("CLS:", metric.value)
          if (typeof window.gtag === "function") {
            window.gtag("event", "web_vitals", {
              event_category: "Web Vitals",
              event_label: "CLS",
              value: Math.round(metric.value * 1000) / 1000,
              non_interaction: true,
            })
          }
        })
        getFID((metric) => {
          console.log("FID:", metric.value)
          if (typeof window.gtag === "function") {
            window.gtag("event", "web_vitals", {
              event_category: "Web Vitals",
              event_label: "FID",
              value: Math.round(metric.value),
              non_interaction: true,
            })
          }
        })
        getLCP((metric) => {
          console.log("LCP:", metric.value)
          if (typeof window.gtag === "function") {
            window.gtag("event", "web_vitals", {
              event_category: "Web Vitals",
              event_label: "LCP",
              value: Math.round(metric.value),
              non_interaction: true,
            })
          }
        })
      })
    }
  }, [pathname, searchParams])

  return null
}
