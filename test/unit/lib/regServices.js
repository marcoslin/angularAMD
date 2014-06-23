/**
 * A copy of services.js but created using app.register instead.
 * Note that sequence of definition does matter in this case
 */
define(['app', 'angularAMD'], function(app, angularAMD) {
    'use strict';

    // Services coded using regular angular approach
    var inject = angularAMD.inject,
        utest_reg_result = {};

    utest_reg_result.factory_name = "UtestRegFactory.name OVw2nHyfO7";
    utest_reg_result.service_name = "UtestRegService.name xrA1xp5wrF";
    app
        .factory("UtestRegFactory", function (reg_constant_name) {
            // Make sure that constant_name is setup after this factory.
            return { name: utest_reg_result.factory_name, "const_name": reg_constant_name };
        })
        .service("UtestRegService", function (reg_value_name) {
            // Make sure that value_name is defined after this service
            this.name = utest_reg_result.service_name;
            this.val_name = reg_value_name;
        });

    utest_reg_result.reg_constant_name = "regServices.reg_constant_name QSiNx5JlLP";
    utest_reg_result.reg_value_name = "regServices.reg_value_name PMlzn3kISG";
    app
        .constant("reg_constant_name", utest_reg_result.reg_constant_name)
        .value("reg_value_name", utest_reg_result.reg_value_name);


    utest_reg_result.directive_name = "regServices.directive_name 1LSC3LPxLG";
    app.directive('utestRegDirective', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attr) {
                elm.text(utest_reg_result.directive_name);
            }
        };
    });

    utest_reg_result.reg_filter_name = "regServices.reg_filter_name ABOmVXJZQH";
    app.filter('utestRegFilter', function () {
        return function (input) {
            return input + " " + utest_reg_result.reg_filter_name;
        };
    });
    
    // Create Animation
    app.animation('.service-reg-animation', function ($log, $interval) {
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
    app.factory('UtestRegServiceResult', function () {
        return utest_reg_result;
    });
    
    // Return expected unit test result
    app.__utest_regserv_result = utest_reg_result;
    
    return app;
    
})

