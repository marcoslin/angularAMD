define(['app'], function (app) {
    app.register.controller('View3Controller', ['$scope', '$log', function ($scope, $log) {
        $scope.title = "View 3 - Depends on customDirectives";
    }])
}); 
