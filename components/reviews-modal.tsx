"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ReviewsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReviewsModal({ isOpen, onClose }: ReviewsModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [averageRating, setAverageRating] = useState(4.8)
  const [totalReviews, setTotalReviews] = useState(216)

  // Reset loading state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
    }
  }, [isOpen])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] p-0 overflow-hidden bg-white rounded-lg shadow-xl">
        <DialogHeader className="p-6 pb-0 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-900">Betyg och recensioner</DialogTitle>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 transition-colors" aria-label="Stäng">
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <div className="p-6 pt-4 overflow-auto" style={{ maxHeight: "calc(90vh - 80px)" }}>
          {/* Summary Rating Section */}
          <div className="mb-8 bg-amber-50 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Star className="h-8 w-8 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{averageRating} av 5</h3>
                  <p className="text-gray-600">Baserat på {totalReviews} betyg</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(averageRating) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({totalReviews} omdömen)</span>
                </div>
                <p className="text-sm text-gray-600">Från Bokadirekt.se</p>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-4"
              >
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                <p className="text-gray-500">Laddar recensioner...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Embedded Reviews */}
          <iframe
            ref={iframeRef}
            src="https://www.bokadirekt.se/places/affessalong-10813#reviews"
            width="100%"
            height="600px"
            style={{
              border: "none",
              display: isLoading ? "none" : "block",
              minHeight: "500px",
            }}
            onLoad={handleIframeLoad}
            title="Bokadirekt recensioner"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
