import ParallaxHero from "@/components/parallax-hero"
import ServicesSection from "@/components/services-section"
import GallerySection from "@/components/gallery-section"
import ContactSection from "@/components/contact-section"
import TeamSection from "@/components/team-section"
import AboutSection from "@/components/about-section"
import CookieConsent from "@/components/cookie-consent"
import PWANotification from "@/components/pwa-notification"
import Footer from "@/components/footer"
import InternalLinks from "@/components/seo/internal-links"
import ContentOptimization from "@/components/seo/content-optimization"

// SEO Components
import AboutSectionSEO from "@/components/seo/about-section-seo"
import TeamSectionSEO from "@/components/seo/team-section-seo"
import ServicesSectionSEO from "@/components/seo/services-section-seo"
import GallerySectionSEO from "@/components/seo/gallery-section-seo"
import ContactSectionSEO from "@/components/seo/contact-section-seo"
import FAQSchema from "@/components/seo/faq-schema"
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema"
import EnhancedLocalBusinessSchema from "@/components/seo/enhanced-local-business-schema"
import VoiceSearchOptimization from "@/components/seo/voice-search-optimization"
import SpeakableSchema from "@/components/seo/speakable-schema"
import HreflangTags from "@/components/seo/hreflang-tags"
import TechnicalSEO from "@/components/seo/technical-seo"
import SocialVerification from "@/components/seo/social-verification"
import EventSchema from "@/components/seo/event-schema"
import ProductSchema from "@/components/seo/product-schema"
import VideoSchema from "@/components/seo/video-schema"
import ArticleSchema from "@/components/seo/article-schema"
import JobPostingSchema from "@/components/seo/job-posting-schema"
import WebsiteSchema from "@/components/seo/website-schema"
import OrganizationSchema from "@/components/seo/organization-schema"
import ImageOptimization from "@/components/seo/image-optimization"
import PerformanceOptimization from "@/components/seo/performance-optimization"
import MobileOptimization from "@/components/seo/mobile-optimization"
import AnalyticsIntegration from "@/components/seo/analytics-integration"

// Define the services and gallery images outside the component
// to avoid any rendering issues

// Update the enhancedServices array to ensure student services are only in the student category
const enhancedServices = [
  {
    id: "haircut-beard",
    name: "Klippning & Skäggtrimning",
    price: 550,
    duration: "60 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/klippning-och-skaggtrimmning-92569",
    category: ["haircut", "beard"],
    description: "Komplett styling med både hår och skägg för ett perfekt utseende.",
    popular: true,
  },
  {
    id: "haircut-men",
    name: "Klippning, Herr",
    price: 420,
    duration: "30 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/klippning-herr-92535",
    category: ["haircut"],
    description: "Professionell herrklippning anpassad efter dina önskemål.",
    popular: true,
  },
  {
    id: "beard-shave",
    name: "Skägg rakning",
    price: 200,
    duration: "30 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/skagg-rakning-92521",
    category: ["beard"],
    description: "Klassisk rakning med varma handdukar och rakkniv.",
  },
  {
    id: "beard-trim",
    name: "Skägg trimning",
    price: 200,
    duration: "30 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/skagg-trimming-92522",
    category: ["beard"],
    description: "Formning och trimning av skägg för ett välvårdat utseende.",
  },
  {
    id: "haircut-kids",
    name: "Klippning Barn upp till 12 år",
    price: 295,
    duration: "30 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/klippning-barn-upp-till-12-ar-92566",
    category: ["haircut"],
    description: "Barnklippning i en trygg och rolig miljö.",
  },
  {
    id: "buzz-cut",
    name: "Snagg",
    price: 195,
    duration: "15 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/snagg-92536",
    category: ["haircut"],
    description: "Snabb och enkel klippning med maskin.",
  },
  {
    id: "student-haircut-beard",
    name: "(Student) Klippning och skäggtrimmning",
    price: 465,
    duration: "60 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/student-klippning-och-skaggtrimmning-3174641",
    category: ["student"],
    description: "Komplett styling för studenter med studentrabatt.",
  },
  {
    id: "student-haircut",
    name: "(Student) Klippning, Herr",
    price: 285,
    duration: "30 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/studentklippning-herr-3174644",
    category: ["student"],
    description: "Herrklippning med studentrabatt.",
  },
  {
    id: "student-beard",
    name: "(Student) Skägg trimmning",
    price: 180,
    duration: "30 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/student-skagg-trimmning-3174643",
    category: ["student"],
    description: "Skäggtrimning med studentrabatt.",
  },
  {
    id: "threading",
    name: "Trådning",
    price: 175,
    duration: "15 minuter",
    bookingLink: "https://www.bokadirekt.se/boka-tjanst/affessalong-10813/tradning-92568",
    category: ["other"],
    description: "Precisionsformning av ögonbryn med tråd.",
  },
]

