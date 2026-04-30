'use client'

import { Plus } from 'lucide-react'
import { useCart } from '@/lib/store/cart-context'
import { Button } from '@/components/ui/Button'
import type { MenuItem } from '@/lib/models/menu'

export default function AddToCartButton({
  item,
  variant = 'secondary',
  size = 'sm',
}: {
  item: MenuItem
  variant?: 'secondary' | 'primary'
  size?: 'sm' | 'md'
}) {
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAdd}
    >
      <Plus className="h-3.5 w-3.5" strokeWidth={2} />
      <span className="hidden sm:inline">Add</span>
    </Button>
  )
}
