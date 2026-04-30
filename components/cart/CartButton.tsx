'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store/cart-context'

export default function CartButton({ onClick }: { onClick: () => void }) {
  const { itemCount } = useCart()

  return (
    <button
      onClick={onClick}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
      aria-label={`Shopping cart, ${itemCount} items`}
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-terra-500 text-[0.625rem] font-semibold text-white leading-none">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  )
}
