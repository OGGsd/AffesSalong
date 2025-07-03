import './globals.css'

export const metadata = {
  title: 'Affes Salong - Premium Frisörsalong i Jönköping sedan 1991',
  description: 'Affes Salong erbjuder professionell herrklippning, skäggtrimning och styling i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  )
}