import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' lets the built site work on GitHub Pages, Netlify or any sub-folder
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'docs' }, // GitHub Pages serves the site from /docs
})
