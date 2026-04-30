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
    <div className="bg-amber-500 text-black text-center py-3 px-4 text-sm font-medium fixed top-0 left-0 right-0 z-toast">
      We are currently closed. We are open daily 10 AM - 8 PM.
    </div>
  )
}
