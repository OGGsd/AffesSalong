export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="om-oss" className="py-16 sm:py-20 md:py-24 px-4 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Hos Oss På Affes Salong</h2>
          <div className="amber-divider"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <img
              src="/images/logo.png"
              alt="Affes Salong Logo"
              className="w-64 h-64 object-contain mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Affes Salong</h3>
            <p className="text-gray-600">Premium barber shop sedan 1991</p>
          </div>

          <div>
            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-4">
                Affes Salong grundades 1991 och har sedan dess varit ett föredöme för högkvalitativa behandlingar och
                personlig service i Jönköping. Vi tror på att skapa en unik och avslappnad atmosfär där våra kunder kan
                njuta av en lyxupplevelse.
              </p>
              <p className="text-lg text-gray-700">
                Vår största prioritet är att leverera enastående tjänster och produkter till våra kunder. Vi strävar
                alltid efter att uppfylla och överträffa deras förväntningar genom att erbjuda skräddarsydda lösningar
                som passar deras individuella behov.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Expert Frisör</h3>
                <p className="text-gray-600 text-sm">Erfarna och skickliga stylister</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Premium Produkter</h3>
                <p className="text-gray-600 text-sm">Vi använder bara det bästa</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Kundupplevelse</h3>
                <p className="text-gray-600 text-sm">Personlig och anpassad service</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Flexibla Tider</h3>
                <p className="text-gray-600 text-sm">Tider som passar ditt schema</p>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("tjanster")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded"
            >
              Se Våra Tjänster
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}