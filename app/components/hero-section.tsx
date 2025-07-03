export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="hero-section">
      <div className="absolute inset-0 hero-overlay"></div>
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="mb-4 text-amber-300 font-medium">Premium Barber Shop</div>
        <h1 className="mb-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          Affes Salong – Est. 1991
        </h1>
        <p className="mb-8 max-w-2xl text-lg sm:text-xl">
          Din Premium Salon för Skräddarsydda Lösningar
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection("tjanster")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded font-medium"
          >
            Boka Tjänst
          </button>
          <button
            onClick={() => scrollToSection("galleri")}
            className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded font-medium"
          >
            Se Vår Galleri
          </button>
        </div>
      </div>
    </section>
  )
}