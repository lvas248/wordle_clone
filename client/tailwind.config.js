/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        glideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0%)', opacity: 1 },
        },
      },
      animation:{
        'glide-up':'glideUp 800ms ease-out ',

      }
    },
  },
  plugins: [],
}

