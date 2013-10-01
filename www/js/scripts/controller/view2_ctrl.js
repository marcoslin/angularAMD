angular.module("ngreq-app")
.controller("View2Controller", function ($scope, Pictures) {
    $scope.title = "View 2 - Depends on dataServices";
    $scope.rows = Pictures.query();
});