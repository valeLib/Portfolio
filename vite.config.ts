import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base URL for GitHub Pages deployment
  // Change 'VFXPortafolio' to your actual repository name
  base: '/Portafolio/',
  build: {
    // Generate source maps for debugging
    sourcemap: false,
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
          spline: ['@splinetool/react-spline'],
          lottie: ['@lottiefiles/react-lottie-player'],
        },
      },
    },
  },
});
