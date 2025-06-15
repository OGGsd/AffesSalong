"use server"

import fs from "fs"
import path from "path"

interface RobotsRule {
  userAgent: string
  allow?: string[]
  disallow?: string[]
  crawlDelay?: number
  sitemaps?: string[]
  host?: string
  cleanParam?: string[]
  noindex?: string[]
  comment?: string
}

export async function generateRobotsTxt(rules: RobotsRule[], outputPath: string) {
  const baseUrl = "https://affessalong.axiestudio.se"
  let content = `# Affes Salong - Comprehensive Robots.txt\n`
  content += `# Last updated: ${new Date().toISOString().split("T")[0]}\n`
  content += `# Website: ${baseUrl}\n\n`

  // Process each rule
  for (const rule of rules) {
    // Add comment if present
    if (rule.comment) {
      content += `# ${rule.comment}\n`
    }

    // Add user agent
    content += `User-agent: ${rule.userAgent}\n`

    // Add allow rules
    if (rule.allow && rule.allow.length > 0) {
      for (const allow of rule.allow) {
        content += `Allow: ${allow}\n`
      }
    }

    // Add disallow rules
    if (rule.disallow && rule.disallow.length > 0) {
      for (const disallow of rule.disallow) {
        content += `Disallow: ${disallow}\n`
      }
    }

    // Add crawl delay
    if (rule.crawlDelay !== undefined) {
      content += `Crawl-delay: ${rule.crawlDelay}\n`
    }

    // Add sitemaps
    if (rule.sitemaps && rule.sitemaps.length > 0) {
      for (const sitemap of rule.sitemaps) {
        content += `Sitemap: ${sitemap.startsWith("http") ? sitemap : `${baseUrl}${sitemap}`}\n`
      }
    }

    // Add host
    if (rule.host) {
      content += `Host: ${rule.host}\n`
    }

    // Add clean-param
    if (rule.cleanParam && rule.cleanParam.length > 0) {
      for (const cleanParam of rule.cleanParam) {
        content += `Clean-param: ${cleanParam}\n`
      }
    }

    // Add noindex
    if (rule.noindex && rule.noindex.length > 0) {
      for (const noindex of rule.noindex) {
        content += `Noindex: ${noindex}\n`
      }
    }

    // Add blank line between rules
    content += "\n"
  }

  // Ensure directory exists
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Write robots.txt to file
  fs.writeFileSync(outputPath, content)

  return { success: true, path: outputPath }
}
