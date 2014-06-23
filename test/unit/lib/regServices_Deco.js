/**
 * A copy of regServices.js but created using app.register instead.
 * Note: app.register is expected to be deco'd in the next version
 * and at that point this test can be removed.
 */
define(['app', 'angularAMD'], function(alt_app, angularAMD) {
    'use strict';

    // Services coded using regular angular approach
    var inject = angularAMD.inject,
        app = angularAMD.getCachedProvider("__orig_app"),
        utest_reg_result = {};

    utest_reg_result.factory_name = "UtestRegDecoFactory.name OVw2nHyfO7-Deco";
    utest_reg_result.service_name = "UtestRegDecoService.name xrA1xp5wrF-Deco";
    app.register
        .factory("UtestRegDecoFactory", function (regdeco_constant_name) {
            // Make sure that constant_name is setup after this factory.
            return { name: utest_reg_result.factory_name, "const_name": regdeco_constant_name };
        })
        .service("UtestRegDecoService", function (regdeco_value_name) {
            // Make sure that value_name is defined after this service
            this.name = utest_reg_result.service_name;
            this.val_name = regdeco_value_name;
        });

    utest_reg_result.regdeco_constant_name = "regServices.regdeco_constant_name QSiNx5JlLP-Deco";
    utest_reg_result.regdeco_value_name = "regServices.regdeco_value_name PMlzn3kISG-Deco";
    app.register
        .constant("regdeco_constant_name", utest_reg_result.regdeco_constant_name)
        .value("regdeco_value_name", utest_reg_result.regdeco_value_name);


    utest_reg_result.directive_name = "regServices.directive_name 1LSC3LPxLG-Deco";
    app.register.directive('utestRegDecoDirective', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attr) {
                elm.text(utest_reg_result.directive_name);
            }
        };
    });

    utest_reg_result.reg_filter_name = "regServices.reg_filter_name ABOmVXJZQH-Deco";
    app.register.filter('UtestRegDecoFilter', function () {
        return function (input) {
            return input + " " + utest_reg_result.reg_filter_name;
        };
    });

    // Create Animation
    app.register.animation('.service-regdeco-animation', function ($log, $interval) {
        return {
            addClass : function(element, className, done) {
                if ( className === "custom-hide") {
                    element.css('opacity',0);
                    done();
                }
            },
            removeClass : function(element, className, done) {
                if ( className === "custom-hide") {
                    element.css('opacity',1);
                    done();
                }
            }
        };
    });

    // Return the result in a factory
    app.register.factory('UtestRegDecoServiceResult', function () {
        return utest_reg_result;
    });

    // Return expected unit test result
    app.__utest_regserv_Deco_result = utest_reg_result;

    return app;

});

