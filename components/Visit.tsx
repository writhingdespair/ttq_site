'use client'

import { RESTAURANT } from '@/lib/data/restaurant'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'

export default function Visit() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="visit" className="py-5xl md:py-6xl bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={ref}
          className={`grid gap-3xl md:grid-cols-2 md:gap-4xl transition-all duration-reveal ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-3xl">
            <div>
              <p className="text-label-md text-terra-300 uppercase tracking-widest mb-3">
                Location
              </p>
              <h2 className="font-display text-display-md md:text-display-lg text-white text-balance">
                Come find us
              </h2>
              <p className="mt-md text-body-base text-secondary max-w-md">
                We are parked on Route 9W just south of the Mid-Hudson Bridge. Look for the red truck and the charcoal smoke.
              </p>
            </div>

            <div className="space-y-4 text-body-sm">
              <div>
                <p className="text-label-sm text-white/50 uppercase tracking-wider mb-1.5">Address</p>
                <p className="text-white">{RESTAURANT.address}</p>
                <p className="text-secondary">{RESTAURANT.city}, {RESTAURANT.state} {RESTAURANT.zip}</p>
                <a
                  href={RESTAURANT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-label-md text-terra-300 hover:text-terra-200 transition-colors no-underline"
                >
                  Get directions
                </a>
              </div>

              <div>
                <p className="text-label-sm text-white/50 uppercase tracking-wider mb-1.5">Phone</p>
                <a href={`tel:${RESTAURANT.phoneRaw}`} className="text-white hover:text-terra-300 transition-colors no-underline">
                  {RESTAURANT.phone}
                </a>
              </div>

              <div>
                <p className="text-label-sm text-white/50 uppercase tracking-wider mb-1.5">Hours</p>
                <p className="text-white">{RESTAURANT.hours}</p>
              </div>

              <div>
                <p className="text-label-sm text-white/50 uppercase tracking-wider mb-1.5">Instagram</p>
                <a
                  href={RESTAURANT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary hover:text-white transition-colors no-underline"
                >
                  {RESTAURANT.instagram}
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/[0.04] border border-white/[0.06] min-h-[320px]">
            <iframe
              title="Guerrero Taquería Location"
              src={RESTAURANT.embedMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full min-h-[320px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
