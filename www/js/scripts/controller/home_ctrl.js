define(['app', 'directive/navMenu','prettify'], function (app) {
    app.register.controller('HomeController', ['$scope', '$log', function ($scope, $log) {
        $scope.title = "angularAMD"; 
    }])
}); 
