import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        safarbot: resolve(__dirname, 'projects/safarbot/index.html'),
        onyxClosings: resolve(__dirname, 'projects/onyx-closings/index.html'),
        abdanixSolutions: resolve(__dirname, 'projects/abdanix-solutions/index.html'),
        skylinkMobileShop: resolve(__dirname, 'projects/skylink-mobile-shop/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
})
