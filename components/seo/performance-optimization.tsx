'use client'

import { useEffect } from 'react'
import { initWebVitals } from '@/lib/analytics'

export default function PerformanceOptimization() {
  useEffect(() => {
    // Initialize web vitals tracking
    initWebVitals()

    // Optimize images with Intersection Observer
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              imageObserver.unobserve(img)
            }
          }
        })
      })

      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img)
      })
    }

    // Prefetch critical pages during idle time
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const criticalPages = ['/om-oss', '/tjanster', '/kontakt']
        criticalPages.forEach((page) => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.href = page
          document.head.appendChild(link)
        })
      })
    }

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Delay non-critical scripts
      setTimeout(() => {
        // Load non-critical analytics or tracking scripts here
      }, 3000)
    }

    // Run optimization after page load
    if (document.readyState === 'complete') {
      optimizeThirdPartyScripts()
    } else {
      window.addEventListener('load', optimizeThirdPartyScripts)
    }
  }, [])

  return null
}