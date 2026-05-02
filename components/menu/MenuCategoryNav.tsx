'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { isRestaurantOpen } from '@/lib/data/restaurant'
import type { MenuCategory } from '@/lib/models/menu'

export default function MenuCategoryNav({
  categories,
  activeId,
  onSelect,
  className,
}: {
  categories: MenuCategory[]
  activeId: string | null
  onSelect: (id: string) => void
  className?: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(true)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    const check = () => setClosed(!isRestaurantOpen())
    check()
    const id = setInterval(check, 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => {
      setShowLeftFade(el.scrollLeft > 8)
      setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
    }
    el.addEventListener('scroll', check, { passive: true })
    check()
    return () => el.removeEventListener('scroll', check)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || !activeId) return
    const activeBtn = el.querySelector(`[data-cat="${activeId}"]`)
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeId])

  return (
    <div
      className={cn(
        'sticky z-sticky bg-black/90 backdrop-blur-md border-b border-white/[0.06]',
        closed ? 'top-[112px] md:top-[120px]' : 'top-16 md:top-[72px]',
        className
      )}
    >
      <div className="relative">
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        )}
        <div
          ref={scrollRef}
          className="flex gap-1 px-4 py-3 overflow-x-auto scrollbar-hide sm:justify-center [scroll-snap-type:x_mandatory]"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-full text-body-sm font-medium [scroll-snap-align:start] transition-all duration-base',
                activeId === cat.id
                  ? 'bg-white text-black'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        )}
      </div>
    </div>
  )
}
