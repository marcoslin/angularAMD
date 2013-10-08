define(['app', 'navMenu'], function (app) {
    app.register.controller('View1Controller', ['$scope', '$log', function ($scope, $log) {
        $scope.title = "Welcome"; 
    }])
}); 
