"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends ButtonProps {
  hoverEffect?: "scale" | "glow" | "slide" | "none"
  children: React.ReactNode
}

export default function EnhancedButton({ children, className, hoverEffect = "scale", ...props }: EnhancedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getHoverClasses = () => {
    switch (hoverEffect) {
      case "scale":
        return "transition-transform hover:scale-105 active:scale-95"
      case "glow":
        return "transition-shadow hover:shadow-lg hover:shadow-amber-200/50"
      case "slide":
        return "group relative overflow-hidden"
      case "none":
        return ""
      default:
        return "transition-transform hover:scale-105"
    }
  }

  return (
    <Button
      className={cn(getHoverClasses(), className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {hoverEffect === "slide" && (
        <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      )}
      <span className={hoverEffect === "slide" ? "relative z-10" : ""}>{children}</span>
    </Button>
  )
}
