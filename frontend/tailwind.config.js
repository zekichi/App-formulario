/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: 'var(--color-fondo)',
        texto: 'var(--color-texto)',
        acento: 'var(--color-acento)',
        borde: 'var(--color-borde)',
        blanco: 'var(--color-blanco)',
      },
    },
  },
  plugins: [],
}
