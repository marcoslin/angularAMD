/*jslint browser: true, devel: true, node: true, vars: true, nomen: true */
/*globals define, angular */

define(['angularAMD', 'test/unit/lib/preService', 'angular-route', 'angular-animate'], function (angularAMD, preService) {
    'use strict';

    /**
     * BOOTSTRAP ANGULAR
     * Replicating what would normally take place in app.js
     */
    var app_name = "unitest-app",
        app = angular.module(app_name, ['ngRoute','ngAnimate']);
    
    // Add property for unit test
    app.__appname = app_name;
    app.__origAngular = window.angular;
    app.__preServiceResult = preService;

    // Define route for unit test
    app.config(function ($routeProvider) {
        $routeProvider.when("/controllerFn", angularAMD.route({
            utestParam: "controllerFn",
            template: "<div>{{message}}</div>",
            controllerUrl: "test/unit/lib/controllerFn"
        }));
    });

    /*
    var elem = document.body;
    angularAMD.bootstrap(app, elem);
    */
    return angularAMD.bootstrap(app);
});
