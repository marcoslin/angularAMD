define(['app', 'angularAMD', 'ngload!services'], function (app, angularAMD) {
    var ctrl_name = "MainController",
        inject = angularAMD.inject,
        utestResult;

    inject(function (UtestServiceResult) {
        utestResult = UtestServiceResult;
    });

    app.controller(ctrl_name, ["$scope", utestResult.UtestFactory, utestResult.UtestService, utestResult.UtestSubModule, function ($scope, UtestFactory, UtestService, UtestSubModule) {
        $scope.ctrl_name = ctrl_name;
        $scope.utest_factory = UtestFactory;
        $scope.utest_service = UtestService;
        $scope.utest_sub_module = UtestSubModule;
    }]);

    return {
        "ctrl_name": ctrl_name,
        "result": utestResult
    };
});
