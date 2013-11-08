define(['angularAMD', 'angular-route'], function (angularAMD) {
    var app = angular.module("ngreq-app", ['ngRoute']);
    
    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/home", angularAMD.route({
                templateUrl: 'views/home.html', controller: 'HomeController', navTab: "home"
            }))
            .when("/pictures", angularAMD.route({
                templateUrl: 'views/pictures.html', controller: 'PicturesController', navTab: "pictures"
            }))
            .when("/modules", angularAMD.route({
                templateUrl: 'views/modules.html', controller: 'ModulesController', navTab: "modules"
            }))
            .when("/map", angularAMD.route({
                templateUrl: 'views/map.html', controller: 'MapController', navTab: "map"
            }))
            .otherwise({redirectTo: '/home'})
    }]);
    
    // Create function to link to GitHub
    app.directive('ghLink', function () {
        return {
            restrict: 'A',
            scope: true,
            template: '<a href="{{fullpath}}" target="_blank">{{filename}}</a>',
            controller: ['$scope', '$attrs', function (scope, attrs) {
                var gh_root = "https://github.com/marcoslin/angularAMD/blob/master/www/",
                    relfile = attrs.ghLink,
                    fullpath = gh_root + relfile;
                scope.fullpath = fullpath;
                scope.filename = relfile.replace(/^.*[\\\/]/, '');
            }]
        };
    });
    
    // Create directive to output link to GitHub
    app.run(['$rootScope', function ($rootScope) {
        $rootScope.githubLink = function (Url) {
            return "https://github.com/marcoslin/angularAMD/blob/master/www/" + Url;
        };
    }]);
        
    // Bootstrap Angular when DOM is ready
    angularAMD.bootstrap(app);

    return app;
});
