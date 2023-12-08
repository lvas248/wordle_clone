/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        vibrate:{
          '0%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(2%)' },
          '20%': { transform: 'translateX(0)' },
          '30%': { transform: 'translateX(-2%)' },
          '40%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(2%)' },
          '60%': { transform: 'translateX(0)' },
          '70%': { transform: 'translateX(2%)' },
          '80%': { transform: 'translateX(0)' },
          '90%': { transform: 'translateX(-2%)' },
          '100%': { transform: 'translateX(0)' },
        },
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
        'flip': 'flip 0.5s ease-in-out',
        'vibrate': 'vibrate 0.4s ease-in'
      }
    },
  },
  plugins: [],
};

