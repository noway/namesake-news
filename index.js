#!/usr/bin/env node
"use strict";
var app_1 = require('./app');
var process_1 = require('process');
var debug = require('debug')("express:server");
var http_1 = require('http');
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
var port = normalizePort(process_1["default"].env.PORT || 8080);
app_1["default"].set("port", port);
//create http server
var server = http_1["default"].createServer(app_1["default"]);
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
            process_1["default"].exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process_1["default"].exit(1);
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
