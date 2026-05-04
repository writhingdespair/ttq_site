'use client'

import { useEffect, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const STORAGE_KEY = 'admin-muted'

function getStored(): boolean {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored !== null ? stored === 'true' : true
}

export function useMuted() {
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    setMuted(getStored())
    const handler = () => setMuted(getStored())
    window.addEventListener('storage', handler)
    window.addEventListener('muted-changed', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('muted-changed', handler)
    }
  }, [])

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      window.dispatchEvent(new Event('muted-changed'))
      return next
    })
  }, [])

  return { muted, toggle }
}

export default function MuteToggle() {
  const { muted, toggle } = useMuted()

  return (
    <button
      onClick={toggle}
      className="text-body-sm text-tertiary hover:text-white no-underline transition-colors flex items-center gap-1"
      title={muted ? 'Unmute alerts' : 'Mute alerts'}
    >
      {muted ? (
        <VolumeX className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Volume2 className="h-4 w-4" strokeWidth={1.5} />
      )}
      <span className="sr-only">{muted ? 'Unmute' : 'Mute'}</span>
    </button>
  )
}
