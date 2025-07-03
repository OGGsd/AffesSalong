"use client"

import { useState } from "react"

interface Service {
  id: string
  name: string
  price: number
  duration: string
  bookingLink: string
  category: string[]
  description?: string
  popular?: boolean
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "Alla" },
    { id: "haircut", label: "Klippning" },
    { id: "beard", label: "Skägg" },
    { id: "student", label: "Student" },
    { id: "other", label: "Övrigt" },
  ]

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => service.category.includes(activeCategory))

  return (
    <section id="tjanster" className="py-16 px-4 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Våra Tjänster</h2>
          <div className="amber-divider"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi erbjuder ett brett utbud av professionella tjänster för att möta dina behov.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category.id
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              {service.popular && (
                <div className="popular-badge">
                  <span>★</span>
                  Populär
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              
              <div className="text-gray-500 mb-3 text-sm">
                ⏰ {service.duration}
              </div>

              {service.description && (
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              )}

              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold text-amber-600">{service.price} kr</span>
                <a
                  href={service.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded font-medium"
                >
                  Boka Nu
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}