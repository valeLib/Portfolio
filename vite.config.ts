import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  // Determine base path from environment variable or default
  const profile = env.VITE_PROFILE || 'unified';
  const basePath = env.VITE_BASE || (profile === 'gamedev' ? '/Portfolio/Gamedev/' : '/Portfolio/');
  
  console.log(`\n🔧 Build Configuration:`);
  console.log(`   Profile: ${profile}`);
  console.log(`   Base Path: ${basePath}`);
  console.log(`   CV Variant: ${env.VITE_CV_VARIANT || 'software'}`);
  console.log(`   Mode: ${mode}\n`);
  
  return {
    plugins: [react()],
    
    // Dynamic base URL based on profile for GitHub Pages deployment
    base: basePath,
    
    build: {
      // Generate source maps for debugging (disabled in production for size)
      sourcemap: false,
      
      // Chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            gsap: ['gsap'],
            lottie: ['@lottiefiles/dotlottie-react'],
          },
        },
      },
      
      // Output directory
      outDir: 'dist',
      
      // Clear output directory before build
      emptyOutDir: true,
    },
    
    // Preview server configuration (for testing builds locally)
    preview: {
      port: profile === 'gamedev' ? 4174 : 4173,
      strictPort: false,
    },
  };
});
