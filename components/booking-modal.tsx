"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  bookingUrl: string
  serviceName: string
}

export default function BookingModal({ isOpen, onClose, bookingUrl, serviceName }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      // Reset loading state when modal opens
      setIsLoading(true)
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleClose = () => {
    setIsLoading(true)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-white"
        >
          {/* Header with close button */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Stäng bokning"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </motion.button>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Boka Tid</h2>
                  <p className="text-sm text-gray-600">{serviceName}</p>
                </div>
              </div>
              
              <motion.button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Stäng"
              >
                <X className="h-6 w-6 text-gray-600" />
              </motion.button>
            </div>
          </motion.div>

          {/* Loading overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-white flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600">Laddar bokningssystem...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Iframe container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute inset-0 pt-20"
          >
            <iframe
              src={bookingUrl}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              title={`Boka ${serviceName}`}
              allow="payment; geolocation"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            />
          </motion.div>

          {/* Mobile-specific bottom safe area */}
          <div className="absolute bottom-0 left-0 right-0 h-safe-area-inset-bottom bg-white md:hidden" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}