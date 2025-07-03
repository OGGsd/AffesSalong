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
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="Affes Salong"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold text-gray-900">Affes Salong</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center space-x-6">
          <button
            onClick={() => scrollToSection("om-oss")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600"
          >
            Hos Oss
          </button>
          <button
            onClick={() => scrollToSection("team")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600"
          >
            Team
          </button>
          <button
            onClick={() => scrollToSection("tjanster")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600"
          >
            Tjänster
          </button>
          <button
            onClick={() => scrollToSection("galleri")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600"
          >
            Galleri
          </button>
          <button
            onClick={() => scrollToSection("kontakt")}
            className="text-sm font-medium text-gray-900 hover:text-amber-600"
          >
            Kontakt
          </button>
          <button
            onClick={() => scrollToSection("tjanster")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
          >
            Boka Tjänst
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col py-2 px-4">
            <button
              onClick={() => scrollToSection("om-oss")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b text-left"
            >
              Hos Oss
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b text-left"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("tjanster")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b text-left"
            >
              Tjänster
            </button>
            <button
              onClick={() => scrollToSection("galleri")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b text-left"
            >
              Galleri
            </button>
            <button
              onClick={() => scrollToSection("kontakt")}
              className="text-base font-medium hover:text-amber-600 py-4 border-b text-left"
            >
              Kontakt
            </button>
            <div className="py-4">
              <button
                onClick={() => scrollToSection("tjanster")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
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