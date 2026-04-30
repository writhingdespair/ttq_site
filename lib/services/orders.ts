import { Order } from '@/lib/models/order'
import { submitOrder, getOrder, updateOrderStatus } from '@/lib/services/firebase'
import { createCheckoutSession } from '@/lib/services/stripe'

export async function placeOrder(order: Order): Promise<{ orderId: string; estimatedWait: number }> {
  const { orderId } = await submitOrder(order)

  // TODO: When Stripe is connected, create a checkout session here
  // const session = await createCheckoutSession(order)

  const estimatedWait = estimateWaitTime(order)

  return { orderId, estimatedWait }
}

export async function retrieveOrder(orderId: string): Promise<Order | null> {
  return getOrder(orderId)
}

export async function markOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  return updateOrderStatus(orderId, status)
}

function estimateWaitTime(order: Order): number {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
  if (itemCount <= 3) return 10
  if (itemCount <= 6) return 15
  if (itemCount <= 10) return 20
  return 25
}
