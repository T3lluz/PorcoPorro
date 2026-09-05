import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Serves from https://t3lluz.github.io/PorcoPorro/
// https://vite.dev/config/
export default defineConfig({
  base: '/PorcoPorro/',
  plugins: [react()],
})
