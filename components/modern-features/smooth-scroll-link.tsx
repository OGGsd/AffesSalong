"use client"

import type React from "react"

import { forwardRef } from "react"
import Link from "next/link"
import type { LinkProps } from "next/link"

interface SmoothScrollLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  duration?: number
  offset?: number
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const SmoothScrollLink = forwardRef<HTMLAnchorElement, SmoothScrollLinkProps>(
  ({ children, href, className = "", duration = 800, offset = 0, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Only handle anchor links
      if (typeof href === "string" && href.startsWith("#")) {
        e.preventDefault()

        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset
          const startPosition = window.pageYOffset
          const distance = targetPosition - startPosition

          let startTime: number | null = null

          const animateScroll = (currentTime: number) => {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)

            // Easing function: easeInOutQuad
            const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

            window.scrollTo(0, startPosition + distance * easeProgress)

            if (timeElapsed < duration) {
              requestAnimationFrame(animateScroll)
            }
          }

          requestAnimationFrame(animateScroll)
        }
      }

      if (onClick) onClick(e)
    }

    return (
      <Link href={href} className={className} onClick={handleClick} ref={ref} {...props}>
        {children}
      </Link>
    )
  },
)

SmoothScrollLink.displayName = "SmoothScrollLink"

export default SmoothScrollLink
