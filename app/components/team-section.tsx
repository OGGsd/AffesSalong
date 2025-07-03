export default function TeamSection() {
  const teamMembers = [
    {
      name: "Fady",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DB7553E4-8856-4C76-B3CC-700B3119C505-6325-0000043A697266E8.jpg-zAsnSlcoN5BPNAHFd4Um7QOtWGB09r.jpeg",
      jobTitle: "Frisör",
      description: "Expert på herrklippning och skäggvård",
    },
    {
      name: "Adnan",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/437A1D0F-5B16-47DC-9A33-079B830D638D-6325-0000043AAF1B22A7.jpg-3wJRhhKA2o05kDjduqLnPIrHLcsLAk.jpeg",
      jobTitle: "Frisör",
      description: "Specialist på moderna frisyrer",
    },
    {
      name: "Elias",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/56AF9B72-FFE2-4361-8168-DAE94D01EBC0-6325-0000043A2FFCC298.jpg-rqUW0laGtLG08cgdRpMn4HnWbeeC7S.jpeg",
      jobTitle: "Frisör",
      description: "Expert på klassiska herrfrisyrer",
    },
    {
      name: "Behnam",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B154D117-9D24-42F2-A40F-37B19348B863-6325-0000043AE528FFFB.jpg-dIdkQbSVCwplqpGiazB6Iy7fY2E5KO.jpeg",
      jobTitle: "Frisör",
      description: "Specialist på skäggvård och styling",
    },
  ]

  return (
    <section id="team" className="py-16 sm:py-20 md:py-24 px-4 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Vårt Professionella Team</h2>
          <div className="amber-divider"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Möt våra erfarna stylister som är dedikerade till att ge dig den perfekta looken.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={member.image}
                alt={`${member.name} - Frisör på Affes Salong i Jönköping`}
                className="w-full h-80 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.jobTitle}</p>
                <p className="text-gray-500 text-xs mt-1">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}