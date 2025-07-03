export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-900 px-4 py-8 sm:py-12 text-white">
      <div className="container">
        {/* Logo and Contact Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <img
              src="/images/logo.png"
              alt="Affes Salong"
              className="h-16 w-16 object-contain"
            />
            <div className="ml-4">
              <h3 className="text-xl font-bold">Affes Salong</h3>
              <p className="text-gray-400">Premium barber shop sedan 1991</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="tel:036-123786"
              className="bg-amber-600 hover:bg-amber-700 p-3 rounded-full"
            >
              📞
            </a>
            <a
              href="https://www.instagram.com/affessalong.jonkoping/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full"
            >
              📷
            </a>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold border-b border-gray-800 pb-2">Om Oss</h3>
            <p className="text-gray-400 text-sm">
              Premium hårsalong sedan 1991. Vi erbjuder högkvalitativa behandlingar och personlig service för att göra
              din upplevelse hos oss unik och exceptionell.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold border-b border-gray-800 pb-2">Snabblänkar</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => scrollToSection("om-oss")}
                className="text-gray-400 hover:text-amber-300 text-sm text-left"
              >
                Hos Oss
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-gray-400 hover:text-amber-300 text-sm text-left"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection("tjanster")}
                className="text-gray-400 hover:text-amber-300 text-sm text-left"
              >
                Tjänster
              </button>
              <button
                onClick={() => scrollToSection("galleri")}
                className="text-gray-400 hover:text-amber-300 text-sm text-left"
              >
                Galleri
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-gray-400 hover:text-amber-300 text-sm text-left"
              >
                Kontakt
              </button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold border-b border-gray-800 pb-2">Kontakt</h3>
            <div className="text-gray-400 text-sm space-y-3">
              <div>📞 036-123786</div>
              <div>✉️ affessalong@gmail.com</div>
              <div>📍 Barnarpsgatan 31, 55316, Jönköping</div>
            </div>
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