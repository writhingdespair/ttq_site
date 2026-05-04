import { createClient } from '@/lib/supabase/client'
import type { Order } from '@/lib/models/order'

export async function placeOrder(
  order: Order
): Promise<{ confirmationToken: string; estimatedWait: number }> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      items: order.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal: order.subtotal,
      total: order.total,
      status: 'new',
      notes: order.notes || null,
    })
    .select('confirmation_token')
    .single()

  if (error || !data) {
    throw new Error('Failed to place order. Please try again.')
  }

  const estimatedWait = estimateWaitTime(order)

  return { confirmationToken: data.confirmation_token, estimatedWait }
}

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
      menuItemId: '',
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
    subtotal: row.subtotal,
    tax: 0,
    total: row.total,
    status: row.status as Order['status'],
    notes: row.notes ?? undefined,
    orderType: 'pickup',
    createdAt: row.created_at,
  }
}

function estimateWaitTime(order: Order): number {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
  if (itemCount <= 3) return 10
  if (itemCount <= 6) return 15
  if (itemCount <= 10) return 20
  return 25
}
