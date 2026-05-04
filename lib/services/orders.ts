import { createClient } from '@/lib/supabase/client'
import type { Order } from '@/lib/models/order'

export async function retrieveOrder(token: string): Promise<Order | null> {
  const supabase = createClient()

  interface RpcOrder {
    order_number: number
    customer_name: string
    customer_phone: string
    items: { name: string; quantity: number; price: number }[]
    subtotal: number
    total: number
    status: string
    notes: string | null
    created_at: string
  }

  const { data, error } = await supabase.rpc('get_order_by_token', { token })

  if (error || !data) return null

  const row = data as unknown as RpcOrder
  return {
    id: row.order_number.toString(),
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    items: row.items.map((i) => ({
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
    subtotal: row.subtotal,
    total: row.total,
    status: row.status as Order['status'],
    notes: row.notes ?? undefined,
    orderType: 'pickup',
    createdAt: row.created_at,
  }
}
