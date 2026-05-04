'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils'
import StatusControl from '@/components/admin/StatusControl'
import { Phone } from 'lucide-react'

interface OrderRow {
  id: string
  order_number: number
  created_at: string
  customer_name: string
  customer_phone: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: string
  notes: string | null
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function getTimeColor(dateStr: string, status: string): string {
  const elapsed = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)

  if (status === 'completed' || status === 'cancelled') return ''

  const tiers: Record<string, [number, number, number]> = {
    new: [5, 15, Infinity],
    preparing: [15, 25, Infinity],
    ready: [5, 10, Infinity],
  }

  const t = tiers[status]
  if (!t) return ''

  if (elapsed < t[0]) return ''
  if (elapsed < t[1]) return 'text-amber-400'
  return 'text-red-400'
}

export default function OrderCard({
  order,
  isNew,
}: {
  order: OrderRow
  isNew: boolean
}) {
  const [status, setStatus] = useState(order.status)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [, setTick] = useState(0)

  useEffect(() => {
    setStatus(order.status)
  }, [order.status])

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000)
    return () => clearInterval(id)
  }, [])

  const isDone = status === 'completed' || status === 'cancelled'
  const timeColor = getTimeColor(order.created_at, status)

  const handleStatusChange = async (newStatus: string) => {
    const prevStatus = status
    setStatus(newStatus)
    setUpdateError(null)

    const supabase = createClient()
    const payload: Record<string, unknown> = { status: newStatus }

    const { error } = await supabase
      .from('orders')
      .update(payload)
      .eq('id', order.id)

    if (error) {
      setStatus(prevStatus)
      setUpdateError('Failed to update')
    }
  }

  return (
    <div
      className={`card p-5 transition-all duration-base ${
        isDone ? 'opacity-60' : ''
      } ${
        isNew ? 'animate-pulse-soft ring-1 ring-amber-500/50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-body-sm font-medium text-white tabular-nums">
              #{order.order_number}
            </p>
            <span className={`text-body-xs ${timeColor || 'text-tertiary'}`}>{timeAgo(order.created_at)}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-body-sm text-secondary">{order.customer_name}</p>
            <a
              href={`tel:${order.customer_phone}`}
              className="inline-flex items-center gap-1 text-body-xs text-terra-300 hover:text-terra-200 no-underline transition-colors"
            >
              <Phone className="h-3 w-3" strokeWidth={1.5} />
              {order.customer_phone}
            </a>
          </div>
        </div>
        <p className="text-body-sm font-medium text-white tabular-nums">
          {formatPrice(order.total)}
        </p>
      </div>

      <ul className="space-y-1 mb-4">
        {order.items.map((item, i) => (
          <li key={i} className="flex justify-between text-body-xs text-secondary">
            <span>{item.quantity}× {item.name}</span>
            <span className="tabular-nums">{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      {order.notes && (
        <p className="text-body-xs text-tertiary mb-3 italic">&ldquo;{order.notes}&rdquo;</p>
      )}

      {updateError && (
        <p className="text-body-xs text-red-400 mb-2">{updateError}</p>
      )}

      <StatusControl currentStatus={status} onChange={handleStatusChange} />
    </div>
  )
}
