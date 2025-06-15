"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useDeviceDetection } from "./responsive-utils"
import SectionSEO from "./seo/section-seo"

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const deviceType = useDeviceDetection()

  // Team members data
  const teamMembers = [
    {
      name: "Fady",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DB7553E4-8856-4C76-B3CC-700B3119C505-6325-0000043A697266E8.jpg-zAsnSlcoN5BPNAHFd4Um7QOtWGB09r.jpeg",
      jobTitle: "Frisör",
      description: "Expert på herrklippning och skäggvård",
    },
    {
      name: "Adnan",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/437A1D0F-5B16-47DC-9A33-079B830D638D-6325-0000043AAF1B22A7.jpg-3wJRhhKA2o05kDjduqLnPIrHLcsLAk.jpeg",
      jobTitle: "Frisör",
      description: "Specialist på moderna frisyrer",
    },
    {
      name: "Elias",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/56AF9B72-FFE2-4361-8168-DAE94D01EBC0-6325-0000043A2FFCC298.jpg-rqUW0laGtLG08cgdRpMn4HnWbeeC7S.jpeg",
      jobTitle: "Frisör",
      description: "Expert på klassiska herrfrisyrer",
    },
    {
      name: "Behnam",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B154D117-9D24-42F2-A40F-37B19348B863-6325-0000043AE528FFFB.jpg-dIdkQbSVCwplqpGiazB6Iy7fY2E5KO.jpeg",
      jobTitle: "Frisör",
      description: "Specialist på skäggvård och styling",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  // Smooth scroll function
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const contactSection = document.getElementById("kontakt")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Get grid columns based on device type
  const getGridColumns = () => {
    if (deviceType === "mobile") return "grid-cols-1 sm:grid-cols-2 gap-6"
    if (deviceType === "tablet") return "grid-cols-2 gap-6"
    return "grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
  }

  return (
    <section id="team" className="py-16 sm:py-20 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
      {/* Add SEO metadata for this section */}
      <SectionSEO
        sectionId="team"
        title="Vårt Team på Affes Salong - Professionella Frisörer i Jönköping"
        description="Möt våra erfarna stylister på Affes Salong i Jönköping som är dedikerade till att ge dig den perfekta looken."
        type="AboutPage"
        employees={teamMembers.map((member) => ({
          name: member.name,
          image: member.image,
          jobTitle: member.jobTitle || "Frisör",
        }))}
      />

      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-3">
            <div className="bg-amber-500 p-2 sm:p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 sm:h-6 sm:w-6 text-white"
              >
                <path d="M8.5 3a1.5 1.5 0 0 0-3 0" />
                <path d="M18.5 3a1.5 1.5 0 0 0-3 0" />
                <path d="M8.5 3h10" />
                <path d="M9.5 3h5" />
                <path d="M6 3h1" />
                <path d="M17 3h1" />
                <path d="M13.5 14.5V12" />
                <path d="M10 14.5H17" />
                <path d="M2 5h20v16H2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl mb-4">Vårt Professionella Team</h2>
          <div className="w-16 sm:w-20 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Möt våra erfarna stylister som är dedikerade till att ge dig den perfekta looken.
          </p>
        </motion.div>

        <motion.div
          className={`grid ${getGridColumns()}`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={cardVariants} className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105 h-full">
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name} - Frisör på Affes Salong i Jönköping`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Social links that appear on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-center space-x-3">
                      <Link
                        href="#kontakt"
                        onClick={scrollToContact}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-5 w-5 text-white" />
                      </Link>
                      <Link
                        href="#kontakt"
                        onClick={scrollToContact}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                        aria-label={`Ring ${member.name}`}
                      >
                        <Phone className="h-5 w-5 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold">{member.name}</h3>
                  {member.jobTitle && <p className="text-gray-600 text-sm">{member.jobTitle}</p>}
                  {member.description && <p className="text-gray-500 text-xs mt-1">{member.description}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
