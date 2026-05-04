# v1 Deferred Features

## Payments
- Stripe integration for online payments
- Schema supports it: subtotal + total already tracked, order flow ready for payment step insertion before order creation

## Tax
- Tax calculation and display in cart/confirmation/admin
- Schema has `subtotal` and `total` columns ready; tax rate (`RESTAURANT.taxRate = 0.08875`) already defined in `lib/data/restaurant.ts`

## Notifications
- SMS notifications when an order is ready ("Your order is ready for pickup")
- Would need a Twilio (or similar) service

## Staff accounts
- Multiple admin users with role-based access (kitchen vs cashier vs manager)
- Currently a single admin user for a single food truck

## Reports
- Sales reports beyond today's totals (daily, weekly, monthly)
- `created_at` is indexed; queries just need UI
- Status transition timestamps (`preparing_at`, `ready_at`) for time-to-completion analytics
- Would need a `status_history` table for full audit trail

## Refund flow
- Cancel is a soft-delete (status = cancelled)
- No reverse financial flow, no refund processing

## Customer-facing order tracking
- Public status page where customers can check their order status
- Would use `confirmation_token` for lookup
- Real-time status updates via Supabase Realtime on the customer side

## Menu management
- Photo upload and management for menu items
- Currently all images fall back to `_placeholder.svg`
- Menu data lives in `lib/data/menu.ts` as static TypeScript

## Order modification
- Customers cannot modify or cancel orders after placing
- Admin cannot modify items or add notes after order creation
- Status transitions are the only admin action

## Order history for customers
- No customer accounts, no order history lookup
- Customers get a confirmation page with a token but no persistent access

## Rate limiting
- Login rate limiting beyond Supabase Auth's default brute-force protection
- Order submission rate limiting (prevent spam)
