/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          DEFAULT: '#0d6efd', // Bootstrap Blue
          dark: '#0a58ca',
        },
        dark: {
          light: '#343a40',
          DEFAULT: '#212529', // Bootstrap Dark
          dark: '#000000',
        }
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
