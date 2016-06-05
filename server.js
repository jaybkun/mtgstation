const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./server/routes');
const morgan = require('morgan');

const proxy = httpProxy.createProxyServer();
const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');

mongoose.connect('mongodb://localhost/mtgstation');
app.use(favicon(path.resolve(__dirname, 'public', 'favicon.ico')));
if (isProduction) {
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'));
}

app.use(express.static(publicPath));
// handle application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// handle application/json
app.use(bodyParser.json());
app.all('/api', routes);

if (!isProduction) {
  const bundle = require('./server/bundle');
  bundle();

  app.all('/dist/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

proxy.on('error', (err) => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
