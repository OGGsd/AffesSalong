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

      // Handle app install prompt
      let deferredPrompt: any = null
      
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('PWA: Install prompt triggered')
        e.preventDefault()
        deferredPrompt = e
        
        // Show custom install button or banner
        showInstallPrompt()
      })

      // Handle successful app install
      window.addEventListener('appinstalled', () => {
        console.log('PWA: App installed successfully')
        deferredPrompt = null
        
        // Track install event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'pwa_install', {
            event_category: 'PWA',
            event_label: 'App Installed'
          })
        }
      })

      // Register for push notifications (optional)
      if ('Notification' in window && 'PushManager' in window) {
        // Request notification permission
        Notification.requestPermission().then((permission) => {
          console.log('PWA: Notification permission:', permission)
        })
      }

      // Handle online/offline events
      window.addEventListener('online', () => {
        console.log('PWA: App is online')
        document.body.classList.remove('offline')
        document.body.classList.add('online')
        
        // Sync any pending data
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
          navigator.serviceWorker.ready.then((registration) => {
            return registration.sync.register('background-sync')
          })
        }
      })

      window.addEventListener('offline', () => {
        console.log('PWA: App is offline')
        document.body.classList.remove('online')
        document.body.classList.add('offline')
      })
    }
  }, [])

  const showInstallPrompt = () => {
    // Create a subtle install prompt
    const installBanner = document.createElement('div')
    installBanner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: #d97706;
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: system-ui, sans-serif;
      ">
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">Installera Affes Salong</div>
          <div style="font-size: 14px; opacity: 0.9;">Få snabb åtkomst till bokning och tjänster</div>
        </div>
        <div>
          <button id="install-btn" style="
            background: white;
            color: #d97706;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            font-weight: 600;
            margin-right: 8px;
            cursor: pointer;
          ">Installera</button>
          <button id="dismiss-btn" style="
            background: transparent;
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
          ">Senare</button>
        </div>
      </div>
    `
    
    document.body.appendChild(installBanner)
    
    // Handle install button click
    const installBtn = document.getElementById('install-btn')
    const dismissBtn = document.getElementById('dismiss-btn')
    
    installBtn?.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        console.log('PWA: Install prompt outcome:', outcome)
        deferredPrompt = null
      }
      installBanner.remove()
    })
    
    dismissBtn?.addEventListener('click', () => {
      installBanner.remove()
    })
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      if (document.body.contains(installBanner)) {
        installBanner.remove()
      }
    }, 10000)
  }

  return null
}