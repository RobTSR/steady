import { useEffect, useRef } from 'react'

// Accessible, gentle confirmation modal. Used for resetting the counter.
export default function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = 'Continue',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null)

  useEffect(() => {
    if (!open) return
    confirmRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-calm-950/40 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm animate-fade-up rounded-3xl bg-white p-6 shadow-xl dark:bg-calm-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-lg font-extrabold text-calm-800 dark:text-calm-50">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-calm-600 dark:text-calm-300">{body}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full bg-calm-100 px-4 py-3 text-sm font-bold text-calm-700 transition active:scale-95 hover:bg-calm-200 dark:bg-calm-800 dark:text-calm-100 dark:hover:bg-calm-700"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="flex-1 rounded-full bg-warmth-500 px-4 py-3 text-sm font-bold text-white transition active:scale-95 hover:brightness-95"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
