// dataServices
define(['app','angular-resource'], function (app) {
    
    app.register.factory('Pictures', ['$http', '$q', '$log', '$resource', function ($http, $q, $log, $resource) {
        var feed_url = "http://ycpi.api.flickr.com/services/feeds/photos_public.gne?format=json&tags=London&jsoncallback=JSON_CALLBACK";
        return {
            query: function () {
                var d = $q.defer();
                
                $http.jsonp(feed_url).success(function (data) {
                    d.resolve(data.items);
                }).error(function (data, status, headers, config) {
                    $log.error("Error: ", headers);
                    d.reject(data);
                });
                    
                return d.promise;
            }
        };
    }]);

});

/*
Another way to code this:
-------------------------
angular.module("dataServices", ['ngResource'])
.factory('Pictures', ['$http', '$q', '$log', '$resource', function ($http, $q, $log, $resource) {
    var feed_url = "http://ycpi.api.flickr.com/services/feeds/photos_public.gne?format=json&tags=London&jsoncallback=JSON_CALLBACK";
    return {
        query: function () {
            var d = $q.defer();
            
            $http.jsonp(feed_url).success(function (data) {
                d.resolve(data.items);
            }).error(function (data, status, headers, config) {
                $log.error("Error: ", headers);
                d.reject(data);
            });
                
            return d.promise;
        }
    };
}]);

Need to update require.config:
------------------------------
shim : {
    'dataServices' : {
        exports: "dataServices",
        deps: ['angular-resource']
    }
}

*/