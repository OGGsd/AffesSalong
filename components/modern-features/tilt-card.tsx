"use client"

import type React from "react"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  perspective?: number
  transitionSpeed?: number
  glareOpacity?: number
  glareColor?: string
  disableGlare?: boolean
}

export default function TiltCard({
  children,
  className,
  maxTilt = 10,
  scale = 1.05,
  perspective = 1000,
  transitionSpeed = 400,
  glareOpacity = 0.2,
  glareColor = "255, 255, 255",
  disableGlare = false,
}: TiltCardProps) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${transitionSpeed}ms ease-out`,
  })

  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    backgroundImage: `linear-gradient(0deg, rgba(${glareColor}, 0) 0%, rgba(${glareColor}, ${glareOpacity}) 100%)`,
    transform: "rotate(180deg)",
    opacity: "0",
    transition: `opacity ${transitionSpeed}ms ease-out`,
  })

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * maxTilt * -1
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: `transform ${transitionSpeed}ms ease-out`,
    })

    if (!disableGlare) {
      // Calculate glare position
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100

      setGlareStyle({
        ...glareStyle,
        backgroundImage: `linear-gradient(${Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90}deg, rgba(${glareColor}, 0) 0%, rgba(${glareColor}, ${glareOpacity}) 80%)`,
        transform: `translate(${glareX}%, ${glareY}%)`,
        opacity: "1",
      })
    }
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${transitionSpeed}ms ease-out`,
    })

    if (!disableGlare) {
      setGlareStyle({
        ...glareStyle,
        opacity: "0",
      })
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {!disableGlare && <div style={glareStyle} />}
      {children}
    </div>
  )
}
