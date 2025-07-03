"use client"

import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="relative h-10 w-10">
            <img
              src="/images/logo.png"
              alt="Affes Salong"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold text-gray-900">Affes Salong</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <button
            onClick={() => scrollToSection("om-oss")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
          >
            Hos Oss
          </button>
          <button
            onClick={() => scrollToSection("team")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
          >
            Team
          </button>
          <button
            onClick={() => scrollToSection("tjanster")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
          >
            Tjänster
          </button>
          <button
            onClick={() => scrollToSection("galleri")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
          >
            Galleri
          </button>
          <button
            onClick={() => scrollToSection("kontakt")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors"
          >
            Kontakt
          </button>
          <button
            onClick={() => scrollToSection("tjanster")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors"
          >
            Boka Tjänst
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-0 py-2 px-4">
            <button
              onClick={() => scrollToSection("om-oss")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 text-left transition-colors"
            >
              Hos Oss
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 text-left transition-colors"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("tjanster")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 text-left transition-colors"
            >
              Tjänster
            </button>
            <button
              onClick={() => scrollToSection("galleri")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 text-left transition-colors"
            >
              Galleri
            </button>
            <button
              onClick={() => scrollToSection("kontakt")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b border-gray-100 text-left transition-colors"
            >
              Kontakt
            </button>
            <div className="py-4">
              <button
                onClick={() => scrollToSection("tjanster")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors"
              >
                Boka Tjänst
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}