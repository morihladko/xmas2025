import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  // For GitHub Pages: use repo name as base path in production
  base: '/xmas2025/',
})
