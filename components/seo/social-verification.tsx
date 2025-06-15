import Head from "next/head"

export default function SocialVerification() {
  return (
    <Head>
      {/* Facebook Domain Verification */}
      <meta name="facebook-domain-verification" content="your-facebook-verification-code" />

      {/* Pinterest Verification */}
      <meta name="p:domain_verify" content="your-pinterest-verification-code" />

      {/* Google Site Verification */}
      <meta name="google-site-verification" content="your-google-verification-code" />

      {/* Bing Webmaster Tools Verification */}
      <meta name="msvalidate.01" content="your-bing-verification-code" />

      {/* Yandex Webmaster Verification */}
      <meta name="yandex-verification" content="your-yandex-verification-code" />
    </Head>
  )
}
