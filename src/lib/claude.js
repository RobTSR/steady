// Client-side Claude API integration.
//
// Privacy note: the API key is read from localStorage and sent ONLY to
// api.anthropic.com directly from the user's browser. It never touches any
// server of ours (there isn't one). Calling the API from a browser requires the
// `anthropic-dangerous-direct-browser-access` header.

const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-opus-4-6'

const SYSTEM_PROMPT = `You write a single short message of support for a person in recovery from self-harm, who may also be living with depression.

Voice and values:
- Warm, genuine, and human. Speak to them like a caring friend who respects them.
- Affirm that their effort matters, that recovery is not linear, and that setbacks are not failures.
- Encourage self-compassion, noticing small wins, and reaching out for support when needed.

Hard rules:
- 2 to 3 sentences. No more.
- NO toxic positivity. Never imply that willpower alone fixes things, never minimize their pain, never say "just stay positive" or "everything happens for a reason."
- Do not give medical advice, do not diagnose, do not mention self-harm methods or any specifics of harm.
- No emojis, no hashtags, no greetings like "Hi" or sign-offs. Just the message itself.
- Do not start with "Remember" or "You are not alone" every time — vary your openings.

Return only the message text, nothing else.`

export function buildUserPrompt({ days = 0, recent = [] } = {}) {
  const parts = [
    `Write today's message of support.`,
    days > 0
      ? `For gentle context, they are ${days} day${days === 1 ? '' : 's'} into their journey — you may acknowledge this softly, or not at all. Do not make the number the whole point.`
      : `It may be early in their journey, or a fresh start — meet them with warmth wherever they are.`,
  ]
  if (recent.length) {
    parts.push(
      `Make it clearly different in wording and focus from these recent messages so it feels fresh:\n- ${recent
        .slice(0, 7)
        .join('\n- ')}`
    )
  }
  return parts.join('\n\n')
}

// Throws on any failure so the caller can fall back to a pre-written message.
export async function fetchDailyMessage({ apiKey, days = 0, recent = [], signal } = {}) {
  if (!apiKey) throw new Error('No API key provided')

  const res = await fetch(API_URL, {
    method: 'POST',
    signal,
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 256,
      temperature: 1,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt({ days, recent }) }],
    }),
  })

  if (!res.ok) {
    let detail = ''
    try {
      const err = await res.json()
      detail = err?.error?.message || ''
    } catch {
      /* ignore */
    }
    throw new Error(`Claude API error ${res.status}${detail ? `: ${detail}` : ''}`)
  }

  const data = await res.json()
  const text = Array.isArray(data?.content)
    ? data.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .trim()
    : ''

  if (!text) throw new Error('Empty response from Claude')
  return text
}
