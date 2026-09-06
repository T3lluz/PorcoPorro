import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Serves from https://t3lluz.github.io/PorcoPorro/
// https://vite.dev/config/
export default defineConfig({
  base: '/PorcoPorro/',
  plugins: [react()],
  server: {
    // Vite ignores $PORT and would always grab 5173, which collides with a dev
    // server already running by hand. Honouring it lets a second, tool-launched
    // server take an assigned port instead of fighting for that one.
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
})
