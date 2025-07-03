import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import TeamSection from "@/components/team-section"
import ServicesSection from "@/components/services-section"
import GallerySection from "@/components/gallery-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

// Define the services
const services = [
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

// Gallery images
const galleryImages = [
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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ServicesSection services={services} />
      <GallerySection images={galleryImages} />
      <ContactSection />
      <Footer />
    </div>
  )
}