'use client'

import { cn, formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import AddToCartButton from '@/components/cart/AddToCartButton'
import type { MenuItem } from '@/lib/models/menu'

interface MenuItemRowProps {
  item: MenuItem
  className?: string
  highlighted?: boolean
}

export default function MenuItemRow({ item, className, highlighted }: MenuItemRowProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-5 py-4 border-b border-white/[0.06] last:border-0 group transition-colors duration-base',
        highlighted && 'bg-white/[0.03] -mx-3 px-3 rounded-lg border-transparent',
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-body-sm font-medium text-white">{item.name}</h4>
          {item.tags?.map((tag) => (
            <Badge key={tag} tag={tag} />
          ))}
        </div>
        <p className="mt-1 text-body-xs text-tertiary leading-snug">{item.description}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-body-sm font-medium text-white tabular-nums">
          {formatPrice(item.price)}
        </span>
        <AddToCartButton item={item} size="sm" />
      </div>
    </div>
  )
}
