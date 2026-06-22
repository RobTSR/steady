// One-handed bottom navigation with three large tap targets.
const TABS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M19.4 13a7.5 7.5 0 0 0 0-2l2-1.5-2-3.5-2.4 1a7.5 7.5 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5a7.5 7.5 0 0 0-1.7 1l-2.4-1-2 3.5L4.6 11a7.5 7.5 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7.5 7.5 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.5 7.5 0 0 0 1.7-1l2.4 1 2-3.5z" />
      </>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-4M12 8h.01" />
      </>
    ),
  },
]

export default function BottomNav({ current, onChange }) {
  return (
    <nav
      className="safe-bottom sticky bottom-0 z-30 border-t border-calm-200/60 bg-white/85 px-2 pt-1 backdrop-blur-lg dark:border-calm-800/60 dark:bg-calm-950/80"
      aria-label="Main navigation"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {TABS.map((tab) => {
          const active = current === tab.id
          return (
            <li key={tab.id} className="flex-1">
              <button
                onClick={() => onChange(tab.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-bold transition active:scale-95 ${
                  active
                    ? 'text-calm-600 dark:text-calm-200'
                    : 'text-calm-400 hover:text-calm-500 dark:text-calm-500 dark:hover:text-calm-300'
                }`}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {tab.icon}
                </svg>
                {tab.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
