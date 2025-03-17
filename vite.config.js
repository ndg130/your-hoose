import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/your-hoose/' : '/',
  build: {
    outDir: 'dist', // Ensure everything is output to 'dist' folder
  },
  server: {
    hmr: true,
  },
}));
