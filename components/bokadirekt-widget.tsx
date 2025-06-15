"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Clock } from "lucide-react"
import { useDeviceDetection } from "./responsive-utils"
import { useMobile } from "@/hooks/use-mobile"

interface BokadirektWidgetProps {
  isOpen: boolean
  onClose: () => void
  serviceUrl?: string
  serviceName?: string
  servicePrice?: number
  serviceDuration?: string
}

export default function BokadirektWidget({
  isOpen,
  onClose,
  serviceUrl,
  serviceName = "Klippning & Skäggtrimning",
  servicePrice = 550,
  serviceDuration = "60 min",
}: BokadirektWidgetProps) {
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMobile()
  const deviceType = useDeviceDetection()

  // Reset loading state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
    }
  }, [isOpen])

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  // Get the embed URL with appropriate parameters for mobile
  const getEmbedUrl = () => {
    const baseUrl = serviceUrl || "https://www.bokadirekt.se/places/affes-salong-10813"

    // Create a URL object to properly handle parameters
    const urlObj = new URL(baseUrl)

    // Add parameters to force desktop view on all devices
    urlObj.searchParams.set("view", "desktop")
    urlObj.searchParams.set("embed", "true")
    urlObj.searchParams.set("fullscreen", "true")

    // Add mobile-specific parameters to ensure full interface is shown
    if (isMobile) {
      urlObj.searchParams.set("mobile_full_view", "true")
      urlObj.searchParams.set("disable_responsive", "true")
      urlObj.searchParams.set("force_desktop_view", "true")
    }

    return urlObj.toString()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[1000px] max-h-[92vh] p-0 overflow-hidden bg-white rounded-lg shadow-xl"
        style={{
          width: isMobile ? "98vw" : undefined,
          margin: isMobile ? "4px" : undefined,
          maxWidth: isMobile ? "98vw" : undefined,
        }}
      >
        <DialogHeader className="p-6 pb-4 flex flex-row items-center justify-between border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            {serviceName ? `Boka ${serviceName}` : "Boka tid hos Affes Salong"}
          </DialogTitle>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 transition-colors" aria-label="Stäng">
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <div className="overflow-auto" style={{ maxHeight: "calc(90vh - 80px)" }}>
          {/* Service Information */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-3 flex-shrink-0">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Du har valt:</h3>
                <p className="text-sm text-gray-600 flex items-center flex-wrap">
                  <span className="font-medium">{serviceName}</span>
                  <span className="mx-1">•</span>
                  <span>{serviceDuration}</span>
                  <span className="mx-1">•</span>
                  <span className="font-medium text-amber-600">{servicePrice} kr</span>
                </p>
              </div>
            </div>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-white">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium">Laddar bokningssystem...</p>
              <p className="text-gray-500 text-sm">Det kan ta några sekunder</p>
            </div>
          )}

          {/* Bokadirekt Iframe with improved mobile handling */}
          <iframe
            src={getEmbedUrl()}
            width="100%"
            height={isMobile ? "850px" : "700px"}
            style={{
              border: "none",
              minHeight: isMobile ? "850px" : "700px",
              display: isLoading ? "none" : "block",
              overflow: "visible",
              width: "100%",
              maxWidth: "100%",
              transform: isMobile ? "scale(0.95)" : "none",
              transformOrigin: "top center",
              WebkitOverflowScrolling: "touch",
            }}
            onLoad={handleIframeLoad}
            title="Bokadirekt bokning"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="yes"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
