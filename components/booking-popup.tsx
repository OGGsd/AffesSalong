"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface BookingPopupProps {
  isOpen: boolean
  onClose: () => void
  bookingUrl?: string
}

export default function BookingPopup({ isOpen, onClose, bookingUrl }: BookingPopupProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isMounted) return null

  const defaultBookingUrl = "https://www.bokadirekt.se/places/affessalong-10813"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-amber-600 text-white">
              <div>
                <h2 className="text-xl font-bold">Boka Din Tid</h2>
                <p className="text-amber-100 text-sm">Välj tjänst och tid som passar dig</p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-amber-700 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Stäng bokningsformulär"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Iframe Container */}
            <div className="relative w-full h-full">
              <iframe
                src={bookingUrl || defaultBookingUrl}
                className="w-full h-full border-0"
                title="Boka tid hos Affes Salong"
                allow="payment; geolocation"
                loading="lazy"
                style={{ minHeight: '600px' }}
              />
              
              {/* Loading overlay */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute inset-0 bg-white flex items-center justify-center"
                style={{ pointerEvents: 'none' }}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600">Laddar bokningsformulär...</p>
                </div>
              </motion.div>
            </div>

            {/* Quick Info Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-4 border-t">
              <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
                <div className="flex items-center mb-2 sm:mb-0">
                  <span className="mr-2">📞</span>
                  <span>Ring oss: 036-123786</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>Barnarpsgatan 31, Jönköping</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}