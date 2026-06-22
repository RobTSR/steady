export default function About() {
  return (
    <div className="flex flex-col gap-5 py-6">
      <h1 className="px-1 text-2xl font-extrabold text-calm-800 dark:text-calm-50">About Steady</h1>

      <div className="space-y-4 rounded-3xl border border-calm-200/60 bg-white/80 p-6 text-[15px] leading-relaxed text-calm-700 backdrop-blur dark:border-calm-800/60 dark:bg-calm-900/50 dark:text-calm-200">
        <p>
          Steady is a quiet companion for recovery from self-harm. It does two simple things: it
          counts the days you’ve been caring for yourself, and it offers a few kind words each day.
        </p>
        <p>
          Recovery isn’t a straight line. A hard day, or a setback, doesn’t erase the effort you’ve
          put in. The counter is here to honor your progress — not to shame you if it resets. You can
          always begin again, and beginning again is part of healing.
        </p>
        <p>
          The daily message can be written fresh by Claude when you add your own API key in Settings,
          or it can draw from a set of gentle pre-written notes. Either way, everything stays on your
          device. There’s no account, no tracking, and nothing leaves your browser except the direct
          request to Anthropic when you choose to use a key.
        </p>
        <p className="font-semibold text-calm-800 dark:text-calm-50">You matter. Your effort matters.</p>
      </div>

      <div className="rounded-3xl border border-warmth-300/50 bg-warmth-200/30 p-6 dark:border-warmth-400/30 dark:bg-warmth-500/10">
        <h2 className="text-base font-extrabold text-calm-800 dark:text-calm-50">If you need support now</h2>
        <p className="mt-2 text-sm leading-relaxed text-calm-700 dark:text-calm-200">
          This app isn’t a substitute for professional help. If you’re thinking about hurting
          yourself, please reach out to someone you trust or a crisis line:
        </p>
        <ul className="mt-3 space-y-1.5 text-sm font-semibold text-calm-800 dark:text-calm-100">
          <li>US — call or text 988 (Suicide &amp; Crisis Lifeline)</li>
          <li>UK &amp; ROI — call 116 123 (Samaritans)</li>
          <li>Or text HOME to 741741 (Crisis Text Line)</li>
        </ul>
        <p className="mt-3 text-xs text-calm-500 dark:text-calm-400">
          If you’re outside these regions, your local emergency number can connect you to help.
        </p>
      </div>
    </div>
  )
}
