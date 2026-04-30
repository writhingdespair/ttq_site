import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import GlobalUI from '@/components/GlobalUI'
import { CartProvider } from '@/lib/store/cart-context'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Guerrero Taquería — Authentic Mexican Food in Highland, NY',
  description:
    'Hand-pressed tortillas, charcoal-grilled meats, and family recipes from Guerrero, Mexico — served fresh from our truck on Route 9W.',
  keywords: [
    'tacos Highland NY',
    'Mexican food Ulster County',
    'food truck Hudson Valley',
    'taqueria Highland NY',
    'best tacos New Paltz',
    'authentic Mexican food Poughkeepsie',
    'burritos Highland NY',
    'Guerrero Taqueria',
  ],
  openGraph: {
    title: 'Guerrero Taquería — Authentic Mexican Food in Highland, NY',
    description:
      'Hand-pressed tortillas, charcoal-grilled meats, and family recipes from Guerrero, Mexico.',
    type: 'website',
    locale: 'en_US',
    url: 'https://guerrerotaqueria.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Guerrero Taquería',
  image: 'https://guerrerotaqueria.com/og-image.jpg',
  '@id': 'https://guerrerotaqueria.com',
  url: 'https://guerrerotaqueria.com',
  telephone: '+18453056168',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3448 Route 9W',
    addressLocality: 'Highland',
    addressRegion: 'NY',
    postalCode: '12528',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.72,
    longitude: -73.96,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '20:00',
    },
  ],
  priceRange: '$',
  servesCuisine: 'Mexican',
  acceptsReservations: 'False',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="font-sans">
        <CartProvider>
          <GlobalUI />
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
