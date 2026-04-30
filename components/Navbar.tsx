'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'
import OpenStatus from './OpenStatus'
import CartButton from './cart/CartButton'
import CartDrawer from './cart/CartDrawer'
import { useActiveSection } from '@/lib/hooks/use-active-section'
import { useCart } from '@/lib/store/cart-context'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const activeSection = useActiveSection()
  const { itemCount } = useCart()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#story', label: 'Our Story' },
    { href: '#menu', label: 'Menu' },
    { href: '#visit', label: 'Visit' },
  ]

  const isActive = (href: string) => {
    const id = href.replace('#', '')
    return activeSection === id
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-sticky transition-all duration-300 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16 md:h-[72px]">
          <Link href="/" className="flex items-center gap-3 no-underline flex-shrink-0">
            <span className="font-display text-lg md:text-xl font-semibold tracking-tight text-white">
              Guerrero
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-label-md rounded-lg transition-all duration-base ${
                  isActive(l.href)
                    ? 'text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                } no-underline`}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <OpenStatus className="hidden sm:inline-flex" />

            <CartButton onClick={() => setCartOpen(true)} />

            <a
              href="tel:+18453056168"
              className="hidden sm:inline-flex items-center gap-2 text-label-md font-medium text-white/70 hover:text-white transition-colors no-underline ml-1"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              <span>(845) 305-6168</span>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/[0.06]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl px-6 py-5 space-y-1 animate-fade-in">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-3 text-body-base font-medium no-underline transition-colors ${
                  isActive(l.href)
                    ? 'text-white bg-white/[0.08]'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {l.label}
              </a>
            ))}
            <div className="px-3 pt-3 flex flex-col gap-3">
              <OpenStatus />
              <a
                href="tel:+18453056168"
                className="inline-flex items-center gap-2 text-label-md font-medium text-white/70 hover:text-white no-underline"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                (845) 305-6168
              </a>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {itemCount > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-sticky bg-black/95 backdrop-blur-xl border-t border-white/[0.08] px-4 py-3 animate-fade-in-up">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full btn btn-terra btn-md"
          >
            View Order · {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </button>
        </div>
      )}
    </>
  )
}
