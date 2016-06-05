const path = require('path');
const webpack = require('webpack');

const babelLoader = require('./webpack.loaders.config').babelLoader;
const eslintLoader = require('./webpack.loaders.config').eslintLoader;
const cssLoader = require('./webpack.loaders.config').cssLoader;
const imageLoader = require('./webpack.loaders.config').imageLoader;
const woffLoader = require('./webpack.loaders.config').woffLoader;
const fontLoader = require('./webpack.loaders.config').fontLoader;

const appEntry = path.resolve(__dirname, 'app', 'app.entry');
const buildPath = path.resolve(__dirname, 'public', 'dist');

module.exports = {
  entry: {
    mtgstation: [
      'babel-polyfill',
      appEntry
    ]
  },
  output: {
    path: buildPath,
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ],
  module: {
    loaders: [
      babelLoader,
      eslintLoader,
      cssLoader,
      imageLoader,
      woffLoader,
      fontLoader
    ]
  }
};
