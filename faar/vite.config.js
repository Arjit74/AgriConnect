import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/faar/' : '/',
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
        if (warning.code === 'UNRESOLVED_IMPORT' && 
            (warning.source === 'react-router/dom' || 
             warning.source === 'motion-utils' ||
             warning.source === 'motion-dom')) {
          return;
        }
        warn(warning);
      }
    }
  }
})