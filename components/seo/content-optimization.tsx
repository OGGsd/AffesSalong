import type React from "react"

interface ContentOptimizationProps {
  keyword: string
  heading: string
  children: React.ReactNode
}

export default function ContentOptimization({ keyword, heading, children }: ContentOptimizationProps) {
  // Convert heading to kebab-case for id
  const headingId = heading.toLowerCase().replace(/\s+/g, "-")

  return (
    <section className="content-section py-12" data-keyword={keyword} aria-labelledby={headingId}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center" id={headingId}>
          {heading}
        </h2>
        {children}
      </div>
    </section>
  )
}
