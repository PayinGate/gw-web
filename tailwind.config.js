/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        Bebas: 'Bebas Neue',
        Manrope: 'Manrope',
        dmsans: 'DM Sans',
        inter: 'inter',
        Archivo: 'Archivo',
        Rubik: 'Rubik',
        CircularStd: 'CircularStd',
        Poppins: 'Poppins',
        Lato: 'Lato',
        satoshi: 'satoshi',
        ClashDisplay: 'ClashDisplay',
        outfit: 'Outfit',
        futura: 'Futura',
        Neurial: 'NeurialGrotesk'
      },
    },
  },
  plugins: [],
}

