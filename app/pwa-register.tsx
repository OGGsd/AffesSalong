"use client"

import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      }).then((registration) => {
        console.log('PWA: Service Worker registered successfully:', registration.scope)
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, prompt user to refresh
                if (confirm('Ny version av appen är tillgänglig. Vill du uppdatera?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' })
                  window.location.reload()
                }
              }
            })
          }
        })
      }).catch((error) => {
        console.log('PWA: Service Worker registration failed:', error)
      })

      // Listen for service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })

      // Prevent the default install prompt from showing
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('PWA: Install prompt prevented')
        e.preventDefault()
        // Don't store the event or show any custom prompt
        return false
      })

      // Handle successful app install (if user installs manually)
      window.addEventListener('appinstalled', () => {
        console.log('PWA: App installed successfully')
      })

      // Handle online/offline events
      window.addEventListener('online', () => {
        console.log('PWA: App is online')
        document.body.classList.remove('offline')
        document.body.classList.add('online')
      })

      window.addEventListener('offline', () => {
        console.log('PWA: App is offline')
        document.body.classList.remove('online')
        document.body.classList.add('offline')
      })
    }
  }, [])

  return null
}