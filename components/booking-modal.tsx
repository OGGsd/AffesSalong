"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  bookingUrl: string
  serviceName: string
}

export default function BookingModal({ isOpen, onClose, bookingUrl, serviceName }: BookingModalProps) {
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 bg-amber-600 text-white">
              <div>
                <h2 className="text-lg md:text-xl font-bold">Boka {serviceName}</h2>
                <p className="text-amber-100 text-sm">Affes Salong - Jönköping</p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-amber-700 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Iframe Container */}
            <div className="h-[calc(100%-80px)] md:h-[calc(100%-96px)]">
              <iframe
                src={bookingUrl}
                className="w-full h-full border-0"
                title={`Boka ${serviceName} - Affes Salong`}
                allow="payment; geolocation"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}