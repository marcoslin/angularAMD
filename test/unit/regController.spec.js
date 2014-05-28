/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

/**
 * Testing declaration of controller following require.js spec and make sure
 * it's dependecies are loaded.
 */
define(['regController', 'angularAMD'], function (app, angularAMD) {
    'use strict';
    describe('Utest RegController', function () {
        //console.log("Running controllerSpec.js");
        var ctrl_name = app.__utest_regctrl_result.ctrl_name,
            scope, service_results, ctrl;

        angularAMD.inject(function ($rootScope, $controller, UtestRegServiceResult) {
            scope = $rootScope.$new();
            service_results = UtestRegServiceResult;
            ctrl = $controller(ctrl_name, { $scope: scope });
        });
        
        it("service_results should exists.", function () {
            expect(service_results).toBeDefined();
        });
        
        it("scope.ctrl_name check", function () {
            expect(scope.ctrl_name).toBe(ctrl_name);
        });
        
        it("scope.utest_factory check", function () {
            var f = scope.utest_reg_factory;
            expect(f.name).toBe(service_results.factory_name);
            expect(f.const_name).toBe(service_results.reg_constant_name);
        });
        
        it("scope.utest_service check", function () {
            var s = scope.utest_reg_service;
            expect(s.name).toBe(service_results.service_name);
            expect(s.val_name).toBe(service_results.reg_value_name);
        });

    });
});
