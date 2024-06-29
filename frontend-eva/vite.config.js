import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Rutas relativas
  build: {
    outDir: 'dist', // Directorio de salida
  },
  plugins: [react()],
  assetsInclude: ['**/*.zip', '**/*.apk'],
  // assetsInclude: ['**/*.apk'],
})
