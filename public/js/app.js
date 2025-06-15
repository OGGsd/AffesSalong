// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        console.log("ServiceWorker registration successful with scope: ", registration.scope)
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err)
      },
    )
  })
}

// Handle offline/online events
window.addEventListener("online", () => {
  console.log("You are now online")
  document.body.classList.remove("offline")
  document.body.classList.add("online")
})

window.addEventListener("offline", () => {
  console.log("You are now offline")
  document.body.classList.remove("online")
  document.body.classList.add("offline")
})
