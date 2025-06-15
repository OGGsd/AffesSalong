import Head from "next/head"

export default function HreflangTags() {
  return (
    <Head>
      <link rel="alternate" href="https://affessalong.axiestudio.se" hrefLang="sv-se" />
      <link rel="alternate" href="https://affessalong.axiestudio.se" hrefLang="x-default" />
      <link rel="alternate" href="https://affessalong.axiestudio.se/en" hrefLang="en" />
    </Head>
  )
}
