interface PaginationSEOProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function PaginationSEO({ currentPage, totalPages, baseUrl }: PaginationSEOProps) {
  // Pagination SEO is now handled by the Metadata API in individual page components
  // This component is kept for compatibility but doesn't render anything
  return null
}