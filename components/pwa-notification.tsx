"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, X, Share2 } from "lucide-react"
import Image from "next/image"

// Add this to the global Window interface
declare global {
  interface Window {
    deferredPrompt: any
  }
}

export default function PWANotification() {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Detect iOS devices
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIOS(isIOSDevice)

    console.log("PWA notification: Initializing...")

    // Function to handle the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()

      // Store the event for later use
      window.deferredPrompt = e

      // Stash the event so it can be triggered later
      setPromptInstall(e)
      setSupportsPWA(true)
      console.log("PWA notification: Install prompt is available")
    }

    // Check if app is already installed
    const checkInstalled = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true

      if (isStandalone) {
        setIsInstalled(true)
        console.log("PWA notification: App is already installed")
        return true
      }
      return false
    }

    // Add event listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      console.log("PWA notification: App was installed")
    })

    // Check if already installed
    const alreadyInstalled = checkInstalled()

    // Set timer for 60 seconds - only if not already installed
    if (!alreadyInstalled) {
      console.log("PWA notification: Setting 60-second timer")

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      // Set new timer
      timerRef.current = setTimeout(() => {
        console.log("PWA notification: 60 seconds passed, checking conditions")

        // Check again if it's installed (might have changed during the 60 seconds)
        if (!checkInstalled()) {
          console.log("PWA notification: App not installed, showing notification")
          setShowNotification(true)
        } else {
          console.log("PWA notification: App is installed, not showing notification")
        }
      }, 60000) // 60 seconds
    }

    // Cleanup
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", () => setIsInstalled(true))
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleInstallClick = () => {
    // For browsers that support the beforeinstallprompt event
    if (promptInstall) {
      console.log("PWA notification: Triggering install prompt")
      promptInstall.prompt()

      promptInstall.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA notification: User accepted the install prompt")
          setShowNotification(false)
          setIsInstalled(true)
        } else {
          console.log("PWA notification: User dismissed the install prompt")
        }
      })
    }
    // For iOS Safari
    else if (isIOS) {
      console.log("PWA notification: Showing iOS installation instructions")
      alert("För att installera appen på iOS: Tryck på 'Dela' ikonen och välj 'Lägg till på hemskärmen'")
    }
    // For other browsers
    else {
      console.log("PWA notification: Showing generic installation instructions")
      alert(
        "För att installera appen: Öppna webbläsarens meny och välj 'Installera app' eller 'Lägg till på hemskärmen'",
      )
    }
  }

  // If app is already installed or notification shouldn't be shown, don't render anything
  if (isInstalled || !showNotification) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-white rounded-lg shadow-xl border border-amber-200 p-4"
      >
        <div className="flex items-start">
          <div className="relative h-12 w-12 mr-3 flex-shrink-0">
            <Image src="/icon-192x192.png" alt="Affes Salong" fill className="object-contain rounded-md" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">Installera Affes Salong App</h3>
            <p className="text-gray-600 text-sm mb-3">
              {isIOS
                ? "Installera vår app för snabbare åtkomst och bättre upplevelse!"
                : "Få snabbare åtkomst och offline-funktionalitet med vår app!"}
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleInstallClick} className="bg-amber-600 hover:bg-amber-700 text-white">
                {isIOS ? <Share2 className="h-4 w-4 mr-1" /> : <Download className="h-4 w-4 mr-1" />}
                {isIOS ? "Lägg till på hemskärmen" : "Installera Nu"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNotification(false)}
                className="border-gray-300"
              >
                Senare
              </Button>
            </div>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-gray-400 hover:text-gray-600 ml-4"
            aria-label="Stäng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
