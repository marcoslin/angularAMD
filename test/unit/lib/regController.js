/*jslint nomen: true */
/*globals define, angular */

define(['app','regServices'], function (app) {
    'use strict';
    var ctrl_name = "RegController";
    app.register.controller(ctrl_name, ['$scope', 'UtestRegFactory', 'UtestRegService', function ($scope, UtestRegFactory, UtestRegService) {
        $scope.ctrl_name = ctrl_name;
        $scope.utest_reg_factory = UtestRegFactory;
        $scope.utest_reg_service = UtestRegService;
    }]);
    
    // Return expected unit test result
    app.__utest_ctrl_result = {
        "ctrl_name": ctrl_name
    };
    
    return app;
});
