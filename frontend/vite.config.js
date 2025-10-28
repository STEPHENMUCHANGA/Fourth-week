import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ensures correct routing in production
  server: {
    proxy: {
      '/api': 'http://localhost:5000' // only used during local dev
    }
  }
});
