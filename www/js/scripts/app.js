define(['domReady!', 'angularAMD', 'angular-route'], function (doc, angularAMD) {
    var app = angular.module("ngreq-app", ['ngRoute']),
        ngAMD = angularAMD(app);
    
    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/view1", ngAMD.route({
                templateUrl: 'views/view1.html', controller: 'View1Controller', navTab: "view1"
            }))
            .when("/view2", ngAMD.route({
                templateUrl: 'views/view2.html', controller: 'View2Controller', navTab: "view2"
            }))
            .when("/view3", ngAMD.route({
                templateUrl: 'views/view3.html', controller: 'View3Controller', navTab: "view3"
            }))
            .when("/viewmap", ngAMD.route({
                templateUrl: 'views/view_map.html', controller: 'ViewMapController', navTab: "viewmap"
            }))
            .otherwise({redirectTo: '/view1'})
    }]);
        
    // Bootstrap Angular
    angular.bootstrap(doc, ['ngreq-app']);

    // Wire custom version of angular to support lazy loading for independent angular modules
    window.angular = ngAMD.getAlternateAngular();

    return app;
});
