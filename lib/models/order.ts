export interface CartItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
  specialInstructions?: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'cancelled'

export type OrderType = 'pickup' | 'delivery'

export interface Order {
  id?: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  orderType: OrderType
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
  status: OrderStatus
  notes?: string
  createdAt: string
  updatedAt?: string
  pickupTime?: string
  deliveryAddress?: string
  stripePaymentIntentId?: string
}

export interface OrderConfirmation {
  orderId: string
  estimatedWait: number
  pickupTime: string
}
