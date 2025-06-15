"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { Camera, Calendar } from "lucide-react"
import { useDeviceDetection, useIsLandscape } from "./responsive-utils"

export default function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const deviceType = useDeviceDetection()
  const isLandscape = useIsLandscape()

  // Adjust parallax effect based on device type
  const parallaxStrength = deviceType === "mobile" ? 50 : 150
  const y = useTransform(scrollY, [0, 500], [0, parallaxStrength])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, deviceType === "mobile" ? 1.05 : 1.1])

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Adjust hero height based on device and orientation
  const getHeroHeight = () => {
    if (deviceType === "mobile") {
      return isLandscape ? "h-screen" : "h-[80vh]"
    } else if (deviceType === "tablet") {
      return "h-[85vh]"
    } else {
      return "h-[85vh]"
    }
  }

  const heroHeight = getHeroHeight()

  if (!isMounted) {
    return (
      <section className={`relative ${heroHeight} w-full overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
        <Image
          src="/images/hero-background.jpeg"
          alt="Affes Salong"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-3xl sm:text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Affes Salong – Est. 1991
          </h1>
          <p className="mb-8 max-w-2xl text-lg sm:text-xl md:text-2xl">Din Premium Salon för Skräddarsydda Lösningar</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size={deviceType === "mobile" ? "default" : "lg"}
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => scrollToSection("tjanster")}
            >
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Boka Tjänst
            </Button>
            <Button
              size={deviceType === "mobile" ? "default" : "lg"}
              className="bg-white text-amber-600 hover:bg-gray-100"
              onClick={() => scrollToSection("galleri")}
            >
              <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Se Vår Galleri
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className={`relative ${heroHeight} w-full overflow-hidden`}>
      <motion.div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" style={{ opacity }} />
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src="/images/hero-background.jpeg"
          alt="Affes Salong"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </motion.div>
      <motion.div
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white"
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-2 tracking-wider text-amber-300 font-medium text-sm sm:text-base"
        >
          Premium Barber Shop
        </motion.div>
        <motion.h1
          className="mb-4 text-3xl sm:text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Affes Salong – Est. 1991
        </motion.h1>
        <motion.p
          className="mb-8 sm:mb-10 max-w-2xl text-lg sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Din Premium Salon för Skräddarsydda Lösningar
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            size={deviceType === "mobile" ? "default" : "lg"}
            className={`bg-amber-600 hover:bg-amber-700 transition-all duration-300 ${
              deviceType === "mobile" ? "px-4 py-2" : "px-8 py-6 text-lg"
            }`}
            onClick={() => scrollToSection("tjanster")}
          >
            <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Boka Tjänst
          </Button>
          <Button
            size={deviceType === "mobile" ? "default" : "lg"}
            className={`bg-white text-amber-600 hover:bg-gray-100 transition-all duration-300 ${
              deviceType === "mobile" ? "px-4 py-2" : "px-8 py-6 text-lg"
            }`}
            onClick={() => scrollToSection("galleri")}
          >
            <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Se Vår Galleri
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
