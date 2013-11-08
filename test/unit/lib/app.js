/*jslint browser: true, devel: true, node: true, vars: true, nomen: true */
/*globals define, angular */

define(['angularAMD'], function (angularAMD) {
    'use strict';

    /**
     * BOOTSTRAP ANGULAR
     * Replicating what would normally take place in app.js
     */
    var app_name = "unitest-app",
        app = angular.module(app_name, []),
        origAngular = angular;
    
    // Add property for unit test
    app.__appname = app_name;
    app.__origAngular = origAngular;
    
    angularAMD.bootstrap(app);
    window.angular = angularAMD.getAlternateAngular();
    
    return app;
});
