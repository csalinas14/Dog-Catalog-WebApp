/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'cat-pattern': "url('/src/assets/overlapping-circles 2.svg')",
      },
    },
  },
  plugins: [require('daisyui')],
}
