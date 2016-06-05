const path = require('path');
const appPath = path.join(__dirname, 'app');

const hotLoader = {
  test: /\.js$/,
  loader: 'react-hot',
  include: appPath
};

const eslintLoader = {
  test: /\.js$/,
  loader: 'eslint',
  include: appPath
};

const babelLoader = {
  test: /\.js$/,
  loader: 'babel',
  include: appPath,
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

const jsonLoader = {
  test: /\.json$/i,
  loader: "json"
};

const yamlLoader = {
  test: /\.ya?ml$/i,
  loaders: ['json', 'yaml']
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
  hotLoader: hotLoader,
  babelLoader: babelLoader,
  eslintLoader: eslintLoader,
  imageLoader: imageLoader,
  woffLoader: woffLoader,
  fontLoader: fontLoader,
  cssLoader: cssLoader,
  jsonLoader: jsonLoader,
  yamlLoader: yamlLoader
};
