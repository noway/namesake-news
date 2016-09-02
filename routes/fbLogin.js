/// <reference path="../_all.d.ts" />
"use strict";
var Route;
(function (Route) {
    var FbLogin = (function () {
        function FbLogin() {
        }
        FbLogin.prototype.index = function (req, res, next) {
            //render page
        };
        return FbLogin;
    }());
    Route.FbLogin = FbLogin;
})(Route || (Route = {}));
module.exports = Route;
