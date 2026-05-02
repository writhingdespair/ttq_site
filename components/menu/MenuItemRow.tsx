'use client'

import { useRef } from 'react'
import { cn, formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import AddToCartButton from '@/components/cart/AddToCartButton'
import type { MenuItem } from '@/lib/models/menu'

const PLACEHOLDER = '/images/menu/_placeholder.svg'

interface MenuItemCardProps {
  item: MenuItem
  className?: string
}

export default function MenuItemCard({ item, className }: MenuItemCardProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  const handleImgError = () => {
    if (imgRef.current && imgRef.current.src !== PLACEHOLDER) {
      imgRef.current.src = PLACEHOLDER
    }
  }

  return (
    <div
      className={cn(
        'rounded-2xl bg-white/[0.04] overflow-hidden transition-colors duration-base hover:bg-white/[0.06]',
        className
      )}
    >
      <div className="relative pb-[100%] sm:pb-[75%]">
        <img
          ref={imgRef}
          src={item.image || PLACEHOLDER}
          alt={item.name}
          onError={handleImgError}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 sm:hidden">
            {item.tags.map((tag) => (
              <Badge key={tag} tag={tag} className="px-1.5 py-0.5 text-[0.5rem] rounded !border-0 bg-black/40 backdrop-blur-sm" />
            ))}
          </div>
        )}
      </div>
      <div className="p-2 sm:p-4">
        <div className="flex items-start gap-2 flex-wrap">
          <h4 className="text-body-xs sm:text-body-sm font-medium text-white truncate">
            {item.name}
          </h4>
          <div className="hidden sm:flex items-center gap-1 flex-wrap">
            {item.tags?.map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
        </div>
        <p className="hidden sm:block mt-1 text-body-xs text-tertiary leading-snug line-clamp-3">{item.description}</p>
        <div className="flex items-center justify-between mt-1.5 sm:mt-3">
          <span className="text-body-xs sm:text-body-sm font-medium text-white tabular-nums">
            {formatPrice(item.price)}
          </span>
          <AddToCartButton item={item} size="sm" />
        </div>
      </div>
    </div>
  )
}
