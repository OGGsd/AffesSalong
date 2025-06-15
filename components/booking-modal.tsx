"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { sv } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  service?: {
    name: string
    price: number
    bookingLink?: string
  }
}

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setSelectedDate(null)
      setSelectedTime(null)
      setSelectedBarber(null)
      setFormData({
        name: "",
        email: "",
        phone: "",
      })
      setIsSubmitting(false)
      setIsSuccess(false)
    }
  }, [isOpen])

  // Generate dates for the next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  // Available time slots
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  // Barbers
  const barbers = ["Fady", "Adnan", "Elias", "Behnam"]

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBarberSelect = (barber: string) => {
    setSelectedBarber(barber)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Close modal after success message
      setTimeout(() => {
        onClose()
      }, 3000)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="sticky top-0 z-10 bg-white border-b">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {isSuccess ? "Bokning bekräftad!" : service ? `Boka ${service.name}` : "Boka tid"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isSuccess
                ? "Tack för din bokning. Vi har skickat en bekräftelse till din e-post."
                : "Välj datum, tid och frisör för din bokning."}
            </DialogDescription>
          </DialogHeader>
          {!isSuccess && (
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    1
                  </div>
                  <div className={`h-1 w-8 ${step >= 2 ? "bg-amber-600" : "bg-gray-200"}`}></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    2
                  </div>
                  <div className={`h-1 w-8 ${step >= 3 ? "bg-amber-600" : "bg-gray-200"}`}></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    3
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {step === 1 && "Välj datum & tid"}
                  {step === 2 && "Välj frisör"}
                  {step === 3 && "Dina uppgifter"}
                </div>
              </div>
            </div>
          )}
        </div>

        {isSuccess ? (
          <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Bokning bekräftad!</h3>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-1">
                {service?.name} • {selectedDate && format(selectedDate, "d MMMM", { locale: sv })} • {selectedTime}
              </p>
              <p className="text-gray-600">Frisör: {selectedBarber}</p>
            </div>
            <Button onClick={onClose} className="bg-amber-600 hover:bg-amber-700">
              Stäng
            </Button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Välj datum</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {dates.map((date, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        className={cn(
                          "p-2 rounded-md text-center transition-colors",
                          selectedDate && date.toDateString() === selectedDate.toDateString()
                            ? "bg-amber-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900",
                        )}
                      >
                        <div className="text-xs font-medium">{format(date, "EEE", { locale: sv })}</div>
                        <div className="text-sm font-bold">{format(date, "d", { locale: sv })}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Välj tid</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleTimeSelect(time)}
                        disabled={!selectedDate}
                        className={cn(
                          "p-2 rounded-md text-center transition-colors",
                          !selectedDate && "opacity-50 cursor-not-allowed",
                          selectedTime === time
                            ? "bg-amber-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900",
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Välj frisör</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {barbers.map((barber, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleBarberSelect(barber)}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all flex flex-col items-center",
                          selectedBarber === barber
                            ? "border-amber-600 bg-amber-50"
                            : "border-gray-200 hover:border-gray-300",
                        )}
                      >
                        <div className="w-16 h-16 rounded-full bg-gray-200 mb-3 overflow-hidden">
                          <img
                            src={`/placeholder.svg?height=64&width=64&text=${barber}`}
                            alt={barber}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{barber}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Namn
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        E-post
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Din bokning</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tjänst:</span>
                        <span className="font-medium">{service?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Datum:</span>
                        <span className="font-medium">
                          {selectedDate && format(selectedDate, "d MMMM yyyy", { locale: sv })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tid:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frisör:</span>
                        <span className="font-medium">{selectedBarber}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-medium">Pris:</span>
                        <span className="text-amber-600 font-bold">{service?.price} kr</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <DialogFooter className="p-6 pt-4 border-t bg-gray-50">
              <div className="flex w-full justify-between">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    Tillbaka
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={onClose}>
                    Avbryt
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={(step === 1 && (!selectedDate || !selectedTime)) || (step === 2 && !selectedBarber)}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Nästa
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Bearbetar...
                      </>
                    ) : (
                      "Bekräfta bokning"
                    )}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
