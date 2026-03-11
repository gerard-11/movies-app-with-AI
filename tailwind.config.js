/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0f0f0f',
        'brand-secondary': '#1a1a1a',
        'brand-card': '#262626',
        'brand-accent': '#ef4444',
        'brand-gold': '#f59e0b',
        'brand-text': '#f5f5f5',
        'brand-text-secondary': '#d4d4d4',
        'brand-muted': '#6b7280',
        'brand-border': '#404040',
      },
      backgroundColor: {
        'primary': '#0f0f0f',
        'secondary': '#1a1a1a',
        'card': '#262626',
      },
      textColor: {
        'primary': '#f5f5f5',
        'secondary': '#d4d4d4',
        'muted': '#6b7280',
      },
      borderColor: {
        'brand': '#404040',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
      },
    },
  },
  plugins: [],
}
