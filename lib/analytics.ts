import * as webVitals from 'web-vitals'

// Types for analytics events
interface AnalyticsEvent {
  name: string
  value: number
  id: string
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

// Analytics configuration
const ANALYTICS_CONFIG = {
  enabled: typeof window !== 'undefined' && process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
  gtag: typeof window !== 'undefined' && 'gtag' in window,
}

// Send metric to analytics service
function sendToAnalytics(metric: WebVitalMetric) {
  if (!ANALYTICS_CONFIG.enabled) {
    if (ANALYTICS_CONFIG.debug) {
      console.log('Web Vital:', metric)
    }
    return
  }

  // Send to Google Analytics 4
  if (ANALYTICS_CONFIG.gtag && typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta,
      },
    })
  }

  // Send to custom analytics endpoint (if needed)
  if (typeof fetch !== 'undefined') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'web-vital',
        metric,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch((error) => {
      if (ANALYTICS_CONFIG.debug) {
        console.error('Failed to send analytics:', error)
      }
    })
  }
}

// Initialize web vitals tracking
export function initWebVitals() {
  if (typeof window === 'undefined') return

  try {
    webVitals.onCLS(sendToAnalytics)
    webVitals.onFID(sendToAnalytics)
    webVitals.onFCP(sendToAnalytics)
    webVitals.onLCP(sendToAnalytics)
    webVitals.onTTFB(sendToAnalytics)
  } catch (error) {
    if (ANALYTICS_CONFIG.debug) {
      console.error('Web Vitals initialization failed:', error)
    }
  }
}

// Track page views
export function trackPageView(url: string) {
  if (!ANALYTICS_CONFIG.enabled) return

  if (ANALYTICS_CONFIG.gtag && typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    })
  }
}

// Track custom events
export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (!ANALYTICS_CONFIG.enabled) return

  if (ANALYTICS_CONFIG.gtag && typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters)
  }
}

// Declare global gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}