"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

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

  const features = [
    { title: "Expert Frisör", desc: "Erfarna och skickliga stylister" },
    { title: "Premium Produkter", desc: "Vi använder bara det bästa" },
    { title: "Kundupplevelse", desc: "Personlig och anpassad service" },
    { title: "Flexibla Tider", desc: "Tider som passar ditt schema" }
  ]

  return (
    <section id="om-oss" className="py-20 md:py-28 px-6 md:px-8 lg:px-12 bg-white" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Hos Oss På Affes Salong
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1.5 bg-amber-600 mx-auto mb-8"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-10 flex flex-col items-center relative overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
            
            <motion.div
              className="relative w-72 h-72 mb-8"
              whileHover={{ rotate: 3, scale: 1.05 }}
              transition={{ duration: 0.4, type: "spring", damping: 15 }}
            >
              <img
                src="/images/logo.png"
                alt="Affes Salong Logo"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Affes Salong</h3>
              <p className="text-xl text-gray-600 font-medium">Premium barber shop sedan 1991</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.p 
                className="text-xl text-gray-700 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Affes Salong grundades 1991 och har sedan dess varit ett föredöme för högkvalitativa behandlingar och
                personlig service i Jönköping. Vi tror på att skapa en unik och avslappnad atmosfär där våra kunder kan
                njuta av en lyxupplevelse.
              </motion.p>
              <motion.p 
                className="text-xl text-gray-700 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Vår största prioritet är att leverera enastående tjänster och produkter till våra kunder. Vi strävar
                alltid efter att uppfylla och överträffa deras förväntningar genom att erbjuda skräddarsydda lösningar
                som passar deras individuella behov.
              </motion.p>
            </div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(217, 119, 6, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center border border-amber-200"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-base">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="pt-4"
            >
              <motion.button
                onClick={() => scrollToSection("tjanster")}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px -5px rgba(217, 119, 6, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Se Våra Tjänster
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}