import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://t3lluz.github.io/PorcoPorro/, so `base` has to match the
// repo name. See https://vite.dev/config/
export default defineConfig({
  base: '/PorcoPorro/',
  plugins: [react()],
  server: {
    // Vite ignores $PORT and always grabs 5173, which collides with a dev
    // server already running by hand. Honouring it lets a second server take an
    // assigned port instead.
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
})
