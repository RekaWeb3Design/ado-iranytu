import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ado-iranytu/',
  plugins: [react()],
  server: {
    port: 5173,
  },
});
