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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="om-oss" className="py-16 sm:py-20 md:py-24 px-4 md:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
          >
            Hos Oss På Affes Salong
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-1 bg-amber-600 mx-auto mb-6"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-64 h-64 mb-6"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/logo.png"
                alt="Affes Salong Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Affes Salong</h3>
            <p className="text-center text-gray-600">Premium barber shop sedan 1991</p>
          </motion.div>

          <motion.div variants={itemVariants}>
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

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {[
                { icon: "👨‍💼", title: "Expert Frisör", desc: "Erfarna och skickliga stylister" },
                { icon: "⭐", title: "Premium Produkter", desc: "Vi använder bara det bästa" },
                { icon: "👥", title: "Kundupplevelse", desc: "Personlig och anpassad service" },
                { icon: "⏰", title: "Flexibla Tider", desc: "Tider som passar ditt schema" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start p-4 bg-amber-50 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-amber-100 p-2 rounded-lg mr-3 text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <motion.button
                onClick={() => scrollToSection("tjanster")}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
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