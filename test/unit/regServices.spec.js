/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

/**
 * Test to ensure that services can be created using app.register method.
 */
define(['regServices','angularAMD', 'angular-mocks'], function (app, angularAMD) {
    'use strict';
    var inject = angularAMD.inject;
    describe('Utest Registered Services', function () {
        //console.log("Running serviceSpec.js");
        var results = app.__utest_regserv_result;

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
            });
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
            });
        });
        
        it(".directive check.", function () {
            inject(function ($rootScope, $compile) {
                var scope = $rootScope.$new(),
                    elm = angular.element("<div utest-reg-directive=''></div>");
                $compile(elm)(scope);
                expect(elm.text()).toBe(results.directive_name);
            });
        });
        
        it(".filter check.", function () {
            inject(function ($filter) {
                var ufilter = $filter('utestRegFilter');
                expect(ufilter).toBeDefined();
                expect(ufilter("hello")).toBe("hello " + results.reg_filter_name);
            });
        });
    });
    
    describe("Utest Registered Animation", function () {
        var scope, animate, elem;
        
        beforeEach(function () {
            module("ngAnimateMock");
            inject(function ($rootScope, $compile, $rootElement, $animate) {
                var html_text = "<div ng-class='AnimationClass' class='service-reg-animation'></div>";
                scope = $rootScope;
                animate = $animate;
                elem = $compile(html_text)(scope);
                $rootElement.append(elem);
            });
        });
                
        it(".animation check.", function () {
            animate.addClass(elem, "custom-hide");           
            scope.$digest();
            expect(elem.css("opacity")).toBe("0");
            
            animate.removeClass(elem, "custom-hide");
            scope.$digest();
            expect(elem.css("opacity")).toBe("1");
        });
    });

});
