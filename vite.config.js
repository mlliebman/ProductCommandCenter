import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change 'product-command' to your actual GitHub repo name
  base: '/product-command/',
  build: {
    outDir: 'dist',
  }
})
