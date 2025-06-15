"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"
import ServiceCard from "./service-card"
import MobileServiceCard from "./mobile-service-card"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import SectionSEO from "./seo/section-seo"

// Define service categories
const categories = [
  { id: "all", label: "Alla" },
  { id: "haircut", label: "Klippning" },
  { id: "beard", label: "Skägg" },
  { id: "student", label: "Student" },
  { id: "other", label: "Övrigt" },
]

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
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredServices, setFilteredServices] = useState<Service[]>(services)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600])
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc" | "name-asc" | "name-desc" | "popular">(
    "popular",
  )

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  // Media queries for responsive design
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const isMobile = useMediaQuery("(max-width: 767px)")

  // Get min and max prices from services
  const minPrice = Math.min(...services.map((service) => service.price))
  const maxPrice = Math.max(...services.map((service) => service.price))

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort services based on active category, search query, and price range
  useEffect(() => {
    let result = [...services]

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((service) => service.category.includes(activeCategory))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.description?.toLowerCase().includes(query) ||
          service.price.toString().includes(query) ||
          service.duration.toLowerCase().includes(query),
      )
    }

    // Filter by price range
    result = result.filter((service) => service.price >= priceRange[0] && service.price <= priceRange[1])

    // Sort services
    switch (sortOrder) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "popular":
        result.sort((a, b) => {
          if (a.popular && !b.popular) return -1
          if (!a.popular && b.popular) return 1
          return 0
        })
        break
    }

    setFilteredServices(result)
  }, [activeCategory, searchQuery, services, priceRange, sortOrder])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
  }

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  const resetFilters = () => {
    setActiveCategory("all")
    setSearchQuery("")
    setPriceRange([minPrice, maxPrice])
    setSortOrder("popular")
  }

  // Prepare service offers for SEO
  const serviceOffers = services.map((service) => ({
    name: service.name,
    description: service.description || `${service.name} på Affes Salong i Jönköping`,
    price: service.price,
    priceCurrency: "SEK",
  }))

  return (
    <section
      id="tjanster"
      className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      ref={sectionRef}
    >
      {/* Add SEO metadata for this section */}
      <SectionSEO
        sectionId="tjanster"
        title="Tjänster och Priser - Affes Salong i Jönköping"
        description="Vi erbjuder ett brett utbud av professionella frisörtjänster i Jönköping, inklusive herrklippning, skäggtrimning och mer."
        type="Service"
        offers={serviceOffers}
      />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-3">
            <div className="bg-amber-500 p-3 rounded-full">
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
                className="h-6 w-6 text-white"
              >
                <path d="M3 22v-3.92a2.43 2.43 0 0 1 .76-1.78L9 11.8V8.17a3 3 0 0 1 .34-1.38L12 2l2.66 4.8A3 3 0 0 1 15 8.17v3.63l5.24 4.5c.46.39.72.96.76 1.55V22" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Våra Tjänster</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi erbjuder ett brett utbud av professionella tjänster för att möta dina behov.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={filterVariants}
          className="mb-8"
        >
          {/* Improved mobile category tabs */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 mb-4">
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="w-full flex flex-nowrap gap-1 justify-start md:justify-center">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white whitespace-nowrap px-4 flex-shrink-0"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Improved search and filter controls */}
          <div className="flex flex-col sm:flex-row w-full gap-3 mb-6">
            {/* Search Bar */}
            <div className="relative w-full flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Sök tjänst..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-300 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300 flex items-center gap-2 py-3 h-auto"
              aria-label={showFilters ? "Dölj filter" : "Visa filter"}
            >
              {showFilters ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
              <span>{showFilters ? "Dölj filter" : "Filter"}</span>
            </Button>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-gray-50 rounded-lg p-4 mb-6 shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range Slider */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Prisintervall: {priceRange[0]} - {priceRange[1]} kr
                    </h3>
                    <Slider
                      defaultValue={[minPrice, maxPrice]}
                      min={minPrice}
                      max={maxPrice}
                      step={5}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceRangeChange}
                      className="mb-6"
                    />
                  </div>

                  {/* Sort Options */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Sortera efter</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder("price-asc")}
                        className={cn(
                          "border-gray-300",
                          sortOrder === "price-asc" && "bg-amber-100 border-amber-300 text-amber-800",
                        )}
                      >
                        Pris: Lägst först
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder("price-desc")}
                        className={cn(
                          "border-gray-300",
                          sortOrder === "price-desc" && "bg-amber-100 border-amber-300 text-amber-800",
                        )}
                      >
                        Pris: Högst först
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder("name-asc")}
                        className={cn(
                          "border-gray-300",
                          sortOrder === "name-asc" && "bg-amber-100 border-amber-300 text-amber-800",
                        )}
                      >
                        Namn: A-Ö
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder("popular")}
                        className={cn(
                          "border-gray-300",
                          sortOrder === "popular" && "bg-amber-100 border-amber-300 text-amber-800",
                        )}
                      >
                        Populära först
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Reset Filters Button */}
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="text-gray-600 hover:text-amber-600"
                  >
                    Återställ filter
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Display */}
          {(activeCategory !== "all" || searchQuery || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeCategory !== "all" && (
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Kategori: {categories.find((c) => c.id === activeCategory)?.label}
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="ml-2 text-amber-600 hover:text-amber-800"
                    aria-label="Ta bort kategorifilter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {searchQuery && (
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Sök: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-2 text-amber-600 hover:text-amber-800"
                    aria-label="Ta bort sökfilter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Pris: {priceRange[0]} - {priceRange[1]} kr
                  <button
                    onClick={() => setPriceRange([minPrice, maxPrice])}
                    className="ml-2 text-amber-600 hover:text-amber-800"
                    aria-label="Ta bort prisfilter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Services Grid with Loading State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Skeleton Loading UI
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 h-[200px]">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-6 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              key={activeCategory + searchQuery + priceRange.join("-") + sortOrder}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.length > 0 ? (
                filteredServices.map((service) =>
                  isMobile ? (
                    <MobileServiceCard key={service.id} service={service} />
                  ) : (
                    <ServiceCard key={service.id} service={service} />
                  ),
                )
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg mb-2">Inga tjänster hittades med dina filter.</p>
                  <p className="text-gray-400 mb-6">Försök med andra sökkriterier eller återställ filtren.</p>
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    Återställ alla filter
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
