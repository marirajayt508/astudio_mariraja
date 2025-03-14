/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#322625',
        'custom-grey': '#ebebeb',
        'custom-blue': '#c0e3e5',
        'custom-yellow': '#fdc936',
      },
      fontFamily: {
        'neutra': ['Neutra Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
