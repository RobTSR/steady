import { useCallback, useEffect, useState } from 'react'
import { KEYS, read, write } from '../lib/storage.js'
import { dayKey } from '../lib/date.js'
import { fetchDailyMessage } from '../lib/claude.js'
import { messageForDay, randomMessage } from '../lib/messagePool.js'

const MAX_HISTORY = 7

// Manages the once-per-day supportive message: cache, refresh, fallback, history.
export function useDailyMessage({ apiKey, days }) {
  const [message, setMessage] = useState(() => read(KEYS.dailyMessage, null))
  const [history, setHistory] = useState(() => read(KEYS.messageHistory, []))
  const [loading, setLoading] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)

  const persist = useCallback((entry, nextHistory) => {
    write(KEYS.dailyMessage, entry)
    setMessage(entry)
    if (nextHistory) {
      write(KEYS.messageHistory, nextHistory)
      setHistory(nextHistory)
    }
  }, [])

  const addToHistory = useCallback((text) => {
    setHistory((prev) => {
      const next = [text, ...prev.filter((m) => m !== text)].slice(0, MAX_HISTORY)
      write(KEYS.messageHistory, next)
      return next
    })
  }, [])

  // Load or refresh. `force` ignores the once-per-day cache (the "new message" button).
  const load = useCallback(
    async (force = false) => {
      const today = dayKey()
      const cached = read(KEYS.dailyMessage, null)

      if (!force && cached && cached.date === today && cached.text) {
        setMessage(cached)
        setUsedFallback(Boolean(cached.fallback))
        return
      }

      const recent = read(KEYS.messageHistory, [])

      // No key: use the offline pool. Same day shows the same one unless forced.
      if (!apiKey) {
        const text = force ? randomMessage(recent) : messageForDay(today)
        const entry = { date: today, text, fallback: true }
        persist(entry)
        addToHistory(text)
        setUsedFallback(true)
        return
      }

      setLoading(true)
      try {
        const text = await fetchDailyMessage({ apiKey, days, recent })
        const entry = { date: today, text, fallback: false }
        persist(entry)
        addToHistory(text)
        setUsedFallback(false)
      } catch {
        const text = randomMessage(recent)
        const entry = { date: today, text, fallback: true }
        persist(entry)
        addToHistory(text)
        setUsedFallback(true)
      } finally {
        setLoading(false)
      }
    },
    // days intentionally excluded: we don't want a midnight day-rollover to refetch.
    [apiKey, persist, addToHistory] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // On mount and whenever the API key changes, ensure today's message exists.
  useEffect(() => {
    load(false)
  }, [load])

  return {
    message,
    history,
    loading,
    usedFallback,
    refresh: () => load(true),
  }
}
