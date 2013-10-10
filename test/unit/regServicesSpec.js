/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

/**
 * Test with 2 main objectives:
 * 1. Make sure that ngAMD's cache provider works
 * 2. Make sure that independent angular.modules can be incorporated in the project
 *    by using the ngAMD.processQueue() method to load these modules.
 */
define(['regServices'], function (app) {
    'use strict';
    describe('Utest Registered Services', function () {
        //console.log("Running serviceSpec.js");
        var results = app.__utest_regserv_result,
            inject = app.ngAMD.inject;

        it(".reg_constant check.", function () {
            inject(function (reg_constant_name) {
                expect(reg_constant_name).toBe(results.reg_constant_name);
            });
        });

        it(".factory check.", function () {
            inject(function (UtestRegFactory) {
                // Testing for out of order dependency.  constant_name should be defined after UtestRegFactory
                expect(UtestRegFactory.name).toBe(results.factory_name);
                expect(UtestRegFactory.const_name).toBe(results.reg_constant_name);
            })
        });
        
        it(".reg_value check.", function () {
            inject(function (reg_value_name) {
                expect(reg_value_name).toBe(results.reg_value_name);
            });
        });

        it(".service check.", function () {
            inject(function (UtestRegService) {
                // Testing for out of order dependency.  constant_name should be defined after UtestRegFactory
                expect(UtestRegService.name).toBe(results.service_name);
                expect(UtestRegService.val_name).toBe(results.reg_value_name);
            })
        });
        
        it(".directive check.", function () {
            inject(function ($rootScope, $compile) {
                var scope = $rootScope.$new(),
                    elm = angular.element("<div utest-reg-directive=''></div>");
                $compile(elm)(scope);
                expect(elm.text()).toBe(results.directive_name);
            })
        });
        
        it(".filter check.", function () {
            inject(function ($filter) {
                var ufilter = $filter('utestRegFilter');
                expect(ufilter).toBeDefined();
                expect(ufilter("hello")).toBe("hello " + results.reg_filter_name);
            })
        });

        
    });
});
