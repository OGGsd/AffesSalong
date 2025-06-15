"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  color?: "amber" | "blue" | "green" | "red"
}

export default function AnimatedButton({ children, onClick, className = "", color = "amber" }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    amber: "bg-amber-600 hover:bg-amber-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  }

  return (
    <motion.button
      className={`px-6 py-3 rounded-lg text-white font-medium ${colorClasses[color]} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.button>
  )
}
