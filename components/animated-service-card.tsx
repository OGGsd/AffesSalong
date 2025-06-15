"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import BokadirektWidget from "./bokadirekt-widget"
import { useMediaQuery } from "@/hooks/use-media-query"

interface AnimatedServiceCardProps {
  service: {
    name: string
    price: number
    duration?: string
    bookingLink?: string
  }
}

export default function AnimatedServiceCard({ service }: AnimatedServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookingWidgetOpen, setIsBookingWidgetOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 767px)")

  // Extract duration in minutes from the duration string
  const getDurationInMinutes = (durationStr?: string) => {
    if (!durationStr) return "30"
    const match = durationStr.match(/(\d+)\s*minuter/)
    return match ? match[1] : "30"
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-transparent hover:border-amber-200"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <motion.h3
                className="text-lg font-semibold"
                animate={{ color: isHovered ? "#d97706" : "#000000" }}
                transition={{ duration: 0.3 }}
              >
                {service.name}
              </motion.h3>
              <motion.span
                className="font-medium text-amber-600"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  fontWeight: isHovered ? 700 : 500,
                }}
                transition={{ duration: 0.3 }}
              >
                {service.price} kr
              </motion.span>
            </div>

            {service.duration && <p className="text-sm text-gray-500 mb-4">{service.duration}</p>}

            <div className="flex justify-end mt-auto">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  // Short delay to ensure smooth transition on mobile
                  setTimeout(
                    () => {
                      setIsBookingWidgetOpen(true)
                    },
                    isMobile ? 100 : 0,
                  )
                }}
                className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 group"
              >
                Boka Nu
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </CardContent>
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
