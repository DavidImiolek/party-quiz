import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/party-quiz/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Party Quiz',
        short_name: 'PartyQuiz',
        description: 'GeoGuesser-style party quiz game',
        theme_color: '#7c3aed',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: '/party-quiz/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/party-quiz/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
