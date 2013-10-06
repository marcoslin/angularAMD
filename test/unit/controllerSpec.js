/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

define(['controller'], function (app) {
    'use strict';
    describe('Controller', function () {
        console.log("Running ctrlSpec.js");
        var ctrl_name = app.__utest_ctrl.ctrl_name, scope, ctrl;
        
        beforeEach(function () {
            app.ngAMD.inject(['$rootScope','$controller', function ($rootScope, $controller) {
                scope = $rootScope.$new();
                ctrl = $controller(ctrl_name, { $scope: scope });
            }]);
        });
        
        it("scope.ctrl_name", function () {
            expect(scope.ctrl_name).toBe(ctrl_name);
        });
        
        
    });
});
