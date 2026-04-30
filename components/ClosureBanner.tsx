'use client'

import { useEffect, useState } from 'react'
import { isRestaurantOpen } from '@/lib/data/restaurant'
import { Clock } from 'lucide-react'

export default function ClosureBanner() {
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    const check = () => setClosed(!isRestaurantOpen())
    check()
    const id = setInterval(check, 60000)
    return () => clearInterval(id)
  }, [])

  if (!closed) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-toast bg-black/95 backdrop-blur-xl border-b border-terra-500/20 animate-fade-in">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-center gap-2.5">
        <Clock className="h-4 w-4 text-terra-400 shrink-0" strokeWidth={1.5} />
        <span className="text-body-sm text-white/80">
          We're currently closed.
        </span>
        <span className="text-body-sm text-white/40 hidden sm:inline">
          Open daily 10 AM – 8 PM
        </span>
      </div>
    </div>
  )
}
