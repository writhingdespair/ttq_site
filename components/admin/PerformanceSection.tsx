'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/utils'

interface WindowMetrics {
  orderCount: number
  revenue: number
  aov: number | null
  cancellationRate: number | null
}

interface Props {
  windows: Record<number, WindowMetrics>
}

const LABELS: Record<number, string> = {
  7: '7 days',
  14: '14 days',
  21: '21 days',
  30: '30 days',
}

export default function PerformanceSection({ windows }: Props) {
  const [windowDays, setWindowDays] = useState(7)
  const m = windows[windowDays]

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3xl">
        <div>
          <h2 className="font-display text-display-sm text-white">Performance</h2>
          <p className="text-body-sm text-tertiary mt-1">{LABELS[windowDays]}</p>
        </div>
        <div className="flex items-center bg-white/[0.04] rounded-xl p-1 gap-0.5">
          {[7, 14, 21, 30].map((d) => (
            <button
              key={d}
              onClick={() => setWindowDays(d)}
              className={`px-3 py-1.5 rounded-lg text-label-sm font-medium transition-all duration-base ${
                windowDays === d
                  ? 'bg-white text-black'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="text-label-sm text-tertiary mb-1">Orders</p>
          <p className="font-display text-display-md text-white tabular-nums">
            {m.orderCount}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-label-sm text-tertiary mb-1">Revenue</p>
          <p className="font-display text-display-md text-white tabular-nums">
            {formatPrice(m.revenue)}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-label-sm text-tertiary mb-1">Avg Order</p>
          <p className="font-display text-display-md text-white tabular-nums">
            {m.aov !== null ? formatPrice(m.aov) : '—'}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-label-sm text-tertiary mb-1">Cancelled</p>
          <p className="font-display text-display-md text-white tabular-nums">
            {m.cancellationRate !== null
              ? `${m.cancellationRate.toFixed(1)}%`
              : '—'}
          </p>
        </div>
      </div>
    </div>
  )
}
