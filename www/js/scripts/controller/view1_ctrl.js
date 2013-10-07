define(['app', 'navMenu'], function (app) {
    app.register.controller('View1Controller', ['$scope', '$log', function ($scope, $log) {
        $scope.title = "A page without any dependencies."; 
    }])
}); 
