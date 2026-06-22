// The daily supportive message card, with a gentle refresh control.
export default function DailyMessage({ message, loading, usedFallback, hasApiKey, onRefresh }) {
  return (
    <section className="w-full">
      <div className="relative rounded-3xl border border-calm-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-calm-800/60 dark:bg-calm-900/50 sm:p-7">
        {loading ? (
          <div className="space-y-3" aria-busy="true" aria-label="Finding the right words">
            <div className="h-4 w-3/4 animate-gentle-pulse rounded-full bg-calm-200 dark:bg-calm-800" />
            <div className="h-4 w-full animate-gentle-pulse rounded-full bg-calm-200 dark:bg-calm-800" />
            <div className="h-4 w-2/3 animate-gentle-pulse rounded-full bg-calm-200 dark:bg-calm-800" />
          </div>
        ) : (
          <p
            key={message?.text}
            className="animate-fade-up text-balance text-xl font-semibold leading-relaxed text-calm-800 dark:text-calm-50 sm:text-2xl"
          >
            {message?.text || 'Take a slow breath. You made it here, and that’s a good place to start.'}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-calm-400 dark:text-calm-500">
            {usedFallback ? (hasApiKey ? 'A kind word for you' : 'For you today') : 'Written for today'}
          </span>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full bg-calm-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition active:scale-95 hover:bg-calm-600 disabled:opacity-50 dark:bg-calm-600 dark:hover:bg-calm-500"
          >
            <svg
              className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            New message
          </button>
        </div>
      </div>
    </section>
  )
}
