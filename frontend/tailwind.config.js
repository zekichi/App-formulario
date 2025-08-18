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
        fondo: 'fdf6e3',
        acento: 'b58900',
        texto: '073642',
        gris: 'eee8d5',
        sombra: '586e75',
      },
    },
  },
  plugins: [],
}

