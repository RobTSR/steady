// Date helpers that work in the user's LOCAL timezone, so "today" and the day
// count always match what the calendar on their wall says.

// Returns a local YYYY-MM-DD string for the given date (defaults to now).
export function dayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Midnight (local) for a YYYY-MM-DD string.
function startOfLocalDay(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).getTime()
}

// Whole calendar days between a start day key and today (>= 0).
export function daysSince(startKey) {
  if (!startKey) return 0
  const MS_PER_DAY = 86_400_000
  const diff = startOfLocalDay(dayKey()) - startOfLocalDay(startKey)
  return Math.max(0, Math.round(diff / MS_PER_DAY))
}

// A stable integer "day number" for a YYYY-MM-DD key, independent of timezone.
// Used to rotate the daily message deterministically.
export function dayIndex(key = dayKey()) {
  const [y, m, d] = key.split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000)
}

// A friendly, human label for a YYYY-MM-DD key, e.g. "June 22, 2026".
export function formatLongDate(key) {
  if (!key) return ''
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
