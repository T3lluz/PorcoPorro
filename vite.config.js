import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://t3lluz.github.io/PorcoRosso/, so `base` has to match the
// repo name. See https://vite.dev/config/
export default defineConfig({
  base: '/PorcoRosso/',
  plugins: [react()],
  server: {
    // Vite ignores $PORT and always grabs 5173, colliding with a server already
    // started by hand.
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
})
