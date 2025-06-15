"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Barber {
  id: string
  name: string
  image: string
  description?: string
}

interface BarberSelectorProps {
  barbers: Barber[]
  selectedBarber: string | null
  onSelect: (barberId: string) => void
  className?: string
}

export default function BarberSelector({ barbers, selectedBarber, onSelect, className }: BarberSelectorProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {barbers.map((barber) => (
        <motion.div
          key={barber.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200",
            selectedBarber === barber.id
              ? "border-amber-400 bg-amber-50 shadow-sm"
              : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50",
          )}
          onClick={() => onSelect(barber.id)}
        >
          <div className="w-14 h-14 relative rounded-full overflow-hidden mr-4 border border-gray-200 shadow-sm">
            <Image src={barber.image || "/placeholder.svg"} alt={barber.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{barber.name}</p>
            {barber.description && <p className="text-sm text-gray-500">{barber.description}</p>}
          </div>
          <div className="ml-auto">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200",
                selectedBarber === barber.id ? "bg-amber-600 text-white" : "border-2 border-gray-300",
              )}
            >
              {selectedBarber === barber.id && <CheckCircle className="h-5 w-5" />}
            </div>
          </div>
          <ChevronRight
            className={cn(
              "h-5 w-5 ml-2 transition-opacity",
              selectedBarber === barber.id ? "opacity-100 text-amber-600" : "opacity-0",
            )}
          />
        </motion.div>
      ))}
    </div>
  )
}
