module.exports = function (api) {
  api.cache(false);
  const presets = [
    ["@babel/preset-typescript"],
    [
      "@babel/preset-env",
      {
        corejs: { version: 3 },
        useBuiltIns: "usage",
      },
    ],
  ];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/transform-runtime"],
  ];
  return {
    sourceType: "unambiguous",
    presets,
    plugins,
  };
};
