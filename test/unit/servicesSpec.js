/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

define(['servicesAMD'], function (app) {
    'use strict';
    describe('Utest Services', function () {
        console.log("Running ctrlSpec.js");
        var results,
            inject = app.ngAMD.inject;
        
        inject(['UtestResult', function (UtestResult) {
            results = UtestResult;
        }]);

        it("results should exists.", function () {
            expect(results).toBeDefined();
        });
        
        it(".config check.", inject(function ($rootScope) {
            expect($rootScope.config_name).toBe(results.config_name);
        }));
        
        it(".run check.", inject(function ($rootScope) {
            expect($rootScope.run_name).toBe(results.run_name);
        }));
        
        it(".factory check.", inject(function (UtestFactory) {
            // Testing for out of order dependency.  constant_name should be defined after UtestFactory
            expect(UtestFactory.name).toBe(results.factory_name);
            expect(UtestFactory.const_name).toBe(results.constant_name);
        }));
        
        it(".service check.", inject(function (UtestService) {
            // Testing for out of order dependency.  constant_name should be defined after UtestFactory
            expect(UtestService.name).toBe(results.service_name);
            expect(UtestService.val_name).toBe(results.value_name);
        }));
        
        it(".constant check.", inject(function (constant_name) {
            expect(constant_name).toBe(results.constant_name);
        }));
        
        it(".value check.", inject(function (value_name) {
            expect(value_name).toBe(results.value_name);
        }));
        
    });
});
