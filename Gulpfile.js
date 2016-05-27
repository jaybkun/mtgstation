const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const gutil = require('gulp-util');

const WEBPACK_DEV_SERVER_PORT = 3001;

/**
 * Task: webpack
 * This task builds the production webpack bundle
 */
gulp.task('webpack', () => {
  const distConfig = require('./webpack.dist');
  return gulp.src('src/client/app.entry.js')
    .pipe(webpackStream(distConfig))
    .pipe(gulp.dest('dist/'));
});

/**
 * Task: webpack-dev-server
 * This task runs a webpack-dev-server instance which handles linting by itself
 */
gulp.task('webpack-dev-server', () => {
  // Start a webpack-dev-server
  const devConfig = require('./webpack.dev');
  devConfig.debug = true;

  new WebpackDevServer(webpack(devConfig), {
    noInfo: true,
    stats: {
      colors: true
    },
    contentBase: './src/client',
    publicPath: '/dist/'
  }).listen(WEBPACK_DEV_SERVER_PORT, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:' + WEBPACK_DEV_SERVER_PORT + '/webpack-dev-server/');
  });
});

/**
 * Task: watch
 * This task automatically runs the linter continuously
 */
gulp.task('watch', ['lint'], () => {
  gulp.watch('src/**/*.js', ['lint']);
});

/**
 * Task: lint
 * This task runs the linter
 */
gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Composite tasks
gulp.task('default', ['webpack-dev-server']);
gulp.task('dist', ['lint', 'webpack']);
