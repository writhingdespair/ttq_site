-- v1 Admin Dashboard — Supabase setup
-- Run this entire script in the Supabase SQL Editor

-- 1. Enum + table
CREATE TYPE order_status AS ENUM ('new', 'preparing', 'ready', 'completed', 'cancelled');

CREATE SEQUENCE order_number_seq START 1001;

CREATE TABLE orders (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number       integer NOT NULL UNIQUE DEFAULT nextval('order_number_seq'),
  confirmation_token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  created_at         timestamptz NOT NULL DEFAULT now(),
  picked_up_at       timestamptz,
  customer_name      text NOT NULL,
  customer_phone     text NOT NULL,
  items              jsonb NOT NULL,
  subtotal           numeric(10,2) NOT NULL,
  total              numeric(10,2) NOT NULL,
  status             order_status NOT NULL DEFAULT 'new',
  notes              text
);

CREATE INDEX idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_confirmation_token ON orders (confirmation_token);

-- 2. RPC for confirmation page lookup
CREATE FUNCTION get_order_by_token(token text)
RETURNS SETOF orders
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT * FROM orders WHERE confirmation_token = token;
$$;

GRANT EXECUTE ON FUNCTION get_order_by_token(text) TO anon;

-- 3. RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Customers (anon) can INSERT orders
CREATE POLICY "anon_insert" ON orders FOR INSERT TO anon WITH CHECK (true);

-- Admin (authenticated) can SELECT all orders
CREATE POLICY "auth_select" ON orders FOR SELECT TO authenticated USING (true);

-- Admin (authenticated) can UPDATE orders
CREATE POLICY "auth_update" ON orders FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- No DELETE policy — nothing can delete orders
