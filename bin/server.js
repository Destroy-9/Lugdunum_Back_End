#!/usr/bin/env node

const app = require('../app');
const debug = require('debug')('lugdunum-back-end:server');
const http = require('http');

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') { //syscall = system calls
    throw error;
  }
<<<<<<< HEAD:bin/server.js
  const bind = typeof port === 'string'
=======
  /** si typof port === string alors bind prend la valeur 'Pipe' + port, sinon 'Port' + port **/
  var bind = typeof port === 'string'
>>>>>>> 58577fbd85d9c1266d0bc520039f08d337e931d9:bin/www.js
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
