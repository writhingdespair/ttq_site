'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { XCircle, CheckCircle } from 'lucide-react'

const STEPS: { key: string; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
  { key: 'completed', label: 'Done' },
]

const STEP_INDEX: Record<string, number> = {
  new: 0,
  preparing: 1,
  ready: 2,
  completed: 3,
  cancelled: -1,
}

export default function StatusControl({
  currentStatus,
  onChange,
}: {
  currentStatus: string
  onChange: (status: string) => void
}) {
  const [confirmCancel, setConfirmCancel] = useState(false)
  const isCancelled = currentStatus === 'cancelled'
  const currentIndex = STEP_INDEX[currentStatus] ?? -1

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-label-sm bg-red-500/10 text-red-300 border border-red-500/20">
          <XCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
          Cancelled
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center bg-white/[0.04] rounded-xl p-1 gap-0.5">
        {STEPS.map((step) => {
          const idx = STEP_INDEX[step.key]
          const isActive = idx === currentIndex
          const isPast = idx < currentIndex

          return (
            <button
              key={step.key}
              onClick={() => onChange(step.key)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-label-sm font-medium transition-all duration-base',
                isActive
                  ? 'bg-white text-black'
                  : isPast
                    ? 'text-white/40 hover:text-white/60'
                    : 'text-white/30 hover:text-white/50'
              )}
            >
              {step.key === 'completed' && isPast ? (
                <span className="inline-flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" strokeWidth={1.5} />
                  Done
                </span>
              ) : (
                step.label
              )}
            </button>
          )
        })}
      </div>

      {confirmCancel ? (
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              onChange('cancelled')
              setConfirmCancel(false)
            }}
            className="px-3 py-1.5 rounded-lg text-label-sm font-medium bg-red-500/20 text-red-300 border border-red-500/30 transition-colors hover:bg-red-500/30"
          >
            Confirm cancel
          </button>
          <button
            onClick={() => setConfirmCancel(false)}
            className="px-2 py-1.5 rounded-lg text-label-sm text-tertiary hover:text-white transition-colors"
          >
            No
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmCancel(true)}
          className="px-3 py-1.5 rounded-lg text-label-sm font-medium text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          Cancel
        </button>
      )}
    </div>
  )
}
