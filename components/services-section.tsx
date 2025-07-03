"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import BookingPopup from "./booking-popup"

interface Service {
  id: string
  name: string
  price: number
  duration: string
  bookingLink: string
  category: string[]
  description?: string
  popular?: boolean
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedBookingUrl, setSelectedBookingUrl] = useState("")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = [
    { id: "all", label: "Alla" },
    { id: "haircut", label: "Klippning" },
    { id: "beard", label: "Skägg" },
    { id: "student", label: "Student" },
    { id: "other", label: "Övrigt" },
  ]

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => service.category.includes(activeCategory))

  const handleBookingClick = (bookingUrl: string) => {
    setSelectedBookingUrl(bookingUrl)
    setIsBookingOpen(true)
  }

  const handleQuickBooking = () => {
    setSelectedBookingUrl("https://www.bokadirekt.se/places/affessalong-10813")
    setIsBookingOpen(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <>
      <section id="tjanster" className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Våra Tjänster</h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Vi erbjuder ett brett utbud av professionella tjänster för att möta dina behov.
            </p>
            
            {/* Quick Booking Button - Prominent */}
            <motion.button
              onClick={handleQuickBooking}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 mb-8"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              🗓️ BOKA DIN TID NU - SNABBT & ENKELT
            </motion.button>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-amber-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {service.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mb-3 self-start"
                  >
                    <span className="mr-1">⭐</span>
                    Populär
                  </motion.div>
                )}
                
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                
                <div className="flex items-center text-gray-500 mb-3">
                  <span className="mr-1">⏰</span>
                  <span className="text-sm">{service.duration}</span>
                </div>

                {service.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{service.description}</p>
                )}

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-amber-600">{service.price} kr</span>
                  <motion.button
                    onClick={() => handleBookingClick(service.bookingLink)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded font-medium transition-colors relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ scale: 1.1 }}
                    >
                      Boka Nu
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-amber-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-amber-600/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Osäker på vilken tjänst du behöver?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Våra experter hjälper dig att välja rätt behandling. Boka en konsultation eller ring oss direkt!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleQuickBooking}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📅 Boka Konsultation
                </motion.button>
                <motion.a
                  href="tel:036-123786"
                  className="bg-white hover:bg-gray-50 text-amber-600 border-2 border-amber-600 px-6 py-3 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📞 Ring Oss: 036-123786
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Action Button for Mobile */}
        <motion.button
          onClick={handleQuickBooking}
          className="fixed bottom-20 right-4 md:hidden bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300 }}
        >
          <span className="text-2xl">📅</span>
        </motion.button>
      </section>

      {/* Booking Popup */}
      <BookingPopup
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        bookingUrl={selectedBookingUrl}
      />
    </>
  )
}