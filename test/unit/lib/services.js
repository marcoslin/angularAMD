/*jslint node: true, nomen: true */
/*globals angular */

(function () {
    'use strict';

    // Services coded using regular angular approach
    var services = angular.module("utestServices", []),
        utest_result = {};
    
    utest_result.config_name = "services.config SDkWRXOgII";
    services.config(function ($rootScope) {
        $rootScope.config_name = utest_result.config_name;
    });
    
    utest_result.run_name = "services.run sOdq6GNsaW";
    services.run(function ($rootScope) {
        $rootScope.run_name = utest_result.run_name;
    });
    
    utest_result.factory_name = "UtestFactory.name nSg56eHrWo";
    services.factory("UtestFactory", function (constant_name) {
        // Make sure that constant_name is setup after this factory.
        return { name: utest_result.factory_name, "const_name": constant_name };
    });

    utest_result.service_name = "UtestService.name ySg56eHrWo";
    services.service("UtestService", function (value_name) {
        // Make sure that value_name is defined after this service
        this.name = utest_result.service_name;
        this.val_name = value_name;
    });
    
    utest_result.constant_name = "utestServices.constant_name xHf71eVzxd";
    services.constant("constant_name", utest_result.constant_name);
    
    utest_result.value_name = "utestServices.value_name ih3zRvZofo";
    services.value("value_name", utest_result.value_name);
    
    utest_result.directive_name = "utestServices.directive_name Krloe7G1CH";
    services.directive('utestDirective', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attr) {
                elm.text(utest_result.directive_name);
            }
        };
    });

    utest_result.filter_name = "utestServices.filter_name 0WWb0usFCB";
    services.filter('utestFilter', function () {
        return function (input) {
            return input + " " + utest_result.filter_name;
        };
    });
    
    
    // Return the result in a factory
    services.factory('UtestServiceResult', function () {
        return utest_result;
    });
    
}());

