import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Project pages are served from https://<user>.github.io/<repo>/, so assets
  // must be requested under that subpath rather than the domain root.
  base: '/yggdrasil/',
  plugins: [react()],
  server: { port: 5173 },
})