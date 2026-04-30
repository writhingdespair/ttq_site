'use client'

import { reviews } from '@/lib/data/reviews'
import StarRating from '@/components/ui/StarRating'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'

export default function Reviews() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  const featured = reviews.find((r) => r.featured)
  const rest = reviews.filter((r) => !r.featured)

  return (
    <section id="reviews" className="py-5xl md:py-6xl bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={ref}
          className={`transition-all duration-reveal ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-3xl md:mb-4xl">
            <p className="text-label-md text-terra-300 uppercase tracking-widest mb-3">
              Reviews
            </p>
            <h2 className="font-display text-display-md md:text-display-lg text-white text-balance">
              What locals are saying
            </h2>
          </div>

          {featured && (
            <div className="mb-6 card-hover p-6 md:p-8 border-terra-500/10">
              <StarRating rating={featured.rating} size="md" />
              <p className="mt-4 text-body-base text-white/85 leading-relaxed italic">
                &ldquo;{featured.text}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="text-body-sm font-medium text-white">{featured.name}</p>
                  <p className="text-body-xs text-tertiary">{featured.location}</p>
                </div>
                <span className="text-body-xs text-terra-300 font-medium uppercase tracking-wider">Featured</span>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            {rest.map((review, i) => (
              <div key={i} className="card-hover p-5">
                <StarRating rating={review.rating} />
                <p className="mt-3 text-body-sm text-white/80 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <p className="text-body-sm font-medium text-white">{review.name}</p>
                  <p className="text-body-xs text-tertiary">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
