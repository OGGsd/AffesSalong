"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import BookingModal from "./booking-modal"

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
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean
    url: string
    serviceName: string
  }>({
    isOpen: false,
    url: "",
    serviceName: ""
  })
  
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

  const handleBooking = (service: Service) => {
    setBookingModal({
      isOpen: true,
      url: service.bookingLink,
      serviceName: service.name
    })
  }

  const closeBookingModal = () => {
    setBookingModal({
      isOpen: false,
      url: "",
      serviceName: ""
    })
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
      <section id="tjanster" className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Våra Tjänster</h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vi erbjuder ett brett utbud av professionella tjänster för att möta dina behov.
            </p>
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
                className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col"
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
                    onClick={() => handleBooking(service)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Boka Nu
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={closeBookingModal}
        bookingUrl={bookingModal.url}
        serviceName={bookingModal.serviceName}
      />
    </>
  )
}