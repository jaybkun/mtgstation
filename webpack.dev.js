/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

// Loaders
const eslintLoader = {
  test: /\.js$/,
  loader: 'eslint',
  include: path.join(__dirname, 'src/client'),
  exclude: /node_modules/
};

const hotLoader = {
  test: /\.js$/,
  loader: 'react-hot',
  include: path.join(__dirname, 'src/client')
};

const babelLoader = {
  test: /\.js$/,
  loader: 'babel',
  query: {presets: ['react', 'es2015']},
  include: path.join(__dirname, 'src/client')
};

const cssLoader = {
  test: /\.css$/,
  loader: 'style!css'
};

module.exports = {
  debug: true,
  cache: true,
  entry: {
    mtgstation: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/only-dev-server',
      './src/client/app.entry.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'src/client/dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  proxy: {
    '/api/*': {
      target: 'localhost:3000',
      secure: false
    }
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      hotLoader,
      babelLoader,
      eslintLoader,
      cssLoader
    ]
  }
};

