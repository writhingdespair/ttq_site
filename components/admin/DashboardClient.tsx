'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { startOfTodayET, formatPrice } from '@/lib/utils'
import OrderCard from '@/components/admin/OrderCard'

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

  useEffect(() => {
    const supabase = createClient()
    const todayStartET = startOfTodayET()

    const channel = supabase
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
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
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
        {orders.map((order) => (
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
