/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#f5f5f4',
        texto: '#1c1917',
        acento: '#7c2d12',
        borde: '#d6d3d1',
        blanco: '#ffffff'
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'serif']
      }
    },
  },
  plugins: [],
}
