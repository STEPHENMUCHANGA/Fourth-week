import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/', // ensures correct routing on Vercel

  // Local dev server configuration
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Build options for Vercel deployment
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}));
