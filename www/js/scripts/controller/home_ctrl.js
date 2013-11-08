define(['app', 'directive/navMenu'], function (app) {
    app.register.controller('HomeController', ['$scope', '$log', function ($scope, $log) {
        $scope.title = "Welcome"; 
    }])
}); 
