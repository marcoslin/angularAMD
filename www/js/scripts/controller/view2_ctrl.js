define(['app', 'dataServices'], function (app) {
        
    app.register.controller('View2Controller', ['$scope','Pictures', function ($scope, Pictures) {
        $scope.title = "View 2 - Depends on dataServices";
        $scope.rows = Pictures.query();
    }]);
    
    /* Docs:
    http://ify.io/lazy-loading-in-angularjs/
    http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx
    https://groups.google.com/forum/#!msg/angular/yPfPlePHeLk/YhehidSA1sIJ
    http://stackoverflow.com/questions/13400687/cant-retrieve-the-injector-from-angular
    
    Check out loadModules at angular.js:3063
    */
}); 
