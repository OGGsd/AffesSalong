"use client"
import Lottie from "lottie-react"
// Remove the direct import of the JSON file which might be causing issues
// and use a proper dynamic import or require

interface LottieLoadingProps {
  width?: number | string
  height?: number | string
  className?: string
}

export default function LottieLoading({ width = 100, height = 100, className = "" }: LottieLoadingProps) {
  // Use a simplified animation data object instead of importing the JSON file
  const loadingAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "Loading Animation",
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Circle",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0] },
              { t: 60, s: [360] },
            ],
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [80, 80] },
          },
        ],
      },
    ],
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie animationData={loadingAnimation} style={{ width, height }} loop={true} />
    </div>
  )
}
