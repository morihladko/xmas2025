import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  // For GitLab Pages: use repo name as base path in production
  base: process.env.CI ? `/${process.env.CI_PROJECT_NAME}/` : '/',
})
