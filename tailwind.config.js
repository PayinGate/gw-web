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
  screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'custombp': {'raw': '(min-height: 375px),(min-width:768px)'}
    },
  plugins: [],
}

