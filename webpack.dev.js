/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

const hotLoader = {
  test: /\.js$/,
  loader: 'react-hot',
  include: path.join(__dirname, 'src')
};

const eslintLoader = {
  test: /\.js$/,
  loader: 'eslint',
  include: path.join(__dirname, 'src')
};

const babelLoader = {
  test: /\.js$/,
  loader: 'babel',
  include: path.join(__dirname, 'src'),
  query: {
    presets: ['es2015', 'react']
  }
};

const imageLoader = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: [
    'file?hash=sha512&digest=hex&name=[hash].[ext]',
    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
  ]
};

const woffLoader = {
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: "url-loader?limit=10000&minetype=application/font-woff"
};

const fontLoader = {
  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: "file-loader"
};

const cssLoader = {
  test: /\.css$/,
  loaders: ['style', 'css']
};


module.exports = {
  devtool: 'eval',
  entry: {
    mtgstation: [
      'babel-polyfill',
      'webpack-dev-server/client?http://0.0.0.0:3001',
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
    new webpack.optimize.OccurrenceOrderPlugin(),
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
      fontLoader
    ]
  }
};
