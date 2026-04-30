'use client'

import { RESTAURANT } from '@/lib/data/restaurant'

export default function ClosureBanner() {
  if (!RESTAURANT.isForceClosed) return null

  return (
    <div className="bg-amber-500 text-black text-center py-3 px-4 text-sm font-medium z-50 relative">
      We are closed today. See you tomorrow!
    </div>
  )
}
