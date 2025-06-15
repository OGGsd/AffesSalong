"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, ChevronDown, ChevronUp, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-900 px-4 py-8 sm:py-12 text-white md:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Logo and Contact Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Affes Salong"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 48px, 64px"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg sm:text-xl font-bold">Affes Salong</h3>
              <p className="text-gray-400 text-sm sm:text-base">Premium barber shop sedan 1991</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="tel:036-123786"
              className="bg-gradient-to-tr from-amber-600 to-amber-400 p-2 sm:p-3 rounded-full hover:scale-110 transition-transform duration-300"
            >
              <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <a
              href="https://www.instagram.com/affessalong.jonkoping/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-purple-600 to-pink-400 p-2 sm:p-3 rounded-full hover:scale-110 transition-transform duration-300"
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href="https://www.tiktok.com/@affes.salong"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-black to-gray-700 p-2 sm:p-3 rounded-full hover:scale-110 transition-transform duration-300"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Accordion Sections */}
        <div className="md:hidden space-y-4 mb-8">
          {/* About Us Section */}
          <div className="border-b border-gray-800 pb-4">
            <button
              onClick={() => toggleSection("about")}
              className="flex justify-between items-center w-full py-2 text-left"
            >
              <h3 className="text-base font-semibold">Om Oss</h3>
              {expandedSection === "about" ? (
                <ChevronUp className="h-5 w-5 text-amber-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-amber-400" />
              )}
            </button>
            <AnimatePresence>
              {expandedSection === "about" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-400 text-sm pt-2">
                    Premium hårsalong sedan 1991. Vi erbjuder högkvalitativa behandlingar och personlig service för att
                    göra din upplevelse hos oss unik och exceptionell.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Links Section */}
          <div className="border-b border-gray-800 pb-4">
            <button
              onClick={() => toggleSection("links")}
              className="flex justify-between items-center w-full py-2 text-left"
            >
              <h3 className="text-base font-semibold">Snabblänkar</h3>
              {expandedSection === "links" ? (
                <ChevronUp className="h-5 w-5 text-amber-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-amber-400" />
              )}
            </button>
            <AnimatePresence>
              {expandedSection === "links" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => scrollToSection("om-oss")}
                      className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                    >
                      Hos Oss
                    </button>
                    <button
                      onClick={() => scrollToSection("team")}
                      className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                    >
                      Team
                    </button>
                    <button
                      onClick={() => scrollToSection("tjanster")}
                      className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                    >
                      Tjänster
                    </button>
                    <button
                      onClick={() => scrollToSection("galleri")}
                      className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                    >
                      Galleri
                    </button>
                    <button
                      onClick={() => scrollToSection("kontakt")}
                      className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                    >
                      Kontakt
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Section */}
          <div className="border-b border-gray-800 pb-4">
            <button
              onClick={() => toggleSection("contact")}
              className="flex justify-between items-center w-full py-2 text-left"
            >
              <h3 className="text-base font-semibold">Kontakt</h3>
              {expandedSection === "contact" ? (
                <ChevronUp className="h-5 w-5 text-amber-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-amber-400" />
              )}
            </button>
            <AnimatePresence>
              {expandedSection === "contact" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <address className="not-italic text-gray-400 text-sm pt-2 space-y-3">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-amber-400" />
                      <span>036-123786</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-amber-400" />
                      <span>affessalong@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-amber-400" />
                      <span>Barnarpsgatan 31, 55316, Jönköping</span>
                    </div>
                    <div className="flex items-center">
                      <Instagram className="mr-2 h-4 w-4 text-amber-400" />
                      <a
                        href="https://www.instagram.com/affessalong.jonkoping/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-300 transition-colors"
                      >
                        @affessalong.jonkoping
                      </a>
                    </div>
                  </address>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Three Column Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold border-b border-gray-800 pb-2">Om Oss</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Premium hårsalong sedan 1991. Vi erbjuder högkvalitativa behandlingar och personlig service för att göra
              din upplevelse hos oss unik och exceptionell.
            </p>
          </div>
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold border-b border-gray-800 pb-2">
              Snabblänkar
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <button
                  onClick={() => scrollToSection("om-oss")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm sm:text-base text-left"
                >
                  Hos Oss
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm sm:text-base text-left"
                >
                  Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tjanster")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm sm:text-base text-left"
                >
                  Tjänster
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("galleri")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm sm:text-base text-left"
                >
                  Galleri
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm sm:text-base text-left"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold border-b border-gray-800 pb-2">Kontakt</h3>
            <address className="not-italic text-gray-400 text-sm sm:text-base">
              <div className="mb-3 flex items-center">
                <Phone className="mr-2 h-4 w-4 text-amber-400" />
                <span>036-123786</span>
              </div>
              <div className="mb-3 flex items-center">
                <Mail className="mr-2 h-4 w-4 text-amber-400" />
                <span>affessalong@gmail.com</span>
              </div>
              <div className="mb-3 flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-amber-400" />
                <span>Barnarpsgatan 31, 55316, Jönköping</span>
              </div>
              <div className="mb-3 flex items-center">
                <Instagram className="mr-2 h-4 w-4 text-amber-400" />
                <a
                  href="https://www.instagram.com/affessalong.jonkoping/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  @affessalong.jonkoping
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* PWA Install Button and Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 rounded-lg shadow-lg mb-4 max-w-md w-full">
              <h4 className="text-white font-bold text-lg mb-2 text-center">Affes Salong App</h4>
              <p className="text-white/90 text-sm mb-4 text-center">
                Få snabbare åtkomst, offline-funktionalitet och enklare bokning med vår app!
              </p>
              <div className="flex justify-center">
                {/* Direct button implementation instead of component for clarity */}
                <Button
                  onClick={() => {
                    // Trigger the beforeinstallprompt event manually if available
                    if (window.deferredPrompt) {
                      window.deferredPrompt.prompt()
                      window.deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === "accepted") {
                          console.log("User accepted the install prompt")
                        } else {
                          console.log("User dismissed the install prompt")
                        }
                        window.deferredPrompt = null
                      })
                    } else {
                      // For iOS devices
                      if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
                        alert(
                          "För att installera appen på iOS: Tryck på 'Dela' ikonen och välj 'Lägg till på hemskärmen'",
                        )
                      } else {
                        alert(
                          "För att installera appen: Öppna webbläsarens meny och välj 'Installera app' eller 'Lägg till på hemskärmen'",
                        )
                      }
                    }
                  }}
                  className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <Download className="h-5 w-5" />
                  Ladda Ner Appen
                </Button>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm sm:text-base text-center">
            &copy; {new Date().getFullYear()} Affes Salong. Alla rättigheter förbehållna.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/affessalong.jonkoping/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-300 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@affes.salong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-300 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
