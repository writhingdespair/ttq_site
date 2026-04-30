'use client'

import { useState, type FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/store/cart-context'
import { formatPrice } from '@/lib/utils'
import { placeOrder } from '@/lib/services/orders'
import { Button, LinkButton } from '@/components/ui/Button'
import { ArrowLeft, ArrowRight, Check, Clock } from 'lucide-react'
import { isRestaurantOpen } from '@/lib/data/restaurant'
import type { OrderType } from '@/lib/models/order'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, cart, clearCart } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [orderType, setOrderType] = useState<OrderType>('pickup')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const check = () => setIsOpen(isRestaurantOpen())
    check()
    const id = setInterval(check, 60000)
    return () => clearInterval(id)
  }, [])

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (items.length === 0 || !isOpen) return
    setSubmitting(true)

    const result = await placeOrder({
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email || undefined,
      orderType,
      items,
      subtotal: cart.subtotal,
      tax: cart.tax,
      total: cart.total,
      status: 'pending',
      notes: form.notes || undefined,
      createdAt: new Date().toISOString(),
    })

    clearCart()
    router.push(`/confirmation?orderId=${result.orderId}&wait=${result.estimatedWait}`)
  }

  if (items.length === 0) {
    return (
      <main id="main-content" className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-6 py-6xl">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
            <Check className="h-7 w-7 text-tertiary" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-display-md text-white text-balance">Your cart is empty</h1>
          <p className="mt-md text-body-base text-secondary max-w-sm mx-auto">
            Add some items from the menu before checking out.
          </p>
          <LinkButton href="/menu" variant="primary" size="lg" className="mt-3xl">
            Browse Menu
            <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
          </LinkButton>
        </div>
      </main>
    )
  }

  if (!isOpen) {
    return (
      <main id="main-content" className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-6 py-6xl max-w-md mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
            <Clock className="h-7 w-7 text-tertiary" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-display-md text-white text-balance">We are currently closed</h1>
          <p className="mt-md text-body-base text-secondary max-w-sm mx-auto">
            Online ordering is available daily from 10 AM to 8 PM. Come back during business hours to place your order.
          </p>
          <LinkButton href="/menu" variant="primary" size="lg" className="mt-3xl">
            Back to Menu
            <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
          </LinkButton>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <div className="pt-16 md:pt-[72px]">
        <div className="mx-auto max-w-4xl px-6 py-4xl md:py-5xl">
          <div className="flex items-center gap-3 mb-3xl">
            <LinkButton href="/menu" variant="ghost" size="sm" className="no-underline">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back to Menu
            </LinkButton>
          </div>

          <h1 className="font-display text-display-md md:text-display-lg text-white text-balance">
            Checkout
          </h1>
          <p className="mt-sm text-body-base text-secondary">Review your order and provide your details.</p>

          <div className="mt-3xl grid gap-4xl lg:grid-cols-5">
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-3xl">
              <div className="space-y-4">
                <h2 className="text-body-lg font-medium text-white">Order Type</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-4 rounded-2xl border text-left transition-all duration-base ${
                      orderType === 'pickup'
                        ? 'border-white bg-white/[0.08] text-white'
                        : 'border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/[0.12]'
                    }`}
                  >
                    <p className="text-body-sm font-medium">Pickup</p>
                    <p className="text-body-xs text-tertiary mt-1">Pick up at the truck</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-4 rounded-2xl border text-left transition-all duration-base ${
                      orderType === 'delivery'
                        ? 'border-white bg-white/[0.08] text-white'
                        : 'border-white/[0.06] bg-white/[0.02] text-white/60 hover:border-white/[0.12]'
                    }`}
                  >
                    <p className="text-body-sm font-medium">Delivery</p>
                    <p className="text-body-xs text-tertiary mt-1">Coming soon</p>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-body-lg font-medium text-white">Your Details</h2>

                <div>
                  <label htmlFor="name" className="block text-body-sm text-white/60 mb-2">Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/25 text-body-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-colors duration-base"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-body-sm text-white/60 mb-2">Phone *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/25 text-body-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-colors duration-base"
                    placeholder="(845) 555-0123"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-body-sm text-white/60 mb-2">Email (optional)</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/25 text-body-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-colors duration-base"
                    placeholder="you@email.com"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label htmlFor="address" className="block text-body-sm text-white/60 mb-2">Delivery Address</label>
                    <input
                      id="address"
                      type="text"
                      value=""
                      disabled
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white/30 text-body-sm cursor-not-allowed"
                      placeholder="Delivery coming soon"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="notes" className="block text-body-sm text-white/60 mb-2">Special Instructions (optional)</label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/25 text-body-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-colors duration-base resize-none"
                    placeholder="Any allergies or special requests?"
                  />
                </div>
              </div>

              <div className="pt-3xl border-t border-white/[0.06]">
                <Button
                  type="submit"
                  variant="terra"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Placing Order...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Place Order
                      <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  )}
                </Button>
                <p className="mt-3 text-body-xs text-tertiary text-center">
                  This is a sandbox order. No payment will be processed.
                </p>
              </div>
            </form>

            <div className="lg:col-span-2">
              <div className="sticky top-[88px] card p-6 space-y-4">
                <h2 className="text-body-lg font-medium text-white">Order Summary</h2>

                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.menuItemId} className="flex justify-between text-body-sm">
                      <span className="text-white">
                        {item.quantity}× {item.name}
                      </span>
                      <span className="text-secondary tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/[0.06] pt-4 space-y-2">
                  <div className="flex justify-between text-body-sm">
                    <span className="text-tertiary">Subtotal</span>
                    <span className="text-white tabular-nums">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-body-sm">
                    <span className="text-tertiary">Tax</span>
                    <span className="text-white tabular-nums">{formatPrice(cart.tax)}</span>
                  </div>
                  <div className="flex justify-between text-body-base font-medium pt-2 border-t border-white/[0.06]">
                    <span className="text-white">Total</span>
                    <span className="text-white tabular-nums">{formatPrice(cart.total)}</span>
                  </div>
                </div>

                <p className="text-body-xs text-tertiary pt-2">
                  Pickup at {cart.items.length > 0 ? '3448 Route 9W, Highland, NY' : '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
