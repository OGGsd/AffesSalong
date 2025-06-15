"use server"

import fs from "fs"
import path from "path"
import { format } from "date-fns"

interface SitemapURL {
  loc: string
  lastmod?: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
  alternates?: { hreflang: string; href: string }[]
  images?: { loc: string; title?: string; caption?: string; geoLocation?: string; license?: string }[]
  videos?: {
    thumbnailLoc: string
    title: string
    description: string
    contentLoc?: string
    playerLoc?: string
    duration?: number
    publicationDate?: string
    tags?: string[]
  }[]
}

export async function generateSitemap(
  urls: SitemapURL[],
  outputPath: string,
  type: "main" | "images" | "videos" | "hreflang" | "mobile" | "news",
) {
  const baseUrl = "https://affessalong.axiestudio.se"
  const today = format(new Date(), "yyyy-MM-dd")

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`

  // Add appropriate namespaces based on sitemap type
  let namespaces = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'

  if (type === "images" || type === "main") {
    namespaces += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
  }

  if (type === "videos" || type === "main") {
    namespaces += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"'
  }

  if (type === "hreflang" || type === "main") {
    namespaces += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"'
  }

  if (type === "mobile" || type === "main") {
    namespaces += ' xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"'
  }

  if (type === "news" || type === "main") {
    namespaces += ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"'
  }

  xmlContent += `<urlset ${namespaces}>\n`

  // Add URLs
  for (const url of urls) {
    xmlContent += "  <url>\n"
    xmlContent += `    <loc>${url.loc.startsWith("http") ? url.loc : `${baseUrl}${url.loc}`}</loc>\n`

    if (url.lastmod) {
      xmlContent += `    <lastmod>${url.lastmod}</lastmod>\n`
    }

    if (url.changefreq) {
      xmlContent += `    <changefreq>${url.changefreq}</changefreq>\n`
    }

    if (url.priority !== undefined) {
      xmlContent += `    <priority>${url.priority.toFixed(1)}</priority>\n`
    }

    // Add mobile tag if mobile sitemap
    if (type === "mobile" || type === "main") {
      xmlContent += "    <mobile:mobile/>\n"
    }

    // Add hreflang tags if present
    if (url.alternates && (type === "hreflang" || type === "main")) {
      for (const alternate of url.alternates) {
        xmlContent += `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />\n`
      }
    }

    // Add images if present
    if (url.images && (type === "images" || type === "main")) {
      for (const image of url.images) {
        xmlContent += "    <image:image>\n"
        xmlContent += `      <image:loc>${image.loc.startsWith("http") ? image.loc : `${baseUrl}${image.loc}`}</image:loc>\n`

        if (image.title) {
          xmlContent += `      <image:title>${image.title}</image:title>\n`
        }

        if (image.caption) {
          xmlContent += `      <image:caption>${image.caption}</image:caption>\n`
        }

        if (image.geoLocation) {
          xmlContent += `      <image:geo_location>${image.geoLocation}</image:geo_location>\n`
        }

        if (image.license) {
          xmlContent += `      <image:license>${image.license}</image:license>\n`
        }

        xmlContent += "    </image:image>\n"
      }
    }

    // Add videos if present
    if (url.videos && (type === "videos" || type === "main")) {
      for (const video of url.videos) {
        xmlContent += "    <video:video>\n"
        xmlContent += `      <video:thumbnail_loc>${video.thumbnailLoc.startsWith("http") ? video.thumbnailLoc : `${baseUrl}${video.thumbnailLoc}`}</video:thumbnail_loc>\n`
        xmlContent += `      <video:title>${video.title}</video:title>\n`
        xmlContent += `      <video:description>${video.description}</video:description>\n`

        if (video.contentLoc) {
          xmlContent += `      <video:content_loc>${video.contentLoc.startsWith("http") ? video.contentLoc : `${baseUrl}${video.contentLoc}`}</video:content_loc>\n`
        }

        if (video.playerLoc) {
          xmlContent += `      <video:player_loc>${video.playerLoc}</video:player_loc>\n`
        }

        if (video.duration) {
          xmlContent += `      <video:duration>${video.duration}</video:duration>\n`
        }

        if (video.publicationDate) {
          xmlContent += `      <video:publication_date>${video.publicationDate}</video:publication_date>\n`
        }

        if (video.tags && video.tags.length > 0) {
          for (const tag of video.tags) {
            xmlContent += `      <video:tag>${tag}</video:tag>\n`
          }
        }

        xmlContent += "    </video:video>\n"
      }
    }

    xmlContent += "  </url>\n"
  }

  xmlContent += "</urlset>"

  // Ensure directory exists
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Write sitemap to file
  fs.writeFileSync(outputPath, xmlContent)

  return { success: true, path: outputPath }
}

export async function generateSitemapIndex(sitemaps: { loc: string; lastmod?: string }[], outputPath: string) {
  const baseUrl = "https://affessalong.axiestudio.se"
  const today = format(new Date(), "yyyy-MM-dd")

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xmlContent += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  for (const sitemap of sitemaps) {
    xmlContent += "  <sitemap>\n"
    xmlContent += `    <loc>${sitemap.loc.startsWith("http") ? sitemap.loc : `${baseUrl}${sitemap.loc}`}</loc>\n`

    if (sitemap.lastmod) {
      xmlContent += `    <lastmod>${sitemap.lastmod}</lastmod>\n`
    } else {
      xmlContent += `    <lastmod>${today}</lastmod>\n`
    }

    xmlContent += "  </sitemap>\n"
  }

  xmlContent += "</sitemapindex>"

  // Ensure directory exists
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Write sitemap index to file
  fs.writeFileSync(outputPath, xmlContent)

  return { success: true, path: outputPath }
}
