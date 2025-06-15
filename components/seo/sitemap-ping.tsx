"use server"

export async function pingSitemapToSearchEngines(sitemapUrl: string) {
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://blogs.yandex.ru/pings/?status=success&url=${encodeURIComponent(sitemapUrl)}`,
    `https://www.baidu.com/s?wd=${encodeURIComponent(sitemapUrl)}`,
  ]

  const results = await Promise.allSettled(
    searchEngines.map((url) =>
      fetch(url, { method: "GET" }).then((response) => ({ url, status: response.status, ok: response.ok })),
    ),
  )

  return results.map((result) => {
    if (result.status === "fulfilled") {
      return { success: result.value.ok, url: result.value.url, status: result.value.status }
    } else {
      return { success: false, url: "unknown", error: result.reason }
    }
  })
}
