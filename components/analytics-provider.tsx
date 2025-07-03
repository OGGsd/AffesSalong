'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initWebVitals, trackPageView } from '@/lib/analytics'

export default function AnalyticsProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize web vitals on mount
  useEffect(() => {
    initWebVitals()
  }, [])

  // Track page views on route changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(url)
  }, [pathname, searchParams])

  return null
}