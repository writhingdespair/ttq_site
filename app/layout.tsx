import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import SuppressOnAdmin from '@/components/SuppressOnAdmin'
import GlobalUI from '@/components/GlobalUI'
import ClosureBanner from '@/components/ClosureBanner'
import { CartProvider } from '@/lib/store/cart-context'
import { RESTAURANT } from '@/lib/data/restaurant'

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
  name: RESTAURANT.name,
  image: 'https://guerrerotaqueria.com/og-image.jpg',
  '@id': 'https://guerrerotaqueria.com',
  url: 'https://guerrerotaqueria.com',
  telephone: RESTAURANT.phoneRaw,
  address: {
    '@type': 'PostalAddress',
    streetAddress: RESTAURANT.address,
    addressLocality: RESTAURANT.city,
    addressRegion: RESTAURANT.state,
    postalCode: RESTAURANT.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: RESTAURANT.coordinates.lat,
    longitude: RESTAURANT.coordinates.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: `${String(RESTAURANT.hoursOpen).padStart(2, '0')}:00`,
      closes: `${String(RESTAURANT.hoursClose).padStart(2, '0')}:00`,
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
          <SuppressOnAdmin>
            <ClosureBanner />
            <Navbar />
          </SuppressOnAdmin>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
