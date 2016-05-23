/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

// Loaders
const babelLoader = {
  test: /\.js$/,
  loader: 'babel',
  query: {presets: ['react', 'es2015']},
  include: path.join(__dirname, 'src/client')
};

module.exports = {
  debug: true,
  cache: true,
  entry: {
    mtgstation: [
      'babel-polyfill',
      './src/client/app.entry.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '/dist/'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],
  module: {
    loaders: [
      babelLoader
    ]
  }
};

