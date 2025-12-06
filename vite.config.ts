import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.NODE_ENV === 'production' ? '/ado-iranytu/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
