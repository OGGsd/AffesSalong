"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, X, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PWAInstallButtonProps {
  autoPrompt?: boolean
  delay?: number
  className?: string
  variant?: "default" | "prominent" | "footer"
}

export default function PWAInstallButton({
  autoPrompt = true,
  delay = 60000, // 60 seconds default
  className = "",
  variant = "default",
}: PWAInstallButtonProps) {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [browserInfo, setBrowserInfo] = useState<string>("")
  const [isIOS, setIsIOS] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Detect browser and platform
    const detectBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      let browserName = "Unknown"

      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome"
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox"
      } else if (userAgent.match(/safari/i)) {
        browserName = "Safari"
      } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera"
      } else if (userAgent.match(/edg/i)) {
        browserName = "Edge"
      }

      setBrowserInfo(browserName)
      setIsIOS(/iphone|ipad|ipod/.test(userAgent))
      console.log(`PWA button: Browser detected as ${browserName}, iOS: ${/iphone|ipad|ipod/.test(userAgent)}`)
    }

    detectBrowser()

    // Function to handle the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setPromptInstall(e)
      setSupportsPWA(true)
      console.log(`PWA button (${browserInfo}): Install prompt is available`)
    }

    // Check if app is already installed using multiple methods for cross-browser support
    const checkInstalled = () => {
      // Method 1: matchMedia
      const standaloneMatch = window.matchMedia("(display-mode: standalone)").matches

      // Method 2: navigator.standalone (iOS Safari)
      const iosSafariStandalone = window.navigator.standalone === true

      if (standaloneMatch || iosSafariStandalone) {
        setIsInstalled(true)
        console.log(`PWA button (${browserInfo}): App is already installed`)
      } else {
        // For iOS, we'll always show the button since we can't detect if it's installed
        if (isIOS) {
          setSupportsPWA(true)
          console.log(`PWA button (${browserInfo}): iOS device, showing install button`)
        }

        console.log(
          `PWA button (${browserInfo}): App is not installed. Standalone: ${standaloneMatch}, iOS: ${iosSafariStandalone}`,
        )
      }
    }

    // Add event listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      console.log(`PWA button (${browserInfo}): App was installed`)
    })

    // Check if already installed
    checkInstalled()

    // Set timer for auto prompt if enabled
    if (autoPrompt) {
      console.log(`PWA button (${browserInfo}): Setting timer for ${delay}ms to show PWA prompt`)
      timerRef.current = setTimeout(() => {
        if (!isInstalled) {
          console.log(`PWA button (${browserInfo}): Timer completed, showing PWA prompt`)
          setShowToast(true)
        }
      }, delay)
    }

    // Cleanup
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", () => setIsInstalled(true))
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [autoPrompt, delay, isInstalled, browserInfo, isIOS])

  const handleInstallClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // For browsers that support the beforeinstallprompt event (Chrome, Edge, etc.)
    if (promptInstall) {
      console.log(`PWA button (${browserInfo}): Triggering standard install prompt`)

      // Hide the toast if it's showing
      setShowToast(false)

      // Show the browser's install prompt
      promptInstall.prompt()

      // Wait for the user to respond to the prompt
      promptInstall.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log(`PWA button (${browserInfo}): User accepted the install prompt`)
          setIsInstalled(true)
        } else {
          console.log(`PWA button (${browserInfo}): User dismissed the install prompt`)
        }
      })
    }
    // For iOS Safari
    else if (isIOS) {
      console.log(`PWA button (${browserInfo}): Showing iOS installation instructions`)
      // Show iOS-specific instructions in a more user-friendly way
      setShowToast(true)
    }
    // For other browsers that might support PWA but don't trigger beforeinstallprompt
    else if ("serviceWorker" in navigator) {
      console.log(`PWA button (${browserInfo}): Showing generic installation instructions`)
      alert(
        "För att installera appen: Öppna webbläsarens meny och välj 'Installera app' eller 'Lägg till på hemskärmen'",
      )
    } else {
      console.log(`PWA button (${browserInfo}): Installation not supported`)
      alert("Din webbläsare stödjer inte installation av appar. Prova Chrome eller Safari istället.")
    }
  }

  // If app is already installed, don't show anything
  if (isInstalled) {
    return null
  }

  // Render different button styles based on variant
  const renderButton = () => {
    // Adjust icon based on browser
    const ButtonIcon = isIOS ? Share2 : Download
    const buttonText = isIOS ? "Lägg till på hemskärmen" : "Ladda Ner Appen"

    switch (variant) {
      case "prominent":
        return (
          <Button
            onClick={handleInstallClick}
            className={`bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 text-lg ${className}`}
          >
            <ButtonIcon className="h-5 w-5" />
            {buttonText}
          </Button>
        )
      case "footer":
        return (
          <Button
            onClick={handleInstallClick}
            className={`bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 hover:scale-105 ${className}`}
          >
            <ButtonIcon className="h-5 w-5" />
            {buttonText}
          </Button>
        )
      default:
        return (
          <Button
            onClick={handleInstallClick}
            className={`bg-amber-600 hover:bg-amber-700 flex items-center gap-2 ${className}`}
          >
            <ButtonIcon className="h-4 w-4" />
            {buttonText}
          </Button>
        )
    }
  }

  // Only render the button if PWA is supported or we're on iOS
  if (!supportsPWA && !isIOS) {
    return null
  }

  return (
    <>
      {renderButton()}

      {/* Toast notification for iOS instructions */}
      <AnimatePresence>
        {showToast && isIOS && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-white rounded-lg shadow-xl border border-amber-200 p-4"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Installera på iOS</h3>
                <div className="text-gray-600 text-sm mb-3">
                  <p className="mb-2">För att installera Affes Salong app på din iOS-enhet:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>
                      Tryck på <Share2 className="inline h-4 w-4" /> dela-ikonen i Safari
                    </li>
                    <li>Scrolla ner och tryck på "Lägg till på hemskärmen"</li>
                    <li>Tryck på "Lägg till" i övre högra hörnet</li>
                  </ol>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowToast(false)}
                  className="border-gray-300 w-full"
                >
                  Jag förstår
                </Button>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-gray-400 hover:text-gray-600 ml-4"
                aria-label="Stäng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Standard toast notification for non-iOS */}
        {showToast && !isIOS && promptInstall && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-white rounded-lg shadow-xl border border-amber-200 p-4"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Installera Affes Salong App</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Installera vår app för snabbare åtkomst och offline-funktionalitet!
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleInstallClick} className="bg-amber-600 hover:bg-amber-700 text-white">
                    Installera Nu
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowToast(false)} className="border-gray-300">
                    Senare
                  </Button>
                </div>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-gray-400 hover:text-gray-600 ml-4"
                aria-label="Stäng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
