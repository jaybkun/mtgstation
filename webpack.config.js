const path = require('path');
const webpack = require('webpack');

const hotLoader = require('./webpack.loaders.config').hotLoader;
const babelLoader = require('./webpack.loaders.config').babelLoader;
const eslintLoader = require('./webpack.loaders.config').eslintLoader;
const cssLoader = require('./webpack.loaders.config').cssLoader;
const imageLoader = require('./webpack.loaders.config').imageLoader;
const woffLoader = require('./webpack.loaders.config').woffLoader;
const fontLoader = require('./webpack.loaders.config').fontLoader;
const yamlLoader = require('./webpack.loaders.config').yamlLoader;
const jsonLoader = require('./webpack.loaders.config').jsonLoader;

const appEntry = path.resolve(__dirname, 'app', 'app.entry');
const buildPath = path.resolve(__dirname, 'public', 'dist');

module.exports = {
  devtool: 'eval',
  entry: {
    mtgstation: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      appEntry
    ]
  },
  output: {
    path: buildPath,
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      hotLoader,
      babelLoader,
      eslintLoader,
      cssLoader,
      imageLoader,
      woffLoader,
      fontLoader,
      yamlLoader,
      jsonLoader
    ]
  }
};
