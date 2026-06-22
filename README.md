# Steady — one day at a time

**Live app:** https://steadyrecoveryapp.netlify.app
&nbsp;·&nbsp; **Source:** https://github.com/RobTSR/steady

A warm, non-judgmental Progressive Web App to support people in recovery from
self-harm. It does two simple, gentle things:

1. **Days counter** — a large, encouraging "X days since" count, stored locally
   and resettable without shame.
2. **Daily message** — one short, genuine note of support each day, drawn from a
   built-in pool of ~120 hand-crafted messages that rotates with no repeats.
   Optionally, with your own Claude API key, messages can be generated fresh
   instead.

Everything lives on your device. There is no account, no server, and no
tracking. By default it needs **no API key and no network at all** — the daily
messages are bundled into the app and work fully offline. If you choose to add a
Claude API key, it is stored only in your browser and sent **directly** to
Anthropic, never to anyone else.

> This app is not a substitute for professional help. If you’re in crisis, please
> reach out — in the US you can call or text **988** any time.

---

## Features

- 📆 Large day counter with gentle animations, in the header and on Home
- 💬 Once-per-day supportive message from a bundled, offline pool of ~120 notes
- 🔁 Deterministic daily rotation — everyone gets the same message per day, with
  no repeats until the whole pool is seen
- 🔄 "New message" button to draw another whenever you want
- 🤖 Optional live generation via your own Claude API key (with offline fallback)
- 🌗 Light / dark mode (defaults to your system preference)
- 📱 Mobile-first, one-handed bottom navigation, accessible typography
- 🕗 Optional history of your last 7 messages
- 📦 Installable PWA with offline support, plus an iOS App Store path (Capacitor)

## Tech stack

- **React 18** (hooks) + **Vite**
- **Tailwind CSS** for styling
- Browser **localStorage** for all data
- Bundled, offline **message pool** (`src/data/dailyMessages.js`) with
  deterministic daily rotation (`src/lib/messagePool.js`)
- Optional **Claude API** (`/v1/messages`, model `claude-opus-4-6`) called
  directly from the browser
- **Capacitor** for wrapping the web app into a native iOS app

---

## Getting started

