const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb://localhost/mtgstation');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(favicon(path.join(__dirname, '../client/favicon.ico')));

// handle application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// handle application/json
app.use(bodyParser.json());

app.use('/dist/', express.static(path.join(__dirname, '../../dist/')));
app.use('/images/', express.static(path.join(__dirname, '../client/images')));
app.use('/api', routes);
app.get('*', function(req, res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 * @param val Port
 */

function normalizePort(val) {
  const port = parseInt(val, 10);
  const PORT_FLOOR = 0;

  if (isNaN(port)) {
    return val;
  }

  if (port >= PORT_FLOOR) {
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  const ERR_CODE = 1;
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(ERR_CODE);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(ERR_CODE);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

// error handlers

// development error handler
// will print stacktrace
const HTTP_SERVER_ERROR_CODE = 500;
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || HTTP_SERVER_ERROR_CODE);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || HTTP_SERVER_ERROR_CODE);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
