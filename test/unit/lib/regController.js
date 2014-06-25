/*jslint nomen: true */
/*globals define, angular */

define(['app','regServices'], function (app, utestResult) {
    'use strict';
    var ctrl_name = "RegController";

    app.controller(ctrl_name, ['$scope', utestResult.UtestFactory, utestResult.UtestService, function ($scope, UtestFactory, UtestService) {
        $scope.ctrl_name = ctrl_name;
        $scope.utest_factory = UtestFactory;
        $scope.utest_service = UtestService;
    }]);

    return {
        "ctrl_name": ctrl_name,
        "result": utestResult
    };
});
