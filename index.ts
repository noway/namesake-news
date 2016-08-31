#!/usr/bin/env node
"use strict";

//module dependencies.
declare var require: any

import app  from './app';

import process  from 'process';
var debug = require('debug')("express:server");
import http  from 'http';
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}


//get port from environment and store in Express.
var port = normalizePort(process.env.PORT || 8080);
app.set("port", port);

//create http server
var server = http.createServer(app);

//listen on provided ports
server.listen(port);

//add error handler
server.on("error", function onError(error) {
  /**
   * Event listener for HTTP server "listening" event.
   */
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

//start listening on port
server.on("listening", function onListening() {
  /**
   * Event listener for HTTP server "error" event.
   */
  var addr = server.address();
  var bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  debug("Listening on " + bind);
});

