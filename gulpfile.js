'use strict';

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const del = require("del");
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");
const sourcemaps = require('gulp-sourcemaps');
const gulp = require("gulp");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tailwindcss = require("tailwindcss");

// Clean assets
function clean() {
  return del(['./dist', './assets/css', './assets/scripts', './assets/images']);
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(["./source/index.ts"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return gulp
    .src("./source/index.ts")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(webpackStream({
      mode: 'production',
      output: {
        filename: 'frontend.min.js',
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread'],
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [tailwindcss(), autoprefixer(), cssnano()],
                  },
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "../css/frontend.min.css",
        }),
      ],
      devtool: 'source-map',
    }, webpack))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./assets/scripts/"));
}

function copyAssets() {
  return gulp
    .src("./assets/**/*")
    .pipe(gulp.dest('dist/assets'));
}

function copyStructure() {
  return gulp
    .src(["./*.{html,php}", "./*.css"])
    .pipe(gulp.dest('dist'));
}

function copyComponents() {
  return gulp
    .src("./inc/**/*")
    .pipe(gulp.dest('dist/inc'));
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    open: 'external',
    host: 'playground.local',
    proxy: 'playground.local'
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch([
      "./source/**/*",
      "./**/*.php"],
    gulp.series(js, browserSyncReload));
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const assets = js;
const copy = gulp.parallel(copyAssets, copyStructure, copyComponents);

const build = gulp.series(clean, assets, copy);
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.build = build;
exports.watch = watch;
exports.default = gulp.series(build, watch);
