import { useEffect, useRef, useState } from 'react'
import { formatLongDate } from '../lib/date.js'

// The visual anchor: a large, warm "X days" counter that gently pops on change.
export default function Counter({ days, startDate, compact = false }) {
  const [animKey, setAnimKey] = useState(0)
  const prev = useRef(days)

  useEffect(() => {
    if (prev.current !== days) {
      setAnimKey((k) => k + 1)
      prev.current = days
    }
  }, [days])

  if (compact) {
    return (
      <div className="flex items-baseline gap-1.5" aria-label={`${days} days since you started`}>
        <span
          key={animKey}
          className="animate-soft-pop text-2xl font-extrabold tabular-nums text-calm-600 dark:text-calm-200"
        >
          {days}
        </span>
        <span className="text-sm font-semibold text-calm-500/80 dark:text-calm-300/70">
          {days === 1 ? 'day' : 'days'}
        </span>
      </div>
    )
  }

  return (
    <section className="flex flex-col items-center text-center" aria-live="polite">
      <p className="mb-2 text-base font-semibold uppercase tracking-[0.2em] text-calm-500/70 dark:text-calm-300/60">
        Days since
      </p>
      <div
        key={animKey}
        className="animate-soft-pop bg-gradient-to-br from-calm-500 via-calm-400 to-warmth-400 bg-clip-text text-transparent"
      >
        <span className="block text-[7rem] font-extrabold leading-none tabular-nums sm:text-[9rem]">
          {days}
        </span>
      </div>
      <p className="mt-3 text-xl font-bold text-calm-700 dark:text-calm-100">
        {days === 1 ? 'day' : 'days'} of caring for yourself
      </p>
      {startDate && (
        <p className="mt-1 text-sm text-calm-500/70 dark:text-calm-300/60">
          since {formatLongDate(startDate)}
        </p>
      )}
    </section>
  )
}
