'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative bg-black pt-7xl pb-4xl md:pt-[12rem] md:pb-6xl">
      <div className="absolute inset-0 bg-gradient-to-b from-terra-950/40 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 text-center relative">
        <h1
          className={`font-display text-display-2xl text-white text-balance transition-all duration-reveal ease-out-expo ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Taste has a home address.
        </h1>

        <p
          className={`mx-auto mt-md max-w-lg text-body-lg text-secondary transition-all duration-reveal ease-out-expo ${
            loaded ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4 delay-0'
          }`}
        >
          Hand-pressed tortillas, charcoal-grilled meats, and family recipes from Guerrero, Mexico — served fresh from our truck on Route 9W.
        </p>

        <div
          className={`mt-lg flex items-center justify-center gap-3 flex-wrap transition-all duration-reveal ease-out-expo ${
            loaded ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4 delay-0'
          }`}
        >
          <a href="#menu" className="btn btn-lg btn-primary no-underline group">
            View the Menu
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </a>
          <a href="tel:+18453056168" className="btn btn-lg btn-secondary no-underline">
            Call to Order
          </a>
        </div>
      </div>
    </section>
  )
}
