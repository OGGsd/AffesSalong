"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToServices = () => {
    const servicesSection = document.getElementById("tjanster")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openingHours = [
    { day: "MÅNDAG", hours: "09:00 - 18:00" },
    { day: "TISDAG", hours: "09:00 - 18:00" },
    { day: "ONSDAG", hours: "09:00 - 18:00" },
    { day: "TORSDAG", hours: "09:00 - 18:00" },
    { day: "FREDAG", hours: "09:00 - 18:00" },
    { day: "LÖRDAG", hours: "10:00 - 14:00" },
    { day: "SÖNDAG", hours: "Stängt" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="kontakt" className="py-20 md:py-28 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Kontakt & Öppettider
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
            Kontakta oss för bokning eller frågor. Vi ser fram emot ditt besök hos Affes Salong.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-10"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
              Hitta oss
            </h3>

            <div className="space-y-8">
              {[
                { icon: "📍", title: "Adress", info: "Barnarpsgatan 31, 55316, Jönköping" },
                { icon: "📞", title: "Telefon", info: "036-123786" },
                { icon: "✉️", title: "Email", info: "affessalong@gmail.com" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-2xl border border-amber-200">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl mb-2 text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-lg">{item.info}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="flex items-start space-x-4 pt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 1.1 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-2xl border border-amber-200">
                  📅
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl mb-3 text-gray-900">Boka Online</h4>
                  <motion.button
                    onClick={scrollToServices}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(217, 119, 6, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Boka Tid Nu
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-10"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
              Öppettider
            </h3>

            <div className="space-y-4">
              {openingHours.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="font-bold text-lg text-gray-900">{item.day}</span>
                  <span className={`font-semibold text-lg ${item.hours === "Stängt" ? "text-red-500" : "text-amber-600"}`}>
                    {item.hours}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Google Map */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div 
            className="h-96 md:h-[500px] w-full overflow-hidden rounded-3xl shadow-xl"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2093.6261490225455!2d14.165512651902933!3d57.778882992884576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465a6df5d2664c23%3A0xe71886a9f057cc0!2sBarnarpsgatan%2031%2C%20553%2033%20J%C3%B6nk%C3%B6ping!5e0!3m2!1ssv!2sse!4v1724351272308!5m2!1ssv!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Affes Salong karta"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}