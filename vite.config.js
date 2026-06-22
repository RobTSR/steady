import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path: set to '/' for Vercel, or '/<repo-name>/' for GitHub Pages.
// You can override with the BASE_PATH env var at build time.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
