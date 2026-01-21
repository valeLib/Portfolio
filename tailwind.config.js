/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors - reference CSS variables
        primary: {
          400: '#E879F9', // Dark: Fuchsia, Light: Strong green
          500: '#A855F7', // Dark: Purple, Light: Strong green  
          DEFAULT: '#A855F7',
        },
        accent: {
          400: '#C084FC', // Dark: Light purple, Light: Mid green
          500: '#A855F7', // Dark: Purple, Light: Strong green
          DEFAULT: '#E879F9',
        },
        dark: {
          300: '#94a3b8', // Muted text
          400: '#64748b', // Secondary muted
          500: '#475569', // More muted
          600: '#334155', // Border-like
          700: '#1e293b', // Surface
          800: '#0f172a', // Dark surface
          900: '#020617', // Deepest
          950: '#020617', // Deepest
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(217, 70, 239, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(217, 70, 239, 0.8)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
