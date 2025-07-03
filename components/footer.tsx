import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-900 px-4 py-8 sm:py-12 text-white md:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Logo and Contact Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Affes Salong"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 48px, 64px"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg sm:text-xl font-bold">Affes Salong</h3>
              <p className="text-gray-400 text-sm sm:text-base">Premium barber shop sedan 1991</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="tel:036-123786"
              className="bg-amber-600 hover:bg-amber-700 p-3 rounded-full transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
            <a
              href="https://www.instagram.com/affessalong.jonkoping/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold border-b border-gray-800 pb-2">Om Oss</h3>
            <p className="text-gray-400 text-sm">
              Premium hårsalong sedan 1991. Vi erbjuder högkvalitativa behandlingar och personlig service för att göra
              din upplevelse hos oss unik och exceptionell.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold border-b border-gray-800 pb-2">Snabblänkar</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <button
                  onClick={() => scrollToSection("om-oss")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                >
                  Hos Oss
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                >
                  Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tjanster")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                >
                  Tjänster
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("galleri")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                >
                  Galleri
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm text-left"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold border-b border-gray-800 pb-2">Kontakt</h3>
            <address className="not-italic text-gray-400 text-sm">
              <div className="mb-3 flex items-center">
                <svg className="mr-2 h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>036-123786</span>
              </div>
              <div className="mb-3 flex items-center">
                <svg className="mr-2 h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>affessalong@gmail.com</span>
              </div>
              <div className="mb-3 flex items-center">
                <svg className="mr-2 h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Barnarpsgatan 31, 55316, Jönköping</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Affes Salong. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  )
}