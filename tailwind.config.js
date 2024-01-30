/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

function toRem(px) {
  return `${px / 16}rem`;
}

module.exports = {
  content: ["./**/*.php"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "768px",
        md: "1024px",
        lg: "1280px",
        xl: "1536px",
      },
    },
    fontSize: {
      10: toRem(10),
      11: toRem(11),
      12: toRem(12),
      13: toRem(13),
      14: toRem(14),
      15: toRem(15),
      16: toRem(16),
      17: toRem(17),
      18: toRem(18),
      20: toRem(20),
      22: toRem(22),
      24: toRem(24),
      26: toRem(26),
      28: toRem(28),
      30: toRem(30),
      32: toRem(32),
      35: toRem(35),
      40: toRem(40),
      45: toRem(45),
      50: toRem(50),
      56: toRem(56),
      60: toRem(60),
      70: toRem(70),
      80: toRem(80),
      90: toRem(90),
      120: toRem(120),
    },
    extend: {
      // Font being loaded on /source/scripts/utilities/webfonts.ts
      fontFamily: {
        "bvg-primary": ["Montserrat", "sans-serif"],
        "bvg-sans": ["Roboto", "sans-serif"],
        "bmo-primary": ["din-condensed", "sans-serif"],
        "bmo-sans": ["proxima-nova", "sans-serif"],
      },
      colors: {
        "primary-bmo": "#0F1138",
        "orange-bmo": "#EB6600",
        "yellow-bmo": "#FFCA7D",
        "blue-bmo": "#99B6F2",
        "gray-bmo-light": "#D9D9D9",
        "gray-bmo-dark": "#353535",
        "primary-bvg": "#00263D",
        "primary-bvg-100": "#6995BF",
        "primary-bvg-200": "#3869A9",
        "primary-bvg-300": "#21275D",
        "yellow-bvg-100": "#E2BA47",
        "yellow-bvg-200": "#D49635",
        "ring-start-bvg": "#D49635",
        "ring-end-bvg": "#6995BF",
        "ring-start-bmo": "#EB6600",
        "ring-end-bmo": "#FFCA7D",
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(circle,rgba(0,0,0,0.75) 25%,rgba(0,0,0,0) 100%)",
      },
      animation: {
        'rotate': 'rotate 10s ease-in infinite both',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms")({
      strategy: "base",
    }),
    function ({ addUtilities }) {
      const newUtilities = {};
      // Define grid classes from 1 to 12 columns with a gap of 8
      for (let i = 1; i <= 12; i++) {
        newUtilities[`.grid-${i}`] = {
          display: "flex",
          flexDirection: "column",
          gap: "2rem", // Corresponds to 'gap-8' in Tailwind's default spacing scale
          "@screen lg": {
            display: "grid",
            gridTemplateColumns: `repeat(${i}, minmax(0, 1fr))`,
            gap: "4rem", // Corresponds to 'gap-16' in Tailwind's default spacing scale
          },
        };
      }

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    plugin(function ({ addVariant, e }) {
      addVariant('bvg', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.theme-bvg .${e(`bvg${separator}${className}`)}`;
        });
      });
      addVariant('bmo', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.theme-bmo .${e(`bmo${separator}${className}`)}`;
        });
      });
    }),
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.gradient-ring': {
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            bottom: '-2px',
            left: '-2px',
            borderRadius: '100%',
            zIndex: '-1',
            animation: theme('animation.rotate'),
          },
        },
        '.theme-bvg .gradient-ring': {
          position: 'relative',
          '&:before': {
            background: `linear-gradient(90deg, ${theme('colors.ring-start-bvg')} 0%, ${theme('colors.ring-end-bvg')} 100%)`,
          },
        },
        '.theme-bmo .gradient-ring': {
          position: 'relative',
          '&:before': {
            background: `linear-gradient(90deg, ${theme('colors.ring-start-bmo')} 0%, ${theme('colors.ring-end-bmo')} 100%)`,
          },
        },
      });
    }),
  ],
};
