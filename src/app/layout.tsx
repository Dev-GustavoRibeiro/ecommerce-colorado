import type { Metadata } from 'next'
import { Outfit, Bebas_Neue } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Colorado | Móveis e Eletrodomésticos',
  description: 'A maior loja de móveis e eletrodomésticos do Brasil. Encontre sofás, TVs, geladeiras e muito mais com os melhores preços e condições de pagamento.',
  keywords: 'móveis, eletrodomésticos, sofás, tvs, geladeiras, cozinha, quartos, colorado',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} ${bebasNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
