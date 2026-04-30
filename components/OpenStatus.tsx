'use client'

import { useEffect, useState } from 'react'
import { isRestaurantOpen } from '@/lib/data/restaurant'

export default function OpenStatus({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsOpen(isRestaurantOpen())
    check()
    const id = setInterval(check, 60000)
    return () => clearInterval(id)
  }, [])

  if (isOpen === null) return null

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-label-sm text-white/70 bg-white/[0.06] border border-white/[0.06] ${className || ''}`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute inset-0 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-white/30'}`} />
        {isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-soft" />
        )}
      </span>
      {isOpen ? 'Open now' : 'Closed now'}
      <span className="text-body-xs text-white/30 ml-1 hidden sm:inline">10 AM – 8 PM</span>
    </span>
  )
}
