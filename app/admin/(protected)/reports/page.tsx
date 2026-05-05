import { createClient } from '@/lib/supabase/server'
import { startOfDaysAgoET } from '@/lib/utils'
import ReportsPageClient from './ReportsPageClient'

interface HistRow {
  total: number
  status: string
  created_at: string
}

export interface WindowMetrics {
  orderCount: number
  revenue: number
  aov: number | null
  cancellationRate: number | null
}

interface DailyPoint {
  date: string
  revenue: number
}

interface HourPoint {
  hour: number
  count: number
}

interface DOWPoint {
  day: string
  count: number
}

interface CancellationPoint {
  date: string
  rate: number | null
}

export interface ChartData {
  dailyRevenue: DailyPoint[]
  ordersByHour: HourPoint[]
  ordersByDay: DOWPoint[]
  cancellationRate: CancellationPoint[]
}

function etDateKey(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso))
}

function etHour(iso: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(new Date(iso))
  return parseInt(parts.find((p) => p.type === 'hour')!.value)
}

function etDayOfWeek(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
  }).format(new Date(iso))
}

function dateRangeET(startDays: number): string[] {
  const days: string[] = []
  const start = new Date(startOfDaysAgoET(startDays))
  const now = new Date()
  const end = new Date(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now)
  )
  const cursor = new Date(start)
  while (cursor <= end) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(cursor)
    const y = parts.find((p) => p.type === 'year')!.value
    const m = parts.find((p) => p.type === 'month')!.value
    const d = parts.find((p) => p.type === 'day')!.value
    days.push(`${m}/${d}/${y}`)
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return days
}

function computeWindow(
  orders: HistRow[],
  startDays: number
): WindowMetrics {
  const start = new Date(startOfDaysAgoET(startDays))
  const windowOrders = orders.filter(
    (o) => new Date(o.created_at) >= start
  )
  const total = windowOrders.length
  const cancelled = windowOrders.filter(
    (o) => o.status === 'cancelled'
  ).length
  const nonCancelled = windowOrders.filter(
    (o) => o.status !== 'cancelled'
  )
  const revenue = nonCancelled.reduce((sum, o) => sum + o.total, 0)
  return {
    orderCount: total,
    revenue,
    aov: nonCancelled.length > 0 ? revenue / nonCancelled.length : null,
    cancellationRate: total > 0 ? (cancelled / total) * 100 : null,
  }
}

function computeChartData(
  allOrders: HistRow[],
  startDays: number
): ChartData {
  const start = new Date(startOfDaysAgoET(startDays))
  const orders = allOrders.filter(
    (o) => new Date(o.created_at) >= start
  )

  const dateRange = dateRangeET(startDays)

  // Daily revenue
  const revenueMap: Record<string, number> = {}
  for (const o of orders) {
    if (o.status === 'cancelled') continue
    const key = etDateKey(o.created_at)
    revenueMap[key] = (revenueMap[key] || 0) + o.total
  }
  const dailyRevenue: DailyPoint[] = dateRange.map((date) => ({
    date,
    revenue: revenueMap[date] || 0,
  }))

  // Orders by hour (0-23)
  const hourBins: number[] = new Array(24).fill(0)
  for (const o of orders) {
    hourBins[etHour(o.created_at)]++
  }
  const ordersByHour: HourPoint[] = hourBins.map((count, hour) => ({
    hour,
    count,
  }))

  // Orders by day of week (Sun-Sat)
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dowBins: Record<string, number> = {}
  for (const d of DAYS) dowBins[d] = 0
  for (const o of orders) {
    dowBins[etDayOfWeek(o.created_at)]++
  }
  const ordersByDay: DOWPoint[] = DAYS.map((day) => ({
    day,
    count: dowBins[day],
  }))

  // Cancellation rate per day (null where total < 3)
  const dailyCount: Record<string, { total: number; cancelled: number }> =
    {}
  for (const d of dateRange) {
    dailyCount[d] = { total: 0, cancelled: 0 }
  }
  for (const o of orders) {
    const key = etDateKey(o.created_at)
    if (dailyCount[key]) {
      dailyCount[key].total++
      if (o.status === 'cancelled') dailyCount[key].cancelled++
    }
  }
  const cancellationRate: CancellationPoint[] = dateRange.map((date) => {
    const { total, cancelled } = dailyCount[date]
    if (total < 3) return { date, rate: null }
    return { date, rate: (cancelled / total) * 100 }
  })

  return { dailyRevenue, ordersByHour, ordersByDay, cancellationRate }
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
        <h1 className="font-display text-display-sm text-white mb-3xl">
          Reports
        </h1>
        <div className="card p-4xl text-center">
          <p className="text-body-base text-tertiary">
            Unable to load reports
          </p>
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

  const chartData: Record<number, ChartData> = {
    7: computeChartData(histOrders, 7),
    14: computeChartData(histOrders, 14),
    21: computeChartData(histOrders, 21),
    30: computeChartData(histOrders, 30),
  }

  return <ReportsPageClient windows={windows} chartData={chartData} />
}
