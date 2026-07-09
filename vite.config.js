import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // GitHub Pages sirve este proyecto en /aikido-demo-frontend/, no en la raíz
  base: '/aikido-demo-frontend/',
  plugins: [vue()],
})
