import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export function startOfTodayET(): string {
  const now = new Date()
  const etDateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const y = etDateParts.find((p) => p.type === 'year')!.value
  const m = etDateParts.find((p) => p.type === 'month')!.value
  const d = etDateParts.find((p) => p.type === 'day')!.value

  const offset = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    timeZoneName: 'longOffset',
  })
    .formatToParts(now)
    .find((p) => p.type === 'timeZoneName')!
    .value.replace('GMT', '')

  return new Date(`${y}-${m}-${d}T00:00:00${offset}`).toISOString()
}
