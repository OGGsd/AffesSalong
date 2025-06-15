// This file contains non-critical JavaScript that can be loaded during idle time
console.log("Non-critical resources loaded")

// Example: Load analytics or other third-party scripts
// function loadAnalytics() {
//   const script = document.createElement('script');
//   script.src = 'https://www.google-analytics.com/analytics.js';
//   document.body.appendChild(script);
// }

// Example: Prefetch pages the user might navigate to
function prefetchPages() {
  if ("IntersectionObserver" in window) {
    const prefetchLinks = document.querySelectorAll("a[data-prefetch]")

    const prefetchObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target
          const href = link.getAttribute("href")

          if (href && !prefetchedUrls.has(href)) {
            const prefetchLink = document.createElement("link")
            prefetchLink.rel = "prefetch"
            prefetchLink.href = href
            document.head.appendChild(prefetchLink)
            prefetchedUrls.add(href)
          }

          prefetchObserver.unobserve(link)
        }
      })
    })

    prefetchLinks.forEach((link) => {
      prefetchObserver.observe(link)
    })
  }
}

// Set of already prefetched URLs to avoid duplicates
const prefetchedUrls = new Set()

// Initialize when DOM is fully loaded
if (document.readyState === "complete") {
  prefetchPages()
} else {
  window.addEventListener("load", prefetchPages)
}
