// Services coded using regular angular approach
angular.module("dataServices", [])
.factory("DeferredObject", function ($timeout, $q, ServiceName) {
    return {
        get: function (message, delay_in_ms) {
            //console.log("DeferredObject.get ServiceName: ", ServiceName);
            var d = $q.defer();
            $timeout(function () {
                d.resolve({label: ServiceName, message: message});
            }, delay_in_ms);
            return d.promise;
        }
    }
})
.provider("configValue", function () {
    var config_value;

    this.set = function(value) {
        config_value = value;
    };

    this.$get = function () {
        return {
            get: function () {
                return config_value;
            }
        }
    };
})
.constant("ServiceName", "dataServices")
.service("DeferredString", function ($timeout, $q) {
    this.get = function (message, delay_in_ms) {
        var d = $q.defer();
        $timeout(function () {
            d.resolve(message);
        }, delay_in_ms);
        return d.promise;
    }
})
.config(function (configValueProvider) {
    configValueProvider.set("And config works");
})
.run(function (configValue, $rootScope, $timeout) {
    $timeout(function () {
        $rootScope.run_block_message = "Greetings from .run";
    }, 3000);
    $timeout(function () {
        $rootScope.config_block_message = configValue.get();
    }, 4000);
})
;