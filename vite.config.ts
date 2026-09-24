import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  base: process.env.BASE_PATH || (mode === 'production' && !process.env.VERCEL ? '/Kurrainfra-website/' : '/'),
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: true,
    port: 3000,
    open: true
  }
}));
