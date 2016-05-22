const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const environments = require('gulp-environments');
const production = environments.production;

gulp.task('webpack', () => {
  const webpackConfig = production() ? 'webpack.dist.js' : 'webpack.dev.js';
  const config = require(webpackConfig);
  return gulp.src('src/client/**/*', {read: false})
    .pipe(webpack(config))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['lint'], () => {
  gulp.watch('src/**/*.js', ['lint']);
});

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['lint']);
