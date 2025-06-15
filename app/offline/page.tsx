import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-6 text-4xl font-bold">Du är offline</h1>
      <p className="mb-8 text-lg">
        Det verkar som att du inte har internetanslutning just nu. Vissa funktioner kanske inte fungerar korrekt.
      </p>
      <div className="space-y-4">
        <p className="font-medium">Här är några saker du kan göra:</p>
        <ul className="list-disc text-left mx-auto max-w-md space-y-2 pl-5">
          <li>Kontrollera din internetanslutning</li>
          <li>Försök igen senare</li>
          <li>Vissa delar av webbplatsen fungerar även offline</li>
        </ul>
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">Gå till startsidan</Link>
        </Button>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Kontaktinformation</h2>
        <p className="mb-2">Telefon: 036-123786</p>
        <p className="mb-2">Adress: Barnarpsgatan 31, 553 16 Jönköping</p>
      </div>
    </div>
  )
}
