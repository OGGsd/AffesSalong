"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, Users, Scissors, Image, Phone } from "lucide-react"

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setActiveSection("home")
    } else {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
        setActiveSection(sectionId)
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["om-oss", "team", "tjanster", "galleri", "kontakt"]
      const scrollPosition = window.scrollY + 100

      if (scrollPosition < 500) {
        setActiveSection("home")
        return
      }

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", icon: Home, label: "Hem" },
    { id: "om-oss", icon: Users, label: "Om Oss" },
    { id: "tjanster", icon: Scissors, label: "Tjänster" },
    { id: "galleri", icon: Image, label: "Galleri" },
    { id: "kontakt", icon: Phone, label: "Kontakt" },
  ]

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden"
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 ${
                isActive ? "text-amber-600" : "text-gray-500"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  color: isActive ? "#d97706" : "#6b7280"
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={20} />
              </motion.div>
              <span className={`text-xs mt-1 ${isActive ? "font-medium" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-0.5 left-1/2 w-1 h-1 bg-amber-600 rounded-full"
                  style={{ x: "-50%" }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}