/**
 * Simulate a 3rd party service.  This package loads the 'test/unit/factory/module' using requirejs' sync
 * call so it must be pre-loaded by caller first.
 */

!function () {
    // Services coded using regular angular approach
    var sub_module = angular.module("subModuleServices", []),
        services = angular.module("utestServices", ['subModuleServices']),
        moduleFactory = require("test/unit/factory/module");
    
    // Define a simple subModule
    angular.module("subModuleServices").factory("SubConfigValue", function () {
        return "JwU9YSJMJS-HhRz4nhBuY";
    });


    // Load module factory
    var result = moduleFactory(services, "Ng");

    // Add sub-module test
    result.UtestSubModule = "UtestSubModule" + result.suffix;
    result.sub_module = "utestServices.sub_config_value JwU9YSJMJS-HhRz4nhBuY";
    services.factory(result.UtestSubModule, function (SubConfigValue) {
        return {
            get: function () {
                return "utestServices.sub_config_value " + SubConfigValue;
            }
        };
    });

    services.factory('UtestServiceResult', function () {
        return result;
    });

}();

