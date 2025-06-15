"use client"

import type React from "react"

import { useState, useEffect } from "react"

// Breakpoint values that match our Tailwind configuration
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export type DeviceType = "mobile" | "tablet" | "desktop"

/**
 * Custom hook to detect current device type based on screen width
 * @returns Current device type: 'mobile', 'tablet', or 'desktop'
 */
export function useDeviceDetection(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < breakpoints.md) {
        setDeviceType("mobile")
      } else if (width >= breakpoints.md && width < breakpoints.lg) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }
    }

    // Set initial device type
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return deviceType
}

/**
 * Custom hook to detect if the device is in landscape orientation
 * @returns Boolean indicating if the device is in landscape orientation
 */
export function useIsLandscape(): boolean {
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    // Set initial orientation
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isLandscape
}

/**
 * Custom hook to detect if the page has been scrolled
 * @param threshold Scroll threshold in pixels
 * @returns Boolean indicating if the page has been scrolled past the threshold
 */
export function useScrollPosition(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    // Set initial scroll position
    handleScroll()

    // Add event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return scrolled
}

/**
 * Component to render content conditionally based on device type
 */
export function ResponsiveRenderer({
  mobile,
  tablet,
  desktop,
}: {
  mobile?: React.ReactNode
  tablet?: React.ReactNode
  desktop?: React.ReactNode
}) {
  const deviceType = useDeviceDetection()

  if (deviceType === "mobile" && mobile) {
    return <>{mobile}</>
  } else if (deviceType === "tablet" && tablet) {
    return <>{tablet}</>
  } else if (deviceType === "desktop" && desktop) {
    return <>{desktop}</>
  }

  // Fallback rendering
  if (deviceType === "mobile") {
    return tablet ? <>{tablet}</> : desktop ? <>{desktop}</> : null
  } else if (deviceType === "tablet") {
    return desktop ? <>{desktop}</> : mobile ? <>{mobile}</> : null
  } else {
    return mobile ? <>{mobile}</> : tablet ? <>{tablet}</> : null
  }
}
