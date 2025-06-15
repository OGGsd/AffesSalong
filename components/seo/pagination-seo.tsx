import Head from "next/head"

interface PaginationSEOProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function PaginationSEO({ currentPage, totalPages, baseUrl }: PaginationSEOProps) {
  const prevPage = currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : null
  const nextPage = currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : null

  return (
    <Head>
      {prevPage && <link rel="prev" href={prevPage} />}
      {nextPage && <link rel="next" href={nextPage} />}

      {/* Canonical URL for the current page */}
      <link rel="canonical" href={currentPage === 1 ? baseUrl : `${baseUrl}?page=${currentPage}`} />
    </Head>
  )
}
