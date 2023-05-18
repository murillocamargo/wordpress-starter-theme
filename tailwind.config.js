/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.php"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
    },
    fontFamily: {
      // sans: "'Neue Haas Grotesk Display Pro', sans-serif",
      // body: "'Neue Haas Grotesk Display Pro', sans-serif",
    },
    fontSize: {
      // 'tiny': '.625rem',
      // 'xs': '.75rem',
      // 'base': '.938rem',
      // 'sm': '1.25rem',
      // 'lg': '1.875rem',
      // 'xl': '2.5rem',
      // '2xl': '3.75rem',
      // '3xl': '4.625rem',
    },
    extend: {
      colors: {
        // "aqua": "#98D3C8",
        // "aqua-light": "#D6EDE9",
        // "dark-graffite": "#212322",
        // "light-graffite": "#969696",
        // "gray-500": "#A5A5A5",
        // "gray-400": "#BEBEBE",
        // "gray-300": "#000059",
        // "gray-200": "#000033",
        // "gray-100": "#000029",
      },
    },
  },
  plugins: [],
}

