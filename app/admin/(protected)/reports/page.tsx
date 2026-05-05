import { createClient } from '@/lib/supabase/server'
import { startOfDaysAgoET } from '@/lib/utils'
import PerformanceSection from '@/components/admin/PerformanceSection'

interface HistRow {
  total: number
  status: string
  created_at: string
}

interface WindowMetrics {
  orderCount: number
  revenue: number
  aov: number | null
  cancellationRate: number | null
}

function computeWindow(orders: HistRow[], startDays: number): WindowMetrics {
  const start = new Date(startOfDaysAgoET(startDays))
  const windowOrders = orders.filter((o) => new Date(o.created_at) >= start)
  const total = windowOrders.length
  const cancelled = windowOrders.filter((o) => o.status === 'cancelled').length
  const nonCancelled = windowOrders.filter((o) => o.status !== 'cancelled')
  const revenue = nonCancelled.reduce((sum, o) => sum + o.total, 0)
  return {
    orderCount: total,
    revenue,
    aov: nonCancelled.length > 0 ? revenue / nonCancelled.length : null,
    cancellationRate: total > 0 ? (cancelled / total) * 100 : null,
  }
}

export default async function ReportsPage() {
  const start30 = startOfDaysAgoET(30)

  let histOrders: HistRow[] = []
  let fetchFailed = false

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('orders')
      .select('total, status, created_at')
      .gte('created_at', start30)
      .order('created_at', { ascending: false })

    if (error) throw error
    histOrders = (data as HistRow[]) ?? []
  } catch {
    fetchFailed = true
  }

  if (fetchFailed) {
    return (
      <div>
        <h1 className="font-display text-display-sm text-white mb-3xl">Reports</h1>
        <div className="card p-4xl text-center">
          <p className="text-body-base text-tertiary">Unable to load reports</p>
          <p className="text-body-sm text-white/25 mt-2">
            Check your connection and reload the page.
          </p>
        </div>
      </div>
    )
  }

  const windows: Record<number, WindowMetrics> = {
    7: computeWindow(histOrders, 7),
    14: computeWindow(histOrders, 14),
    21: computeWindow(histOrders, 21),
    30: computeWindow(histOrders, 30),
  }

  return (
    <div>
      <h1 className="font-display text-display-sm text-white mb-3xl">Reports</h1>
      <PerformanceSection windows={windows} />
    </div>
  )
}
