/**
 * Companion test for providerFactory.
 */
define(['angularAMD', 'angular-mocks'], function (angularAMD) {
    var inject = angularAMD.inject;

    return function (result) {
        describe("Utest " + result.suffix + " Services", function () {

            it(".constant check.", function () {
                inject([result.UtestConstant, function (UtestConstant) {
                    expect(UtestConstant).toBe(result.constant_name);
                }]);
            });

            it(".factory check.", function () {
                inject([result.UtestFactory, function (UtestFactory) {
                    // Testing for out of order dependency.  constant_name should be defined after UtestRegFactory
                    expect(UtestFactory.name).toBe(result.factory_name);
                    expect(UtestFactory.const_name).toBe(result.constant_name);
                }]);
            });

            it(".value check.", function () {
                inject([result.UtestValue, function (UtestValue) {
                    expect(UtestValue).toBe(result.value_name);
                }]);
            });

            it(".service check.", function () {
                inject([result.UtestService, function (UtestService) {
                    // Testing for out of order dependency.  constant_name should be defined after UtestRegFactory
                    expect(UtestService.name).toBe(result.service_name);
                    expect(UtestService.val_name).toBe(result.value_name);
                }]);
            });

            it(".directive check.", function () {
                inject(function ($rootScope, $compile) {
                    var scope = $rootScope.$new(),
                        elm = angular.element("<div " + result.utestDirective + "=''></div>");
                    $compile(elm)(scope);
                    expect(elm.text()).toBe(result.directive_name);
                });
            });

            it(".filter check.", function () {
                inject(function ($filter) {
                    var ufilter = $filter(result.utestFilter);
                    expect(ufilter).toBeDefined();
                    expect(ufilter("hello")).toBe("hello " + result.filter_name);
                });
            });
        });

        describe("Utest " + result.suffix + " Animation", function () {
            var scope, animate, elem;

            beforeEach(function () {
                module("ngAnimateMock");
                inject(function ($rootScope, $compile, $rootElement, $animate) {
                    var html_text = "<div ng-class='AnimationClass' class='" + result.utestAnimation + "'></div>";
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
    };
});