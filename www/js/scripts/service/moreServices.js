// Services coded using regular angular approach
angular.module("moreServices", [])
.factory("DeferredResponse", function ($timeout, $q, ServiceLabel) {
    return {
        set: function (message) {
            var d = $q.defer();
            $timeout(function () {
                d.resolve({label: ServiceLabel, message: message});
            }, 3000);
            return d.promise;
        }
    }
})
.constant("ServiceLabel", "moreSrv")
.service("AnotherResponse", function ($timeout, $q, ServiceLabel) {
    this.set = function (message) {
        var d = $q.defer();
        $timeout(function () {
            d.resolve({label: ServiceLabel, message: message});
        }, 4000);
        return d.promise;
    }
})
.config(function ($rootScope, $timeout) {
    console.log("Calling moreServices.config.  $rootScope.$id: " + $rootScope.$id);
    $timeout(function () {
        $rootScope.config_block_message = "And config works!!!";
    }, 1000);
})
.run(function ($rootScope, $timeout) {
    console.log("Calling moreServices.run.  $rootScope.$id: " + $rootScope.$id);
    $timeout(function () {
        $rootScope.run_block_message = "Greetings from .run";
    }, 2000);
})
;