import Counter from '../components/Counter.jsx'
import DailyMessage from '../components/DailyMessage.jsx'

export default function Home({ days, startDate, daily, hasApiKey }) {
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <Counter days={days} startDate={startDate} />
      <DailyMessage
        message={daily.message}
        loading={daily.loading}
        usedFallback={daily.usedFallback}
        hasApiKey={hasApiKey}
        onRefresh={daily.refresh}
      />
      <p className="max-w-xs text-balance text-center text-sm leading-relaxed text-calm-500/70 dark:text-calm-300/60">
        If you’re in crisis, please reach out. In the US you can call or text{' '}
        <span className="font-bold text-calm-600 dark:text-calm-200">988</span> any time.
      </p>
    </div>
  )
}
