import Head from "next/head"

interface CanonicalURLProps {
  sectionId?: string
}

export default function CanonicalURL({ sectionId }: CanonicalURLProps) {
  const baseUrl = "https://affessalong.axiestudio.se"
  const canonicalUrl = sectionId ? `${baseUrl}/#${sectionId}` : baseUrl

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
