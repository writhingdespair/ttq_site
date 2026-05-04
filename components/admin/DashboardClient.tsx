'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { startOfTodayET, formatPrice } from '@/lib/utils'
import OrderCard from '@/components/admin/OrderCard'
import { useMuted } from '@/components/admin/MuteToggle'

interface OrderRow {
  id: string
  order_number: number
  confirmation_token: string
  created_at: string
  customer_name: string
  customer_phone: string
  items: { name: string; quantity: number; price: number }[]
  subtotal: number
  total: number
  status: string
  notes: string | null
}

function playChime() {
  try {
    console.log('[chime] creating AudioContext')
    const ctx = new AudioContext()
    console.log('[chime] AudioContext state:', ctx.state)
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(880, ctx.currentTime)
    o.frequency.setValueAtTime(1100, ctx.currentTime + 0.08)
    g.gain.setValueAtTime(0.12, ctx.currentTime)
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.45)
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    console.log('[chime] oscillator started')
    o.stop(ctx.currentTime + 0.45)
    setTimeout(() => ctx.close(), 500)
  } catch (e) {
    console.error('[chime] failed:', e)
  }
}

const ACTIVE_STATUSES = ['new', 'preparing', 'ready']

function sortOrders(orders: OrderRow[]): OrderRow[] {
  return [...orders].sort((a, b) => {
    const aActive = ACTIVE_STATUSES.includes(a.status)
    const bActive = ACTIVE_STATUSES.includes(b.status)
    if (aActive && !bActive) return -1
    if (!aActive && bActive) return 1
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
}

interface DashboardClientProps {
  initialOrders: OrderRow[]
  todayStart: string
  orderCount: number
  totalRevenue: number
}

export default function DashboardClient({
  initialOrders,
  todayStart,
  orderCount: initialCount,
  totalRevenue: initialRevenue,
}: DashboardClientProps) {
  const [orders, setOrders] = useState(initialOrders)
  const [count, setCount] = useState(initialCount)
  const [revenue, setRevenue] = useState(initialRevenue)
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set())
  const { muted } = useMuted()
  const mutedRef = useRef(muted)
  mutedRef.current = muted

  const sortedOrders = useMemo(() => sortOrders(orders), [orders])

  useEffect(() => {
    const supabase = createClient()
    const todayStartET = startOfTodayET()
    let channel: ReturnType<typeof supabase.channel> | null = null

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.access_token) {
        supabase.realtime.setAuth(session.access_token)
      }

      channel = supabase
        .channel('orders-realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'orders' },
          (payload) => {
            const row = payload.new as OrderRow
            const rowCreated = new Date(row.created_at).toISOString()
            if (rowCreated < todayStartET) return

            setOrders((prev) => [row, ...prev])
            setCount((prev) => prev + 1)
            setRevenue((prev) => prev + Number(row.total))

            setNewOrderIds((prev) => new Set(prev).add(row.id))
            setTimeout(() => {
              setNewOrderIds((prev) => {
                const next = new Set(prev)
                next.delete(row.id)
                return next
              })
            }, 2000)

            if (!mutedRef.current) {
              console.log('[chime] attempting to play, mutedRef.current =', mutedRef.current)
              playChime()
            } else {
              console.log('[chime] skipped, muted')
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'orders' },
          (payload) => {
            const updated = payload.new as OrderRow
            setOrders((prev) =>
              prev.map((o) => (o.id === updated.id ? updated : o))
            )
          }
        )
        .subscribe((status: string, err?: Error) => {
          if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            console.error('[realtime] channel failed:', status, err)
          }
        })
    })

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token) {
        supabase.realtime.setAuth(session.access_token)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  if (orders.length === 0) {
    return (
      <div>
        <div className="flex items-baseline justify-between mb-3xl">
          <div>
            <h1 className="font-display text-display-sm text-white">Today&apos;s Orders</h1>
            <p className="text-body-sm text-tertiary mt-1">{count} orders · {formatPrice(revenue)}</p>
          </div>
        </div>
        <div className="card p-4xl text-center">
          <p className="text-body-base text-tertiary">No orders yet today</p>
          <p className="text-body-sm text-white/25 mt-2">
            Orders placed by customers will appear here in realtime.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3xl">
        <div>
          <h1 className="font-display text-display-sm text-white">Today&apos;s Orders</h1>
          <p className="text-body-sm text-tertiary mt-1">{count} orders · {formatPrice(revenue)}</p>
        </div>
      </div>

      <div className="space-y-3">
        {sortedOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isNew={newOrderIds.has(order.id)}
          />
        ))}
      </div>
    </div>
  )
}
