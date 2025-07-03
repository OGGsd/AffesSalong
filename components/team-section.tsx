"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const teamMembers = [
    {
      name: "Fady",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DB7553E4-8856-4C76-B3CC-700B3119C505-6325-0000043A697266E8.jpg-zAsnSlcoN5BPNAHFd4Um7QOtWGB09r.jpeg",
      jobTitle: "Frisör",
      description: "Expert på herrklippning och skäggvård",
    },
    {
      name: "Adnan",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/437A1D0F-5B16-47DC-9A33-079B830D638D-6325-0000043AAF1B22A7.jpg-3wJRhhKA2o05kDjduqLnPIrHLcsLAk.jpeg",
      jobTitle: "Frisör",
      description: "Specialist på moderna frisyrer",
    },
    {
      name: "Elias",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/56AF9B72-FFE2-4361-8168-DAE94D01EBC0-6325-0000043A2FFCC298.jpg-rqUW0laGtLG08cgdRpMn4HnWbeeC7S.jpeg",
      jobTitle: "Frisör",
      description: "Expert på klassiska herrfrisyrer",
    },
    {
      name: "Behnam",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B154D117-9D24-42F2-A40F-37B19348B863-6325-0000043AE528FFFB.jpg-dIdkQbSVCwplqpGiazB6Iy7fY2E5KO.jpeg",
      jobTitle: "Frisör",
      description: "Specialist på skäggvård och styling",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring",
        damping: 20
      }
    }
  }

  return (
    <section id="team" className="py-20 md:py-28 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Vårt Professionella Team
          </motion.h2>
          <motion.div 
            className="w-24 h-1.5 bg-amber-600 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Möt våra erfarna stylister som är dedikerade till att ge dig den perfekta looken.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group"
            >
              <motion.div 
                className="bg-white rounded-3xl shadow-lg overflow-hidden h-full relative"
                whileHover={{ 
                  scale: 1.03,
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ duration: 0.4, type: "spring", damping: 15 }}
              >
                {/* Background gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  initial={false}
                />
                
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={`${member.name} - Frisör på Affes Salong i Jönköping`}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <motion.div 
                  className="p-6 text-center relative z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {member.name}
                  </motion.h3>
                  {member.jobTitle && (
                    <p className="text-amber-600 font-semibold text-lg mb-2">{member.jobTitle}</p>
                  )}
                  {member.description && (
                    <p className="text-gray-600 text-base leading-relaxed">{member.description}</p>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}