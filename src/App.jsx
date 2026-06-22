import { useCallback, useMemo, useState } from 'react'
import { KEYS, read, write } from './lib/storage.js'
import { dayKey, daysSince } from './lib/date.js'
import { useTheme } from './hooks/useTheme.js'
import { useDailyMessage } from './hooks/useDailyMessage.js'
import Counter from './components/Counter.jsx'
import BottomNav from './components/BottomNav.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
import About from './pages/About.jsx'

// Ensure a start date exists on first ever launch (defaults to today).
function ensureStartDate() {
  const existing = read(KEYS.startDate)
  if (existing) return existing
  const today = dayKey()
  write(KEYS.startDate, today)
  return today
}

export default function App() {
  const { theme, toggle } = useTheme()
  const [tab, setTab] = useState('home')
  const [confirmReset, setConfirmReset] = useState(false)

  const [startDate, setStartDate] = useState(ensureStartDate)
  const [apiKey, setApiKey] = useState(() => read(KEYS.apiKey, ''))
  const [showHistory, setShowHistory] = useState(() => read(KEYS.showHistory, false))

  const days = useMemo(() => daysSince(startDate), [startDate])
  const daily = useDailyMessage({ apiKey, days })

  const saveApiKey = useCallback((key) => {
    setApiKey(key)
    write(KEYS.apiKey, key)
  }, [])

  const resetCounter = useCallback(() => {
    const today = dayKey()
    write(KEYS.startDate, today)
    setStartDate(today)
    setConfirmReset(false)
    setTab('home')
  }, [])

  const toggleHistory = useCallback(() => {
    setShowHistory((v) => {
      const next = !v
      write(KEYS.showHistory, next)
      return next
    })
  }, [])

  return (
    <div className="min-h-full bg-gradient-to-b from-calm-50 via-white to-calm-100 text-calm-900 transition-colors dark:from-calm-950 dark:via-calm-950 dark:to-calm-900 dark:text-calm-50">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        {/* Header with the counter as a persistent anchor */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-calm-200/50 bg-white/70 px-4 py-3 backdrop-blur-lg dark:border-calm-800/50 dark:bg-calm-950/70">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" className="h-7 w-7" />
            <span className="text-lg font-extrabold tracking-tight text-calm-700 dark:text-calm-100">
              Steady
            </span>
          </div>
          <Counter days={days} compact />
        </header>

        {/* Main content */}
        <main className="flex-1 px-4">
          {tab === 'home' && (
            <Home days={days} startDate={startDate} daily={daily} hasApiKey={Boolean(apiKey)} />
          )}
          {tab === 'settings' && (
            <Settings
              apiKey={apiKey}
              onSaveApiKey={saveApiKey}
              theme={theme}
              onToggleTheme={toggle}
              onRequestReset={() => setConfirmReset(true)}
              showHistory={showHistory}
              onToggleHistory={toggleHistory}
              history={daily.history}
            />
          )}
          {tab === 'about' && <About />}
        </main>

        <BottomNav current={tab} onChange={setTab} />
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset your counter?"
        body="This will set your day count back to zero, starting from today. The days you’ve already lived through still count — this is just a fresh start, whenever you need one."
        confirmLabel="Yes, reset"
        cancelLabel="Keep my count"
        onConfirm={resetCounter}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  )
}
