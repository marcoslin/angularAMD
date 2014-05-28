/*jslint browser: true, devel: true, node: true, vars: true, nomen: true */
/*globals define, angular */

define(['angularAMD', 'angular-animate'], function (angularAMD) {
    'use strict';

    /**
     * BOOTSTRAP ANGULAR
     * Replicating what would normally take place in app.js
     */
    var app_name = "unitest-app",
        app = angular.module(app_name, ['ngAnimate']);
    
    // Add property for unit test
    app.__appname = app_name;
    app.__origAngular = window.angular;
    

    /*
    var elem = document.body;
    angularAMD.bootstrap(app, undefined, elem);
    */
    angularAMD.bootstrap(app);

    return app;
});
