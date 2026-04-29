/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#3d3d5c', 100: '#2d2d4a', 200: '#1e1e35', 300: '#14142b', 400: '#0f0f1a', 500: '#080812',
        },
        surface: { card: 'rgba(45, 45, 74, 0.85)', column: 'rgba(30, 30, 53, 0.7)', overlay: 'rgba(20, 20, 43, 0.95)' },
        accent: {
          pink: '#ec4899', rose: '#f43f5e', fuchsia: '#d53f8c', purple: '#a855f7', violet: '#8b5cf6',
          indigo: '#6366f1', blue: '#3b82f6', sky: '#0ea5e9', cyan: '#06b6d4', teal: '#14b8a6',
          green: '#22c55e', lime: '#84cc16', yellow: '#eab308', amber: '#f59e0b', orange: '#f97316',
        }
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-yellow': '0 0 20px rgba(234, 179, 8, 0.5)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.5)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.5)',
      }
    },
  },
  plugins: [],
}