/*jslint node: true */
/*global define */
define(['app'], function (app) {
    app.register.controller("navMenuController", ['$scope', '$route', 'SiteName', '$window', '$location', function ($scope, $route, SiteName, $window, $location) {
        var tab_name = $route.current.navTab,
            ga_path = SiteName + $location.path();
        
        $scope.isTabActive = function (tabName) {
            if (tabName === tab_name) {
                return "active";
            }
        };
        
        //console.log("Sending to GA: " + ga_path);
        $window._gaq.push(['_trackPageview', ga_path]);
        
    }]);
    
    app.register.directive('navMenu', function () {
        return {
            restrict: 'A',
            controller: 'navMenuController',
            templateUrl: 'js/scripts/directive/templates/navMenu.html'
        };
    });
});
