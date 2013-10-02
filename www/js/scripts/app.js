define(['angular-route'], function () {

    var app = angular.module("ngreq-app", ['ngRoute']);

    app.config(['$routeProvider', '$controllerProvider', '$compileProvider', '$provide', function ($routeProvider, $controllerProvider, $compileProvider, $provide) {
        
        app.register = {
            controller: $controllerProvider.register,
            factory: $provide.factory,
            directive: $compileProvider.directive
        };
        
        function resolveController(names) {
            return {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var defer = $q.defer();
                    require(names, function () {
                        defer.resolve();
                        $rootScope.$apply();
                    });
                    return defer.promise;
                }]
            }
        }
        
        $routeProvider
            .when("/view1", {
                templateUrl: "views/view1.html", controller: "View1Controller",
                resolve: resolveController(["View1Controller"])
            })
            .when("/view2", {
                templateUrl: "views/view2.html", controller: "View2Controller",
                resolve: resolveController(["View2Controller"])
            })
            .when("/view3", {
                templateUrl: "views/view3.html", controller: "View3Controller",
                resolve: resolveController(["customDirectives", "View3Controller"])
            })
            .otherwise({redirectTo: '/view1'})
    }]);

    return app;
});