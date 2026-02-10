/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rose-quartz': '#F7CAC9',
        'serenity': '#92A8D1',
      },
      fontFamily: {
        'display': ['"Dancing Script"', 'cursive'],
        'body': ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slow-zoom': 'zoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
