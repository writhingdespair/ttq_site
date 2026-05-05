import { createClient } from '@/lib/supabase/server'
import { startOfTodayET } from '@/lib/utils'
import DashboardClient from '@/components/admin/DashboardClient'
import DashboardError from '@/components/admin/DashboardError'

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

export default async function AdminPage() {
  const todayStart = startOfTodayET()

  let orders: OrderRow[] = []
  let fetchFailed = false

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', todayStart)
      .is('hidden_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    orders = (data as OrderRow[]) ?? []
  } catch {
    fetchFailed = true
  }

  if (fetchFailed) {
    return <DashboardError todayStart={todayStart} orders={[]} />
  }

  const orderCount = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="space-y-4xl">
      <DashboardClient
        initialOrders={orders}
        todayStart={todayStart}
        orderCount={orderCount}
        totalRevenue={totalRevenue}
      />
    </div>
  )
}
