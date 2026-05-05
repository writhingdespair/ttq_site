'use client'

import { useEffect, useState, useCallback } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const STORAGE_KEY = 'admin-show-hidden'

function getStored(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored !== null ? stored === 'true' : false
}

export function useShowHidden() {
  const [showHidden, setShowHidden] = useState(false)

  useEffect(() => {
    setShowHidden(getStored())
    const handler = () => setShowHidden(getStored())
    window.addEventListener('storage', handler)
    window.addEventListener('show-hidden-changed', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('show-hidden-changed', handler)
    }
  }, [])

  const toggle = useCallback(() => {
    setShowHidden((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      window.dispatchEvent(new Event('show-hidden-changed'))
      return next
    })
  }, [])

  return { showHidden, toggle }
}

export default function ShowHiddenToggle() {
  const { showHidden, toggle } = useShowHidden()

  return (
    <button
      onClick={toggle}
      className="text-body-sm text-tertiary hover:text-white no-underline transition-colors flex items-center gap-1"
      title={showHidden ? 'Hide hidden orders' : 'Show hidden orders'}
    >
      {showHidden ? (
        <Eye className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <EyeOff className="h-4 w-4" strokeWidth={1.5} />
      )}
      <span className="sr-only">{showHidden ? 'Hide hidden orders' : 'Show hidden orders'}</span>
    </button>
  )
}
