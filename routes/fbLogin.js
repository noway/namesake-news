/// <reference path="../_all.d.ts" />
"use strict";
var oauth2fb = require("oauth2-facebook");
var Route;
(function (Route) {
    var FbLogin = (function () {
        function FbLogin() {
        }
        FbLogin.prototype.index = function (req, res, next) {
            //render page
            var config = {
                appId: 'abc123',
                redirectUrl: {
                    protocol: 'http://',
                    host: 'example.com',
                    uri: '/auth/facebook/callback'
                }
            };
            res.send(oauth2fb.signIn(config));
        };
        return FbLogin;
    }());
    Route.FbLogin = FbLogin;
})(Route || (Route = {}));
module.exports = Route;
