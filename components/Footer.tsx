import { RESTAURANT } from '@/lib/data/restaurant'

export default function Footer() {
  return (
    <footer className="relative bg-black pt-5xl pb-3xl border-t border-white/[0.06]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-terra-500/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3xl">
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-semibold text-white">{RESTAURANT.name}</p>
            <p className="mt-1 text-body-sm text-tertiary">
              {RESTAURANT.tagline}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href={`tel:${RESTAURANT.phoneRaw}`}
              className="text-body-sm text-secondary hover:text-white transition-colors no-underline"
            >
              {RESTAURANT.phone}
            </a>
            <div className="flex items-center gap-4 text-body-xs text-tertiary">
              <a
                href={RESTAURANT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors no-underline"
              >
                Instagram
              </a>
              <span className="text-white/15">|</span>
              <span>© {new Date().getFullYear()} Guerrero Taquería</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
