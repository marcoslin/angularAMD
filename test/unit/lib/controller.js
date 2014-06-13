/*jslint nomen: true */
/*globals define, angular */

define(['app','ngload!services'], function (app) {
    'use strict';
    var ctrl_name = "MainController";
    app.controller(ctrl_name, function ($scope, UtestFactory, UtestService, UtestSubModule) {
        $scope.ctrl_name = ctrl_name;
        $scope.utest_factory = UtestFactory;
        $scope.utest_service = UtestService;
        $scope.utest_sub_module = UtestSubModule;
    });
    
    // Return expected unit test result
    app.__utest_ctrl_result = {
        "ctrl_name": ctrl_name
    };
    
    return app;
});
