'use client'

import { AlertTriangle } from 'lucide-react'

export default function DashboardError({
  todayStart,
  orders,
}: {
  todayStart: string
  orders: unknown[]
}) {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3xl">
        <h1 className="font-display text-display-sm text-white">Today&apos;s Orders</h1>
      </div>
      <div className="card p-4xl text-center">
        <AlertTriangle className="h-8 w-8 text-amber-400 mx-auto mb-4" strokeWidth={1.5} />
        <p className="text-body-base text-tertiary">Unable to load orders</p>
        <p className="text-body-sm text-white/25 mt-2">
          Check your connection and try again.
        </p>
        <button
          onClick={handleRetry}
          className="mt-4 px-4 py-2 rounded-lg bg-white/[0.06] text-body-sm text-white hover:bg-white/[0.1] transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
