// Thin, safe wrapper around localStorage. All keys live under one namespace so
// clearing the app's data is easy and we never collide with other apps.
const PREFIX = 'steady:'

export const KEYS = {
  startDate: 'startDate',
  apiKey: 'apiKey',
  theme: 'theme',
  dailyMessage: 'dailyMessage',
  messageHistory: 'messageHistory',
  showHistory: 'showHistory',
}

export function read(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage may be full or blocked (private mode). Degrade gracefully.
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // ignore
  }
}
