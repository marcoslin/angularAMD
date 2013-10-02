define(['app'], function (app) {
    app.register.controller('View1Controller', ['$scope', '$log', function ($scope, $log) {
        $scope.title = "View 1 - No Dependencies"; 
    }])
}); 
