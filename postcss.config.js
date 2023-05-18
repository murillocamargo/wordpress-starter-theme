module.exports = {
  plugins: [
    require("postcss-easy-import"),
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-easing-gradients"),
    require("postcss-focus-visible")({
      // don't preserve `:focus-visible` selector until wider browser support exists
      // https://github.com/jonathantneal/postcss-focus-visible/issues/6
      preserve: false,
    }),
    require("postcss-inline-svg"),
    ...(process.env.NODE_ENV === "production"
      ? [
        require("cssnano")({
          preset: "lite",
        }),
      ]
      : []),
  ],
};
