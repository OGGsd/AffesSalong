"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import BookingPopup from "./booking-popup"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleBookingClick = () => {
    setIsBookingOpen(true)
    setIsMenuOpen(false)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative h-10 w-10">
              <img
                src="/images/logo.png"
                alt="Affes Salong"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">Affes Salong</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {["om-oss", "team", "tjanster", "galleri", "kontakt"].map((section, index) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {section === "om-oss" && "Hos Oss"}
                {section === "team" && "Team"}
                {section === "tjanster" && "Tjänster"}
                {section === "galleri" && "Galleri"}
                {section === "kontakt" && "Kontakt"}
              </motion.button>
            ))}
            <motion.button
              onClick={handleBookingClick}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Boka Tjänst
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden"
            >
              <nav className="flex flex-col py-4 px-4">
                {[
                  { id: "om-oss", label: "Hos Oss" },
                  { id: "team", label: "Team" },
                  { id: "tjanster", label: "Tjänster" },
                  { id: "galleri", label: "Galleri" },
                  { id: "kontakt", label: "Kontakt" }
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-base font-medium hover:text-amber-600 py-3 border-b border-gray-100 text-left transition-colors"
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  className="py-4"
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={handleBookingClick}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Boka Tjänst
                  </motion.button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Booking Popup */}
      <BookingPopup
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  )
}