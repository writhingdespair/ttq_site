'use client'

import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
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
  hidden_at: string | null
}

let chimeCtx: AudioContext | null = null

function getChimeCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!chimeCtx) {
    try {
      chimeCtx = new AudioContext()
    } catch {
      return null
    }
  }
  return chimeCtx
}

function playChime() {
  const ctx = getChimeCtx()
  if (!ctx) return

  const startSound = () => {
    try {
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
      o.stop(ctx.currentTime + 0.45)
    } catch (e) {
      console.error('[chime] failed:', e)
    }
  }

  if (ctx.state === 'suspended') {
    ctx.resume().then(startSound).catch((e: unknown) => {
      console.error('[chime] resume failed:', e)
    })
  } else {
    startSound()
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

interface UndoBar {
  kind: 'undo'
  order: OrderRow
}

interface ErrorBar {
  kind: 'error'
  message: string
  actionLabel: string
  onRetry: () => void
}

type BarState = UndoBar | ErrorBar | null

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
  const [showHidden, setShowHidden] = useState(false)
  const [hiddenOrderIds, setHiddenOrderIds] = useState<Set<string>>(new Set())
  const [bar, setBar] = useState<BarState>(null)
  const { muted } = useMuted()
  const mutedRef = useRef(muted)
  mutedRef.current = muted
  const hidePromiseRef = useRef<Promise<unknown> | null>(null)
  const undoTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const sortedOrders = useMemo(() => {
    let result = orders
    if (!showHidden) {
      result = result.filter((o) => o.hidden_at === null && !hiddenOrderIds.has(o.id))
    }
    return sortOrders(result)
  }, [orders, showHidden, hiddenOrderIds])

  const fetchHiddenOrders = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', todayStart)
        .not('hidden_at', 'is', null)
        .order('created_at', { ascending: false })

      if (error) throw error

      const hidden = (data as OrderRow[]) ?? []
      setOrders((prev) => {
        const existingIds = new Set(prev.map((o) => o.id))
        const newOrders = hidden.filter((o) => !existingIds.has(o.id))
        return [...prev, ...newOrders]
      })
    } catch {
      setShowHidden(false)
      localStorage.setItem('admin-show-hidden', 'false')
      window.dispatchEvent(new Event('show-hidden-changed'))
      setBar({
        kind: 'error',
        message: 'Failed to load hidden orders.',
        actionLabel: 'Retry',
        onRetry: () => {
          setBar(null)
          setShowHidden(true)
          localStorage.setItem('admin-show-hidden', 'true')
          window.dispatchEvent(new Event('show-hidden-changed'))
        },
      })
    }
  }, [todayStart])

  const handleHideStart = useCallback((order: OrderRow) => {
    setHiddenOrderIds((prev) => new Set(prev).add(order.id))

    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current)
    }
    undoTimeoutRef.current = setTimeout(() => {
      setBar(null)
      hidePromiseRef.current = null
    }, 8000)
    setBar({ kind: 'undo', order })

    return (promise: Promise<unknown>) => {
      hidePromiseRef.current = promise
    }
  }, [])

  const handleHideRevert = useCallback((orderId: string) => {
    setHiddenOrderIds((prev) => {
      const next = new Set(prev)
      next.delete(orderId)
      return next
    })
    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current)
      undoTimeoutRef.current = null
    }
    hidePromiseRef.current = null

    const barOrder = (bar as UndoBar | null)?.order
    setBar({
      kind: 'error',
      message: barOrder ? `Failed to hide order #${barOrder.order_number}.` : 'Failed to hide order.',
      actionLabel: 'Dismiss',
      onRetry: () => {
        setBar(null)
      },
    })
  }, [bar])

  const handleUnhideStart = useCallback((order: OrderRow) => {
    setHiddenOrderIds((prev) => {
      const next = new Set(prev)
      next.delete(order.id)
      return next
    })
  }, [])

  const handleUnhideRevert = useCallback((orderId: string) => {
    setHiddenOrderIds((prev) => new Set(prev).add(orderId))
  }, [])

  const handleUndo = useCallback(async (orderOverride?: OrderRow) => {
    const undoBar = bar as UndoBar | null
    const order = orderOverride ?? undoBar?.order
    if (!order) return

    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current)
      undoTimeoutRef.current = null
    }
    setBar(null)

    setHiddenOrderIds((prev) => {
      const next = new Set(prev)
      next.delete(order.id)
      return next
    })

    if (hidePromiseRef.current) {
      await hidePromiseRef.current
      hidePromiseRef.current = null
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('orders')
      .update({ hidden_at: null })
      .eq('id', order.id)

    if (error) {
      setHiddenOrderIds((prev) => new Set(prev).add(order.id))
      setBar({
        kind: 'error',
        message: 'Failed to unhide.',
        actionLabel: 'Retry',
        onRetry: () => {
          handleUndo(order)
        },
      })
    }
  }, [bar])

  useEffect(() => {
    const stored = localStorage.getItem('admin-show-hidden')
    setShowHidden(stored === 'true')
  }, [])

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem('admin-show-hidden')
      setShowHidden(stored === 'true')
    }
    window.addEventListener('show-hidden-changed', handler)
    return () => window.removeEventListener('show-hidden-changed', handler)
  }, [])

  useEffect(() => {
    if (showHidden) {
      fetchHiddenOrders()
    }
  }, [showHidden, fetchHiddenOrders])

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

            if (!mutedRef.current) playChime()
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

  useEffect(() => {
    const unlock = () => {
      const ctx = getChimeCtx()
      if (!ctx) return

      try {
        const buffer = ctx.createBuffer(1, 1, 22050)
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.connect(ctx.destination)
        source.start(0)
      } catch {
        // ignore — fallback to resume() below
      }

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }

      window.removeEventListener('pointerdown', unlock)
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3xl">
        <div>
          <h1 className="font-display text-display-sm text-white">Today&apos;s Orders</h1>
          <p className="text-body-sm text-tertiary mt-1">{count} orders · {formatPrice(revenue)}</p>
        </div>
      </div>

      {bar && bar.kind === 'undo' && (
        <div className="card p-3 flex items-center justify-between animate-fade-in mb-3">
          <p className="text-body-sm text-tertiary">
            Order #{bar.order.order_number} hidden
          </p>
          <button
            onClick={() => handleUndo()}
            className="text-label-sm font-medium text-terra-300 hover:text-terra-200 transition-colors duration-base"
          >
            Undo
          </button>
        </div>
      )}

      {bar && bar.kind === 'error' && (
        <div className="card p-3 flex items-center justify-between bg-red-500/10 border-red-500/20 animate-fade-in mb-3">
          <p className="text-body-sm text-red-300">{bar.message}</p>
          <button
            onClick={bar.onRetry}
            className="text-label-sm font-medium text-red-300 hover:text-red-200 transition-colors duration-base"
          >
            {bar.actionLabel}
          </button>
        </div>
      )}

      {sortedOrders.length === 0 ? (
        <div className="card p-4xl text-center">
          <p className="text-body-base text-tertiary">No orders yet today</p>
          <p className="text-body-sm text-white/25 mt-2">
            Orders placed by customers will appear here in realtime.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isNew={newOrderIds.has(order.id)}
              onHideStart={handleHideStart}
              onHideRevert={handleHideRevert}
              onUnhideStart={handleUnhideStart}
              onUnhideRevert={handleUnhideRevert}
            />
          ))}
        </div>
      )}
    </div>
  )
}
