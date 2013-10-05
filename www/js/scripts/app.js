define(['domReady!', 'angularAMD', 'angular-route'], function (doc, angularAMD) {
    var app = angular.module("ngreq-app", ['ngRoute']),
        ngAMD = angularAMD(app);
    
    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/view1", ngAMD.route('views/view1.html', 'View1Controller'))
            .when("/view2", ngAMD.route('views/view2.html', 'View2Controller'))
            .when("/view3", ngAMD.route('views/view3.html', 'View3Controller'))
            .when("/viewmap", ngAMD.route('views/view_map.html', 'ViewMapController'))
            .otherwise({redirectTo: '/view1'})
    }]);
        
    // Bootstrap Angular
    angular.bootstrap(doc, ['ngreq-app']);

    // Wire custom version of angular
    window.angular = ngAMD.getAlternateAngular();

    return app;
});
