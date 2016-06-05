const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');
const path = require('path');
const fs = require('fs');

const mainPath = path.resolve(__dirname, '..', 'app', 'app.entry.js');

module.exports = function() {
  let bundleStart = null;
  const compiler = Webpack(webpackConfig);

  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', () => {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  const bundler = new WebpackDevServer(compiler, {
    publicPath: '/dist/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(3001, 'localhost', () => {
    console.log('Bundling mtgStation, please wait...');
  });
};
