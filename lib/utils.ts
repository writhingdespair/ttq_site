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

export function startOfDaysAgoET(days: number): string {
  const now = new Date()

  const etDateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const y = parseInt(etDateParts.find((p) => p.type === 'year')!.value)
  const m = parseInt(etDateParts.find((p) => p.type === 'month')!.value) - 1
  const d = parseInt(etDateParts.find((p) => p.type === 'day')!.value)

  // Use noon UTC on today's ET date as a DST-safe reference point.
  // Noon is guaranteed to be on the correct ET calendar date regardless
  // of UTC offset — unlike midnight UTC, which can fall on the prior ET day.
  const ref = new Date(Date.UTC(y, m, d, 12, 0, 0))

  // Subtract N calendar days (setUTCDate handles month/year rollover)
  ref.setUTCDate(ref.getUTCDate() - days)

  // Extract the target ET date from the reference point
  const targetParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(ref)
  const ty = targetParts.find((p) => p.type === 'year')!.value
  const tm = targetParts.find((p) => p.type === 'month')!.value
  const td = targetParts.find((p) => p.type === 'day')!.value

  // Get the target date's own UTC offset (independent of today's offset)
  const noonUtc = Date.UTC(parseInt(ty), parseInt(tm) - 1, parseInt(td), 12, 0, 0)
  const offset = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    timeZoneName: 'longOffset',
  })
    .formatToParts(new Date(noonUtc))
    .find((p) => p.type === 'timeZoneName')!
    .value.replace('GMT', '')

  return new Date(`${ty}-${tm}-${td}T00:00:00${offset}`).toISOString()
}
