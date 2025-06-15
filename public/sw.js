const CACHE_NAME = "affes-salong-v1"
const urlsToCache = [
  "/",
  "/offline",
  "/favicon.ico",
  "/manifest.json",
  "/images/logo.png",
  "/images/hero-background.jpeg",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/apple-touch-icon.png",
  "/maskable-icon.png",
  "/images/offline-image.png",
]

// Install a service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

// Cache and return requests
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // If the request is for a page, return the offline page
          if (event.request.mode === "navigate") {
            return caches.match("/offline")
          }

          // If the request is for an image, return the offline image
          if (event.request.destination === "image") {
            return caches.match("/images/offline-image.png")
          }

          // For other resources, return an empty response
          return new Response("", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          })
        })
    }),
  )
})

// Update a service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        return self.clients.claim()
      }),
  )
})

// Handle push notifications
self.addEventListener("push", (event) => {
  let title = "Affes Salong"
  const options = {
    body: "Ny notifikation från Affes Salong",
    icon: "/icon-192x192.png",
    badge: "/maskable-icon.png",
  }

  if (event.data) {
    try {
      const data = event.data.json()
      title = data.title || title
      options.body = data.body || options.body
    } catch (e) {
      // If JSON parsing fails, use the text
      options.body = event.data.text()
    }
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow("https://affessalong.se"))
})
