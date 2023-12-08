/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(180deg)', backfaceVisibility: 'visible' },
          '100%': { transform: 'rotateX(0)' }
        },
        glideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0%)', opacity: 1 },
        },
      },
      animation: {
        'glide-up': 'glideUp 800ms ease-out',
        'flip': 'flip 0.5s ease-in-out'
      }
    },
  },
  plugins: [],
};

