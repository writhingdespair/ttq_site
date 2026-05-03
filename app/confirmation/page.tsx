'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Check, Clock, MapPin } from 'lucide-react'
import { Button, LinkButton } from '@/components/ui/Button'
import { retrieveOrder } from '@/lib/services/orders'
import { formatPrice } from '@/lib/utils'
import type { Order } from '@/lib/models/order'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const estimatedWait = Number(searchParams.get('wait')) || 15
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      return
    }
    retrieveOrder(orderId)
      .then((o) => {
        setOrder(o)
        setLoading(false)
      })
      .catch(() => {
        setFetchError(true)
        setLoading(false)
      })
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (!order || fetchError) {
    return (
      <div className="text-center py-6xl">
        <h1 className="font-display text-display-md text-white text-balance">Order not found</h1>
        <p className="mt-md text-body-base text-secondary">The order you are looking for could not be found.</p>
        <LinkButton href="/menu" variant="primary" size="lg" className="mt-3xl">
          Browse Menu
        </LinkButton>
      </div>
    )
  }

  const pickupTime = new Date()
  pickupTime.setMinutes(pickupTime.getMinutes() + estimatedWait)

  return (
    <div className="mx-auto max-w-xl px-6 py-5xl md:py-6xl text-center">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3xl">
        <Check className="h-9 w-9 text-emerald-400" strokeWidth={2} />
      </div>

      <h1 className="font-display text-display-md md:text-display-lg text-white text-balance">
        Order confirmed
      </h1>

      <p className="mt-md text-body-base text-secondary">
        We are firing up the comal. Your order will be ready for pickup soon.
      </p>

      <div className="mt-3xl space-y-4">
        <div className="card p-5 text-left flex items-start gap-4">
          <Clock className="h-5 w-5 text-terra-300 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-body-sm font-medium text-white">Estimated Pickup Time</p>
            <p className="text-body-sm text-secondary mt-0.5">
              {pickupTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </p>
            <p className="text-body-xs text-tertiary mt-0.5">~{estimatedWait} minutes</p>
          </div>
        </div>

        <div className="card p-5 text-left flex items-start gap-4">
          <MapPin className="h-5 w-5 text-terra-300 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-body-sm font-medium text-white">Pickup Location</p>
            <p className="text-body-sm text-secondary mt-0.5">3448 Route 9W</p>
            <p className="text-body-sm text-secondary">Highland, NY 12528</p>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-body-sm font-medium text-white">Order #{order.id?.slice(-8).toUpperCase() || '—'}</p>
            <span className="text-label-sm text-terra-300 font-medium uppercase tracking-wider">Confirmed</span>
          </div>
          <ul className="space-y-2 text-left">
            {order.items.map((item) => (
              <li key={item.menuItemId} className="flex justify-between text-body-sm">
                <span className="text-white">{item.quantity}× {item.name}</span>
                <span className="text-secondary tabular-nums">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex justify-between text-body-base font-medium">
            <span className="text-white">Total</span>
            <span className="text-white tabular-nums">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3xl flex flex-col sm:flex-row gap-3 justify-center">
        <LinkButton href="/menu" variant="primary" size="lg">
          Order More
        </LinkButton>
        <LinkButton href="/" variant="secondary" size="lg">
          Back to Home
        </LinkButton>
      </div>

      <p className="mt-3xl text-body-xs text-white/25">
        Sandbox order — no payment processed. Questions? Call (845) 305-6168
      </p>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <main id="main-content" className="min-h-screen bg-black">
      <div className="pt-16 md:pt-[72px]">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        }>
          <ConfirmationContent />
        </Suspense>
      </div>
    </main>
  )
}
