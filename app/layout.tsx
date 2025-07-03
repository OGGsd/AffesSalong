import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <head>
        <title>Affes Salong - Premium Frisörsalong i Jönköping sedan 1991</title>
        <meta name="description" content="Affes Salong erbjuder professionell herrklippning, skäggtrimning och styling i Jönköping. Boka tid online eller besök oss på Barnarpsgatan 31." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}