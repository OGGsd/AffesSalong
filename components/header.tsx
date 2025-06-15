"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDeviceDetection, useScrollPosition } from "./responsive-utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrolled = useScrollPosition(50)
  const deviceType = useDeviceDetection()
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(target) && !target.closest("button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  // Close menu on resize to desktop
  useEffect(() => {
    if (deviceType === "desktop") {
      setIsMenuOpen(false)
    }
  }, [deviceType])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (deviceType !== "desktop") {
      if (isMenuOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen, deviceType])

  // Smooth scroll function with improved mobile handling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)

    if (section) {
      // Close mobile menu first
      setIsMenuOpen(false)

      // Small delay to allow menu closing animation to complete
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Affes Salong"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 40px, 48px"
                  priority
                />
              </div>
              <span
                className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Affes Salong
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          <button
            onClick={(e) => scrollToSection(e, "om-oss")}
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled ? "text-gray-900 hover:text-amber-600" : "text-white hover:text-amber-300"
            }`}
          >
            Hos Oss
          </button>
          <button
            onClick={(e) => scrollToSection(e, "team")}
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled ? "text-gray-900 hover:text-amber-600" : "text-white hover:text-amber-300"
            }`}
          >
            Team
          </button>
          <button
            onClick={(e) => scrollToSection(e, "tjanster")}
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled ? "text-gray-900 hover:text-amber-600" : "text-white hover:text-amber-300"
            }`}
          >
            Tjänster
          </button>
          <button
            onClick={(e) => scrollToSection(e, "galleri")}
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled ? "text-gray-900 hover:text-amber-600" : "text-white hover:text-amber-300"
            }`}
          >
            Galleri
          </button>
          <button
            onClick={(e) => scrollToSection(e, "kontakt")}
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled ? "text-gray-900 hover:text-amber-600" : "text-white hover:text-amber-300"
            }`}
          >
            Kontakt
          </button>
          <Button
            onClick={(e) => scrollToSection(e, "tjanster")}
            size={deviceType === "tablet" ? "sm" : "default"}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Boka Tjänst
          </Button>
        </nav>

        {/* Mobile Call Button and Menu Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <Link
            href="tel:036-123786"
            className={`p-2 rounded-full ${
              scrolled ? "bg-amber-600 text-white" : "bg-white/20 backdrop-blur-sm text-white"
            }`}
            aria-label="Ring oss"
          >
            <Phone className="h-5 w-5" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${scrolled ? "text-gray-900" : "text-white"}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg fixed top-16 left-0 right-0 z-50 overflow-hidden"
            style={{ maxHeight: "calc(100vh - 4rem)", overflowY: "auto" }}
          >
            <nav className="flex flex-col space-y-0 py-2 px-4">
              <button
                onClick={(e) => scrollToSection(e, "om-oss")}
                className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 flex items-center justify-between"
              >
                Hos Oss
                <span className="text-amber-600">→</span>
              </button>
              <button
                onClick={(e) => scrollToSection(e, "team")}
                className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 flex items-center justify-between"
              >
                Team
                <span className="text-amber-600">→</span>
              </button>
              <button
                onClick={(e) => scrollToSection(e, "tjanster")}
                className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 flex items-center justify-between"
              >
                Tjänster
                <span className="text-amber-600">→</span>
              </button>
              <button
                onClick={(e) => scrollToSection(e, "galleri")}
                className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 flex items-center justify-between"
              >
                Galleri
                <span className="text-amber-600">→</span>
              </button>
              <button
                onClick={(e) => scrollToSection(e, "kontakt")}
                className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 flex items-center justify-between"
              >
                Kontakt
                <span className="text-amber-600">→</span>
              </button>

              {/* Contact Info in Mobile Menu */}
              <div className="py-4 space-y-3">
                <h3 className="font-medium text-gray-900">Kontakta oss</h3>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-amber-600" />
                  <Link href="tel:036-123786" className="hover:text-amber-600">
                    036-123786
                  </Link>
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    onClick={(e) => scrollToSection(e, "tjanster")}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                  >
                    Boka Tjänst
                  </Button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
