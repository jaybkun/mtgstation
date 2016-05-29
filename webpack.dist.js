/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

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
  entry: {
    mtgstation: [
      'babel-polyfill',
      './src/client/app.entry.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/'
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
