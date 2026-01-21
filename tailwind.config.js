/** @type {import('tailwindcss').Config} */
export default {
  // 👇 THIS IS THE FIX: It tells Tailwind to look inside 'src'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        dark: '#0f172a',
        card: '#1e293b'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shine: {
          to: { backgroundPosition: '200% center' }
        }
      }
    },
  },
  plugins: [],
}