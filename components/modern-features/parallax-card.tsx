"use client"

import React from "react"
import { motion } from "framer-motion"

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  depth?: number
}

export default function ParallaxCard({ children, className = "", depth = 20 }: ParallaxCardProps) {
  const [rotateX, setRotateX] = React.useState(0)
  const [rotateY, setRotateY] = React.useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * depth * -1
    const rotateYValue = ((x - centerX) / centerX) * depth

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl bg-white shadow-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative z-10 h-full">{children}</div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/5 z-0"
        style={{
          transform: `translateZ(-10px)`,
          opacity: Math.abs(rotateX) / 20 + Math.abs(rotateY) / 20,
        }}
      />
    </motion.div>
  )
}
