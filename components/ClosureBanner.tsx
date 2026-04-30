'use client'

import { useEffect, useState } from 'react'
import { isRestaurantOpen } from '@/lib/data/restaurant'

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
    <div className="bg-amber-500 text-black text-center py-3 px-4 text-sm font-medium z-50 sticky top-0">
      We are currently closed. Online ordering is available daily 10 AM – 8 PM.
    </div>
  )
}
