'use client'

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'

export default function Story() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="story" className="py-5xl md:py-6xl bg-black">
      <div className="mx-auto max-w-3xl px-6">
        <div
          ref={ref}
          className={`transition-all duration-reveal ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-label-md text-terra-300 uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h2 className="font-display text-display-md md:text-display-lg text-white text-balance">
            A family from Guerrero, serving Highland
          </h2>
          <div className="mt-3xl space-y-5 text-body-base text-secondary leading-relaxed">
            <p>
              Guerrero Taquería is a family-run taquería on Route 9W in Highland, New York. Our recipes come straight from the state of Guerrero, Mexico — hand-pressed tortillas, charcoal-grilled proteins, and salsas ground fresh every morning.
            </p>
            <p>
              We serve the kind of street food you would find at a corner stand in Chilpancingo — tacos, tortas, cemitas, quesadillas, burritos, and antojitos like sopes, gorditas, and tlacoyos. Everything is made to order from our food truck.
            </p>
            <p className="text-body-base text-terra-200 italic font-medium">
              Open seven days a week. Always made fresh. Always family first.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
