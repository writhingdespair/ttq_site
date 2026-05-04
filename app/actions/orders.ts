'use server'

import { createClient } from '@supabase/supabase-js'
import { isRestaurantOpen } from '@/lib/data/restaurant'

interface PlaceOrderInput {
  customerName: string
  customerPhone: string
  items: { name: string; quantity: number; price: number }[]
  subtotal: number
  total: number
  notes?: string
}

interface PlaceOrderResult {
  confirmationToken: string
  estimatedWait: number
}

interface PlaceOrderError {
  error: string
}

export async function placeOrderAction(
  input: PlaceOrderInput
): Promise<PlaceOrderResult | PlaceOrderError> {
  if (!isRestaurantOpen()) {
    return { error: 'Ordering is currently closed. Please try again during business hours.' }
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      items: input.items,
      subtotal: input.subtotal,
      total: input.total,
      status: 'new',
      notes: input.notes || null,
    })
    .select('confirmation_token')
    .single()

  if (error || !data) {
    return { error: 'Failed to place order. Please try again.' }
  }

  const estimatedWait = estimateWaitTime(input.items)

  return { confirmationToken: data.confirmation_token, estimatedWait }
}

function estimateWaitTime(items: { quantity: number }[]): number {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  if (itemCount <= 3) return 10
  if (itemCount <= 6) return 15
  if (itemCount <= 10) return 20
  return 25
}
