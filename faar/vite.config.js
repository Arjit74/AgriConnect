import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // ✅ deploy at root
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html',
      onwarn: (warning, warn) => {
        if (
          warning.code === 'UNRESOLVED_IMPORT' &&
          ['react-router/dom', 'motion-utils', 'motion-dom'].includes(warning.source)
        ) {
          return
        }
        warn(warning)
      }
    }
  }
})
