import Image from "next/image"

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpeg"
          alt="Affes Salong"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="mb-2 tracking-wider text-amber-300 font-medium text-sm sm:text-base">
          Premium Barber Shop
        </div>
        <h1 className="mb-4 text-3xl sm:text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Affes Salong – Est. 1991
        </h1>
        <p className="mb-8 sm:mb-10 max-w-2xl text-lg sm:text-xl md:text-2xl">
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