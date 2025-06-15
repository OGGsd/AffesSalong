"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Clock, MapPin, Phone, Mail, Calendar, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDeviceDetection } from "./responsive-utils"

export default function ContactSection() {
  const deviceType = useDeviceDetection()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Smooth scroll function
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    const servicesSection = document.getElementById("tjanster")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="kontakt" className="py-16 sm:py-20 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="flex justify-center mb-3">
            <div className="bg-amber-500 p-2 sm:p-3 rounded-full">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
          <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Kontakt & Öppettider
          </motion.h2>
          <div className="w-16 sm:w-20 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Kontakta oss för bokning eller frågor. Vi ser fram emot ditt besök hos Affes Salong.
          </motion.p>
        </motion.div>

        {/* Main content with contact info and opening hours first */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Contact Information Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-xl shadow-lg p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2" />
              Hitta oss
            </h3>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 sm:p-3 rounded-lg mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-base sm:text-lg mb-1">Adress</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Barnarpsgatan 31, 55316, Jönköping</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 sm:p-3 rounded-lg mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-base sm:text-lg mb-1">Telefon</h4>
                  <p className="text-gray-600 text-sm sm:text-base">036-123786</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 sm:p-3 rounded-lg mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-base sm:text-lg mb-1">Email</h4>
                  <p className="text-gray-600 text-sm sm:text-base">affessalong@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 sm:p-3 rounded-lg mr-4 flex-shrink-0">
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-base sm:text-lg mb-1">Sociala Medier</h4>
                  <div className="space-y-1">
                    <a
                      href="https://www.instagram.com/affessalong.jonkoping/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600 transition-colors text-sm sm:text-base flex items-center"
                    >
                      <Instagram className="h-4 w-4 mr-1" />
                      @affessalong.jonkoping
                    </a>
                    <a
                      href="https://www.tiktok.com/@affes.salong"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600 transition-colors text-sm sm:text-base flex items-center"
                    >
                      <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                      @affes.salong
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-2 sm:p-3 rounded-lg mr-4 flex-shrink-0">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-base sm:text-lg mb-1">Boka Online</h4>
                  <Button
                    onClick={scrollToServices}
                    className="mt-2 bg-amber-600 hover:bg-amber-700 px-4 sm:px-6 py-2 text-sm sm:text-base"
                  >
                    Boka Tid Nu
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2" />
                Öppettider
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center border-b border-gray-200 py-3 sm:py-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="flex w-full justify-between">
                    <span className="font-medium text-base sm:text-lg">MÅNDAG</span>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">09:00 - 18:00</span>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200 py-3 sm:py-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="flex w-full justify-between">
                    <span className="font-medium text-base sm:text-lg">TISDAG</span>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">09:00 - 18:00</span>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200 py-3 sm:py-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="flex w-full justify-between">
                    <span className="font-medium text-base sm:text-lg">ONSDAG</span>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">09:00 - 18:00</span>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200 py-3 sm:py-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="flex w-full justify-between">
                    <span className="font-medium text-base sm:text-lg">TORSDAG</span>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">09:00 - 18:00</span>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200 py-3 sm:py-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="flex w-full justify-between">
                    <span className="font-medium text-base sm:text-lg">FREDAG</span>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">09:00 - 18:00</span>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200 py-3 sm:py-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="flex w-full justify-between">
                    <span className="font-medium text-base sm:text-lg">LÖRDAG</span>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">10:00 - 14:00</span>
                  </div>
                </div>
                <div className="flex items-center py-3 sm:py-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                  <div className="flex w-full justify-between">
                    <span className="font-medium text-base sm:text-lg">SÖNDAG</span>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">Stängt</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Map - Now below the contact and opening hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-12 h-[250px] sm:h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl shadow-lg mt-2 sm:mt-4"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2093.6261490225455!2d14.165512651902933!3d57.778882992884576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465a6df5d2664c23%3A0xe71886a9f057cc0!2sBarnarpsgatan%2031%2C%20553%2033%20J%C3%B6nk%C3%B6ping!5e0!3m2!1ssv!2sse!4v1724351272308!5m2!1ssv!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Affes Salong karta"
              className="rounded-xl"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
