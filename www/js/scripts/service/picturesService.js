// dataServices
define(['app'], function (app) {
    app.factory('Pictures', function ($http, $q, $log) {
        var feed_url = "http://ycpi.api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tags=";
        return {
            query: function (tag_name) {
                var d = $q.defer();
                if (typeof tag_name === "undefined" || tag_name === "") {
                    $log.error("Pictures.query: missing tag_name.");
                    d.reject("tag must be provided");
                } else {
                    $http.jsonp(feed_url + tag_name).success(function (data) {
                        d.resolve(data.items);
                    }).error(function (data, status, headers, config) {
                        $log.error("Error: ", headers);
                        d.reject(data);
                    });
                }

                return d.promise;
            }
        };
    });

});

/*
Another way to code this:
-------------------------
// define(['app','angular-resource'], function (app) {
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