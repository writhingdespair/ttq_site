import { createClient } from '@/lib/supabase/server'
import { startOfTodayET, startOfDaysAgoET } from '@/lib/utils'
import DashboardClient from '@/components/admin/DashboardClient'
import DashboardError from '@/components/admin/DashboardError'
import PerformanceSection from '@/components/admin/PerformanceSection'

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

export default async function AdminPage() {
  const todayStart = startOfTodayET()
  const start30 = startOfDaysAgoET(30)

  let orders: OrderRow[] = []
  let fetchFailed = false
  let histOrders: HistRow[] = []

  try {
    const supabase = await createClient()

    const [todayResult, histResult] = await Promise.all([
      supabase
        .from('orders')
        .select('*')
        .gte('created_at', todayStart)
        .is('hidden_at', null)
        .order('created_at', { ascending: false }),
      supabase
        .from('orders')
        .select('total, status, created_at')
        .gte('created_at', start30)
        .order('created_at', { ascending: false }),
    ])

    if (todayResult.error) throw todayResult.error
    orders = (todayResult.data as OrderRow[]) ?? []

    if (!histResult.error) {
      histOrders = (histResult.data as HistRow[]) ?? []
    }
  } catch {
    fetchFailed = true
  }

  if (fetchFailed) {
    return <DashboardError todayStart={todayStart} orders={[]} />
  }

  const orderCount = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  const windows: Record<number, WindowMetrics> = {
    7: computeWindow(histOrders, 7),
    14: computeWindow(histOrders, 14),
    21: computeWindow(histOrders, 21),
    30: computeWindow(histOrders, 30),
  }

  return (
    <div className="space-y-4xl">
      <DashboardClient
        initialOrders={orders}
        todayStart={todayStart}
        orderCount={orderCount}
        totalRevenue={totalRevenue}
      />
      <PerformanceSection windows={windows} />
    </div>
  )
}
