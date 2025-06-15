"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import Confetti from "react-confetti"

interface ConfettiButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  duration?: number
}

export default function ConfettiButton({ children, onClick, className = "", duration = 3000 }: ConfettiButtonProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleClick = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), duration)
    if (onClick) onClick()
  }

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      <Button onClick={handleClick} className={`bg-amber-600 hover:bg-amber-700 ${className}`}>
        {children}
      </Button>
    </>
  )
}
