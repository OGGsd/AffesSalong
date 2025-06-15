"use server"

import { XMLParser } from "fast-xml-parser"

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export async function validateSitemap(sitemapUrl: string): Promise<ValidationResult> {
  try {
    // Fetch the sitemap
    const response = await fetch(sitemapUrl)

    if (!response.ok) {
      return {
        valid: false,
        errors: [`Failed to fetch sitemap: HTTP ${response.status}`],
        warnings: [],
      }
    }

    const xml = await response.text()

    // Parse XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (name) => ["url", "sitemap", "image:image", "video:video"].includes(name),
    })

    try {
      const result = parser.parse(xml)
      const errors: string[] = []
      const warnings: string[] = []

      // Check if it's a sitemap index
      if (result.sitemapindex) {
        // Validate sitemap index
        if (!result.sitemapindex.sitemap || result.sitemapindex.sitemap.length === 0) {
          errors.push("Sitemap index contains no sitemaps")
        } else {
          // Check each sitemap
          for (let i = 0; i < result.sitemapindex.sitemap.length; i++) {
            const sitemap = result.sitemapindex.sitemap[i]

            if (!sitemap.loc) {
              errors.push(`Sitemap at index ${i} is missing loc element`)
            }
          }
        }
      }
      // Check if it's a urlset
      else if (result.urlset) {
        // Validate urlset
        if (!result.urlset.url || result.urlset.url.length === 0) {
          errors.push("Sitemap contains no URLs")
        } else {
          // Check each URL
          for (let i = 0; i < result.urlset.url.length; i++) {
            const url = result.urlset.url[i]

            if (!url.loc) {
              errors.push(`URL at index ${i} is missing loc element`)
            }

            // Check for priority values
            if (url.priority && (Number.parseFloat(url.priority) < 0 || Number.parseFloat(url.priority) > 1)) {
              errors.push(`URL at index ${i} has invalid priority value: ${url.priority}`)
            }

            // Check for changefreq values
            if (
              url.changefreq &&
              !["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].includes(url.changefreq)
            ) {
              errors.push(`URL at index ${i} has invalid changefreq value: ${url.changefreq}`)
            }
          }
        }
      } else {
        errors.push("XML is neither a valid sitemap index nor a valid urlset")
      }

      return {
        valid: errors.length === 0,
        errors,
        warnings,
      }
    } catch (error) {
      return {
        valid: false,
        errors: [`Failed to parse XML: ${error instanceof Error ? error.message : String(error)}`],
        warnings: [],
      }
    }
  } catch (error) {
    return {
      valid: false,
      errors: [`Failed to validate sitemap: ${error instanceof Error ? error.message : String(error)}`],
      warnings: [],
    }
  }
}

export async function validateRobotsTxt(robotsUrl: string): Promise<ValidationResult> {
  try {
    // Fetch the robots.txt
    const response = await fetch(robotsUrl)

    if (!response.ok) {
      return {
        valid: false,
        errors: [`Failed to fetch robots.txt: HTTP ${response.status}`],
        warnings: [],
      }
    }

    const text = await response.text()
    const lines = text.split("\n")

    const errors: string[] = []
    const warnings: string[] = []

    let hasUserAgent = false
    let hasDisallow = false
    let hasSitemap = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Skip comments and empty lines
      if (line.startsWith("#") || line === "") {
        continue
      }

      // Check for User-agent
      if (line.toLowerCase().startsWith("user-agent:")) {
        hasUserAgent = true
      }

      // Check for Disallow
      if (line.toLowerCase().startsWith("disallow:")) {
        hasDisallow = true
      }

      // Check for Sitemap
      if (line.toLowerCase().startsWith("sitemap:")) {
        hasSitemap = true

        // Extract sitemap URL
        const sitemapUrl = line.substring("sitemap:".length).trim()

        // Check if sitemap URL is valid
        if (!sitemapUrl.startsWith("http://") && !sitemapUrl.startsWith("https://")) {
          warnings.push(`Sitemap URL on line ${i + 1} does not start with http:// or https://: ${sitemapUrl}`)
        }
      }
    }

    if (!hasUserAgent) {
      warnings.push("No User-agent directive found")
    }

    if (!hasDisallow) {
      warnings.push("No Disallow directive found")
    }

    if (!hasSitemap) {
      warnings.push("No Sitemap directive found")
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    }
  } catch (error) {
    return {
      valid: false,
      errors: [`Failed to validate robots.txt: ${error instanceof Error ? error.message : String(error)}`],
      warnings: [],
    }
  }
}
