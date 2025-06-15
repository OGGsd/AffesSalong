"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Sparkles, ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import BokadirektWidget from "./bokadirekt-widget"

interface MobileServiceCardProps {
  service: {
    id: string
    name: string
    price: number
    duration: string
    bookingLink: string
    category: string[]
    description?: string
    popular?: boolean
  }
}

export default function MobileServiceCard({ service }: MobileServiceCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [isBookingWidgetOpen, setIsBookingWidgetOpen] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsBookingWidgetOpen(true)
  }

  return (
    <>
      <Card
        className={`overflow-hidden transition-all duration-300 border border-gray-100 hover:border-amber-200 bg-white relative ${
          expanded ? "shadow-md" : ""
        }`}
      >
        {service.popular && (
          <div className="absolute top-0 right-0 bg-amber-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            Populär
          </div>
        )}

        <div className="p-4">
          {/* Header section - always visible */}
          <div className="flex justify-between items-center mb-2">
            <h3 className={`text-lg font-semibold ${expanded ? "text-amber-600" : ""}`}>{service.name}</h3>
            <span className="font-bold text-amber-600">{service.price} kr</span>
          </div>

          <div className="flex items-center text-gray-500 mb-3">
            <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{service.duration}</span>
          </div>

          {/* Expandable content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {service.description && (
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer with expand button and book button */}
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={toggleExpanded}
              className="flex items-center text-sm text-gray-500 hover:text-amber-600 transition-colors"
            >
              {expanded ? (
                <>
                  Visa mindre <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Visa mer <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
            <Button
              onClick={handleBookingClick}
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 group"
            >
              Boka
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>

      <BokadirektWidget
        isOpen={isBookingWidgetOpen}
        onClose={() => setIsBookingWidgetOpen(false)}
        serviceUrl={service.bookingLink}
        serviceName={service.name}
        servicePrice={service.price}
        serviceDuration={service.duration}
      />
    </>
  )
}
