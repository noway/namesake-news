/// <reference path="_all.d.ts" />
"use strict";
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var indexRoute = require("./routes/index");
var fbLoginRoute = require("./routes/fbLogin");
var passport = require("passport");
var passportFacebook = require("passport-facebook");
var request = require("request");
var queryString = require("query-string");
//const queryString = require('query-string');
var Strategy = passportFacebook.Strategy;
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
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
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.config = function () {
        //configure jade
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        //mount logger
        //this.app.use(logger("dev"));
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        this.app.use(require('express-session')({ secret: '0987654321.jk', resave: true, saveUninitialized: true }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        // Configure the Facebook strategy for use by Passport.
        //
        // OAuth 2.0-based strategies require a `verify` function which receives the
        // credential (`accessToken`) for accessing the Facebook API on the user's
        // behalf, along with the user's profile.  The function must invoke `cb`
        // with a user object, which will be set at `req.user` in route handlers after
        // authentication.
        passport.use(new Strategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://ftpes.azurewebsites.net:8080/login/facebook/return',
            profileFields: ['id', 'displayName', 'photos', 'email', 'first_name']
        }, function (accessToken, refreshToken, profile, cb) {
            // In this example, the user's Facebook profile is supplied as the user
            // record.  In a production-quality application, the Facebook profile should
            // be associated with a user record in the application's database, which
            // allows for account linking and authentication with other identity
            // providers.
            return cb(null, profile);
        }));
        // Configure Passport authenticated session persistence.
        //
        // In order to restore authentication state across HTTP requests, Passport needs
        // to serialize users into and deserialize users out of the session.  In a
        // production-quality application, this would typically be as simple as
        // supplying the user ID when serializing, and querying the user record by ID
        // from the database when deserializing.  However, due to the fact that this
        // example does not have a database, the complete Twitter profile is serialized
        // and deserialized.
        passport.serializeUser(function (user, cb) {
            cb(null, user);
        });
        passport.deserializeUser(function (obj, cb) {
            cb(null, obj);
        });
        this.app.get('/login', function (req, res) {
            res.redirect('/login/facebook');
        });
        this.app.get('/login/facebook', passport.authenticate('facebook'));
        this.app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
            res.redirect('/news');
        });
        this.app.get('/name-news', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
            request({
                url: 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + req.user._json.first_name + '&count=10&offset=' + req.query.offset + '&mkt=en-us&safeSearch=Moderate',
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.BING_KEY
                }
            }, function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var data = JSON.parse(body);
                    for (var i = 0; i < data.value.length; i++) {
                        data.value[i].url = queryString.parse(data.value[i].url).r;
                    }
                    res.send(JSON.stringify(data));
                }
            });
        });
        this.app.get('/news', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
            //res.send(JSON.stringify(req.user));
            res.render('news', { user: req.user._json });
        });
    };
    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    Server.prototype.routes = function () {
        //get router
        var router;
        router = express.Router();
        //create routes
        var index = new indexRoute.Index();
        var fbLogin = new fbLoginRoute.FbLogin();
        //home page
        router.get("/", index.index.bind(index.index));
        router.get("/fb-login", fbLogin.index.bind(fbLogin.index));
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
