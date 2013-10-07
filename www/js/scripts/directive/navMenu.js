/*jslint node: true */
/*global define */
define(['app'], function (app) {
    app.register.controller("navMenuController", ['$scope', '$route', function ($scope, $route) {
        var tab_name = $route.current.navTab;
        $scope.isTabActive = function (tabName) {
            if (tabName === tab_name) {
                return "active";
            }
        };
    }]);
    
    app.register.directive('navMenu', function () {
        return {
            restrict: 'E',
            controller: 'navMenuController',
            templateUrl: 'js/scripts/directive/templates/navMenu.html'
        };
    });
});
