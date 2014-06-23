/*jslint nomen: true */
/*globals define, angular */

define(['app'], function (app) {
    'use strict';
    return ["$scope", function ($scope) {
        $scope.message = "Message from controllerFn";
    }];
});
