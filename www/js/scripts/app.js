define(['domReady!', 'angularAMD', 'angular-route'], function (doc, angularAMD) {
    var app = angular.module("ngreq-app", ['ngRoute']),
        ngAMD = angularAMD(app);
    
    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/home", ngAMD.route({
                templateUrl: 'views/home.html', controller: 'HomeController', navTab: "home"
            }))
            .when("/pictures", ngAMD.route({
                templateUrl: 'views/pictures.html', controller: 'PicturesController', navTab: "pictures"
            }))
            .when("/modules", ngAMD.route({
                templateUrl: 'views/modules.html', controller: 'ModulesController', navTab: "modules"
            }))
            .when("/map", ngAMD.route({
                templateUrl: 'views/map.html', controller: 'MapController', navTab: "map"
            }))
            .otherwise({redirectTo: '/home'})
    }]);
        
    // Bootstrap Angular
    angular.bootstrap(doc, ['ngreq-app']);

    // Wire custom version of angular to support lazy loading for independent angular modules
    window.angular = ngAMD.getAlternateAngular();

    return app;
});
