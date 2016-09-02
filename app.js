/// <reference path="_all.d.ts" />
"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const indexRoute = require("./routes/index");
/**
 * The server.
 *
 * @class Server
 */
class Server {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //configure routes
        this.routes();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    static bootstrap() {
        return new Server();
    }
    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    config() {
        //configure jade
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");
        //mount logger
        //this.app.use(logger("dev"));
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    routes() {
        //get router
        let router;
        router = express.Router();
        //create routes
        var index = new indexRoute.Index();
        //home page
        router.get("/", index.index.bind(index.index));
        //use router middleware
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
