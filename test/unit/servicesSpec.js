/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

/**
 * Test with 2 main objectives:
 * 1. Make sure that ngAMD's cache provider works
 * 2. Make sure that independent angular.modules can be incorporated in the project
 *    by using the ngAMD.processQueue() method to load these modules.
 */
define(['servicesAMD'], function (angularAMD) {
    'use strict';
    describe('Utest Services', function () {
        //console.log("Running serviceSpec.js");
        var results,
            inject = angularAMD.inject;
        
        inject(function (UtestServiceResult) {
            results = UtestServiceResult;
        });

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
        
        it(".directive check.", inject(function ($rootScope, $compile) {
            var scope = $rootScope.$new(),
                elm = angular.element("<div utest-directive=''></div>");
            $compile(elm)(scope);
            expect(elm.text()).toBe(results.directive_name);
        }));

        it(".filter check.", inject(function ($filter) {
            var ufilter = $filter('utestFilter');
            expect(ufilter).toBeDefined();
            expect(ufilter("hello")).toBe("hello " + results.filter_name);
        }));
        
    });
});
