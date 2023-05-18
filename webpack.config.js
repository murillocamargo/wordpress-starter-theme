const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = (_env, options) => {
  const devMode = options.mode !== "production";

  return {
    watch: devMode,
    watchOptions: {
      aggregateTimeout: 200,
      ignored: ["**/node_modules", "**/dist"],
      poll: 1000,
    },
    entry: {
      main: "./source/index.ts",
    },
    devtool: "source-map",
    resolve: {
      extensions: [".js", ".ts"],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist/"),
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(svg|png|jpg|ico|xml|webmanifest)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(otf|ttf|woff2?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[contenthash].[ext]",
                output: "fonts/",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new WebpackManifestPlugin({
        generate: (_seed, files, _entries) => {
          const manifest = {};

          files.forEach((file) => {
            if (file.chunk) {
              let filename;
              if (file.name.endsWith(".css")) {
                filename = `${file.chunk.name}.css`;
              } else {
                filename = `${file.chunk.name}.js`;
              }
              manifest[file.name] = `${filename}?hash=${file.chunk.hash}`;
            }
          });

          return manifest;
        },
      }),
      ...(devMode ? [new LiveReloadPlugin()] : []),
    ],
  };
};
