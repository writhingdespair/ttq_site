'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, X, Plus, Minus, Trash2, Clock } from 'lucide-react'
import { useCart } from '@/lib/store/cart-context'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { isRestaurantOpen } from '@/lib/data/restaurant'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, cart, updateQuantity, removeItem, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const check = () => setIsOpen(isRestaurantOpen())
    check()
    const id = setInterval(check, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-drawer bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-overlay w-full sm:w-[420px] bg-black border-l border-white/10 flex flex-col transition-transform duration-slow ease-out-expo ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-white" strokeWidth={1.5} />
            <h2 className="text-body-lg font-medium text-white">Your Order</h2>
            {items.length > 0 && (
              <span className="text-body-sm text-tertiary">
                {items.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/[0.06]"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-white/15 mb-4" strokeWidth={1} />
              <p className="text-body-base text-tertiary">Your cart is empty</p>
              <p className="text-body-sm text-white/30 mt-1">Add some tacos to get started</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-5"
                onClick={onClose}
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.menuItemId} className="flex items-start gap-4 py-3 border-b border-white/[0.06] last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-white">{item.name}</p>
                    <p className="text-body-xs text-tertiary mt-0.5">{formatPrice(item.price)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white/[0.06] rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                        className="h-7 w-7 inline-flex items-center justify-center rounded-md text-white/60 hover:text-white hover:bg-white/[0.08]"
                      >
                        <Minus className="h-3 w-3" strokeWidth={2} />
                      </button>
                      <span className="w-7 text-center text-body-sm text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                        className="h-7 w-7 inline-flex items-center justify-center rounded-md text-white/60 hover:text-white hover:bg-white/[0.08]"
                      >
                        <Plus className="h-3 w-3" strokeWidth={2} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.menuItemId)}
                      className="h-7 w-7 inline-flex items-center justify-center rounded-md text-white/30 hover:text-red-400 hover:bg-red-400/10"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-body-sm">
                <span className="text-tertiary">Subtotal</span>
                <span className="text-white tabular-nums">{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-tertiary">Tax</span>
                <span className="text-white tabular-nums">{formatPrice(cart.tax)}</span>
              </div>
              <div className="flex justify-between text-body-base font-medium pt-2 border-t border-white/[0.06]">
                <span className="text-white">Total</span>
                <span className="text-white tabular-nums">{formatPrice(cart.total)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => { clearCart(); onClose() }}
              >
                Clear
              </Button>
              {isOpen ? (
                <Button
                  variant="terra"
                  className="flex-[2]"
                  size="md"
                  onClick={() => { onClose(); router.push('/checkout') }}
                >
                  Checkout
                </Button>
              ) : (
                <Button
                  variant="terra"
                  className="flex-[2]"
                  size="md"
                  disabled
                >
                  <Clock className="h-4 w-4" strokeWidth={1.5} />
                  Closed
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
