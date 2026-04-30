'use client'

import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/store/cart-context'
import { Button } from '@/components/ui/Button'
import { isRestaurantOpen } from '@/lib/data/restaurant'
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
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const check = () => setOpen(isRestaurantOpen())
    check()
    const id = setInterval(check, 60000)
    return () => clearInterval(id)
  }, [])

  const handleAdd = () => {
    if (!open) return
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
      disabled={!open}
      title={open ? 'Add to cart' : 'Online ordering is currently closed'}
    >
      <Plus className="h-3.5 w-3.5" strokeWidth={2} />
      <span className="hidden sm:inline">{open ? 'Add' : 'Closed'}</span>
    </Button>
  )
}
