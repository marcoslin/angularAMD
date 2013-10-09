// Services coded using regular angular approach
angular.module("dataServices", [])
.factory("DeferredObject", ['$timeout','$q', 'ServiceName', function ($timeout, $q, ServiceName) {
    return {
        get: function (message, delay_in_ms) {
            var d = $q.defer();
            $timeout(function () {
                d.resolve({label: ServiceName, message: message});
            }, delay_in_ms);
            return d.promise;
        }
    }
}])
.constant("ServiceName", "dataServices")
.service("DeferredString", ['$timeout','$q', function ($timeout, $q) {
    this.get = function (message, delay_in_ms) {
        var d = $q.defer();
        $timeout(function () {
            d.resolve(message);
        }, delay_in_ms);
        return d.promise;
    }
}])
.config(['$rootScope','$timeout', function ($rootScope, $timeout) {
    console.log("Calling moreServices.config.  $rootScope.$id: " + $rootScope.$id);
    $timeout(function () {
        $rootScope.config_block_message = "And config works";
    }, 4000);
}])
.run(['$rootScope','$timeout', function ($rootScope, $timeout) {
    console.log("Calling moreServices.run.  $rootScope.$id: " + $rootScope.$id);
    $timeout(function () {
        $rootScope.run_block_message = "Greetings from .run";
    }, 3000);
}])
;