// Create a unique gallery images array by checking for duplicate src values
const allGalleryImages = [
  { src: "/images/gallery/client1.jpeg", alt: "Herrklippning med fade hos Affes Salong i Jönköping" },
  { src: "/images/gallery/client2.jpeg", alt: "Stilig herrfrisyr från Affes Salong" },
  { src: "/images/gallery/client3.jpeg", alt: "Modern herrklippning i Jönköping" },
  { src: "/images/gallery/client4.jpeg", alt: "Trendig frisyr med textur från Affes Salong" },
  { src: "/images/gallery/client5.jpeg", alt: "Ungdomsfrisyr med volym hos Affes Salong" },
  { src: "/images/gallery/client6.jpeg", alt: "Kort herrklippning i Jönköping" },
  { src: "/images/gallery/client7.jpeg", alt: "Skägg och frisyr kombination från Affes Salong" },
  { src: "/images/gallery/client8.jpeg", alt: "Stilren herrklippning hos Affes Salong i Jönköping" },
  { src: "/images/gallery/client9.jpeg", alt: "Modern herrfrisyr med sidoparti från Affes Salong" },
  { src: "/images/gallery/client10.jpeg", alt: "Skägg och fade kombination i Jönköping" },
  { src: "/images/gallery/client11.jpeg", alt: "Blond herrfrisyr från Affes Salong" },
  { src: "/images/gallery/client12.jpeg", alt: "Klassisk herrfrisyr hos Affes Salong i Jönköping" },
  { src: "/images/gallery/client13.jpeg", alt: "Kort fade med välvårdat skägg från Affes Salong" },
  { src: "/images/gallery/client14.jpeg", alt: "Stilig herrklippning med längd på toppen i Jönköping" },
  { src: "/images/gallery/client15.jpeg", alt: "Elegant herrfrisyr från Affes Salong" },
  { src: "/images/gallery/client16.jpeg", alt: "Ungdomsstil med textur hos Affes Salong i Jönköping" },
  { src: "/images/gallery/client17.jpeg", alt: "Modern kort frisyr från Affes Salong" },
  { src: "/images/gallery/client18.jpeg", alt: "Fade med välformat skägg i Jönköping" },
  { src: "/images/gallery/client19.jpeg", alt: "Stilig ungdomsfrisyr från Affes Salong" },
  { src: "/images/gallery/client20.jpeg", alt: "Barnklippning hos Affes Salong i Jönköping" },
  { src: "/images/gallery/client21.jpeg", alt: "Herrfrisyr med välvårdat skägg från Affes Salong" },
  { src: "/images/gallery/client22.jpeg", alt: "Klassisk herrklippning i Jönköping" },
  { src: "/images/gallery/client23.jpeg", alt: "Elegant herrfrisyr med sidoparti från Affes Salong" },
]

// Filter out duplicates by checking the src property
const uniqueGalleryImages = allGalleryImages.filter(
  (image, index, self) => index === self.findIndex((t) => t.src === image.src),
)

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* SEO Components */}
      <AboutSectionSEO />
      <TeamSectionSEO />
      <ServicesSectionSEO services={enhancedServices} />
      <GallerySectionSEO images={uniqueGalleryImages} />
      <ContactSectionSEO />

      {/* Advanced SEO Components */}
      <FAQSchema />
      <BreadcrumbSchema />
      <EnhancedLocalBusinessSchema />
      <SpeakableSchema />
      <HreflangTags />
      <TechnicalSEO />
      <SocialVerification />
      <EventSchema />
      <ProductSchema />
      <VideoSchema />
      <ArticleSchema />
      <JobPostingSchema />
      <WebsiteSchema />
      <OrganizationSchema />
      <InternalLinks />
      <VoiceSearchOptimization />
      <ImageOptimization />
      <PerformanceOptimization />
      <MobileOptimization />
      <AnalyticsIntegration />

      {/* Hero Section */}
      <ParallaxHero />

      {/* Combined Welcome and About (Hos Oss) */}
      <ContentOptimization keyword="frisörsalong jönköping" heading="Om Affes Salong">
        <AboutSection />
      </ContentOptimization>

      {/* Vårt Team */}
      <ContentOptimization keyword="frisörer jönköping" heading="Vårt Team">
        <TeamSection />
      </ContentOptimization>

      {/* Tjänster */}
      <ContentOptimization keyword="herrklippning jönköping" heading="Våra Tjänster">
        <ServicesSection services={enhancedServices} />
      </ContentOptimization>

      {/* Foto Galleri */}
      <ContentOptimization keyword="frisyrer jönköping" heading="Galleri">
        <GallerySection images={uniqueGalleryImages} />
      </ContentOptimization>

      {/* Combined Öppettider and Kontakt Section */}
      <ContentOptimization keyword="frisör jönköping kontakt" heading="Kontakta Oss">
        <ContactSection />
      </ContentOptimization>

      {/* Footer - Now using our updated component */}
      <Footer />

      {/* Cookie Consent */}
      <CookieConsent />

      {/* PWA Installation Notification */}
      <PWANotification />
    </div>
  )
}
