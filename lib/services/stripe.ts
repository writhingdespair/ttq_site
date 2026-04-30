import { Order, OrderConfirmation } from '@/lib/models/order'

/**
 * Stripe service abstraction.
 *
 * Currently returns mocked responses. To connect real Stripe:
 * 1. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
 * 2. Set STRIPE_SECRET_KEY on the server
 * 3. Replace mock implementations with real Stripe SDK calls
 */
export interface StripePaymentIntent {
  clientSecret: string
  amount: number
  currency: string
}

export interface StripeCheckoutSession {
  sessionId: string
  url: string
}

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'

export function getStripePublishableKey(): string {
  return STRIPE_PUBLISHABLE_KEY
}

export async function createPaymentIntent(amount: number, currency = 'usd'): Promise<StripePaymentIntent> {
  // TODO: Replace with real Stripe SDK call
  // const paymentIntent = await stripe.paymentIntents.create({ amount, currency })
  return {
    clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).slice(2)}`,
    amount,
    currency,
  }
}

export async function createCheckoutSession(order: Order): Promise<StripeCheckoutSession> {
  // TODO: Replace with real Stripe checkout session creation
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: order.items.map(item => ({ ... })),
  //   mode: 'payment',
  //   success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${origin}/checkout`,
  // })
  return {
    sessionId: `cs_mock_${Date.now()}`,
    url: `/confirmation?orderId=mock_${Date.now()}`,
  }
}

export async function confirmPayment(paymentIntentId: string): Promise<{ status: string }> {
  // TODO: Replace with real Stripe confirmation
  return { status: 'succeeded' }
}
