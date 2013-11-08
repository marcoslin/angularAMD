define(['app', 'directive/navMenu', 'ngamd!directive/write'], function (app) {
    app.register.controller('HomeController', ['$scope', '$log', function ($scope, $log) {
        $scope.title = "Welcome"; 
    }])
}); 
