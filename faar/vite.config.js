import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // ✅ deploying to root, no subpath
  server: {
    proxy: {
      '/api': "http://localhost:8000"
    }
  },
  plugins: [react()],
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
          return; // ✅ suppress known bad module paths
        }
        warn(warning);
      }
    }
  }
})
