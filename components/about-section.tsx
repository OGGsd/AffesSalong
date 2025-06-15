"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Scissors, Star, Users, Clock, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ReviewsModal from "./reviews-modal"
import { useDeviceDetection } from "./responsive-utils"
import SectionSEO from "./seo/section-seo"

export default function AboutSection() {
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false)
  const deviceType = useDeviceDetection()

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="om-oss" className="py-16 sm:py-20 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
      {/* Add SEO metadata for this section */}
      <SectionSEO
        sectionId="om-oss"
        title="Om Affes Salong - Premium Frisörsalong i Jönköping"
        description="Affes Salong grundades 1991 och har sedan dess varit ett föredöme för högkvalitativa behandlingar och personlig service i Jönköping."
        type="AboutPage"
      />

      <div className="container mx-auto max-w-6xl">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Section Title - Mobile */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Hos Oss På Affes Salong</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
          </div>

          {/* Logo Card - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col items-center"
          >
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/images/logo.png"
                alt="Affes Salong Logo - Premium frisörsalong i Jönköping"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px"
                priority
              />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-1">Affes Salong</h3>
            <p className="text-center text-gray-600 text-sm">Premium barber shop sedan 1991</p>
          </motion.div>

          {/* Description Text - Mobile */}
          <div className="mb-8">
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Affes Salong grundades 1991 och har sedan dess varit ett föredöme för högkvalitativa behandlingar och
              personlig service i Jönköping. Vi tror på att skapa en unik och avslappnad atmosfär där våra kunder kan
              njuta av en lyxupplevelse.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Vår största prioritet är att leverera enastående tjänster och produkter till våra kunder. Vi strävar
              alltid efter att uppfylla och överträffa deras förväntningar genom att erbjuda skräddarsydda lösningar som
              passar deras individuella behov.
            </p>
          </div>

          {/* Features Grid - Mobile */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="flex flex-col items-center p-3 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
              <div className="bg-amber-100 p-2 rounded-lg mb-2">
                <Scissors className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-center text-base">Expert Frisör</h3>
              <p className="text-gray-600 text-xs text-center">Erfarna stylister</p>
            </div>

            <div className="flex flex-col items-center p-3 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
              <div className="bg-amber-100 p-2 rounded-lg mb-2">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-center text-base">Premium Produkter</h3>
              <p className="text-gray-600 text-xs text-center">Endast det bästa</p>
            </div>

            <div className="flex flex-col items-center p-3 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
              <div className="bg-amber-100 p-2 rounded-lg mb-2">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-center text-base">Kundupplevelse</h3>
              <p className="text-gray-600 text-xs text-center">Personlig service</p>
            </div>

            <div className="flex flex-col items-center p-3 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
              <div className="bg-amber-100 p-2 rounded-lg mb-2">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-center text-base">Flexibla Tider</h3>
              <p className="text-gray-600 text-xs text-center">För ditt schema</p>
            </div>
          </div>

          {/* Action Buttons - Mobile */}
          <div className="flex flex-col gap-3 mb-6">
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 py-3 h-auto"
              onClick={() => scrollToSection("tjanster")}
            >
              Se Våra Tjänster
            </Button>

            <Button
              variant="outline"
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 flex items-center justify-center py-3 h-auto"
              onClick={() => setIsReviewsModalOpen(true)}
            >
              <Star className="mr-2 h-4 w-4 fill-amber-500 text-amber-500" />
              Se Vad Folk Betyg Oss
            </Button>
          </div>

          {/* Social Media Links - Mobile */}
          <div className="flex flex-col gap-3">
            <a
              href="https://www.instagram.com/affessalong.jonkoping/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full text-gray-700 hover:text-amber-600 transition-colors border border-gray-200 rounded-md py-3 px-4"
            >
              <Instagram className="h-5 w-5 mr-2" />
              <span>@affessalong.jonkoping</span>
            </a>
            <a
              href="https://www.tiktok.com/@affes.salong"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full text-gray-700 hover:text-amber-600 transition-colors border border-gray-200 rounded-md py-3 px-4"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <span>@affes.salong</span>
            </a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Left Column - Logo and Image (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-5/12"
          >
            <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
              <div className="relative w-64 h-64 mb-6">
                <Image
                  src="/images/logo.png"
                  alt="Affes Salong Logo - Premium frisörsalong i Jönköping sedan 1991"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 256px"
                  priority
                />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Affes Salong</h3>
              <p className="text-center text-gray-600">Premium barber shop sedan 1991</p>
            </div>
          </motion.div>

          {/* Right Column - Content (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-7/12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Hos Oss På Affes Salong</h2>
            <div className="w-20 h-1 bg-amber-500 mb-6"></div>

            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Affes Salong grundades 1991 och har sedan dess varit ett föredöme för högkvalitativa behandlingar och
                personlig service i Jönköping. Vi tror på att skapa en unik och avslappnad atmosfär där våra kunder kan
                njuta av en lyxupplevelse.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Vår största prioritet är att leverera enastående tjänster och produkter till våra kunder. Vi strävar
                alltid efter att uppfylla och överträffa deras förväntningar genom att erbjuda skräddarsydda lösningar
                som passar deras individuella behov.
              </p>
            </div>

            {/* Features Grid - Desktop */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start p-4 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
                <div className="bg-amber-100 p-2 rounded-lg mr-3 flex-shrink-0">
                  <Scissors className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Expert Frisör</h3>
                  <p className="text-gray-600 text-sm">Erfarna och skickliga stylister</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
                <div className="bg-amber-100 p-2 rounded-lg mr-3 flex-shrink-0">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Premium Produkter</h3>
                  <p className="text-gray-600 text-sm">Vi använder bara det bästa</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
                <div className="bg-amber-100 p-2 rounded-lg mr-3 flex-shrink-0">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Kundupplevelse</h3>
                  <p className="text-gray-600 text-sm">Personlig och anpassad service</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
                <div className="bg-amber-100 p-2 rounded-lg mr-3 flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Flexibla Tider</h3>
                  <p className="text-gray-600 text-sm">Tider som passar ditt schema</p>
                </div>
              </div>
            </div>

            {/* Action Buttons and Social Links - Desktop */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <Button
                  className="bg-amber-600 hover:bg-amber-700 px-6 py-2 h-auto"
                  onClick={() => scrollToSection("tjanster")}
                >
                  Se Våra Tjänster
                </Button>

                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 flex items-center justify-center px-6 py-2 h-auto"
                  onClick={() => setIsReviewsModalOpen(true)}
                >
                  <Star className="mr-2 h-4 w-4 fill-amber-500 text-amber-500" />
                  Se Vad Folk Betyg Oss
                </Button>
              </div>

              <div className="flex gap-6">
                <a
                  href="https://www.instagram.com/affessalong.jonkoping/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  <span>@affessalong.jonkoping</span>
                </a>
                <a
                  href="https://www.tiktok.com/@affes.salong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span>@affes.salong</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reviews Modal */}
      <ReviewsModal isOpen={isReviewsModalOpen} onClose={() => setIsReviewsModalOpen(false)} />
    </section>
  )
}
