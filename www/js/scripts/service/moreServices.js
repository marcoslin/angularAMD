// Services coded using regular angular approach
angular.module("moreServices", ['ngResource'])
.factory("DeferredResponse", function ($timeout, $q) {
    return {
        set: function (message) {
            var d = $q.defer();
            $timeout(function () {
                d.resolve(message);
            }, 2000);
            return d.promise;
        }
    }
});