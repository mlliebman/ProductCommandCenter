import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ base: '/ProductCommandCenter/',
  plugins: [react()],
  // Change 'product-command' to your actual GitHub repo name
  base: '/ProductCommandCenter/',
  build: {
    outDir: 'dist',
  }
})
