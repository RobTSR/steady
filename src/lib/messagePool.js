import { DAILY_MESSAGES } from '../data/dailyMessages.js'
import { dayIndex } from './date.js'

// Deterministic daily message rotation over the offline pool.
//
// Each "cycle" through the pool uses a freshly shuffled order, so:
//   - everyone sees the same message on a given calendar day,
//   - no message repeats until the whole pool has been shown,
//   - the order differs each cycle, so it never feels like a fixed list.

// Small, fast seeded PRNG (mulberry32) so shuffles are reproducible per cycle.
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// A seeded Fisher-Yates shuffle of [0, 1, ..., n-1].
function shuffledOrder(n, seed) {
  const rand = mulberry32(seed)
  const order = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

// The message for a given local day key (YYYY-MM-DD).
export function messageForDay(key) {
  const n = DAILY_MESSAGES.length
  if (n === 0) return ''
  const idx = dayIndex(key)
  const cycle = Math.floor(idx / n)
  const pos = ((idx % n) + n) % n
  const order = shuffledOrder(n, cycle + 1)
  return DAILY_MESSAGES[order[pos]]
}

// A random message, avoiding any in `avoid` when possible (for "New message").
export function randomMessage(avoid = []) {
  const pool = DAILY_MESSAGES.filter((m) => !avoid.includes(m))
  const source = pool.length ? pool : DAILY_MESSAGES
  return source[Math.floor(Math.random() * source.length)]
}
