import Hero from '@/components/Hero'
import Story from '@/components/Story'
import MenuSection from '@/components/MenuSection'
import Reviews from '@/components/Reviews'
import Visit from '@/components/Visit'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Story />
      <MenuSection />
      <Reviews />
      <Visit />
      <Footer />
    </main>
  )
}
