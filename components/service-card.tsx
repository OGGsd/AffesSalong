"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Sparkles, Info, ArrowRight } from "lucide-react"
import BokadirektWidget from "./bokadirekt-widget"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ServiceProps {
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

export default function ServiceCard({ service }: ServiceProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookingWidgetOpen, setIsBookingWidgetOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  // Media queries for responsive design
  const isMobile = useMediaQuery("(max-width: 767px)")

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  // Handle card click on mobile
  const handleCardClick = () => {
    if (isMobile) {
      setShowDetails(!showDetails)
    }
  }

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault() // Prevent any default behavior

    // Close details panel if open on mobile
    if (isMobile && showDetails) {
      setShowDetails(false)
    }

    // Short delay to allow any animations to complete
    setTimeout(
      () => {
        setIsBookingWidgetOpen(true)
      },
      isMobile ? 150 : 100,
    )
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        whileHover={!isMobile ? { y: -5 } : undefined}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        className="h-full"
      >
        <Card
          className={`overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-amber-200 bg-white relative ${
            isMobile && showDetails ? "shadow-xl border-amber-200" : ""
          }`}
        >
          {service.popular && (
            <div className="absolute top-0 right-0 bg-amber-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Populär
            </div>
          )}

          <div className="p-5 h-full flex flex-col">
            <div className="mb-4">
              {/* Improved service title and duration layout */}
              <h3
                className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  isHovered || (isMobile && showDetails) ? "text-amber-600" : ""
                }`}
              >
                {service.name}
              </h3>

              <div className="flex items-center mt-1 text-gray-500">
                <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-sm">{service.duration}</span>
              </div>

              {/* Description - always visible on desktop/tablet, toggle on mobile */}
              <div
                className={`mt-3 transition-all duration-300 ${
                  isMobile && !showDetails ? "max-h-0 opacity-0 overflow-hidden" : "max-h-24 opacity-100"
                }`}
              >
                {service.description && <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>}
              </div>

              {/* Mobile toggle indicator - improved styling */}
              {isMobile && (
                <div className="mt-3 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8 text-amber-600 hover:text-amber-800 hover:bg-amber-50/50 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDetails(!showDetails)
                    }}
                  >
                    {showDetails ? "Dölj detaljer" : "Visa detaljer"}
                    <Info className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <span
                className={`text-xl font-bold text-amber-600 transition-all duration-300 ${
                  isHovered || (isMobile && showDetails) ? "scale-105" : ""
                }`}
              >
                {service.price} kr
              </span>

              <Button
                onClick={handleBookingClick}
                className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 group"
              >
                Boka Nu
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

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
