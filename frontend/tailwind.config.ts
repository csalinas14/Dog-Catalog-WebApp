/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['retro', 'luxury'],
  },
}
