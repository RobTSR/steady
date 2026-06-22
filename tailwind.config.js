/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Calming, warm palette — soft blues, purples, and gentle oranges.
        calm: {
          50: '#f4f3ff',
          100: '#e9e7ff',
          200: '#d4d0ff',
          300: '#b6afff',
          400: '#938af6',
          500: '#6d6af0',
          600: '#5a52d8',
          700: '#4a42b0',
          800: '#3d378c',
          900: '#2f2b66',
          950: '#1c1a3d',
        },
        warmth: {
          200: '#ffe2c4',
          300: '#ffcb97',
          400: '#ffb066',
          500: '#ff9640',
        },
      },
      fontFamily: {
        sans: ['"Nunito"', 'ui-rounded', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pop': {
          '0%': { transform: 'scale(0.96)', opacity: '0.6' },
          '60%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gentle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
        'soft-pop': 'soft-pop 0.45s ease-out',
        'gentle-pulse': 'gentle-pulse 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
