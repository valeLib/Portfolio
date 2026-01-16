import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine base path based on profile
const profile = process.env.VITE_PROFILE || 'tech-art';
const basePath = profile === 'frontend' ? '/Portfolio/Software-Engineer/' : '/Portfolio/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dynamic base URL based on profile for GitHub Pages deployment
  base: basePath,
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
          lottie: ['@lottiefiles/dotlottie-react'],
        },
      },
    },
  },
});
