/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

/**
 * Test to ensure that app.register method.
 * This test is expected to be deco'd when app.register is deco'd
 */
define(['regServices_Deco','angularAMD', 'angular-mocks'], function (app, angularAMD) {
    'use strict';
    var inject = angularAMD.inject;

    describe('Utest RegisteredDeco Services', function () {
        //console.log("Running serviceSpec.js");
        var results = app.__utest_regserv_Deco_result;

        it(".reg_constant check.", function () {
            inject(function (regdeco_constant_name) {
                expect(regdeco_constant_name).toBe(results.regdeco_constant_name);
            });
        });

        it(".factory check.", function () {
            inject(function (UtestRegDecoFactory) {
                // Testing for out of order dependency.  constant_name should be defined after UtestRegDecoFactory
                expect(UtestRegDecoFactory.name).toBe(results.factory_name);
                expect(UtestRegDecoFactory.const_name).toBe(results.regdeco_constant_name);
            });
        });

        it(".reg_value check.", function () {
            inject(function (regdeco_value_name) {
                expect(regdeco_value_name).toBe(results.regdeco_value_name);
            });
        });

        it(".service check.", function () {
            inject(function (UtestRegDecoService) {
                // Testing for out of order dependency.  constant_name should be defined after UtestRegDecoFactory
                expect(UtestRegDecoService.name).toBe(results.service_name);
                expect(UtestRegDecoService.val_name).toBe(results.regdeco_value_name);
            });
        });

        it(".directive check.", function () {
            inject(function ($rootScope, $compile) {
                var scope = $rootScope.$new(),
                    elm = angular.element("<div utest-reg-deco-directive=''></div>");
                $compile(elm)(scope);
                expect(elm.text()).toBe(results.directive_name);
            });
        });

        it(".filter check.", function () {
            inject(function ($filter) {
                var ufilter = $filter('UtestRegDecoFilter');
                expect(ufilter).toBeDefined();
                expect(ufilter("hello")).toBe("hello " + results.reg_filter_name);
            });
        });
    });

    describe("Utest RegisteredDeco Animation", function () {
        var scope, animate, elem;

        beforeEach(function () {
            module("ngAnimateMock");
            inject(function ($rootScope, $compile, $rootElement, $animate) {
                var html_text = "<div ng-class='AnimationClass' class='service-regdeco-animation'></div>";
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
