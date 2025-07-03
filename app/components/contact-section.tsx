export default function ContactSection() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("tjanster")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openingHours = [
    { day: "MÅNDAG", hours: "09:00 - 18:00" },
    { day: "TISDAG", hours: "09:00 - 18:00" },
    { day: "ONSDAG", hours: "09:00 - 18:00" },
    { day: "TORSDAG", hours: "09:00 - 18:00" },
    { day: "FREDAG", hours: "09:00 - 18:00" },
    { day: "LÖRDAG", hours: "10:00 - 14:00" },
    { day: "SÖNDAG", hours: "Stängt" },
  ]

  return (
    <section id="kontakt" className="py-16 sm:py-20 md:py-24 px-4 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Kontakt & Öppettider
          </h2>
          <div className="amber-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Kontakta oss för bokning eller frågor. Vi ser fram emot ditt besök hos Affes Salong.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">📍 Hitta oss</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">📍</div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Adress</h4>
                  <p className="text-gray-600">Barnarpsgatan 31, 55316, Jönköping</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">📞</div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Telefon</h4>
                  <p className="text-gray-600">036-123786</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">✉️</div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Email</h4>
                  <p className="text-gray-600">affessalong@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">📅</div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Boka Online</h4>
                  <button
                    onClick={scrollToServices}
                    className="mt-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded"
                  >
                    Boka Tid Nu
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">🕐 Öppettider</h3>

            <div className="space-y-4">
              {openingHours.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium text-lg">{item.day}</span>
                  <span className="text-gray-600 font-medium">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-8 h-96 w-full overflow-hidden rounded-xl shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2093.6261490225455!2d14.165512651902933!3d57.778882992884576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465a6df5d2664c23%3A0xe71886a9f057cc0!2sBarnarpsgatan%2031%2C%20553%2033%20J%C3%B6nk%C3%B6ping!5e0!3m2!1ssv!2sse!4v1724351272308!5m2!1ssv!2sse"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Affes Salong karta"
          ></iframe>
        </div>
      </div>
    </section>
  )
}