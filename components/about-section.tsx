"use client"

export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="om-oss" className="py-16 sm:py-20 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Hos Oss På Affes Salong</h2>
          <div className="w-16 h-1 bg-amber-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="relative w-64 h-64 mb-6">
              <img
                src="/images/logo.png"
                alt="Affes Salong Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Affes Salong</h3>
            <p className="text-center text-gray-600">Premium barber shop sedan 1991</p>
          </div>

          <div>
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

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start p-4 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Expert Frisör</h3>
                  <p className="text-gray-600 text-sm">Erfarna och skickliga stylister</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Premium Produkter</h3>
                  <p className="text-gray-600 text-sm">Vi använder bara det bästa</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Kundupplevelse</h3>
                  <p className="text-gray-600 text-sm">Personlig och anpassad service</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Flexibla Tider</h3>
                  <p className="text-gray-600 text-sm">Tider som passar ditt schema</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection("tjanster")}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded transition-colors"
              >
                Se Våra Tjänster
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}