interface CanonicalURLProps {
  sectionId?: string
}

export default function CanonicalURL({ sectionId }: CanonicalURLProps) {
  // Canonical URLs are now handled by the Metadata API in layout.tsx
  // This component is kept for compatibility but doesn't render anything
  return null
}