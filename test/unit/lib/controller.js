/*jslint nomen: true */
/*globals define, angular */

define(['app'], function (app) {
    'use strict';
    var ctrl_name = "MainController";
    app.register.controller(ctrl_name, ['$scope', function ($scope) {
        $scope.ctrl_name = ctrl_name;
    }]);
    
    // Return expected unit test result
    app.__utest_ctrl = {
        "ctrl_name": ctrl_name
    };
    
    return app;
});
