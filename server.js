#!/bin/env node

'use strict';

/**
 * Module dependencies.
 */

require('dotenv').config({
	path: '.env'
});

var app = require('./app.js');
var debug = require('debug')('portfolio:server');
var http = require('http');

/**
 * Get port and IP address from environment and store in Express.
 */

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.set('ipaddress', ipaddress);

var port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(app.get('port'), app.get('ipaddress'));
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);
    
    if ( isNaN( port ) ) {
        // named pipe
        return val;
    }
    
    if ( port >= 0 ) {
        // port number
        return port;
    }
    
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  
    if (error.syscall !== 'listen') {
        throw error;
    }
    
    var bind = ( typeof port === 'string' ) ? 'Pipe ' + port : 'Port ' + port;
    
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
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = process.env.OPENSHIFT_NODEJS_IP || server.address();
    var bind = ( typeof addr === 'string' ) ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}


