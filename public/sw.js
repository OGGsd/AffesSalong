const CACHE_NAME = "affes-salong-v2.0.0"
const STATIC_CACHE = "affes-salong-static-v2.0.0"
const DYNAMIC_CACHE = "affes-salong-dynamic-v2.0.0"
const IMAGE_CACHE = "affes-salong-images-v2.0.0"

// Static assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/apple-touch-icon.png",
  "/maskable-icon.png"
]

// Dynamic content to cache
const DYNAMIC_ASSETS = [
  "/#om-oss",
  "/#team", 
  "/#tjanster",
  "/#galleri",
  "/#kontakt"
]

// Image assets to cache
const IMAGE_ASSETS = [
  "/images/logo.png",
  "/images/hero-background.jpeg"
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...")
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log("Service Worker: Caching static assets")
        return cache.addAll(STATIC_ASSETS)
      }),
      // Cache images
      caches.open(IMAGE_CACHE).then((cache) => {
        console.log("Service Worker: Caching images")
        return cache.addAll(IMAGE_ASSETS)
      })
    ]).then(() => {
      console.log("Service Worker: Installation complete")
      return self.skipWaiting()
    })
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...")
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== IMAGE_CACHE
          ) {
            console.log("Service Worker: Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log("Service Worker: Activation complete")
      return self.clients.claim()
    })
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // Handle different types of requests
  if (request.destination === "image") {
    event.respondWith(handleImageRequest(request))
  } else if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(request))
  } else {
    event.respondWith(handleResourceRequest(request))
  }
})

// Handle image requests
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log("Service Worker: Image request failed:", error)
    // Return a placeholder image or cached fallback
    const cache = await caches.open(IMAGE_CACHE)
    return cache.match("/images/logo.png") || new Response("", { status: 404 })
  }
}

// Handle navigation requests
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log("Service Worker: Navigation request failed:", error)
    
    // Try to serve from cache
    const cache = await caches.open(DYNAMIC_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Fallback to offline page
    return caches.match("/offline")
  }
}

// Handle resource requests
async function handleResourceRequest(request) {
  try {
    // Try static cache first
    const staticCache = await caches.open(STATIC_CACHE)
    const staticResponse = await staticCache.match(request)
    
    if (staticResponse) {
      return staticResponse
    }

    // Try dynamic cache
    const dynamicCache = await caches.open(DYNAMIC_CACHE)
    const dynamicResponse = await dynamicCache.match(request)
    
    if (dynamicResponse) {
      return dynamicResponse
    }

    // Fetch from network
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      dynamicCache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log("Service Worker: Resource request failed:", error)
    return new Response("", { status: 408 })
  }
}

// Handle push notifications
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push notification received")
  
  let title = "Affes Salong"
  let options = {
    body: "Ny notifikation från Affes Salong",
    icon: "/icon-192x192.png",
    badge: "/maskable-icon.png",
    tag: "affes-notification",
    renotify: true,
    requireInteraction: false,
    actions: [
      {
        action: "open",
        title: "Öppna",
        icon: "/icon-192x192.png"
      },
      {
        action: "close",
        title: "Stäng"
      }
    ],
    data: {
      url: "/"
    }
  }

  if (event.data) {
    try {
      const data = event.data.json()
      title = data.title || title
      options.body = data.body || options.body
      options.data.url = data.url || options.data.url
    } catch (e) {
      options.body = event.data.text() || options.body
    }
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked")
  
  event.notification.close()

  const urlToOpen = event.notification.data?.url || "/"

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus()
        }
      }
      
      // If no existing window/tab, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

// Handle background sync
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered")
  
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Perform background tasks like syncing data
    console.log("Service Worker: Performing background sync")
    
    // Example: Sync offline form submissions, update cache, etc.
    const cache = await caches.open(DYNAMIC_CACHE)
    
    // Update critical resources
    const criticalResources = ["/", "/manifest.json"]
    
    for (const resource of criticalResources) {
      try {
        const response = await fetch(resource)
        if (response.ok) {
          await cache.put(resource, response)
        }
      } catch (error) {
        console.log(`Service Worker: Failed to sync ${resource}:`, error)
      }
    }
    
    console.log("Service Worker: Background sync completed")
  } catch (error) {
    console.log("Service Worker: Background sync failed:", error)
  }
}

// Handle messages from the main thread
self.addEventListener("message", (event) => {
  console.log("Service Worker: Message received:", event.data)
  
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
})

// Periodic background sync (if supported)
self.addEventListener("periodicsync", (event) => {
  console.log("Service Worker: Periodic sync triggered")
  
  if (event.tag === "content-sync") {
    event.waitUntil(doPeriodicSync())
  }
})

async function doPeriodicSync() {
  try {
    console.log("Service Worker: Performing periodic sync")
    
    // Update content periodically
    const cache = await caches.open(DYNAMIC_CACHE)
    
    // Refresh gallery images and content
    const contentToRefresh = [
      "/",
      "/#galleri",
      "/#tjanster"
    ]
    
    for (const content of contentToRefresh) {
      try {
        const response = await fetch(content)
        if (response.ok) {
          await cache.put(content, response)
        }
      } catch (error) {
        console.log(`Service Worker: Failed to refresh ${content}:`, error)
      }
    }
    
    console.log("Service Worker: Periodic sync completed")
  } catch (error) {
    console.log("Service Worker: Periodic sync failed:", error)
  }
}