You’ll need [Node.js](https://nodejs.org/) 18+ installed.

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

The production site is output to `dist/`.

---

## Getting a Claude API key (optional)

**You do not need an API key.** Out of the box, the app shows a new supportive
message every day from a bundled pool of ~120 — fully offline, free, and
private. This is the recommended setup, especially if you're sharing the app
with others.

A key only adds *live, freshly generated* messages for your own personal use.
If you want that:

1. Go to the [Anthropic Console](https://console.anthropic.com/).
2. Sign up or log in, then open **Settings → API Keys**.
3. Click **Create Key**, copy it (it starts with `sk-ant-...`).
4. In the app, open **Settings**, paste the key into **Claude API key**, and
   tap **Save key**.

The key is stored only in your browser’s `localStorage` and is sent only to
`api.anthropic.com`. Note: API usage may incur charges on your Anthropic
account. You only call the API once per day (plus any manual "New message"
refreshes).

> **A note on browser API keys:** because there’s no backend, the key lives in
> your browser. That’s perfect for personal use on your own device. Don’t use
> this build on a shared/public computer, and don’t commit your key anywhere.
>
> **Distributing to other people?** Do **not** put your own key in the app for
> others to use — a web app is fully client-side, so anyone could read it and
> run up your bill. The bundled offline message pool exists precisely so you can
> share the app with no key, no cost, and no privacy concerns. (If you ever want
> live AI messages for many users, that requires a small server-side proxy that
> holds the key — out of scope for this build.)

---

## Installing as an app (Add to Home Screen)

**iPhone / iPad (Safari):** open the site → tap the **Share** icon → **Add to
Home Screen**.

**Android (Chrome):** open the site → menu **⋮** → **Install app** / **Add to
Home Screen**.

**Desktop (Chrome/Edge):** click the install icon in the address bar.

Once installed it launches full-screen and works offline.

---

## Deploying

### Vercel
1. Push this folder to a Git repo.
2. Import it in [Vercel](https://vercel.com/new). Framework preset: **Vite**.
3. Build command `npm run build`, output directory `dist`. Deploy.

### GitHub Pages
1. Set the base path so assets resolve under your repo subpath:
   ```bash
   BASE_PATH="/your-repo-name/" npm run build
   ```
2. Publish the `dist/` folder to the `gh-pages` branch (e.g. with the
   [`gh-pages`](https://www.npmjs.com/package/gh-pages) package or a GitHub
   Action). Enable Pages for that branch in your repo settings.

### Other static hosts

Because the build is a plain static site in `dist/`, it also works on Netlify,
Cloudflare Pages, Firebase Hosting, or any web server — just upload `dist/`.
No backend or special configuration is required.

---

## Turning it into an iOS app

There are two ways to get this onto an iPhone. Pick based on whether you need it
in the App Store.

### Option 1 — Add to Home Screen (free, no Mac, no review)

This is the simplest path and works **today**: deploy the site (above), open it
in Safari on the iPhone, tap **Share → Add to Home Screen**. It installs with an
icon, launches full-screen, and works offline. No Apple Developer account, no
Xcode, no review process. For many people this is all you need.

### Option 2 — A real App Store app (via Capacitor)

The project is already configured with [Capacitor](https://capacitorjs.com/),
which wraps the web app in a native iOS shell you can submit to the App Store.

> ⚠️ **You need a Mac for this.** Apple requires **macOS + Xcode** to build and
> sign any iOS app — this cannot be done on Windows. You’ll also need an
> [Apple Developer account](https://developer.apple.com/programs/) ($99/year) to
> publish. The steps below run **on a Mac**, after copying this project over.

```bash
# one-time, on a Mac with Xcode + CocoaPods installed:
npm install
npm run ios:add      # builds the web app and creates the native ios/ project
npm run ios:open     # opens the project in Xcode

# after any change to the web app, re-sync the built files:
npm run ios:sync
```

Then in Xcode: set your Signing Team, adjust the bundle identifier if you like
(it defaults to `app.steady.recovery` in `capacitor.config.json`), pick a device
or simulator, and **Run**. To publish, use **Product → Archive** and follow the
App Store Connect upload flow.

**A note on App Store review for this kind of app:** Apple reviews
mental-health and self-harm–related apps carefully and generally expects them to
surface crisis-support resources. This app already does (988, Samaritans, and
the Crisis Text Line on the Home and About screens), which helps — but review
outcomes are Apple’s call, so present the app’s supportive, non-clinical purpose
clearly in your App Store listing.

**No Mac at all?** You can rent one in the cloud (e.g. MacinCloud) or use a
macOS CI runner (GitHub Actions, Codemagic) to do the Xcode build. The
[PWABuilder](https://www.pwabuilder.com/) site can also package a deployed PWA
URL for iOS, but the final signing/submission still requires Apple’s tooling.

---

## Project structure

```
index.html                 App shell + PWA meta tags
capacitor.config.json      Native iOS wrapper config (Capacitor)
public/
  manifest.webmanifest     PWA manifest (installability)
  sw.js                    Service worker (offline caching)
  icon.svg / icon-*.png    App icons
src/
  main.jsx                 Entry point + service worker registration
  App.jsx                  Layout, navigation, top-level state
  index.css                Tailwind + base styles
  components/
    Counter.jsx            The big day counter (full + compact)
    DailyMessage.jsx       Message card + refresh button
    BottomNav.jsx          One-handed bottom navigation
    ConfirmDialog.jsx      Accessible reset confirmation
  pages/
    Home.jsx               Counter + message
    Settings.jsx           API key, theme, reset, history
    About.jsx              What the app is + crisis resources
  hooks/
    useTheme.js            Light/dark with system default
    useDailyMessage.js     Once-per-day select, cache, history
  lib/
    storage.js             Namespaced localStorage helpers
    date.js                Local-timezone day math + day index
    messagePool.js         Deterministic daily rotation over the pool
    claude.js              Optional Claude API client + prompts
  data/
    dailyMessages.js       The offline pool of supportive messages
```

## Customizing

- **Messages & tone:** edit the pool in `src/data/dailyMessages.js` (add or
  remove entries freely — the rotation adapts to the length). For the optional
  live-generation path, edit the system prompt in `src/lib/claude.js`.
- **Colors / fonts:** edit the palette in `tailwind.config.js`.
- **Model:** change `MODEL` in `src/lib/claude.js`.
- **Icons:** replace `public/icon.svg` (and the matching `icon-192.png` /
  `icon-512.png` used by the manifest and iOS home screen). You can regenerate
  the PNGs from the SVG with any rasterizer, e.g. `npx sharp-cli`.

---

Made with care. Be gentle with yourself. 💜
