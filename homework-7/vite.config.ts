import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@homework-7/ui': path.resolve(__dirname, 'libs/ui/src/index.ts'),
      '@homework-7/hooks': path.resolve(__dirname, 'libs/hooks/src/index.ts'),
      '@homework-7/i18n': path.resolve(__dirname, 'libs/i18n/src/index.ts'),
    },
  },
})