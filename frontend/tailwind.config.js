/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Libre Baskerville"', 'serif'],
      },
      colors: {
        fondo: '#fdf6e3',
        borde: '#e0b589',
        acento: '#d97d0d',
        texto: '#5c3d2e',
        blanco: '#fffaf3',
      },
    },
  },
  plugins: [],
}

