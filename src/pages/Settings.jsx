import { useState } from 'react'

function Card({ children }) {
  return (
    <div className="rounded-3xl border border-calm-200/60 bg-white/80 p-5 backdrop-blur dark:border-calm-800/60 dark:bg-calm-900/50">
      {children}
    </div>
  )
}

export default function Settings({
  apiKey,
  onSaveApiKey,
  theme,
  onToggleTheme,
  onRequestReset,
  showHistory,
  onToggleHistory,
  history,
}) {
  const [draft, setDraft] = useState(apiKey || '')
  const [reveal, setReveal] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = () => {
    onSaveApiKey(draft.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="flex flex-col gap-5 py-6">
      <h1 className="px-1 text-2xl font-extrabold text-calm-800 dark:text-calm-50">Settings</h1>

      {/* API key */}
      <Card>
        <label htmlFor="apiKey" className="block text-sm font-bold text-calm-700 dark:text-calm-100">
          Claude API key
        </label>
        <p className="mt-1 text-xs leading-relaxed text-calm-500 dark:text-calm-400">
          Stored only in this browser and sent directly to Anthropic — never to us. Leave empty to
          use built-in messages.
        </p>
        <div className="mt-3 flex gap-2">
          <input
            id="apiKey"
            type={reveal ? 'text' : 'password'}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="sk-ant-..."
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            className="min-w-0 flex-1 rounded-xl border border-calm-200 bg-white px-3 py-2.5 text-sm text-calm-800 outline-none transition focus:border-calm-400 focus:ring-2 focus:ring-calm-300 dark:border-calm-700 dark:bg-calm-950 dark:text-calm-50"
          />
          <button
            type="button"
            onClick={() => setReveal((r) => !r)}
            className="rounded-xl bg-calm-100 px-3 text-xs font-bold text-calm-600 dark:bg-calm-800 dark:text-calm-200"
            aria-label={reveal ? 'Hide API key' : 'Show API key'}
          >
            {reveal ? 'Hide' : 'Show'}
          </button>
        </div>
        <button
          onClick={save}
          className="mt-3 w-full rounded-xl bg-calm-500 px-4 py-2.5 text-sm font-bold text-white transition active:scale-95 hover:bg-calm-600"
        >
          {saved ? 'Saved ✓' : 'Save key'}
        </button>
      </Card>

      {/* Theme */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-calm-700 dark:text-calm-100">Dark mode</p>
            <p className="mt-0.5 text-xs text-calm-500 dark:text-calm-400">Easier on the eyes at night.</p>
          </div>
          <button
            role="switch"
            aria-checked={theme === 'dark'}
            onClick={onToggleTheme}
            className={`relative h-8 w-14 rounded-full transition ${
              theme === 'dark' ? 'bg-calm-500' : 'bg-calm-200'
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${
                theme === 'dark' ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Message history */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-calm-700 dark:text-calm-100">Show message history</p>
            <p className="mt-0.5 text-xs text-calm-500 dark:text-calm-400">Revisit your last few messages.</p>
          </div>
          <button
            role="switch"
            aria-checked={showHistory}
            onClick={onToggleHistory}
            className={`relative h-8 w-14 rounded-full transition ${
              showHistory ? 'bg-calm-500' : 'bg-calm-200'
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${
                showHistory ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
        {showHistory && history.length > 0 && (
          <ul className="mt-4 space-y-2 border-t border-calm-200/60 pt-4 dark:border-calm-800/60">
            {history.map((m, i) => (
              <li
                key={i}
                className="rounded-xl bg-calm-50 px-3 py-2 text-xs leading-relaxed text-calm-600 dark:bg-calm-950/60 dark:text-calm-300"
              >
                {m}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Reset counter */}
      <Card>
        <p className="text-sm font-bold text-calm-700 dark:text-calm-100">Reset counter</p>
        <p className="mt-0.5 text-xs leading-relaxed text-calm-500 dark:text-calm-400">
          Starts your day count over from today. Your past progress was still real.
        </p>
        <button
          onClick={onRequestReset}
          className="mt-3 w-full rounded-xl border-2 border-warmth-400 bg-transparent px-4 py-2.5 text-sm font-bold text-warmth-500 transition active:scale-95 hover:bg-warmth-200/40"
        >
          Reset counter
        </button>
      </Card>
    </div>
  )
}
