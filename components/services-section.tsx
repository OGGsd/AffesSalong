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
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; url: string; serviceName: string }>({
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
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  return (
    <>
      <section id="tjanster" className="py-20 md:py-28 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Våra Tjänster
            </motion.h2>
            <motion.div 
              className="w-24 h-1.5 bg-amber-600 mx-auto mb-8"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Vi erbjuder ett brett utbud av professionella tjänster för att möta dina behov.
            </motion.p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1 }}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ duration: 0.4, type: "spring", damping: 15 }}
              >
                {/* Background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                <div className="relative z-10">
                  {service.popular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 1.2, type: "spring", damping: 15 }}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 mb-4 self-start border border-amber-200"
                    >
                      <motion.span 
                        className="mr-1.5 text-base"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        ⭐
                      </motion.span>
                      Populär
                    </motion.div>
                  )}
                  
                  <motion.h3 
                    className="text-2xl font-bold mb-3 text-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 1.4 }}
                  >
                    {service.name}
                  </motion.h3>
                  
                  <motion.div 
                    className="flex items-center text-gray-500 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 1.6 }}
                  >
                    <span className="mr-2 text-lg">⏰</span>
                    <span className="text-base font-medium">{service.duration}</span>
                  </motion.div>

                  {service.description && (
                    <motion.p 
                      className="text-gray-600 text-base leading-relaxed mb-6 flex-grow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 1.8 }}
                    >
                      {service.description}
                    </motion.p>
                  )}

                  <motion.div 
                    className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 2 }}
                  >
                    <motion.span 
                      className="text-3xl font-bold text-amber-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      {service.price} kr
                    </motion.span>
                    <motion.button
                      onClick={() => handleBooking(service)}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(217, 119, 6, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Boka Nu
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, url: "", serviceName: "" })}
        bookingUrl={bookingModal.url}
        serviceName={bookingModal.serviceName}
      />
    </>
  )
}