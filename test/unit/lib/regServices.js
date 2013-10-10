/*jslint node: true, nomen: true */
/*globals angular */


/**
 * A copy of services.js but created using app.register instead.
 * Note that sequence of definition does matter in this case
 */
define(['app'], function(app) {
    'use strict';

    // Services coded using regular angular approach
    var services = app.register,
        inject = app.ngAMD.inject,
        utest_reg_result = {};
    
    utest_reg_result.reg_constant_name = "regServices.reg_constant_name QSiNx5JlLP";
    services.constant("reg_constant_name", utest_reg_result.reg_constant_name);
    
    utest_reg_result.factory_name = "UtestRegFactory.name OVw2nHyfO7";
    services.factory("UtestRegFactory", function (reg_constant_name) {
        // Make sure that constant_name is setup after this factory.
        return { name: utest_reg_result.factory_name, "const_name": reg_constant_name };
    });
    
    utest_reg_result.reg_value_name = "regServices.reg_value_name PMlzn3kISG";
    services.value("reg_value_name", utest_reg_result.reg_value_name);
    
    utest_reg_result.service_name = "UtestRegService.name xrA1xp5wrF";
    services.service("UtestRegService", function (reg_value_name) {
        // Make sure that value_name is defined after this service
        this.name = utest_reg_result.service_name;
        this.val_name = reg_value_name;
    });

    utest_reg_result.directive_name = "regServices.directive_name 1LSC3LPxLG";
    services.directive('utestRegDirective', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attr) {
                elm.text(utest_reg_result.directive_name);
            }
        };
    });

    utest_reg_result.reg_filter_name = "regServices.reg_filter_name ABOmVXJZQH";
    services.filter('utestRegFilter', function () {
        return function (input) {
            return input + " " + utest_reg_result.reg_filter_name;
        };
    });
    
    // Return expected unit test result
    app.__utest_regserv_result = utest_reg_result;
    
    return app;
    
})

